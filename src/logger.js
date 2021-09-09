const os = require('os');

const CMD_STRING = '::';

function stringify(message) {
  return typeof message === 'string' ? message : JSON.stringify(message);
}

function formatMessage(command, message) {
  return CMD_STRING + command + CMD_STRING + stringify(message);
}

function setFailed(message) {
  log('error', message instanceof Error ? message.toString() : message);
  process.exit(1);
}

function debug(message) {
  log('debug', message);
}

function log(name, message) {
  const formattedMessage = formatMessage(name, message);

  process.stdout.write(formattedMessage + os.EOL);
}

module.exports = { setFailed, log, debug };
