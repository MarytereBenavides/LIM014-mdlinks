const pathResolve = require('./pathResolve.js');
const linksSolve = require('./linksSolve.js');

const mdLinks = (path, option = {}) => new Promise((resolve, reject) => {
  if (pathResolve.isValidPath(path)) {
    const absolutePath = pathResolve.convertPathAbsolute(path);
    let objPath = [];
    if (!pathResolve.pathIsFile(absolutePath)) {
      const files = pathResolve.readTheDirectory(absolutePath);
      files.forEach((file) => {
        const links = linksSolve.findLinks(file);
        const data = linksSolve.dataLinks(links);
        objPath = [].concat(objPath, data);
      });
      if (option.validate) {
        resolve(linksSolve.validateLinks(objPath));
      }
      resolve(objPath);
    }
    const links = linksSolve.findLinks(absolutePath);
    const data = linksSolve.dataLinks(links);
    objPath = [].concat(objPath, data);
    if (option.validate) {
      resolve(linksSolve.validateLinks(objPath));
    }
    resolve(objPath);
  } else {
    reject();
  }
});

module.exports = { mdLinks };
