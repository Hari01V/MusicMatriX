import React, { Component, useState, useEffect } from 'react';
import Key from './Key.js';
import { keyboard, getLeft } from '../BoardHelper.js';
import MIDISounds from 'midi-sounds-react';
import pianoBg from '../images/Bullseye-Gradient.svg';
import '../styles/Piano.css';
import $ from 'jquery';


let intial = {};
keyboard.forEach(key => (
  intial[key.id] = {
    pressed: false
  }
));

let canvas, ctx, raf;
let numberOfWhiteKeys = 36;
let canvasWidth = numberOfWhiteKeys * 42;
let canvasHeight = window.innerHeight - 130;
//responsive
let leftSpace = (window.innerWidth - canvasWidth)/2;

const getLeftWidth = (id) => {
  var isWhite = (keyboard.find(key => key.id === id))["white"];
  var width = isWhite ? 42 : 36;
  return [getLeft(id), width];
}

class Piano extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: intial
    }
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.addOnHold = this.addOnHold.bind(this);
    this.removeOnHold = this.removeOnHold.bind(this);
  }

  rect = {
    height: 10,
    color: '#2eccc5',
    draw: (keyId, y, color) => {
      var [left, width] = getLeftWidth(keyId);
      ctx.fillStyle = this.rect.color;
      ctx.fillRect(left, y, width, this.rect.height);
    },
    moveUp: (keyId, y, color) => {
      var delta = 2;
      this.rect.draw(keyId, y - delta, color);
      raf = requestAnimationFrame(() => { this.rect.moveUp(keyId, y - delta, color) });
    },
    clearUp: (keyId, y) => {
      var delta = 2;
      var [left, width] = getLeftWidth(keyId);
      ctx.clearRect(left, y - delta, width, this.rect.height);
      raf = requestAnimationFrame(() => { this.rect.clearUp(keyId, y - delta) });
    }
  }

  play(keyId, midiNumber) {
    // console.log(keyId);
    this.setState({
      keys: { ...this.state.keys, [keyId]: { pressed: true } }
    });
    this.midiSounds.setMasterVolume(0.2);
    this.midiSounds.playChordNow(3, [midiNumber], 2);
    // for (let i = 0; i < this.midiSounds.player.loader.instrumentKeys().length; i++) {
    //   console.log(this.midiSounds.player.loader.instrumentInfo(i).title + "-----" + i);
    // }

    if (canvas && canvas.getContext) {
      var y = window.innerHeight - 130;
      var color = '#2eccc5';
      raf = window.requestAnimationFrame(() => { this.rect.moveUp(keyId, y, color) });
    }

  }

  stop(keyId) {
    setTimeout(() => (
      this.setState({
        keys: { ...this.state.keys, [keyId]: { pressed: false } }
      })
    ), 50);

    if (canvas && canvas.getContext) {
      var y = window.innerHeight - 130;
      raf = window.requestAnimationFrame(() => { this.rect.clearUp(keyId, y) });
    }
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

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    document.querySelector('.Piano-keyboard').addEventListener("mousedown", this.addOnHold);
    document.querySelector('body').addEventListener('mouseup', this.removeOnHold);
    document.querySelector('body').addEventListener('mouseleave', this.removeOnHold);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);

    document.querySelector('.Piano-keyboard').removeEventListener("mousedown", this.addOnHold);
    document.querySelector('body').removeEventListener('mouseup', this.removeOnHold);
    document.querySelector('body').removeEventListener('mouseleave', this.removeOnHold);
  }

  render() {
    const { keys } = this.state;
    canvas = document.getElementById('canvas');
    if (canvas) {
      ctx = document.getElementById('canvas').getContext('2d');
    }
    return (
      <div className="Piano" style={{ backgroundImage: `url(${pianoBg})` }}>
        <div className="Piano-flow">
          <canvas id="canvas" width={`${canvasWidth}px`} height={`${canvasHeight}px`}></canvas>
        </div>
        <div className="Piano-keyboard" style={{ marginLeft: `${leftSpace}px`}}>
          
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
        <MIDISounds
          ref={(ref) => (this.midiSounds = ref)}
          appElementName="root"
          instruments={[3]} />
      </div>
    );
  }
}

// function Piano(props, midiSounds) {
//   const [keys, setKeys] = useState(intial);

//   const play = (keyId, midiNumber) => {
//     console.log(keyId);
//     setKeys({ ...keys, [keyId]: { pressed: true } });
//     console.log(midiSounds);
//     midiSounds.setMasterVolume(0.2);
//     midiSounds.playChordNow(3, [midiNumber], 2);
//     // for (let i = 0; i < this.midiSounds.player.loader.instrumentKeys().length; i++) {
//     //   console.log(this.midiSounds.player.loader.instrumentInfo(i).title + "-----" + i);
//     // }
//   }

//   const stop = (keyId) => {
//     // setTimeout(() => (
//     //   setKeys({ ...keys, [keyId]: { pressed: false } })
//     // ), 50);
//     setKeys({ ...keys, [keyId]: { pressed: false } })
//   }

//   const onKeyDown = (event) => {
//     // Don't conflict with existing combinations like ctrl + t
//     if (event.ctrlKey || event.metaKey || event.shiftKey) {
//       return;
//     }
//     const key = keyboard.find(key => key.key === event.key.toLowerCase());
//     if (key) {
//       play(key.id, key.midiNumber);
//     }
//   }

//   const onKeyUp = (event) => {
//     // Don't conflict with existing combinations like ctrl + t
//     if (event.ctrlKey || event.metaKey || event.shiftKey) {
//       return;
//     }
//     const key = keyboard.find(key => key.key === event.key.toLowerCase());
//     if (key) {
//       stop(key.id);
//     }
//   }

//   useEffect(() => {
//     window.addEventListener('keydown', onKeyDown);
//     window.addEventListener('keyup', onKeyUp);

//     return function cleanup() {
//       window.removeEventListener('keydown', onKeyDown);
//       window.removeEventListener('keyup', onKeyUp);
//     };
//   });

//   return (
//     <div className="Piano" style={{ backgroundImage: `url(${pianoBg})` }}>
//       <div className="Piano-flow">

//       </div>
//       <div className="Piano-keyboard">
//         {keyboard.map((key) => (
//           <Key
//             id={key.id}
//             key={key.id}
//             char={key.key}
//             midiNumber={key.midiNumber}
//             white={key.white}
//             pressed={keys[key.id].pressed}
//             play={play}
//             stop={stop} />
//         ))}
//       </div>
//       <MIDISounds
//         ref={(ref) => (midiSounds = ref)}
//         appElementName="root"
//         instruments={[3]} />
//     </div>
//   );
// }

export default Piano;