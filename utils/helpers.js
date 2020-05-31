const shell = require('shelljs');
const exec = require('child_process').exec;
const { log } = console;

const logErrorAndExitProcess = (error) => {
  log(error);
  process.exit(1);
};
module.exports = {
  logErrorAndExitProcess,
  execCommand: (command, errorMessage) => {
    const commitExec = shell.exec(command);
    if (errorMessage && commitExec.code !== 0) {
      logErrorAndExitProcess(errorMessage);
    }

    return commitExec;
  },
  execSilentCommand: (command, errorMessage) =>
    new Promise((resolve, reject) => {
      exec(command, (err, stdout) => {
        if (err) logErrorAndExitProcess(errorMessage);
        resolve(stdout);
      });
    }),
};
