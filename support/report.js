const fs = require('fs');
const reportSettings = require('./settings').reportSettings;
const reporter = require('cucumber-html-reporter');
const settings = require('../out/appSettings/settings');

deleteOldFiles();
createResultJson();
reporter.generate(getReportOption());



// support code
function createResultJson() {
  fs.appendFileSync(reportSettings.reportPathJson, JSON.stringify(mergeAllReports()));
};

function mergeAllReports() {
  let result = []
  fs.readdirSync('./reports').forEach((file) => {
      const pathForFs = './reports/' + file;
      const pathForRequire = '../reports/' + file;
      if(fs.lstatSync(pathForFs).isFile() && pathForFs.endsWith('.json') ) {
        let report = require(pathForRequire);
        for (let i = 0; i < report.length; i++) {
          result.push(require(pathForRequire)[i]);
        }
      }
    });
    return result;
};

function deleteOldFiles() {
  if (fs.existsSync(reportSettings.reportPathJson)) {
    fs.unlinkSync(reportSettings.reportPathJson);
  }

  if (fs.existsSync(reportSettings.reportPathHtml)) {
    fs.unlinkSync(reportSettings.reportPathHtml);
  }
};

function getReportOption() {
  return  {
      theme: "bootstrap",
      jsonFile: reportSettings.reportPathJson,
      output: reportSettings.reportPathHtml,
      reportSuiteAsScenarios: true,
      launchReport: true,
      templateDir: 'src/template',
      metadata: {
          'Test Environment': 'Local',
          'Browser': settings.settings.default.selenium.driverOptions.browserName,
          'Browser Timeout' : settings.settings.default.selenium.driverOptions.timeout / 1000 + 'sec.',
          'Step Timeout' : settings.cucumberTimeout / 1000 + 'sec.'
      }
  };
};