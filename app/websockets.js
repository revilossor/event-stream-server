const http = require('http'),
  WebSocket = require('ws'),
  db = require('./mongoose');

module.exports = (server, path) => {

  const wss = new WebSocket.Server({
    server: server,
    path: path
  });

  wss.on('connection', (ws, req) => {
    console.log('client connected!');
    ws.on('message', (message) => {
      console.log('got buffer message : ' + message);
      console.log('\tsave it to db...');
      db.event.create({ data: message }).then(() => {
        console.log('\tthen sent to each connected client');
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      }).catch(console.dir);
    });
  });

};
