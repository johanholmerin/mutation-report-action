const assert = require('assert');
const logger = require('./logger.js');
const { createCheck, finishCheck } = require('./check.js');
const { parseReport } = require('./parse.js');
const { openReport } = require('./report.js');

const name = 'Stryker Report';

async function run({ cwd, repo, sha, path, token }) {
  logger.debug(`Config ${JSON.stringify({ cwd, repo, sha, path, token })}`);
  assert(token, 'Missing repo-token');

  const id = await createCheck({ name, sha, repo, token });
  logger.debug(`Created check, ID ${id}`);

  try {
    const report = openReport(path);
    logger.debug(`Opened report ${JSON.stringify(report)}`);

    const { conclusion, output } = parseReport({ name, report, cwd });
    logger.debug(`Parsed report ${JSON.stringify({ conclusion, output })}`);

    await finishCheck({ name, sha, repo, token, conclusion, output, id });
    logger.debug('Finished check');
  } catch (error) {
    logger.debug(`Error ${error.message}`);

    await finishCheck({ conclusion: 'failure', name, sha, repo, token, id });
    logger.debug('Finished check with error');

    logger.setFailed(error);
  }
}

module.exports = run;
