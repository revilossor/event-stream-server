const mongoose = require('mongoose');

module.exports = mongoose.model('Event', new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed
}));
