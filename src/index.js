import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
//redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
//so we can make ajax call also froma ction creater once we have this middleware
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Header from './routes/Header';
import LoadingComponent from './components/LoadingComponent';
import AuthenticatedComponent from './components/AuthenticatedComponent';
import NoteDetail from './components/NoteDetail';
import NoteEdit from './components/NoteEdit';
import './styles/index.css';

//create redux store (it require) --> reducers (it require) --> actions  | applyMiddleware (which is called redux thunk and will help us make ajax calls from actions)
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

//provide the store to react --> now global store has rootReducer(which means it has notes available)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LoadingComponent>
          <div>
            <Switch>
              <Route path='/login' component={Login} exact={true} />
              <Redirect from='/logout' to='/login' />
              <AuthenticatedComponent>
                <Header />
                <Route path='/' component={App} exact={true} />
                <Route path='/:id' component={NoteDetail} exact={true} />
                <Route path='/:id/edit' component={NoteEdit} exact={true} />
              </AuthenticatedComponent>
            </Switch>
          </div>
        </LoadingComponent>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
