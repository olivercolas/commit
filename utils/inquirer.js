const inquirer = require('inquirer');
const { logErrorAndExitProcess } = require('./helpers');

module.exports = {
  selectStagedFiles: async (files) => {
    try {
      const { filesToCommit } = await inquirer.prompt({
        type: 'checkbox',
        name: 'filesToCommit',
        message: 'What files do you wish to commit?',
        choices: files.map((file) => file.name),
      });

      return filesToCommit;
    } catch (error) {
      logErrorAndExitProcess(error);
    }
  },
  confirmCommitType: async () => {
    try {
      const { confirmCommitTypeVal } = await inquirer.prompt({
        type: 'confirm',
        name: 'confirmCommitTypeVal',
        message: 'Would you like to add a commit type?',
      });

      if (!confirmCommitTypeVal) return false;

      return confirmCommitTypeVal;
    } catch (error) {
      logErrorAndExitProcess(error);
    }
  },
  getCommitType: async () => {
    try {
      const { commitType } = await inquirer.prompt({
        type: 'list',
        name: 'commitType',
        message: 'What is your commit type?',
        choices: [
          'fix',
          'feat',
          'style',
          'refactor',
          'perf',
          'test',
          'build',
          'chore',
          'ci',
          'docs',
          'custom',
        ],
      });

      if (commitType === 'custom') {
        const { customCommitType } = await inquirer.prompt({
          type: 'input',
          name: 'customCommitType',
          message: 'Enter custom commit type',
        });

        if (customCommitType === '') {
          throw new Error('Custom commit type is empty');
        }

        return customCommitType;
      }

      return commitType;
    } catch (error) {
      logErrorAndExitProcess(error);
    }
  },
  confirmCommitScope: async () => {
    try {
      const { confirmCommitScopeVal } = await inquirer.prompt({
        type: 'confirm',
        name: 'confirmCommitScopeVal',
        message: 'Would you like to add a commit scope?',
      });

      if (!confirmCommitScopeVal) return false;

      return confirmCommitScopeVal;
    } catch (error) {
      logErrorAndExitProcess(error);
    }
  },
  getCommitScope: async () => {
    try {
      const { commitScope } = await inquirer.prompt({
        type: 'input',
        name: 'commitScope',
        message: 'Enter commit scope',
      });

      if (commitScope === '') {
        throw new Error('Commit scope is empty');
      }

      return commitScope;
    } catch (error) {
      logErrorAndExitProcess(error);
    }
  },
  getCommitMessage: async () => {
    try {
      const { commitMessage } = await inquirer.prompt({
        type: 'input',
        name: 'commitMessage',
        message: 'Enter your commit message',
      });
      return commitMessage;
    } catch (error) {
      logErrorAndExitProcess(error);
    }
  },
  getPushOption: async () => {
    try {
      const { confirmPush } = await inquirer.prompt({
        type: 'confirm',
        name: 'confirmPush',
        message: 'Push to origin?',
      });
      return confirmPush;
    } catch (error) {
      logErrorAndExitProcess(error);
    }
  },
};
