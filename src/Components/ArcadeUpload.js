import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';

import '../styles/ArcadeUpload.css';

export default function ArcadeUpload() {
  const [isValid, setIsValid] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkValidation = (event) => {
    const filePath = event.target.value;
    if (filePath.match(/.mid$/)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const updateDatabase = (event) => {
    event.preventDefault();
    const file = document.querySelector("#file-upload").value;
    console.log(file);
  }

  return (
    <div className="arcade-upload">
      <div className="arcade-upload-btn" onClick={handleClickOpen}>
        <PublishRoundedIcon />
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className="arcade-dialog">
        <DialogTitle id="form-dialog-title">Upload your Music here</DialogTitle>
        <DialogContent>
          <form action="" method="" className="upload-dialog-content">
            <p>
              Upload a music file in .mid format to use it as Arcade music!
            </p>
            <input type="file" id="file-upload" name="file-upload" onChange={checkValidation} />
            <div>
              <div className="dialog-cancel-btn" onClick={handleClose}>Cancel</div>
              <button onClick={updateDatabase} disabled={!isValid}>Upload</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}