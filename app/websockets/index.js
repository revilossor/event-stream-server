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
      db.event.create({ data: message }).then(() => {
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      }).catch(console.dir);
    });
  });

};
