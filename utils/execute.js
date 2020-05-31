const { execCommand } = require('./helpers');

module.exports = {
  commit: (files, type, scope, message) => {
    let gitCommand = `git add ${files.join(' ')} && git commit -m "`;
    if (type) gitCommand += type;
    if (scope) gitCommand += `(${scope}): `;
    if (message) gitCommand += `${message}"`;

    execCommand(gitCommand, `Couldn't complete commit command`)
  },
  push: () => {
    const branchName = this.getCurrentBranch;
    const gitCommand = `git push origin ${branchName}`;

    execCommand(gitCommand, `Couldn't complete push command`)
  },
  getCurrentBranch: () => {
    const gitCommand = 'git rev-parse --abbrev-ref HEAD';

    execCommand(gitCommand, `Couldn't get branch name`)
  }
};
