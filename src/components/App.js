import React, { Component } from 'react';
import _ from 'lodash';
//Connect method will help us to do 2 things --> 1st map the redux state global state get the property from there (get notes, users and all stuffs from there) and at the same time dispatch the actions from react side and connected to store
import { connect } from 'react-redux';
import { getNotes, saveNote, deleteNote } from '../actions/notesAction';
import NoteCard from './NoteCard';
import { getUser } from '../actions/userAction';
import { Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    //state
    this.state = {
      title: '',
      body: '',
    };
    //binding each created method
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
  }

  //handle change
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  //handle submit
  handleSubmit(e) {
    e.preventDefault();
    const note = {
      title: this.state.title,
      body: this.state.body,
      uid: this.props.user.uid,
    };
    //storing in firebase database
    this.props.saveNote(note);
    //setting stae back to null of fields
    this.setState({
      title: '',
      body: '',
    });
  }

  //render notes
  renderNotes() {
    return _.map(this.props.notes, (note, key) => {
      return (
        <NoteCard key={key}>
          <Link to={`/${key}`}>
            <h2 style={{ color: 'Orange' }}>{note.title}</h2>
          </Link>
          <p>{note.body}</p>
          {note.uid === this.props.user.uid && (
            <div>
              <button
                onClick={() => this.props.deleteNote(key)}
                className='btn btn-danger btn-xs'
              >
                Delete
              </button>
              <button className='btn btn-light btn-xs pull-right'>
                <Link to={`/${key}/edit`}>Update</Link>
              </button>
            </div>
          )}
        </NoteCard>
      );
    });
  }

  render() {
    // console.log(this.props.user);

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-2 text-center'>
            <img
              src={this.props.user.photoURL}
              height='100px'
              className='img img-responsive circle'
              style={{ padding: '20px' }}
            />
            <h4
              className='username'
              style={{ fontFamily: 'Special Elite cursive' }}
            >
              Welcome <br />
              <b>{this.props.user.displayName}</b>
            </h4>
          </div>
          <div className='col-sm-10'>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <input
                  onChange={this.handleChange}
                  value={this.state.title}
                  type='text'
                  name='title'
                  className='form-control no-border'
                  placeholder='Title...'
                  required
                />
              </div>

              <div className='form-group'>
                <textarea
                  onChange={this.handleChange}
                  value={this.state.body}
                  type='text'
                  name='body'
                  className='form-control no-border'
                  placeholder='Body...'
                  required
                />
              </div>

              <div className='form-group'>
                <button className='btn btn-info col-sm-12'>Save</button>
              </div>
            </form>
            <br />
            <br />
            <br />
            {this.renderNotes()}
          </div>
        </div>
      </div>
    );
  }
}

//takes 2 arg state and ownProps
function mapStateToProps(state, ownProps) {
  return {
    notes: state.notes,
    user: state.user,
  };
}

//connect will take 2 things ---> 1st what do we want/properties from state (notes) and 2nd when you connect react to redux what do you want --> we want to inform store that we have been to used this imported method as well / dispatch (getNotes, saveNote)
export default connect(mapStateToProps, {
  getNotes,
  saveNote,
  deleteNote,
  getUser,
})(App);

// notesAction(action creater) actions get dispatched from react side and will be given to store --> (In index.js) redux store will know action have been dispatched immeditely --> then it will say i have goot the action and payload do something about it to reducer(notesReducer) --> then reducer will match the action type and returns the payload --> whatever it returns is available in [index.js of reducer] and get stored in root reducer
