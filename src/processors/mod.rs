use std::path::Path;

mod copy;
mod first;
mod markdown;
mod recursive;
mod shell;

pub use copy::*;
pub use first::*;
pub use markdown::*;
pub use recursive::*;
pub use shell::*;

macro_rules! warning {
    ($($arg:tt)*) => ({
        eprint!("\u{001b}[33mWARNING: ");
        eprintln!($($arg)*);
        eprint!("\u{001b}[0m");
    })
}
pub(crate) use warning;

pub trait Processor {
    /// Attempts to process `path` and write the result folder `dest`.
    ///
    /// This method should return an error if the implementor cannot process
    /// the contents of `path`.
    fn process(&self, dest: &Path, path: &Path) -> Result<(), ()>;
}

impl<F> Processor for F
where
    F: Fn(&Path, &Path) -> Result<(), ()>,
{
    fn process(&self, dest: &std::path::Path, path: &std::path::Path) -> Result<(), ()> {
        (self)(dest, path)
    }
}

pub fn extension(path: &Path) -> Result<&str, ()> {
    path.extension().ok_or(())?.to_str().ok_or(())
}

pub trait ProcessorExt {
    fn recursive(self) -> Recursive<Self>
    where
        Self: Sized;
}

impl<P> ProcessorExt for P
where
    P: Processor + Sized,
{
    fn recursive(self) -> Recursive<P> {
        Recursive::new(self)
    }
}
