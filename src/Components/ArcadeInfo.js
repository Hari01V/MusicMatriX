import React from 'react';

import '../styles/ArcadeInfo.css';

export default function ArcadeInfo(props) {
  const { header, notes, completedNotes } = props;

  if (notes[completedNotes]) {
    const tmp = document.getElementById(`note-${completedNotes}`);
    if (tmp) {
      tmp.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }
  return (
    <div className="arcade-info">
      <h1>{header["name"]}</h1>
      <p className="arcade-notes">
        <span className="space"></span>
        {notes.map((note, index) => <span id={`note-${index}`}
          key={`${note}-${index}`}
          className="note">{note.name}</span>)}
        <span className="space"></span>
      </p>
    </div>
  )
}