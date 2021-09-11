const request = require('./request.js');

const REPOS_URL = 'https://api.github.com/repos';

function getHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'User-Agent': 'mutation-report-action',
  };
}

async function createCheck({ name, sha, repo, token }) {
  const body = {
    name,
    head_sha: sha,
    status: 'in_progress',
    started_at: new Date(),
  };

  const res = await request(`${REPOS_URL}/${repo}/check-runs`, {
    method: 'POST',
    headers: getHeaders(token),
    body,
  });

  return res.data.id;
}

async function finishCheck({ id, name, sha, repo, token, conclusion, output }) {
  const body = {
    head_sha: sha,
    status: 'completed',
    completed_at: new Date(),
    conclusion,
    output,
    name,
  };

  await request(`${REPOS_URL}/${repo}/check-runs/${id}`, {
    method: 'PATCH',
    headers: getHeaders(token),
    body,
  });
}

module.exports = { finishCheck, createCheck };
