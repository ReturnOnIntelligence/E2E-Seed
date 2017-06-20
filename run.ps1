npm install
gulp build-ts

mkdir reports

node_modules\.bin\cucumberjs --require ./out/support/world.js --require ./out/support/scenarioHooks.js --require ./out/stepDefinitions --format json:./reports/cleanup.json --tags '@cleanup'
# ./node_modules/.bin/cucumberjs --require ./out/support/world.js --require ./out/support/scenarioHooks.js --require ./out/stepDefinitions --format json:./reports/smarket-only-sequence.json --tags '@smarket-only-sequence'
# ./node_modules/.bin/cucumberjs --require ./out/support/world.js --require ./out/support/scenarioHooks.js --require ./out/stepDefinitions --format json:./reports/brokerage-profile.json --tags '@brokerage-profile'
# node .node_modules/cucumber-parallelly/lib/cucumber-parallelly --tag '@client-setup' -c "support/cp_config.js"
# node ./node_modules/cucumber-parallelly/lib/cucumber-parallelly --tag '@smarket' -c "support/cp_config.js"

node ./support/report.js