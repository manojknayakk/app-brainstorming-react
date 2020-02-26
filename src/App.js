import React, { useContext } from 'react';
import './App.css';

import { Link, Route, Switch, Redirect } from 'react-router-dom';

import Login from './views/authentication/Login';
import Signup from './views/authentication/Signup';
import User from './views/Profile/User';
import Notes from './views/note/Notes';
import NewNote from './views/note/NewNote';
import EditNote from './views/note/EditNote';
import ViewNote from './views/note/ViewNote';

import { store } from './store.js';


function App() {

  const globalState = useContext(store);
  const PrivateRoute = ({ component: Component, ...props }) => {
    return (
      <Route
        {...props}
        render={innerProps =>
          globalState.state.loggedIn ? 
              <Component {...innerProps} />
              :
              <Redirect to="/login" />
        }
      />
    );
  };

  return (
    <div>
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li><Link to="/notes">Notes</Link></li>
          <li><Link to="/new_note">NewNote</Link></li>
          <li><Link to="/edit_note">UpdateNote</Link></li>
          <li><Link to="/view_note">ViewNote</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
      </nav>
      <Switch>
        <PrivateRoute exact={true} path="/notes" component={Notes} />
        <PrivateRoute exact={true} path="/new_note" component={NewNote} />
        <PrivateRoute exact={true} path="/edit_note" component={EditNote} />
        <PrivateRoute exact={true} path="/view_note" component={ViewNote} />
        <PrivateRoute exact={true} path="/profile" component={User} />
        <Route exact={true} path="/login" component={Login}/>
        <Route exact={true} path="/signup" component={Signup}/>
      </Switch>
      
    </div>
  );
}

export default App;
