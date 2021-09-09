const path = require('path');
const fs = require('fs');
const logger = require('./logger.js');

const DEFAULT_PATH = './reports/mutation/mutation.json';

function openReport(reportPath = DEFAULT_PATH) {
  logger.debug(`Report path "${reportPath}"`);
  const resolvedReportPath = path.resolve(reportPath);
  logger.debug(`Resolved report path "${resolvedReportPath}"`);

  if (!fs.existsSync(resolvedReportPath)) {
    logger.setFailed(
      `The report-json file "${reportPath}" could not be resolved.`,
    );
  }

  const report = fs.readFileSync(resolvedReportPath, { encoding: 'utf8' });
  logger.debug(`Report file ${report}`);

  return JSON.parse(report);
}

module.exports = { openReport };
