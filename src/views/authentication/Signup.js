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
    const response = await fetch('https://app-brainstormings.herokuapp.com/signup', {
      method: 'post',
      body: {
        first_name: event.target.firstName.value,
        last_name: event.target.lastName.value,
        email: event.target.email.value,
        password: event.target.password.value,
        confirm_password: event.target.confirmPassword.value
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
          <input type="password" name="confirmPassword" required/>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;