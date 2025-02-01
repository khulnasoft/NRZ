use std::sync::Arc;

use nrz_ui::wui::{event::WebUIEvent, query::SharedState};

use crate::{query, run::Run};

pub async fn start_web_ui_server(
    rx: tokio::sync::mpsc::UnboundedReceiver<WebUIEvent>,
    run: Arc<Run>,
) -> Result<(), nrz_ui::Error> {
    let state = SharedState::default();
    let subscriber = nrz_ui::wui::subscriber::Subscriber::new(rx);
    tokio::spawn(subscriber.watch(state.clone()));

    query::run_server(Some(state.clone()), run).await?;

    Ok(())
}
