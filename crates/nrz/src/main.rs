// Bump all rust changes
#![deny(clippy::all)]

use std::process;

use anyhow::Result;
use miette::Report;

// This function should not expanded. Please add any logic to
// `nrz_lib::main` instead
fn main() -> Result<()> {
    std::panic::set_hook(Box::new(nrz_lib::panic_handler));

    let exit_code = nrz_lib::main().unwrap_or_else(|err| {
        eprintln!("{:?}", Report::new(err));
        1
    });

    process::exit(exit_code)
}
