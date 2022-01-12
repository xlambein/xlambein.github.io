mod processors;

use std::{
    env,
    ffi::OsString,
    io::{self, Write},
    path::{Path, PathBuf},
    process::Command,
};

use serde::Serialize;

use processors::{first_of, warning, Copy, First, Markdown, Processor, ProcessorExt};

struct SubPaths(std::fs::ReadDir);

impl SubPaths {
    fn new(path: &Path) -> std::io::Result<Self> {
        Ok(Self(path.read_dir()?))
    }
}

impl Iterator for SubPaths {
    type Item = std::io::Result<PathBuf>;

    fn next(&mut self) -> Option<<Self as Iterator>::Item> {
        self.0.next().map(|d| d.map(|d| d.path()))
    }
}

fn subpaths<'a>(path: &Path) -> std::io::Result<SubPaths> {
    SubPaths::new(path)
}

#[derive(Clone, Serialize)]
struct ProjectDescription {
    url: String,
    title: String,
    pubdate: String,
    tags: Vec<String>,
}

impl ProjectDescription {
    pub fn new<S: Into<String>>(
        url: impl Into<String>,
        title: impl Into<String>,
        pubdate: impl Into<String>,
        tags: Vec<S>,
    ) -> Self {
        Self {
            url: url.into(),
            title: title.into(),
            pubdate: pubdate.into(),
            tags: tags.into_iter().map(Into::into).collect(),
        }
    }
}

#[derive(Clone, Serialize)]
struct Page {
    projects: Vec<ProjectDescription>,
}

fn main() -> std::io::Result<()> {
    let src = Path::new(".");
    let dest = Path::new("../gh-pages");
    let home = PathBuf::from(env::var_os("HOME").unwrap());

    let keep = vec![".git", "CNAME"];
    subpaths(&dest)?
        .flatten()
        .filter(|p| !keep.contains(&p.file_name().unwrap().to_str().unwrap()))
        .for_each(|p| {
            if p.is_file() {
                std::fs::remove_file(&p);
            } else {
                std::fs::remove_dir(&p);
            }
        });

    // Assets
    Copy::always()
        .recursive()
        .process(dest, &src.join("assets"));

    // Pages
    let proc = first_of!(
        Markdown::new(),
        Copy::with_extensions(vec!["png", "gif", "jpg", "jpeg", "svg", "pdf", "css"]),
    )
    .recursive();
    for p in subpaths(&src.join("pages"))? {
        let p = p?;
        if proc.process(dest, &p).is_err() {
            warning!("ignoring '{}'", p.display())
        }
    }

    // Elm phrase generator
    process_makefile(
        home.join("ongoing/phrase-generator"),
        dest.canonicalize().unwrap().join("phrase-generator"),
    );

    let mut context = Page {
        projects: vec![
            ProjectDescription::new(
                "/ldjam43/",
                "Ludum Dare 43: Sacrifice This Game",
                "2018-12-05",
                vec!["ludum dare", "game", "python"],
            ),
            ProjectDescription::new(
                "/ldjam44/",
                "Ludum Dare 44: Biomass",
                "2019-06-08",
                vec!["ludum dare", "game", "javascript"],
            ),
            ProjectDescription::new(
                "/soma-the-machine/",
                "\"The Machine\": A Conversation With a Slot Machine",
                "2018-10-31",
                vec!["hardware", "game"],
            ),
            ProjectDescription::new(
                "/sci-zines/",
                "Mini Sci-Zines",
                "2018-12-14",
                vec!["zine", "art", "explanation"],
            ),
            ProjectDescription::new(
                "/inktober2019/",
                "Inktober 2019",
                "2019-10-31",
                vec!["inktober", "art"],
            ),
            ProjectDescription::new(
                "https://github.com/xlambein/twit-commit",
                "Twit-Commit, a Git Commit-based Social Network",
                "2019-07-14",
                vec!["0$ idea", "bash"],
            ),
            ProjectDescription::new(
                "https://github.com/xlambein/typo-corrector",
                "Typo Corrector",
                "2021-01-14",
                vec!["1,000,000$ idea", "program", "rust"],
            ),
            ProjectDescription::new(
                "/ldjam48/",
                "Ludum Dare 48: Truck or Pupper",
                "2021-04-31",
                vec!["ludum dare", "game", "godot"],
            ),
            ProjectDescription::new(
                "/rust-against-humanity/",
                "Rust Against Humanity",
                "2021-01-04",
                vec!["game", "web", "rust"],
            ),
            ProjectDescription::new(
                "https://github.com/xlambein/temps",
                "<code>temps</code>, a Minimalist CLI Time Tracker",
                "2021-09-16",
                vec!["program", "rust"],
            ),
            ProjectDescription::new(
                "/ldjam49/",
                "Ludum Dare 49: Chevalchemy: A Hoof of Concept",
                "2021-10-05",
                vec!["ludum dare", "game", "rust"],
            ),
            ProjectDescription::new(
                "/phrase-generator/",
                "Phrase Generator",
                "2022-01-12",
                vec!["elm"],
            ),
        ],
    };
    context
        .projects
        .sort_by(|l, r| l.pubdate.cmp(&r.pubdate).reverse());

    // Home page
    Markdown::new().process_with_context(dest, &src.join("pages/index.md"), &context);

    Ok(())
}

/// Process a folder containing a makefile.
///
/// The folder is expected to contain a makefile with target `dist`, and which
/// accepts an argument `DEST` specifying the target folder.
///
/// Be careful that `dest` is specified **relative to** `src`.
///
/// # Example
///
/// `process_makefile("~/foo/bar", "../bar")` will result in the following
/// `make` command:
///
///     cd ~/foo/bar && make dist DEST=../bar
fn process_makefile(src: impl AsRef<Path>, dest: impl AsRef<Path>) {
    let src = src.as_ref();
    let dest = dest.as_ref();
    let output = Command::new("make")
        .current_dir(src)
        .arg("dist")
        .arg({
            let mut arg = OsString::from("DEST=");
            arg.push(dest);
            arg
        })
        .output()
        .expect("`make` failed to start");
    if !output.status.success() {
        io::stderr().write_all(&output.stdout).unwrap();
        io::stderr().write_all(&output.stderr).unwrap();
        panic!("`make` failed");
    }
    eprintln!(
        "{} -[make]-> {}",
        src.to_string_lossy(),
        dest.to_string_lossy()
    );
}
