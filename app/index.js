const mongoose = require('mongoose');

const uri = 'mongodb://store:27017/eventstream';

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('connecting', () => {
  console.log(`connecting to ${uri}`);
});
db.on('error', (err) => {
  console.error('error connecting: ' + error);
  mongoose.disconnect();
});
db.on('connected', () => {
  console.log('connected!');
});
db.once('open', () => {
  console.log('connection opened!');
  require('./main')();
});
db.on('reconnected', () => {
  console.log('reconnected!');
});
db.on('disconnected', () => {
  console.log('disconnected!');
  mongoose.connect(uri, { server: { auto_reconnect: true } });
});

mongoose.connect(uri, { server: { auto_reconnect: true } });
