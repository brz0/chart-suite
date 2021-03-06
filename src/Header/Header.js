import React from 'react';
import {Link} from 'react-router';

// Svg
import logoUrl from './logo.svg';

class Header extends React.Component {
  render() {
    return (
      <div className="root">
        <div className="container headerContainer">
          {this.props.children}
          <Link className="brand" to="/">
            <img src={logoUrl} width="340" height="75" alt="Chart Suite" />
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
