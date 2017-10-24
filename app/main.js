const http = require('http'),
  WebSocket = require('ws'),
  app = require('express')();

const server = http.createServer(app);

require('./websockets')(server, '/events');
require('./graphql')(app, '/query');

module.exports = () => {
  server.listen(3000, () => {
    console.log(`Listening on ${server.address().port}`);
  });
};
