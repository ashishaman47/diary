import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, logout } from '../actions/userAction';

class Header extends Component {
  render() {
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button
              type='button'
              className='navbar-toggle'
              data-toggle='collapse'
              data-target='#myNavbar'
            >
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>

            <Link className='navbar-brand' to='/'>
              DIARY 2020
            </Link>
          </div>

          <div id='myNavbar' className='collapse navbar-collapse'>
            <ul className='nav navbar-nav navbar-right'>
              {this.props.user === null ? (
                <li>
                  <Link to='/login'>Login</Link>
                </li>
              ) : (
                <li>
                  <Link onClick={() => this.props.logout()} to='/logout'>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, { getUser, logout })(Header);
