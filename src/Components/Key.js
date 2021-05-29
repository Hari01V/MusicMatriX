import React, { } from 'react';
import { getLeft } from '../BoardHelper';
import '../styles/Key.css';
import $ from 'jquery';

function Key(props) {
  // 6, 13, 18, 25, 30, 37, 42, 49, 54, 61
  const { id, char, midiNumber, white, pressed } = props;

  let left = getLeft(id);

  let keyClass = "Key ";
  if (!white) {
    keyClass += "black ";
  }
  if (pressed) {
    keyClass += "Key-bg";
  }


  return (
    <div className={`${keyClass}`}
      style={{ left: `calc(${left}px)` }}
      onMouseDown={() => props.play(id, midiNumber)}
      onMouseUp={() => props.stop(id)}
      onMouseEnter={() => {
        if ($('.Piano-keyboard').hasClass('onHold')) {
          props.play(id, midiNumber);
        }
      }}
      onMouseLeave={() => props.stop(id)}>
      <span className="Key-char">{char}</span>
    </div>
  );
}

export default Key;