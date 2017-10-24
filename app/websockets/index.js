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
      db.event.count().then((count) => {
        db.event.create({
          type: 'testtype',
          data: message,
          timestamp: Date.now(),
          version: count
        }).then(() => {
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
