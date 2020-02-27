import React, { useEffect, useState } from 'react';

const ViewNote = (props) => {

  const [userDetails, setUserDetails] = useState({email: "", password: ""})

  useEffect(
    async () => {
      const response = await fetch('https://app-brainstormings.herokuapp.com/note/:id', {
        method: 'get'
      })
      if (response.ok) {
        props.history.push('/notes');
      } else {
        return false
      }
    },
    [],
  );

  return (
    <div>
      <header>
        <h1>ViewNote Page</h1>
      </header>
      <div>
        <label>Title: </label><br/>
        <label>Demo Title</label>
      </div>
      <div>
        <label>Description: </label> <br/>
        <label>Lorem lipsum </label>
      </div>
      <div>
        <label>Shared With: </label><br/>
        <label>test@gmail.com</label>
      </div>
    </div>
  );
}

export default ViewNote;