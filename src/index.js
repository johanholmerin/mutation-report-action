const logger = require('./logger.js');
const run = require('./run.js');

const {
  GITHUB_WORKSPACE: cwd,
  GITHUB_REPOSITORY: repo,
  GITHUB_SHA: sha,
  'INPUT_REPORT-JSON': path,
  'INPUT_REPO-TOKEN': token,
} = process.env;

run({ cwd, repo, sha, path, token }).catch(logger.setFailed);
