Setup
  $ . ${TESTDIR}/../../../helpers/setup_integration_test.sh strict_env_vars

Empty passthroughs are null
  $ ${NRZ} build --dry=json | jq -r '.tasks[0].environmentVariables | { passthrough, globalPassthrough }'
  {
    "passthrough": null,
    "globalPassthrough": null
  }

Make sure that we populate the JSON output
  $ ${TESTDIR}/../../../helpers/replace_nrz_json.sh $(pwd) "strict_env_vars/all.json"
  $ ${NRZ} build --dry=json | jq -r '.tasks[0].environmentVariables | { passthrough, globalPassthrough }'
  {
    "passthrough": [],
    "globalPassthrough": null
  }
