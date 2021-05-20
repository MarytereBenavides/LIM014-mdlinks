const fetch = require('node-fetch');
const pathResolve = require('./pathResolve.js');

// const mdFile = './pruebasFiles/pruebas/testPrueba.md';

const findLinks = (route) => {
  const findLinkRegExp = /\[[`?a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s?.?\-`?]*\]\(((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)\)/gi;
  // eslint-disable-next-line max-len
  // ((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)
  // (incluye el formato mailto:, una URL utilizando parámetros por URL, el uso de HTTPS, etc)
  const contentFile = pathResolve.readFile(route);
  const links = [contentFile.match(findLinkRegExp), route];
  return links;
};
const dataLinks = (arrayLinks) => {
  const pathProperties = [];
  arrayLinks[0].forEach((linkMd) => {
    const positionLink = linkMd.indexOf('(');
    const firstPositionTxt = linkMd.indexOf('[');
    const lastPositionTxt = linkMd.indexOf(']');
    const href = linkMd.slice(positionLink + 1, -1);
    const text = linkMd.slice(firstPositionTxt + 1, lastPositionTxt);
    const obj = {
      text,
      href,
      file: arrayLinks[1],
    };
    pathProperties.push(obj);
  });
  return pathProperties;
};
const validateLinks = (pathProperties) => Promise.all(
  pathProperties.map((obj, index) => fetch(obj.href)
    .then((resp) => [index, resp.status])
    .catch(() => [index, 500])),
)
  .then((responses) => {
    const linkObj = [];
    responses.forEach((element) => {
      linkObj.push(
        {
          text: pathProperties[element[0]].text,
          href: pathProperties[element[0]].href,
          file: pathProperties[element[0]].file,
          status: element[1],
        },
      );
    });
    return linkObj;
  }).catch(() => []);

module.exports = {
  findLinks,
  dataLinks,
  validateLinks,
};

// console.log('****************************linksSolve1');
// console.log(findLinks(mdFile, { validate: true }));
// console.log('****************************linksSolve2');
// console.log(dataLinks(findLinks(mdFile, { validate: true })));
// console.log('****************************linksSolve3');
// console.log(validateLinks(findLinks(mdFile, { validate: true })));
// console.log('****************************linksSolve4');
