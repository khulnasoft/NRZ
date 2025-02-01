#!/usr/bin/env bash

# Create a mocked Khulnasoft auth file
read -r -d  '' AUTH <<- EOF
{
  "// Note": "This is your Khulnasoft credentials file. DO NOT SHARE!",
  "// Docs": "https://khulnasoft.com/docs/project-configuration#global-configuration/auth-json",
  "token": "mock-token"
}
EOF

TMP_DIR=$(mktemp -d -t nrz-XXXXXXXXXX)

# duplicate over to XDG var so that nrz picks it up
export XDG_CONFIG_HOME=$TMP_DIR
export HOME=$TMP_DIR
export NRZ_CONFIG_DIR_PATH=$TMP_DIR
export KHULNASOFT_CONFIG_DIR_PATH=$TMP_DIR
export NRZ_TELEMETRY_MESSAGE_DISABLED=1

# For Linux
mkdir -p "$TMP_DIR/com.khulnasoft.cli"
echo $AUTH > "$TMP_DIR/com.khulnasoft.cli/auth.json"

# For macOS
MACOS_DIR="$TMP_DIR/Library/Application Support"
mkdir -p "$MACOS_DIR/com.khulnasoft.cli"
echo "$AUTH" > "$MACOS_DIR/com.khulnasoft.cli/auth.json"

# For Windows
WINDOWS_DIR="$TMP_DIR\\AppData\\Roaming"
mkdir -p "$WINDOWS_DIR\\com.khulnasoft.cli"
echo "$AUTH" > "$WINDOWS_DIR\\com.khulnasoft.cli\\auth.json"
