const http = require('http'),
  WebSocket = require('ws'),
  db = require('../mongoose');

module.exports = (server, path) => {

  const wss = new WebSocket.Server({
    server: server,
    path: path
  });

  wss.on('connection', (ws, req) => {
    ws.on('message', (message) => {
      console.log('message received - ' + message);
      db.event.count(message.aggregateId).then((count) => {
        db.event.create(JSON.parse(message)).then((doc) => {    // TODO what to do with version????
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(message);
            }
          });
        }).catch(console.dir);
      });
    });
  });

};
