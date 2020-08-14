import React, { Component } from 'react';
import { connect } from 'react-redux';
//with withRouter you can get access to the history object's property --> that keep tracks of URL Changes
import { withRouter } from 'react-router-dom';

class AuthenticatedComponent extends Component {
  componentDidUpdate() {
    //making sure the loading is done then if no user
    //then push them to login page
    const { userLoading, user } = this.props;
    if (userLoading === false && !user) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { user, userLoading, children } = this.props;
    return userLoading === false && user ? <div>{children}</div> : null;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    userLoading: state.loading.user,
  };
}

//withRouter() we get access to history url and we can push urls
export default withRouter(connect(mapStateToProps)(AuthenticatedComponent));
