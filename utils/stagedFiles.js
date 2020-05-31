const exec = require('child_process').exec;
const { log } = console;

const GIT_STATUSES = {
  A: 'added',
  C: 'copied',
  D: 'deleted',
  M: 'modified',
  R: 'renamed',
  U: 'unmerged',
  '??': 'untracked',
};

const stagedFiles = async () => {
  let statuses = '';
  try {
    statuses = await gitStatus;
  } catch (error) {
    log(error);
    process.exit(1);
  }

  const filesReadyForCommit = separateStatusCodeFromStatuses(statuses.split('\n'))

  if (!filesReadyForCommit || filesReadyForCommit.length === 0) {
    log('There are no files staged for commit');
    process.exit(1);
  }
  return filesReadyForCommit;
};

const gitStatus = new Promise((resolve, reject) => {
  exec('git status -s', (err, stdout, stderr) => {
    if (err) {
      reject(err);
    }
    resolve(stdout);
  });
});

const separateStatusCodeFromStatuses = (lines) => {
  const arrOfStatusObjs = [];
  for (const line of lines) {
    const statusCode = line.substr(0, 2).trim();
    const fileName = line.substr(3, line.length);

    if (fileName && fileName !== '') {
      arrOfStatusObjs.push({ statusCode: GIT_STATUSES[statusCode], name: fileName });
    }
  }

  return arrOfStatusObjs;
};

module.exports = {
  stagedFiles: async () => await stagedFiles(),
};
