var mongoose = require('mongoose');

var characterSchema = new mongoose.Schema({
  characterId: { type: String, unique: true, index: true },
  name: String,
  site: String,
  status: { type: Boolean, default: false }
});

module.exports = mongoose.model('scheme', characterSchema);
