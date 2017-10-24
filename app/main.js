const http = require('http'),
  WebSocket = require('ws'),
  app = require('express')();

const server = http.createServer(app);
const sockets = require('./websockets')(server, '/events');

const db = require('./mongoose');
app.use('/allEvents', (req, res) => {
  db.event.read({}).then((docs) => {
    res.json(docs.map((doc) => {
      doc.data = JSON.parse(doc.data.toString());
      return doc;
    }));
  });
});

module.exports = () => {
  server.listen(3000, () => {
    console.log(`Listening on ${server.address().port}`);
  });
};
