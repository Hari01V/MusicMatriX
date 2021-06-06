import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import playingLogo from '../images/playIcon1.svg';

import '../styles/ArcadeMenu.css';

import api from '../api';

let allMusicNames = [];

const useStyles = makeStyles({
  list: {
    width: 350,
    height: '100%',
    color: '#2eccc5',
    background: '#242424',
    marginLeft: '50px',
    padding: '12px',
    boxShadow: '0 0 1.6vw #2eccc5',
    '& svg': {
      color: '#2eccc5'
    }
  },
  fullList: {
    width: 'auto',
  },
  viewBtn: {
    color: '#2eccc5',
    background: '#242424',
    boxShadow: '0 0 1.6vw #2eccc5',
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
    '& svg': {
      width: '60px',
      height: '60px',
    }
  }
});

export default function ArcadeMenu(props) {
  const classes = useStyles();
  let { changeSong, currSongId } = props;
  const [state, setState] = React.useState({
    right: false
  });

  const [musicList, setMusicList] = useState([]);
  api.getAllMusic().then(result => {
    allMusicNames = [];
    result.data.forEach(music => {
      allMusicNames.push({
        id: music._id,
        name: music.name
      });
    });
    setMusicList(allMusicNames);
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="drawer-heading">
        MUSICMATRIX
      </div>
      <Divider />
      <List>
        {musicList.map((music) => {
          return <div key={music.id}
            onClick={() => {
              if (music.id !== currSongId) {
                changeSong(music.id)
              }
            }}
            className={music.id === currSongId ? "disabled-item" : ""}>
            <ListItem button>
              <ListItemText primary={music.name} />
              {music.id === currSongId &&
                <img src={playingLogo} className="playing-icon" />}
            </ListItem>
          </div>
        })}
      </List>
    </div>
  );

  let anchor = 'right';
  return (
    <div className="arcademenu">
      <React.Fragment key={anchor}>
        <div className={classes.viewBtn}
          onClick={toggleDrawer(anchor, true)}>
          <ChevronLeftIcon />
        </div>
        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
