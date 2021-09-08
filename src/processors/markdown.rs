use comrak::nodes::NodeHeading;
use comrak::{format_html, nodes::NodeValue, parse_document, Arena, ComrakOptions};
use handlebars::{Context, Handlebars, Helper, HelperResult, Output, RenderContext, Renderable};
use serde::{Deserialize, Serialize};

use std::{fs, io, path::Path};

use super::{extension, warning, Processor};

#[derive(Serialize, Deserialize)]
#[serde(default)]
struct FrontMatter {
    title: Option<String>,
    pubdate: Option<String>,
    tags: Vec<String>,
    template: String,
}

impl Default for FrontMatter {
    fn default() -> Self {
        Self {
            title: None,
            pubdate: None,
            tags: vec![],
            template: "page".to_owned(),
        }
    }
}

#[derive(Serialize)]
struct Page {
    title: Option<String>,
    pubdate: Option<String>,
    template: String,
    content: String,
}

pub struct Markdown<'a> {
    comrak_options: ComrakOptions,
    templates: Handlebars<'a>,
}

fn figure_helper<'reg, 'rc>(
    h: &Helper<'reg, 'rc>,
    r: &'reg Handlebars<'reg>,
    ctx: &'rc Context,
    rc: &mut RenderContext<'reg, 'rc>,
    out: &mut dyn Output,
) -> HelperResult {
    let src = h.param(0).and_then(|v| v.value().as_str()).unwrap_or("");
    out.write("<figure>\n")?;
    out.write(&format!("<img src=\"{}\">\n", src))?;
    out.write("<figcaption>\n")?;
    h.template()
        .map(|t| t.render(r, ctx, rc, out))
        .unwrap_or(Ok(()))?;
    out.write("</figcaption>\n")?;
    out.write("</figure>\n\n")?;
    Ok(())
}

impl<'a> Markdown<'a> {
    pub fn new() -> Self {
        let mut comrak_options = ComrakOptions::default();
        comrak_options.parse.smart = true;
        comrak_options.extension.front_matter_delimiter = Some("---".to_owned());
        comrak_options.extension.header_ids = Some(String::new());
        comrak_options.render.unsafe_ = true;

        let mut templates = Handlebars::new();
        templates
            .register_templates_directory(".html", "templates")
            .unwrap();

        templates.register_helper("figure", Box::new(figure_helper));

        Markdown {
            comrak_options,
            templates,
        }
    }

    pub fn process_with_context<C>(
        &self,
        dest: &std::path::Path,
        path: &std::path::Path,
        context: &C,
    ) -> std::result::Result<(), ()>
    where
        C: Serialize,
    {
        if extension(path)? != "md" {
            return Err(());
        }

        let dest = dest.join(path.file_name().unwrap()).with_extension("html");

        // Read file

        let buffer =
            fs::read_to_string(path).expect(&format!("could not read file '{}'", path.display()));

        let buffer = self
            .templates
            .render_template(&buffer, context)
            .expect("could not render template");

        // Parse markdown

        let arena = Arena::new();
        let root = parse_document(&arena, &buffer, &self.comrak_options);

        // Extract front matter

        let mut front_matter: FrontMatter = root
            .children()
            .find_map(|n| {
                if let NodeValue::FrontMatter(fm) = &n.data.borrow().value {
                    let fm = std::str::from_utf8(fm)
                        .unwrap()
                        .trim_end()
                        .strip_suffix("---")
                        .unwrap();
                    Some(fm.to_owned())
                } else {
                    None
                }
            })
            .map(|v| serde_yaml::from_str(&v).expect("could not parse front matter"))
            .unwrap_or_default();

        // If there's a # title, we extract the document title from it
        root.children()
            .filter(|n| {
                matches!(
                    &n.data.borrow().value,
                    NodeValue::Heading(NodeHeading { level: 1, .. })
                )
            })
            .for_each(|n| {
                n.detach();
                let mut buffer = io::Cursor::new(Vec::<u8>::new());
                n.children().for_each(|n| {
                    format_html(n, &self.comrak_options, &mut buffer)
                        .expect("could not format markdown");
                });

                if front_matter.title.is_some() {
                    warning!(
                        "title specified both in front matter and in document (in '{}')",
                        path.display()
                    );
                } else {
                    front_matter.title = Some(
                        String::from_utf8(buffer.into_inner()).expect("string is invalid UTF8"),
                    );
                }
            });

        // Convert to HTML

        let mut buffer = io::Cursor::new(Vec::<u8>::new());

        format_html(&root, &self.comrak_options, &mut buffer).expect(&format!(
            "could not format markdown in source '{}'",
            path.display()
        ));

        // Render to template & write to file

        let mut out =
            fs::File::create(&dest).expect(&format!("could not create file '{}'", dest.display()));

        self.templates
            .render_to_write(
                "base",
                &Page {
                    title: front_matter.title,
                    pubdate: front_matter.pubdate,
                    template: front_matter.template,
                    content: String::from_utf8(buffer.into_inner()).unwrap(),
                },
                &mut out,
            )
            .unwrap();

        eprintln!("{} -> {}", path.display(), dest.display());

        Ok(())
    }
}

impl<'a> Processor for Markdown<'a> {
    fn process(
        &self,
        dest: &std::path::Path,
        path: &std::path::Path,
    ) -> std::result::Result<(), ()> {
        return self.process_with_context(dest, path, &());

        if extension(path)? != "md" {
            return Err(());
        }

        let dest = dest.join(path.file_name().unwrap()).with_extension("html");

        // Read file

        let buffer =
            fs::read_to_string(path).expect(&format!("could not read file '{}'", path.display()));

        let buffer = self
            .templates
            .render_template(
                &buffer,
                &Page {
                    title: None,
                    pubdate: None,
                    template: "".to_owned(),
                    content: "".to_owned(),
                },
            )
            .expect("could not render template");

        // Parse markdown

        let arena = Arena::new();
        let root = parse_document(&arena, &buffer, &self.comrak_options);

        // Extract front matter

        let mut front_matter: FrontMatter = root
            .children()
            .find_map(|n| {
                if let NodeValue::FrontMatter(fm) = &n.data.borrow().value {
                    let fm = std::str::from_utf8(fm)
                        .unwrap()
                        .trim_end()
                        .strip_suffix("---")
                        .unwrap();
                    Some(fm.to_owned())
                } else {
                    None
                }
            })
            .map(|v| serde_yaml::from_str(&v).expect("could not parse front matter"))
            .unwrap_or_default();

        // If there's a # title, we extract the document title from it
        root.children()
            .filter(|n| {
                matches!(
                    &n.data.borrow().value,
                    NodeValue::Heading(NodeHeading { level: 1, .. })
                )
            })
            .for_each(|n| {
                n.detach();
                let mut buffer = io::Cursor::new(Vec::<u8>::new());
                n.children().for_each(|n| {
                    format_html(n, &self.comrak_options, &mut buffer)
                        .expect("could not format markdown");
                });

                if front_matter.title.is_some() {
                    warning!(
                        "title specified both in front matter and in document (in '{}')",
                        path.display()
                    );
                } else {
                    front_matter.title = Some(
                        String::from_utf8(buffer.into_inner()).expect("string is invalid UTF8"),
                    );
                }
            });

        // Convert to HTML

        let mut buffer = io::Cursor::new(Vec::<u8>::new());

        format_html(&root, &self.comrak_options, &mut buffer).expect(&format!(
            "could not format markdown in source '{}'",
            path.display()
        ));

        // Render to template & write to file

        let mut out =
            fs::File::create(&dest).expect(&format!("could not create file '{}'", dest.display()));

        self.templates
            .render_to_write(
                "base",
                &Page {
                    title: front_matter.title,
                    pubdate: front_matter.pubdate,
                    template: front_matter.template,
                    content: String::from_utf8(buffer.into_inner()).unwrap(),
                },
                &mut out,
            )
            .unwrap();

        eprintln!("{} -> {}", path.display(), dest.display());

        Ok(())
    }
}
