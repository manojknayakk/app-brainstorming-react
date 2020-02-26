import React from 'react';

const Signup = (props) => {

  return (
    <div>
      <header>
        <h1>Signup Page</h1>
      </header>
      <form>
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
          <input type="password" name="password1" required/>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;