import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import NavBar from '../../containers/NavBar';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

export default Header;
