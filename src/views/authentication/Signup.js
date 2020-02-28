import React, { useContext, useState } from 'react';
import { store } from '../../store';

const Signup = (props) => {

  const globalState = useContext(store);
  const { dispatch } = globalState;
  const [userDetails, setUserDetails] = useState({email: "", password: ""})

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
    if (response.ok) {
      const userData = await response.json()
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
      return false
    }
  }

  return (
    <div>
      <header>
        <h1>Signup Page</h1>
      </header>
      <form onSubmit={handleSignupSubmit}>
        <div>
          <label>First Name</label>
          <input type="text" name="firstName" required />
          <label>Last Name</label>
          <input type="text" name="lastName" required />
        </div>
        <div>
          <label>Email Address</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" required/>
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" name="passworConfirmation" required/>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;