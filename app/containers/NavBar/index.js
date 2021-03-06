/**
 *
 * NavBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectNavBar, makeSelectUser, makeSelectAuth } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { Link } from 'react-router-dom';
import { configure, signOut } from 'redux-auth';

export class NavBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  renderAuthLinks() {
    if (this.props.user.isSignedIn) {
      return [
        <li key='dashboard'><Link to='/dashboard'>Dashboard</Link></li>,
        <li key='dropdown' className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><Link onClick={this.props.onSignoutClicked} to='#'>Logout</Link></li>
          </ul>
        </li>
        ];
    } else {
      return [
        <li key='signup'><Link to='/signup'>Sign Up</Link></li>,
        <li key='login'><Link to='/login'>Login</Link></li>
      ];
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to='/' className="navbar-brand">One Great Title</Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                {this.renderAuthLinks()}
              </ul>
            </div>
          </div>
        </nav>        
      </div>
    );
  }
}

NavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
  onSignoutClicked: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  navbar: makeSelectNavBar(),
  user: makeSelectUser(),
  auth: makeSelectAuth()
});

function mapDispatchToProps(dispatch) {
  return {
    onSignoutClicked: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(signOut());
    }
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'navBar', reducer });
const withSaga = injectSaga({ key: 'navBar', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NavBar);
