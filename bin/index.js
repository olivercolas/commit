#!/usr/bin/env node
const arg = require('arg');
const { stagedFiles } = require('../utils/stagedFiles');
const {
  selectStagedFiles,
  confirmCommitType,
  getCommitType,
  confirmCommitScope,
  getCommitScope,
  getCommitMessage,
  getPushOption,
} = require('../utils/inquirer');
const { commit, pushToOrigin } = require('../utils/execute');

const args = arg({
  '-t': Boolean,
  '-s': Boolean,
  '-p': Boolean,
  '--add-type': '-t',
  '--add-scope': '-s',
  '--add-push': '-p',
  '--push': '-p',
  '--no-type': Boolean,
  '--no-scope': Boolean,
  '--no-push': Boolean,
});

const run = async () => {
  // ! must add case for when git respository doesn't exist
  let scope,
    type,
    message,
    confirmType = true,
    confirmScope = true,
    confirmPush = true;

  const filesAvailableForCommit = await stagedFiles();
  const filesToCommit = await selectStagedFiles(filesAvailableForCommit);

  if (!args['--no-type']) {
    if (!args['-t']) {
      confirmType = await confirmCommitType();
    }

    if (confirmType) {
      type = await getCommitType();

      if (!args['--no-scope']) {
        if (!args['-s']) {
          confirmScope = await confirmCommitScope();
        }

        if (type && confirmScope) {
          scope = await getCommitScope();
        }
      }
    }
  }

  message = await getCommitMessage();

  commit(filesToCommit, type, scope, message);

  if (!args['--no-push']) {
    if (!args['-p']) {
      confirmPush = await getPushOption();
    }
    if (confirmPush) {
      await pushToOrigin();
    }
  }
};

run();
