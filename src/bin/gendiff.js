#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('1.3.0', '-v, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');

program.arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig));
  });

program.parse(process.argv);
