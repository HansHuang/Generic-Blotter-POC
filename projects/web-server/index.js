const uWS = require('uwebsockets.js'),
  gqlHandle = require('./gql'),
  { serveStatic } = require('./lib/serveStatic'),
  path = require('path')


const port = 6610,
  uiPath = path.join(__dirname, '../web-ui')

uWS.App()
  .ws('/graphql', gqlHandle())
  .get('/ui/*', serveStatic({ prefix: 'ui/', dirPath: uiPath }))
  .get('/*', (res, req) => {
    res.writeStatus('200 OK').end(`OK ${req.getUrl()}`);
  })
  .listen(port, (listenSocket) => {
    listenSocket
      ? console.log(`Listening to port ${port}`)
      : console.log('Failed to start server')
  });