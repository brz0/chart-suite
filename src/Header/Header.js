import React from 'react';
import {Link} from 'react-router';
import Navigation from '../Navigation/Navigation.js';

// Svg
import logoUrl from './logo.svg';

class Header extends React.Component {
  render() {
    return (
      <div className="root">
        <div className="container headerContainer">
          <Navigation className="nav" />
          <Link className="brand" to="/">
            <img src={logoUrl} width="340" height="75" alt="Chart Suite" />
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
