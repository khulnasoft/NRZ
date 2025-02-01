Setup
  $ . ${TESTDIR}/../../helpers/setup.sh
  $ . ${TESTDIR}/../../helpers/mock_telemetry_config.sh

Run status (with first run message)
  $ NRZ_TELEMETRY_MESSAGE_DISABLED=0 ${NRZ} telemetry status
  
  Attention:
  Nrz now collects completely anonymous telemetry regarding usage.
  This information is used to shape the Nrz roadmap and prioritize features.
  You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
  https://nrz.build/repo/docs/telemetry
  
  
  Status: Enabled
  
  Nrz telemetry is completely anonymous. Thank you for participating!
  Learn more: https://nrz.build/repo/docs/telemetry

Run without command
  $ ${NRZ} telemetry
  
  Status: Enabled
  
  Nrz telemetry is completely anonymous. Thank you for participating!
  Learn more: https://nrz.build/repo/docs/telemetry

Disable
  $ ${NRZ} telemetry disable
  Success!
  
  Status: Disabled
  
  You have opted-out of Nrz anonymous telemetry. No data will be collected from your machine.
  Learn more: https://nrz.build/repo/docs/telemetry

Enable
  $ ${NRZ} telemetry enable
  Success!
  
  Status: Enabled
  
  Nrz telemetry is completely anonymous. Thank you for participating!
  Learn more: https://nrz.build/repo/docs/telemetry


