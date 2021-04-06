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

// const pathIsDirectory = (route) => (fs.statSync(route).isDirectory());

// const readTheDirectory = (route) => fs.readdirSync(route);

// const isAMarkdownFile = (route) => (path.extname(route) === '.md');

// console.log(readFile('pruebas/validate.md'));

// const a = fs.readFileSync('.md', { encoding: 'utf8', flag: 'r' });
// console.log(a);
// const data = fs.readFileSync('pruebas/validate.md',
//   { encoding: 'utf8', flag: 'r' });

// // Display the file data
// console.log(data);

// Display the file data
// console.log(extractHtmlLinks);

// console.log('Current directory filenames:');
// readTheDirectory.forEach((file) => {
//   console.log(file);
// });

// console.log('Filenames with the .md extension:');
// readTheDirectory.forEach((fileMd) => {
//   if (path.extname(fileMd) === '.md') console.log(fileMd);
// });

// let allFilesMd = array (giveMeFileMd);

// const data = fs.readFileSync('pruebas/validate.md',
//             {encoding:'utf8', flag:'r'});

// // Display the file data
// console.log(data);

// C:\Users\maryt\Documents\ProyectosVisualCode\LIM014-mdlinks\LIM014-mdlinks\pruebas
// const path1 = path.resolve(relativePath);
// console.log(path1);

// const path2 = path.isAbsolute(relativePath);
// console.log(path2);
// const path3 = path.isAbsolute(absolutePath);
// console.log(path3);

// fs.stat(path1, (err, stats) => {
//   if (err) throw err;
//   // console.log(`stats: ${JSON.stringify(stats)}`);
//   console.log(stats.isDirectory());
// });

// fs.stat('./filename.txt', (err, stats) => {
//   if (err) throw err;
//   // console.log(`stats: ${JSON.stringify(stats)}`);

//   if (stats.isDirectory()) {
//       console.log("fs.Stats describes a "
//           + "file system directory");
//   } else {
//       console.log("fs.Stats does not "
//       + "describe a file system directory");
//   }
// });

// const syncPath = fs.lstatSync(path1).isDirectory();
// console.log(syncPath);

module.exports = {
  isValidPath,
  convertPathAbsolute,
  pathIsFile,
  readTheDirectory,
  readFile,
};
