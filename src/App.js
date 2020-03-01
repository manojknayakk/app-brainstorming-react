import React, { useContext } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
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
  const { dispatch } = globalState;

  const logoutHandler = () =>{
    dispatch({ type: 'logout', newState: null });
    return false
  }

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
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to={"/notes"}>Brainstorming.com</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {(globalState.state.loggedIn) ? <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/notes"}>Notes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/new_note"}>NewNote</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={logoutHandler}> Logout </a>
              </li>
            </ul> : <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/signup"}>Sign up</Link>
              </li>
            </ul>}
          </div>
        </div>
      </nav>
      <Switch>
        <PrivateRoute exact={true} path="/" component={Notes} />
        <PrivateRoute exact={true} path="/notes" component={Notes} />
        <PrivateRoute exact={true} path="/new_note" component={NewNote} />
        <PrivateRoute exact={true} path="/edit_note/:id" component={EditNote} />
        <PrivateRoute exact={true} path="/view_note/:id" component={ViewNote} />
        <PrivateRoute exact={true} path="/profile" component={User} />
        <Route exact={true} path="/login" component={Login}/>
        <Route exact={true} path="/signup" component={Signup}/>
      </Switch>
    </div>
  );
}

export default App;
