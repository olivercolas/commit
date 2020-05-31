#!/usr/bin/env node
const { log } = console;
const { stagedFiles } = require('../utils/stagedFiles');
const { selectStagedFiles, getCommitType, getCommitScope } = require('../utils/inquirer');

const CURRENT_DIR_PATH = process.cwd();

const run = async () => {
  // ! must add case for when git respository doesn't exist
  const filesAvailableForCommit = await stagedFiles();

  const { filesToCommit } = await selectStagedFiles(filesAvailableForCommit);
  log(filesToCommit);
  const type = await getCommitType();
  log(type)
  const scope = await getCommitScope();
  log(scope)
};

run();
