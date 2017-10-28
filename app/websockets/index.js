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
      const parsedMessage = JSON.parse(message);
      db.event.count(parsedMessage.aggregateId).then((count) => {
        console.log('received message - current version is ' + count + ' message version is ' + parsedMessage.version);
        // TODO if version < count, client is out of date
        db.event.create(parsedMessage).then((doc) => {
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
