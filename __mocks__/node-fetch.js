const requireFetchMock = require('fetch-mock');

const nodeFetch = jest.requireActual('node-fetch');

const fetchMock = requireFetchMock.sandbox();
Object.assign(fetchMock.config, {
  fetch: nodeFetch,
});

module.exports = fetchMock;
