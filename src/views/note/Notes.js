import React, { useEffect, useState, useContext } from 'react';
import { store } from '../../store';

const Notes = (props) => {
  const globalState = useContext(store);
  const [userDetails, setUserDetails] = useState({email: "", password: ""})

  useEffect( () => {
    const fetchData = async () => {
      const response = await fetch( process.env.REACT_APP_BASE_URL + '/notes', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': globalState.state.Authentication
        },
        method: 'get'
      })
      if (response.ok) {
        props.history.push('/notes');
      } else {
        return false
      }
    }
    fetchData();
  },[]);
  
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