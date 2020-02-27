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
    const response = await fetch('https://app-brainstormings.herokuapp.com/authenticate', {
      method: 'post',
      body: {
        email: event.target.email.value,
        password: event.target.password.value
      }
    })
    if (response.ok) {
      const newState = {
        loggedIn: true, 
        Authentication: "1234567890-123128378912",
        firstName: "John",
        lastName: "Cena",
        email: "john.cena@nasa.com"
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Login;
