import React, { useContext } from 'react';
import { store } from '../../store';
import { Link } from 'react-router-dom';

import { useAlert } from 'react-alert'

const Signup = (props) => {
  const alert = useAlert()

  const globalState = useContext(store);
  const { dispatch } = globalState;

  const handleSignupSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const data = {user: {
      first_name: event.target.firstName.value,
      last_name: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value,
      password_confirmation: event.target.passworConfirmation.value
    }}
    const response = await fetch( process.env.REACT_APP_BASE_URL + '/users', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
    })
    const userData = await response.json()
    if (response.ok) {
      const newState = {
        loggedIn: true, 
        Authentication: userData.auth_token,
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email
      }
      dispatch({ type: 'login', newState: newState });
      props.history.push('/notes');
    } else {
      Object.keys(userData).forEach(function(json_key) {
        if (Array.isArray(userData[json_key])){
          userData[json_key].map((item, key) =>
            alert.show(item)
          );
        }
      })
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSignupSubmit}>
          <h3>Sign Up</h3>

          <div className="form-group">
            <label>First name</label>
            <input type="text" name="firstName" className="form-control" placeholder="First name" required/>
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input type="text" name="lastName" className="form-control" placeholder="Last name" required/>
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input type="email" name="email" className="form-control" placeholder="Enter email" required/>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" placeholder="Enter password" required/>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="passworConfirmation" className="form-control" placeholder="Confirm password" required/>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
          <p className="forgot-password text-right">
            Already registered <Link to={"/login"}>Login</Link>
          </p>
        </form>
      </div>
    </div>
    
  );
}

export default Signup;