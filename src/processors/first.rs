use std::path::Path;

use super::Processor;

pub struct First {
    processors: Vec<Box<dyn Processor>>,
}

impl First {
    pub fn new(processors: Vec<Box<dyn Processor>>) -> Self {
        Self { processors }
    }
}

impl Processor for First {
    fn process(&self, dest: &Path, path: &Path) -> Result<(), ()> {
        for p in &self.processors {
            if p.process(dest, path).is_ok() {
                return Ok(());
            }
        }

        Err(())
    }
}

macro_rules! first_of {
    ($($x:expr),+ $(,)?) => ({
        First::new(vec![
            $(Box::new($x)),+
        ])
    })
}

pub(crate) use first_of;
