const mongoose = require('mongoose');

//const uri = 'mongodb://user:password@ds113925.mlab.com:13925/vms-spike';
const uri = 'mongodb://store:27017';

mongoose.Promise = global.Promise;
mongoose.connect(uri);

const db = mongoose.connection;

db.once('open', () => {
  console.log('database connection is open!');
  require('./main')();
});
