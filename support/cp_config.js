const argv = require('yargs').argv;
const date = new Date();
const timeStamp = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "_" + date.getHours()
    + "-" + date.getMinutes() + "-" + date.getSeconds();

module.exports = {
  name: "Configuration for cucumber-parallelly",
  reportPath: `.\\reports\\${argv.tag}.json`,
  featuresPaths: '.\\features\\',
  threads: 10, retries: 0, silent: false,
  tags: [argv.tag],
  cucumberPath: "node_modules\\cucumber\\bin\\cucumber.js",
  cucumberOpts: "--require .\\out\\support\\world.js --require .\\out\\support\\scenarioHooks.js --require .\\out\\stepDefinitions "
};