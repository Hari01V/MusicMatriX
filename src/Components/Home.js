import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import homeBg from '../images/Protruding-Squares.svg';
import '../styles/Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home" style={{ backgroundImage: `url(${homeBg})` }}>
        <div className="container">
          <div>
            <p><a className="neon">Music</a><a className="flux">Matrix</a></p>
          </div><br></br>
          <div>
            <p className="curs">Your  <span className="highlight">online companion</span> to music</p>
          </div><br></br>
          <div>
            <Link to="/piano" className="Home-link">
              <button className="btn">Classic</button>
            </Link>
            <Link to="/arcade">
              <button className="btn">Arcade</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;