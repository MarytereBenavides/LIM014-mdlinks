#!/usr/bin/env node
const yargs = require('yargs');
const chalk = require('chalk');
const { mdLinks } = require('../api/api.js');

const { argv } = yargs
  .option('validate', {
    alias: 'v',
    description: 'Validate links',
    type: 'boolean',
  })
  .option('stats', {
    alias: 's',
    description: 'Make links stadistic',
    type: 'boolean',
  })
  .help()
  .alias('help', 'h');

if (argv._) {
  const path = argv._[0];
  const mdLinksResponse = mdLinks(path, { validate: argv.validate });
  if (!mdLinksResponse) {
    console.log('Not found');
  }
  if (!argv.stats) {
    mdLinksResponse.then((file) => file.forEach((propeties) => {
      const responseStatus = (propeties.status >= 200 && propeties.status < 300)
        ? chalk.italic.green(`ok ${propeties.status}`)
        : chalk.italic.red(`fail ${propeties.status}`);
      console.log(chalk.hex('#FFFCA2')(propeties.file), chalk.cyan(propeties.href), propeties.status ? responseStatus : '', propeties.text);
    }))
      .catch((err) => { throw err; });
  }
  if (argv.stats) {
    mdLinksResponse.then((arrayLinksProperties) => {
      const uniqueLinks = {};
      const brokenLinks = [];
      arrayLinksProperties.forEach((eachLink) => {
        uniqueLinks[eachLink.href] = uniqueLinks[eachLink.href]
          ? uniqueLinks[eachLink.href] + 1 : 1;
        if (argv.validate && (eachLink.status < 200 || eachLink.status > 300)) {
          brokenLinks.push(eachLink.status);
        }
      });
      console.log('Total: ', arrayLinksProperties.length);
      console.log('Unique: ', Object.keys(uniqueLinks).length);
      if (argv.stats && argv.validate) {
        console.log('Broken: ', brokenLinks.length);
      }
    });
  }
}

// console.log(chalk.blue('Hello world!'));

// Pruebas
// $ md-links ./pruebasFiles/pruebas/testPrueba.md  -v
// $ md-links ./pruebasFiles/pruebas/testPrueba.md  -s -v
// $ md-links ./pruebasFiles/pruebas/testPrueba.md  -s -v

// md-links ./pruebasFiles/pruebas
// $ md-links ./pruebasFiles/pruebas  -v
// $ md-links ./pruebasFiles/pruebas  -s
// $ md-links ./pruebasFiles/pruebas  -s -v
