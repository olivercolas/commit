const { execCommand, execSilentCommand } = require('./helpers');

const getCurrentBranch = async () => {
  const gitCommand = 'git rev-parse --abbrev-ref HEAD';

  return await execSilentCommand(gitCommand, `Couldn't get branch name`);
};

const commit = (filesAvailable, files, type, scope, message) => {
  let filesStr = files.join(' ');
  let totalFiles = filesAvailable.join(' ').length;

  if(totalFiles === 1) filesStr === '.'

  let gitCommand = `git add ${filesStr} && git commit -m "`;

  if (type) gitCommand += type;
  
  if (scope) {
    gitCommand += `(${scope}): `;
  } else if(!scope && type) {
    gitCommand += `: `;
  }

  if (message) gitCommand += `${message}"`;

  execCommand(gitCommand, `Couldn't complete commit command`);
};

const pushToOrigin = async () => {
  const branchName = await getCurrentBranch();
  const gitCommand = `git push origin ${branchName}`;

  execCommand(gitCommand, `Couldn't complete push command`);
};

module.exports = {
  commit,
  getCurrentBranch,
  pushToOrigin,
};
