use std::{fs, path::Path};

use super::Processor;

type Predicate = dyn Fn(&Path) -> bool;

pub struct Copy {
    predicate: Box<Predicate>,
}

impl Copy {
    pub fn always() -> Self {
        Self::with_predicate(|_| true)
    }

    pub fn with_predicate<P: 'static>(predicate: P) -> Self
    where
        P: Fn(&Path) -> bool,
    {
        Self {
            predicate: Box::new(predicate),
        }
    }

    pub fn with_extensions<S: Into<String>>(extensions: Vec<S>) -> Self {
        let extensions: Vec<String> = extensions.into_iter().map(Into::into).collect();

        Self::with_predicate(move |p: &Path| {
            let ext = p
                .extension()
                .expect(&format!("could not get extension for '{}'", p.display()))
                .to_str()
                .unwrap()
                .to_owned();
            extensions.contains(&ext)
        })
    }
}

impl Processor for Copy {
    fn process(
        &self,
        dest: &std::path::Path,
        path: &std::path::Path,
    ) -> std::result::Result<(), ()> {
        if (self.predicate)(path) {
            let dest = dest.join(path.file_name().ok_or(())?);

            fs::copy(path, &dest).expect(&format!(
                "couldn't copy '{}' to '{}'",
                path.display(),
                dest.display()
            ));

            eprintln!("{} -> {}", path.display(), dest.display());

            return Ok(());
        }

        Err(())
    }
}
