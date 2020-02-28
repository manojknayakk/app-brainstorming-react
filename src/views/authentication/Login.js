import React, { useContext, useState } from 'react';
import { store } from '../../store';

const Login = (props) => {

  const globalState = useContext(store);
  const { dispatch } = globalState;
  const [userDetails, setUserDetails] = useState({email: "", password: ""})

  const handleLoginSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const data = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    const response = await fetch( process.env.REACT_APP_BASE_URL + '/authenticate', {
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
        <h1>Login Page</h1>
      </header>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label>Email Address</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password"/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
