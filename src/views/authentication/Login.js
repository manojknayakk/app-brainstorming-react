import React, { useContext } from 'react';
import { store } from '../../store';
import { Link } from 'react-router-dom';

const Login = (props) => {

  const globalState = useContext(store);
  const { dispatch } = globalState;

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
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleLoginSubmit}>
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Email address</label>
            <input type="email" name="email" className="form-control" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" placeholder="Enter password" />
          </div>

          <button type="submit" className="btn btn-primary btn-block">Login</button>
          <p className="forgot-password text-right">
            Don't have a account? <Link to={"/signup"}>Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
