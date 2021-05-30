var mongoose = require('mongoose');

var musicSchema = new mongoose.Schema({
  name: String,
  duration: String,
  notes: String
});

var Music = new mongoose.model("Music", musicSchema);

module.exports = Music;