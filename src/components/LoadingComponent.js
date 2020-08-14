import React, { Component } from 'react';
import { connect } from 'react-redux';
//with withRouter you can get access to the history object's property --> that keep tracks of URL Changes
import { withRouter } from 'react-router-dom';
import { getUser } from '../actions/userAction';
import { getNotes } from '../actions/notesAction';
import Spinner from './Spinner';

class LoadingComponent extends Component {
  componentWillMount() {
    const { userLoading, notesLoading } = this.props;
    //if we haven't tried to load user then load user
    if (userLoading === undefined) {
      this.props.getUser();
    }

    //if we haven't tried to get notes then get notes
    if (notesLoading === undefined) {
      this.props.getNotes();
    }
  }

  componentWillReceiveProps(nextProps) {
    //wait for user to get authenticated and try to load notes
    if (nextProps.notesLoading === -1 && nextProps.user !== null) {
      this.props.getNotes();
    }
  }

  render() {
    const { userLoading, notesLoading, children } = this.props;
    if ((!userLoading && !notesLoading) || this.props.user === null) {
      return <div>{children}</div>;
    } else {
      return <Spinner />;
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    userLoading: state.loading.user,
    notesLoading: state.loading.notes,
  };
}

//withRouter() we get access to history url and we can push urls
export default withRouter(
  connect(mapStateToProps, { getUser, getNotes })(LoadingComponent)
);
