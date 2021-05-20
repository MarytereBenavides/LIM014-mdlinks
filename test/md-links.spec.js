const fetchMock = require('../__mocks__/node-fetch.js');
const pathResolve = require('../src/api/pathResolve');
const options = require('../src/api/linksSolve');

// eslint-disable-next-line max-len
// const linkPrueba = '/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebas';

describe('La ruta es válida?', () => {
  it('la ruta no es válida', () => {
    expect(pathResolve.isValidPath('prueba.js')).toBe(false);
  });
});

describe('La ruta es absoluta?', () => {
  it('Debería resolver la ruta relativa en absoluta', () => {
    expect(pathResolve.convertPathAbsolute('pruebasFiles/pruebas')).toBe('C:\\Users\\maryt\\Documents\\ProyectosVisualCode\\LIM014-mdlinks\\LIM014-mdlinks\\pruebasFiles\\pruebas');
  });
  it('Debería retornar la misma ruta', () => {
    expect(pathResolve.convertPathAbsolute('/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebas')).toBe('/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebas');
  });
});

describe('La ruta es un archivo', () => {
  it('La ruta debería ser un archivo', () => {
    expect(pathResolve.pathIsFile('/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebasFiles/pruebas/validate.md')).toBe(true);
  });
});

describe('Lee el directorio', () => {
  it('el directorio tiene 4 archivos md', () => {
    expect(pathResolve.readTheDirectory('pruebasFiles')).toHaveLength(5);
  });
  it('Debería retornar 4 archivos md', () => {
    expect(pathResolve.readTheDirectory('pruebasFiles')).toStrictEqual(['pruebasFiles/hola.md', 'pruebasFiles/pruebas/error.md', 'pruebasFiles/pruebas/testPrueba.md', 'pruebasFiles/pruebas/validate.md', 'pruebasFiles/pruebas/varios.md']);
  });
});

const contentExpected = '';
describe('Lee el archivo', () => {
  it('Debería leer el archivo', () => {
    expect(pathResolve.readFile('./pruebasFiles/hola.md')).toBe(contentExpected);
  });
});

// Find Link
const arrayLinks = [
  [
    '[youtube](https://www.youtube.com/)',
    '[guía paquete de comandos](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)',
    '[yargs](http://yargs.js.org/)',
    '[crear CLI con Node.js](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js)',
  ],
  '/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebasFiles/pruebas/varios.md',
];
describe('options.findLinks', () => {
  it('should return an array with links and its files', () => {
    expect(options.findLinks('/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebasFiles/pruebas/varios.md')).toEqual(arrayLinks);
  });
});

// Data Link
const pathProperties = [
  {
    text: 'youtube',
    href: 'https://www.youtube.com/',
    file: '/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebasFiles/pruebas/varios.md',
  },
  {
    text: 'guía paquete de comandos',
    href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    file: '/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebasFiles/pruebas/varios.md',
  },
  {
    text: 'yargs',
    href: 'http://yargs.js.org/',
    file: '/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebasFiles/pruebas/varios.md',
  },
  {
    text: 'crear CLI con Node.js',
    href: 'https://www.twilio.com/blog/how-to-build-a-cli-with-node-js',
    file: '/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebasFiles/pruebas/varios.md',
  },
];
describe('options.dataLinks', () => {
  it('should return an objets array', () => {
    expect(options.dataLinks(arrayLinks)).toStrictEqual(pathProperties);
  });
});

// Validate links
describe('options.validateLinks', () => {
  const pathPropertiesA = [{
    text: 'Comprendiendo Promesas en Js',
    href: 'https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1',
    file: '/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebasFiles/pruebas/error.md',
  },
  {
    text: 'Pill de recursión - video',
    href: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
    file: '/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebasFiles/pruebas/error.md',
  },
  {
    text: 'Pill de recursión - repositorio',
    href: 'https://github.com/merunga/pildora-recursion',
    file: '/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebasFiles/pruebas/error.md',
  },
  {
    text: 'error',
    href: 'https://httpstat.us/404',
    file: '/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebasFiles/pruebas/error.md',
  },
  {
    text: 'error500',
    href: 'https://httpstat.us/500',
    file: '/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebasFiles/pruebas/error.md',
  }];
  const pathPropertiesB = [{
    text: 'Comprendiendo Promesas en Js',
    href: 'https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1',
    file: '/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebasFiles/pruebas/error.md',
    status: 200,
  },
  {
    text: 'Pill de recursión - video',
    href: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
    file: '/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebasFiles/pruebas/error.md',
    status: 200,
  },
  {
    text: 'Pill de recursión - repositorio',
    href: 'https://github.com/merunga/pildora-recursion',
    file: '/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebasFiles/pruebas/error.md',
    status: 200,
  },
  {
    text: 'error',
    href: 'https://httpstat.us/404',
    file: '/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebasFiles/pruebas/error.md',
    status: 404,
  },
  {
    text: 'error500',
    href: 'https://httpstat.us/500',
    file: '/Users/maryt/Documents/ProyectosVisualCode/LIM014-mdlinks/LIM014-mdlinks/pruebasFiles/pruebas/error.md',
    status: 500,
  }];

  // Mock the fetch() global to return a response
  fetchMock
    .mock('https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1', 200)
    .mock('https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s', 200)
    .mock('https://github.com/merunga/pildora-recursion', 200)
    .mock('https://httpstat.us/404', 404)
    .mock('https://httpstat.us/500', 500);

  it(('should return links status'), (done) => {
    options.validateLinks(pathPropertiesA)
      .then((data) => {
        expect(data).toEqual(pathPropertiesB);
        done();
      });
  });
});
