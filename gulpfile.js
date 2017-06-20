const argv = require('yargs').argv
const fs = require('fs');

require('./support/gulpClean.js');
require('./support/gulpBuild.js');
require('./support/gulpRun.js');