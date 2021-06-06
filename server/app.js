var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const Music = require('./models/music.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json());

const CONNECTION_URL = 'mongodb+srv://MusicDB:MusicDB@cluster0.2ixy8.mongodb.net/MusicDB?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Connected to MongoDB Atlas!");
}).catch(err => {
  console.log("Error: ", err.message);
});

app.get("/", (req, res) => {
  res.send("Welcome to the API Server");
});

app.post("/music", (req, res) => {
  res.send("Adding New Music");
  console.log("APP POST NEW MUSIC");
  const musicData = req.body;

  let notes = null;
  let notesCount = null;
  musicData["tracks"].forEach(track => {
    if (track["notes"].length && !notes) {
      notes = track["notes"];
      notesCount = track["notes"].length;
    }
  });
  let noteDB = [];
  notes.forEach(note => {
    const tmp = {
      name: note.name,
      midi: note.midi,
      time: note.time,
      duration: note.duration
    }
    noteDB.push(tmp);
  })

  Music.create({
    name: musicData["header"]["name"],
    duration: musicData["duration"],
    notesCount: notesCount,
    notes: noteDB
  }, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Added to DB, Check it once!");
    }
  })
});

app.get("/music/all", (req, res) => {
  console.log("RETRIEVING ALL MUSIC DATA");
  Music.find({}, (err, musics) => {
    if (err) {
      console.log(err);
    } else {
      res.send(musics);
    }
  })
});

app.get("/music/:id", (req, res) => {
  console.log("RETRIEVING SINGLE MUSIC DATA");
  Music.find({ _id: req.params.id }, (err, music) => {
    if (err) {
      console.log(err);
    } else {
      res.send(music);
    }
  })
})

app.listen(process.env.PORT || 8080, function () {
  console.log("MusicMatrix Server StArTeD ");
});