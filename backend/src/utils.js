const chalk = require('chalk');

const INFO_LEVEL = 0,
      WARNING_LEVEL = 1,
      ERROR_LEVEL = 2;

const colorByLevel = level => {
  if (level === INFO_LEVEL) {
    return chalk.blueBright;
  } else if (level === WARNING_LEVEL) {
    return chalk.yellow;
  } else if (level === ERROR_LEVEL) {
    return chalk.red;
  } else {
    return a => a;
  }
}

const print = (msg, level) => {
  const stamp = new Date(Date.now());
  const color = colorByLevel(level);
  const coloredMsg = color(msg);
  console.log(`${stamp} ${coloredMsg}`);
}

const info = msg => print(`INFO ${JSON.stringify(msg)}`, INFO_LEVEL);
const warning = msg => print(`WARN ${JSON.stringify(msg)}`, WARNING_LEVEL);
const error = msg => print(`ERROR ${JSON.stringify(msg)}`, ERROR_LEVEL);

module.exports = {
  info,
  warning,
  error,
};
