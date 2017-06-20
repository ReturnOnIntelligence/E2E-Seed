#!/bin/bash

# STAGE 1, clean reports, javascript files
node ./support/clean.js
# Compile TypeScript
tsc --rootDir './src' --outDir './out'

# STAGE 2, Run tests
# For run in series(see tag and --format json:./reports/cleanup.json - it's name for report'): 
./node_modules/.bin/cucumberjs --require ./out/support/world.js --require ./out/support/scenarioHooks.js --require ./out/stepDefinitions --format json:./reports/nameOfReport.json --tags '@your-tag1'
# For run in parallel(see tag only):
node .node_modules/cucumber-parallelly/lib/cucumber-parallelly --tag '@your-tag2' -c "support/cp_config.js"

# STAGE 3, generate report
node ./support/report.js

exit 0