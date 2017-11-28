var mongoose = require('mongoose');

var websiteSchema = new mongoose.Schema({
  websiteId: { type: String, unique: true, index: true },
  name: String,
  url: String,
  valid: { type: Boolean, default: false }
});

module.exports = mongoose.model('Website', websiteSchema);