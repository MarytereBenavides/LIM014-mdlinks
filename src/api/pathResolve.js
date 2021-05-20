const path = require('path');
const fs = require('fs');

// const pathRoute = 'pruebas';

// valida la ruta
const isValidPath = (route) => fs.existsSync(route);
// Resuelve la ruta en absoluta
const convertPathAbsolute = (route) => (path.isAbsolute(route) ? route : path.resolve(route));
// es archivo
const pathIsFile = (route) => fs.statSync(route).isFile();
// lee el directorio y devuelve un array con los archivos md
const readTheDirectory = function readDirectory(route) {
  let paths = [];
  if (fs.statSync(route).isDirectory()) {
    const files = fs.readdirSync(route);
    files.forEach((file) => {
      const newPaths = readDirectory(`${route}/${file}`);
      paths = paths.concat(newPaths);
    });
  }
  if (path.extname(route) === '.md') {
    paths.push(`${route}`);
  }
  return paths;
};
// lee el archivo
const readFile = (route) => fs.readFileSync(route, 'utf-8');

// eslint-disable-next-line no-console
// console.log(readTheDirectory(pathRoute));

module.exports = {
  isValidPath,
  convertPathAbsolute,
  pathIsFile,
  readTheDirectory,
  readFile,
};
