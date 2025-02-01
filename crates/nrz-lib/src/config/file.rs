use nrz_auth::{KHULNASOFT_TOKEN_DIR, KHULNASOFT_TOKEN_FILE, NRZ_TOKEN_DIR, NRZ_TOKEN_FILE};
use nrz_dirs::{config_dir, khulnasoft_config_dir};
use nrzpath::{AbsoluteSystemPath, AbsoluteSystemPathBuf};

use super::{ConfigurationOptions, Error, ResolvedConfigurationOptions};

pub struct ConfigFile {
    path: AbsoluteSystemPathBuf,
}

impl ConfigFile {
    pub fn global_config(override_path: Option<AbsoluteSystemPathBuf>) -> Result<Self, Error> {
        let path = override_path.map_or_else(global_config_path, Ok)?;
        Ok(Self { path })
    }

    pub fn local_config(repo_root: &AbsoluteSystemPath) -> Self {
        let path = repo_root.join_components(&[".nrz", "config.json"]);
        Self { path }
    }
}

impl ResolvedConfigurationOptions for ConfigFile {
    fn get_configuration_options(
        &self,
        _existing_config: &ConfigurationOptions,
    ) -> Result<ConfigurationOptions, Error> {
        let contents = self
            .path
            .read_existing_to_string()
            .map_err(|error| Error::FailedToReadConfig {
                config_path: self.path.clone(),
                error,
            })?
            .filter(|s| !s.is_empty());

        let global_config = contents
            .as_deref()
            .map_or_else(|| Ok(ConfigurationOptions::default()), serde_json::from_str)?;
        Ok(global_config)
    }
}

pub struct AuthFile {
    path: AbsoluteSystemPathBuf,
}

impl AuthFile {
    pub fn global_auth(override_path: Option<AbsoluteSystemPathBuf>) -> Result<Self, Error> {
        let path = override_path.map_or_else(global_auth_path, Ok)?;
        Ok(Self { path })
    }
}

impl ResolvedConfigurationOptions for AuthFile {
    fn get_configuration_options(
        &self,
        _existing_config: &ConfigurationOptions,
    ) -> Result<ConfigurationOptions, Error> {
        let token = match nrz_auth::Token::from_file(&self.path) {
            Ok(token) => token,
            // Multiple ways this can go wrong. Don't error out if we can't find the token - it
            // just might not be there.
            Err(e) => {
                if matches!(e, nrz_auth::Error::TokenNotFound) {
                    return Ok(ConfigurationOptions::default());
                }

                return Err(e.into());
            }
        };

        // No auth token found in either Khulnasoft or Nrz config.
        if token.into_inner().is_empty() {
            return Ok(ConfigurationOptions::default());
        }

        let global_auth: ConfigurationOptions = ConfigurationOptions {
            token: Some(token.into_inner().to_owned()),
            ..Default::default()
        };
        Ok(global_auth)
    }
}

fn global_config_path() -> Result<AbsoluteSystemPathBuf, Error> {
    let config_dir = config_dir()?.ok_or(Error::NoGlobalConfigPath)?;

    Ok(config_dir.join_components(&[NRZ_TOKEN_DIR, NRZ_TOKEN_FILE]))
}

fn global_auth_path() -> Result<AbsoluteSystemPathBuf, Error> {
    let khulnasoft_config_dir = khulnasoft_config_dir()?.ok_or(Error::NoGlobalConfigDir)?;
    // Check for both Khulnasoft and Nrz paths. Khulnasoft takes priority.
    let khulnasoft_path =
        khulnasoft_config_dir.join_components(&[KHULNASOFT_TOKEN_DIR, KHULNASOFT_TOKEN_FILE]);
    if khulnasoft_path.exists() {
        return Ok(khulnasoft_path);
    }

    let nrz_config_dir = config_dir()?.ok_or(Error::NoGlobalConfigDir)?;

    Ok(nrz_config_dir.join_components(&[NRZ_TOKEN_DIR, NRZ_TOKEN_FILE]))
}
