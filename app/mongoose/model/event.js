const mongoose = require('mongoose');

// TODO timestamp?
module.exports = mongoose.model('Event', new mongoose.Schema({
  aggregateId: mongoose.Schema.Types.String,
  data: mongoose.Schema.Types.Mixed,
  version: mongoose.Schema.Types.Number
}));
