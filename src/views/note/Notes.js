import React, { useEffect, useState } from 'react';

const Notes = (props) => {

  const [userDetails, setUserDetails] = useState({email: "", password: ""})

  useEffect(
    async () => {
      const response = await fetch('https://app-brainstormings.herokuapp.com/notes', {
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
  
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );

  return (
    <div>
      <header>
        <h1>Notes Page</h1>
      </header>
      <ul>{listItems}</ul>
    </div>
  );
}

export default Notes;