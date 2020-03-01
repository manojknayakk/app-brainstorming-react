import React, { useEffect, useContext } from 'react';
import { store } from '../../store';

const ViewNote = (props) => {

  const globalState = useContext(store);

  useEffect( () => {
    const fetchData = async () => {
      const response = await fetch( process.env.REACT_APP_BASE_URL + '/notes/'+ props.match.params.id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': globalState.state.Authentication
        },
        method: 'get'
      })
      const noteData = await response.json()
      if (response.ok) {
        console.log(noteData)
      } else {
        console.log(noteData)
        return false
      }
    }
    fetchData();
  },[]);

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