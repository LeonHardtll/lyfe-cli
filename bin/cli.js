#! /usr/bin/env node

const chalk = require('chalk')
const program = require('commander')
const figlet = require('figlet')

program
  .command('create <project-name>')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    require('../lib/create')(name, options)
  })

program
  .on('--help', () => {
    console.log('\r\n' + figlet.textSync('LYFE', {
      font: 'Swamp Land',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    }));
    console.log(`\r\nRun ${chalk.cyan(`roc <command> --help`)} show details\r\n`)
  })


program
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')

program.parse(process.argv);