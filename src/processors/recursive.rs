use std::fs;
use std::path::Path;

use super::Processor;

pub struct Recursive<P> {
    processor: P,
}

impl<P> Recursive<P> {
    pub fn new(processor: P) -> Self {
        Self { processor }
    }
}

impl<P> Processor for Recursive<P>
where
    P: Processor,
{
    fn process(&self, dest: &Path, path: &Path) -> Result<(), ()> {
        if path.is_dir() {
            let dest = dest.join(path.file_name().ok_or(())?);

            if dest.exists() {
                fs::remove_dir_all(&dest)
                    .expect(&format!("could not remove directory '{}'", dest.display()));
            }
            fs::create_dir(&dest)
                .expect(&format!("could not create directory '{}'", dest.display()));

            eprintln!("{} -> {}", path.display(), dest.display());

            for entry in path
                .read_dir()
                .expect(&format!("could not read directory '{}'", dest.display()))
            {
                let entry = entry.map_err(|_| {})?;
                self.process(&dest, &entry.path());
            }
            Ok(())
        } else {
            self.processor.process(&dest, path)
        }
    }
}
