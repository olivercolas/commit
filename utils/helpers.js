const { log } = console;

module.exports = {
  logErrorAndExitProcess: (error) => {
    log(error);
    process.exit(1);
  },
};
