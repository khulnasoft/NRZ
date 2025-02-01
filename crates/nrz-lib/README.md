# nrz-lib

This crate contains most of the logic for the Nrz binary and should only be consumed by the `nrz` crate.
The `nrz` crate handles building the CGO archive and linking it to the Rust code. These crates were split up so that we do not have to build the Go code to run the Rust tests.
