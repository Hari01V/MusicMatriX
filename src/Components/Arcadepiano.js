import React, { Component, useState, useEffect } from 'react';
import Key from './Key.js';
import { keyboard, getLeft } from '../BoardHelper.js';
import MIDISounds from 'midi-sounds-react';
import pianoBg from '../images/Bullseye-Gradient.svg';
import '../styles/Piano.css';
import '../styles/ArcadePiano.css';
import $ from 'jquery';
import ArcadeMenu from './ArcadeMenu.js';
import ArcadeInfo from './ArcadeInfo.js';
import ArcadeUpload from './ArcadeUpload.js';
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded';

import api from '../api';

let intial = {};
keyboard.forEach(key => (
  intial[key.id] = {
    pressed: false
  }
));

var delta = 2;
let canvas, ctx, raf;
let numberOfWhiteKeys = 36;
let canvasWidth = numberOfWhiteKeys * 42;
let canvasHeight = window.innerHeight - 130;
let leftSpace = (window.innerWidth - canvasWidth) / 2;

const getLeftWidth = (id) => {
  var isWhite = (keyboard.find(key => key.id === id))["white"];
  var width = isWhite ? 42 : 36;
  return [getLeft(id), width];
}

/**
 * SONG
 */
// keyId = midi - 35
let notes = null;
let totalDuration = null;
let notesCount = 0;
let completedNotes = 0;
let syncTime = 3000; //in milliseconds


class Piano extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: intial,
      started: false,
      currSong: null
    }
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.addOnHold = this.addOnHold.bind(this);
    this.removeOnHold = this.removeOnHold.bind(this);
    this.startClicked = this.startClicked.bind(this);
    this.changeSong = this.changeSong.bind(this);
  }

  rect = {
    height: 10,
    color: '#2eccc5',
    draw: (keyId, y, color) => {
      var [left, width] = getLeftWidth(keyId);
      ctx.fillStyle = this.rect.color;
      ctx.fillRect(left, y, width, this.rect.height);
    },
    moveDown: (keyId, y, color) => {
      this.rect.draw(keyId, y + delta, color);
      raf = requestAnimationFrame(() => { this.rect.moveDown(keyId, y + delta, color) });
    },
    clearUp: (keyId, y) => {
      var [left, width] = getLeftWidth(keyId);
      ctx.clearRect(left, y + delta, width, this.rect.height);
      raf = requestAnimationFrame(() => { this.rect.clearUp(keyId, y + delta) });
    }
  }

  moveCanvas = (keyId) => {
    if (canvas && canvas.getContext) {
      var y = 0;
      var color = '#2eccc5';
      raf = window.requestAnimationFrame(() => { this.rect.moveDown(keyId, y, color) });
    }
  }
  clearCanvas = (keyId) => {
    if (canvas && canvas.getContext) {
      var y = 0;
      raf = window.requestAnimationFrame(() => { this.rect.clearUp(keyId, y) });
    }
  }

  play(keyId, midiNumber) {
    this.setState({
      keys: { ...this.state.keys, [keyId]: { pressed: true } }
    });
    this.midiSounds.setMasterVolume(0.2);
    this.midiSounds.playChordNow(3, [midiNumber], 2);
    // for (let i = 0; i < this.midiSounds.player.loader.instrumentKeys().length; i++) {
    //   console.log(this.midiSounds.player.loader.instrumentInfo(i).title + "-----" + i);
    // }

    // if (canvas && canvas.getContext) {
    //   var y = 0;
    //   var color = '#2eccc5';
    //   raf = window.requestAnimationFrame(() => { this.rect.moveDown(keyId, y, color) });
    // }

  }

  stop(keyId) {
    setTimeout(() => (
      this.setState({
        keys: { ...this.state.keys, [keyId]: { pressed: false } }
      })
    ), 50);

    // if (canvas && canvas.getContext) {
    //   var y = 0;
    //   raf = window.requestAnimationFrame(() => { this.rect.clearUp(keyId, y) });
    // }
  }

  onKeyDown(event) {
    // Don't conflict with existing combinations like ctrl + t
    if (event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }
    const key = keyboard.find(key => key.key === event.key.toLowerCase());
    if (key) {
      this.play(key.id, key.midiNumber);
    }
  }

  onKeyUp(event) {
    // Don't conflict with existing combinations like ctrl + t
    if (event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }
    const key = keyboard.find(key => key.key === event.key.toLowerCase());
    if (key) {
      this.stop(key.id);
    }
  }

  addOnHold() {
    $('.Piano-keyboard').addClass('onHold');
  }

  removeOnHold() {
    $('.Piano-keyboard').removeClass('onHold');
  }

  changeSong = (id) => {
    completedNotes = 0;
    this.setState({
      started: false
    })
    notes = null;
    totalDuration = null;
    notesCount = 0;

    api.getMusic(id).then(result => {
      this.setState({
        currSong: result.data[0]
      })
      notesCount = this.state.currSong.notesCount;
      totalDuration = this.state.currSong.duration;
      notes = this.state.currSong.notes;
    })
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    document.querySelector('.Piano-keyboard').addEventListener("mousedown", this.addOnHold);
    document.querySelector('body').addEventListener('mouseup', this.removeOnHold);
    document.querySelector('body').addEventListener('mouseleave', this.removeOnHold);

    canvas = document.getElementById('canvas');
    if (canvas) {
      ctx = document.getElementById('canvas').getContext('2d');
      syncTime = ((canvas.clientHeight / delta) / 60) * 1000;
    }

    const aloneId = "60bc6c3ccf11643b3072bfe9";
    this.changeSong(aloneId);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);

    document.querySelector('.Piano-keyboard').removeEventListener("mousedown", this.addOnHold);
    document.querySelector('body').removeEventListener('mouseup', this.removeOnHold);
    document.querySelector('body').removeEventListener('mouseleave', this.removeOnHold);
  }


  startArcade = () => {
    if (notes) {
      const keyId = notes[completedNotes].midi - 35;
      const duration = notes[completedNotes].duration * 1000;
      if (completedNotes !== 0 && completedNotes !== notesCount) {
        this.moveCanvas(keyId);
        setTimeout(() => {
          if (completedNotes !== notesCount) {
            this.play(keyId, notes[completedNotes].midi);
          }
        }, syncTime);
      }
      completedNotes++;
      setTimeout(() => {
        if (completedNotes <= notesCount) {
          this.clearCanvas(keyId);
          setTimeout(() => {
            this.stop(keyId);
          }, syncTime);
        }
        if (completedNotes < notesCount && completedNotes !== 0) {
          let waitTime = notes[completedNotes].time - (notes[completedNotes - 1].time + notes[completedNotes - 1].duration);
          setTimeout(() => {
            this.startArcade();
          }, waitTime * 1000);
        }
      }, duration);
    }
  }

  startClicked = () => {
    this.startArcade();
    this.setState({
      started: true
    })
    setTimeout(() => {
      completedNotes = 0;
      this.setState({
        started: false
      })
      console.log("STARTED SET TO FALSE");
    }, (totalDuration + 2) * 1000);
  }

  render() {
    const { keys, currSong } = this.state;

    return (
      <div className="Piano" style={{ backgroundImage: `url(${pianoBg})` }}>
        <div className="Piano-flow">
          <canvas id="canvas" width={`${canvasWidth}px`} height={`${canvasHeight}px`}></canvas>
          {currSong &&
            <ArcadeInfo name={currSong.name} notes={currSong.notes} completedNotes={completedNotes} />
          }
        </div>
        <div className="Piano-keyboard" style={{ marginLeft: `${leftSpace}px` }}>
          {keyboard.map((key) => (
            <Key
              id={key.id}
              key={key.id}
              char={key.key}
              midiNumber={key.midiNumber}
              white={key.white}
              pressed={keys[key.id].pressed}
              play={this.play}
              stop={this.stop} />
          ))}
        </div>
        <div className="instructions"
          style={{ display: this.state.started ? "none" : "block" }}>
          <button onClick={this.startClicked}>
            <PlayCircleFilledRoundedIcon />
          </button>
        </div>
        <ArcadeUpload />

        <MIDISounds
          ref={(ref) => (this.midiSounds = ref)}
          appElementName="root"
          instruments={[3]} />
        {currSong &&
          <ArcadeMenu changeSong={this.changeSong} currSongId={currSong._id} />}
      </div>
    );
  }
}

export default Piano;