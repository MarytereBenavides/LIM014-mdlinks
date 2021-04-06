const pathResolve = require('../src/api/pathResolve');

describe('La ruta es válida?', () => {
  it('la ruta no es válida', () => {
    expect(pathResolve.isValidPath('prueba.js')).toBe(false);
    // eslint-disable-next-line no-console
    console.log('FIX ME!');
  });
});
