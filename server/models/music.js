var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
  name: String,
  midi: Number,
  time: Number,
  duration: Number
})

var musicSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  notesCount: Number,
  notes: [noteSchema]
});

var Music = new mongoose.model("Music", musicSchema);

module.exports = Music;