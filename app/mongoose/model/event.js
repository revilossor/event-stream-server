const mongoose = require('mongoose');

module.exports = mongoose.model('Event', new mongoose.Schema({
  type: mongoose.Schema.Types.String,
  data: mongoose.Schema.Types.Mixed,
  timestamp: mongoose.Schema.Types.Date,
  version: mongoose.Schema.Types.Number
}));
