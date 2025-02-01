use miette::Diagnostic;
use nrz_repository::package_graph;
use nrz_ui::tui;
use thiserror::Error;

use super::graph_visualizer;
use crate::{
    config, daemon, engine,
    engine::ValidateError,
    opts,
    run::{global_hash, scope},
    task_graph, task_hash,
};

#[derive(Debug, Error, Diagnostic)]
pub enum Error {
    #[error("Invalid task configuration")]
    EngineValidation(#[related] Vec<ValidateError>),
    #[error(transparent)]
    Graph(#[from] graph_visualizer::Error),
    #[error(transparent)]
    #[diagnostic(transparent)]
    Builder(#[from] engine::BuilderError),
    #[error(transparent)]
    Env(#[from] nrz_env::Error),
    #[error(transparent)]
    Opts(#[from] opts::Error),
    #[error(transparent)]
    #[diagnostic(transparent)]
    PackageJson(#[from] nrz_repository::package_json::Error),
    #[error(transparent)]
    #[diagnostic(transparent)]
    PackageManager(#[from] nrz_repository::package_manager::Error),
    #[error(transparent)]
    #[diagnostic(transparent)]
    Config(#[from] config::Error),
    #[error(transparent)]
    #[diagnostic(transparent)]
    PackageGraphBuilder(#[from] package_graph::builder::Error),
    #[error(transparent)]
    DaemonConnector(#[from] daemon::DaemonConnectorError),
    #[error(transparent)]
    Cache(#[from] nrz_cache::CacheError),
    #[error(transparent)]
    Path(#[from] nrzpath::PathError),
    #[error(transparent)]
    Scope(#[from] scope::ResolutionError),
    #[error(transparent)]
    GlobalHash(#[from] global_hash::Error),
    #[error(transparent)]
    TaskHash(#[from] task_hash::Error),
    #[error(transparent)]
    #[diagnostic(transparent)]
    Visitor(#[from] task_graph::VisitorError),
    #[error("Failed to register signal handler: {0}")]
    SignalHandler(std::io::Error),
    #[error(transparent)]
    Daemon(#[from] daemon::DaemonError),
    #[error(transparent)]
    UI(#[from] nrz_ui::Error),
    #[error(transparent)]
    Tui(#[from] tui::Error),
    #[error("Failed to read microfrontends configuration: {0}")]
    MicroFrontends(#[from] nrz_microfrontends::Error),
}
