import React, { useEffect, useContext, useState } from 'react';
import { store } from '../../store';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'

const Notes = (props) => {
  const alert = useAlert()

  const globalState = useContext(store);
  
  const [notes, setNotes] = useState([]);

  useEffect( () => {
    const fetchData = async () => {
      const response = await fetch( process.env.REACT_APP_BASE_URL + '/notes', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': globalState.state.Authentication
        },
        method: 'get'
      })
      const responseJson = await response.json()
      if (response.ok) {
        console.log(responseJson)
        setNotes(responseJson)
      } else {
        alert.show("Server is down.")
        return false
      }
    }
    fetchData();
  },[]);

  const deleteNote = async (id) => {
    const response = await fetch( process.env.REACT_APP_BASE_URL + '/notes/'+id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': globalState.state.Authentication
      },
      method: 'delete'
    })
    if (response.ok) {
      setNotes(notes.filter(data => data.id !== id));
    } else {
      alert.show("Not authorized")
    }
    return
  }
  
  const listItems = notes.map((data, index) =>{
    if (data.is_editable){
      return (
      <div key={data.id} className="col-12 col-md-6 col-xl-4">
        <div className="d-flex flex-wrap block p-3">
          <Link className="w-100 notes_card" to={"/view_note/" + data.id}>
              <div className="label w-100 text-right">{data.title}</div>
              <div className="description">{data.description}</div>
          </Link>
          <div className="w-100 bottom_buttons_container">
            <Link className="btn btn-default btn-primary" to={"/edit_note/" + data.id}>Edit</Link>
            {(data.is_owner) ? <a className="btn btn-default btn-danger" onClick={deleteNote.bind(null, data.id)}>Delete</a> : ''}
          </div>
        </div>
      </div>
      )
    }else{
      return (
        <div key={data.id} className="col-12 col-md-6 col-xl-4">
          <div className="d-flex flex-wrap block p-3">
            <Link className="w-100 notes_card view" to={"/view_note/" + data.id}>
                <div className="label w-100 text-right">{data.title}</div>
                <div className="description">{data.description}</div>
            </Link>
          </div>
        </div>
      )
    }
  });
    


  return (
    <div className="container notesScreen">
      <div className="row">
        {listItems}
      </div>
    </div>
  );
}

export default Notes;