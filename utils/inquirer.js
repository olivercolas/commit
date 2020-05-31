const inquirer = require('inquirer');
const { logErrorAndExitProcess } = require('./helpers');

module.exports = {
  selectStagedFiles: async (files) => {
    try {
      const answers = await inquirer.prompt({
        type: 'checkbox',
        name: 'filesToCommit',
        message: 'What files do you wish to commit?',
        choices: files.map((file) => file.name),
      });

      return answers;
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

        if(customCommitType === '') {
            throw new Error('Custom commit type is empty');
        }

        return customCommitType;
      }

      return commitType;
    } catch (error) {
      logErrorAndExitProcess(error);
    }
  },
  getCommitScope: async () => {
    try {
      const { commitScope } = await inquirer.prompt({
        type: 'confirm',
        name: 'commitScope',
        message: 'Would you like to add a commit scope?',
      });

      return commitScope

      if (commitScope) {
        // const { customCommitType } = await inquirer.prompt({
        //   type: 'input',
        //   name: 'customCommitType',
        //   message: 'Enter custom commit type',
        // });

        // if(customCommitType === '') {
        //     throw new Error('Custom commit type is empty');
        // }

        // return customCommitType;
      }

    //   return commitType;
    } catch (error) {
      logErrorAndExitProcess(error);
    }
  },
};
