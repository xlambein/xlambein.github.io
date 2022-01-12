use std::{
    io::{self, Write},
    path::Path,
    process::Command,
};

use super::{extension, Processor};

/// A processor that runs a shell script.
pub struct Shell;

impl Processor for Shell {
    fn process(&self, dest: &Path, path: &Path) -> Result<(), ()> {
        if extension(path)? != "sh" {
            return Err(());
        }

        let output = Command::new("sh")
            .arg("-e") // Abort at first failure
            .arg(path)
            // Make the path absolute, so the script is free to `cd` away
            .env("DEST", dest.canonicalize().unwrap())
            .output()
            .expect("could not execute `sh`");
        if !output.status.success() {
            io::stderr().write_all(&output.stdout).unwrap();
            io::stderr().write_all(&output.stderr).unwrap();
            panic!("`sh` failed");
        }

        eprintln!("{} -[sh]-> {}", path.display(), dest.display());

        Ok(())
    }
}
