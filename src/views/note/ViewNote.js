import React, { useState, useContext, useEffect } from 'react';
import { store } from '../../store';
import { useAlert } from 'react-alert'

const ViewNote = (props) => {
  const alert = useAlert()

  const globalState = useContext(store);

  const [shared, setShared] = useState([])
  const [isOwner, setIsOwner] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect( () => {
    const fetchData = async () => {
      const response_note = await fetch( process.env.REACT_APP_BASE_URL + '/notes/'+ props.match.params.id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': globalState.state.Authentication
        },
        method: 'get'
      })
      const noteData = await response_note.json()
      if (response_note.ok) {
        setTitle(noteData.title)
        setDescription(noteData.description)
        if (noteData.is_owner){
          setIsOwner(true)
          setShared(noteData.users)
        }
      } else {
        alert.show("Not authorized.")
        props.history.push('/notes');
      }
    }
    fetchData();
  },[]);

  return (
    <div className="notes-form-container">
      <form className="notes-form">
        <div>
          <input type="text" name="title" value={title} className="form-control my-3" placeholder="Article Title"  readOnly />
        </div>
        <div>
          <textarea name="description" value={description} rows={24} className="form-control mb-3" placeholder="Article Description" readOnly></textarea>
        </div>
        { (isOwner) ?
          shared.map((val, idx)=> {
            if(val._destroy === true){
              return
            }
            return (
              <div className="row" key={idx}>
                <div className="col-md-6">
                  <input className="form-control mb-3" type="text" placeholder={val.email.email} readOnly></input>
                </div>
                <div className="col-md-6">
                  <input className="form-control mb-3" type="text" placeholder={val.role.label} readOnly></input>
                </div>
              </div>
            )
          }) : ''
      }      
      </form>
    </div>
  );
}

export default ViewNote;