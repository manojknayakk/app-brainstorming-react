import React from 'react';

const User = (props) => {
  
  return (
    <div>
      <header>
        <h1>User Page</h1>
      </header>
      <div>
        <label>First Name: </label>
        <label>TestFirst</label> <br/>
        <label>Last Name</label>
        <label>TestLast</label> <br/>
      </div>
      <div>
        <label>Email Address</label>
        <label>test@gmail.com</label>
      </div>
      <button>Logout</button>
    </div>
    );
  }
  
  export default User;