#!/usr/bin/env node

import program from 'commander';
import genearateDiff from '..';

program
  .version('1.6.3', '-v, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genearateDiff(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
