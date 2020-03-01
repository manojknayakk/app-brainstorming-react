import React, { useState, useContext, useEffect } from 'react';
import { store } from '../../store';
import Select from 'react-select'
import { useAlert } from 'react-alert'

const EditNote = (props) => {
  const alert = useAlert()

  const globalState = useContext(store);

  const [shared, setShared] = useState([])
  const [isOwner, setIsOwner] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [userEmail, setUserEmail] = useState({})
  const [userRole, setUserRole] = useState({})
  const [roleOptions, setRoleOptions] = useState([])
  const [descriptionRow, setDescriptionRow] = useState(24)

  useEffect( () => {
    const fetchData = async () => {
      const response_roles = await fetch( process.env.REACT_APP_BASE_URL + '/notes/get_roles', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': globalState.state.Authentication
        },
        method: 'get'
      })
      if (response_roles.ok) {
        const roles_option = await response_roles.json()
        setRoleOptions(roles_option)
      } else {
        alert.show("Server is down.")
        props.history.push('/notes');
      }

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

  const handleInputDescription = (event) => {
    const textareaLineHeight = descriptionRow;
  	event.target.rows = descriptionRow;
		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    if (descriptionRow < currentRows) {
    	event.target.rows = currentRows;
    }
    setDescriptionRow(currentRows)
    setDescription(event.target.value)
  }

  const addUser = async (e) => {
    if (Object.keys(userEmail).length === 0 || Object.keys(userRole).length === 0){
      if (Object.keys(userEmail).length === 0){
        alert.show("Email is blank.")
      }
      if (Object.keys(userRole).length === 0){
        alert.show("Please select a role.")
      }
      return false
    }
    const data = {
      email: userEmail
    }
    const response = await fetch( process.env.REACT_APP_BASE_URL + '/users/is_valid', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': globalState.state.Authentication
      },
      method: 'post',
      body: JSON.stringify(data)
    })
    const response_data = await response.json()
    if (response.ok) {
      if (response_data.is_valid){
        const userDetails = {id: response_data.id, email: response_data.email}
        setShared((prevState) => ([...prevState, {email: userDetails, role: userRole}]));
      }else{
      alert.show("Invalid email id.")
      }
    } else {
      alert.show("Server is down.")
    }
  }

  const removeUser = (idx) => {
    setShared(
      shared.filter((item, index) => {
        if (index === idx) {
          item._destroy = true
          return item
        }else{
          return item
        }
      })
    );
    return
  }

  const handleUpdateNoteSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    let role_access_data = []
    shared.map((val)=> {
      role_access_data.push({
        id: val.id,
        role_id: val.role.value,
        user_id: val.email.id,
        _destroy: val._destroy
      })
    });
    const data = {
      note: {
        title: title,
        content: description,
        notes_accesses_attributes: role_access_data
      }
    }
    const response = await fetch( process.env.REACT_APP_BASE_URL + '/notes/' + props.match.params.id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': globalState.state.Authentication
      },
      method: 'put',
      body: JSON.stringify(data)
    })
    const editNotesResponse = await response.json()
    if (response.ok) {
      props.history.push('/notes');
    } else {
      Object.keys(editNotesResponse).forEach(function(json_key) {
        editNotesResponse[json_key].map((item, key) =>
          alert.show(json_key + " " + item)
        );
      })
    }
  }

  return (
    <div className="notes-form-container">
      <form className="notes-form" onSubmit={handleUpdateNoteSubmit}>
        <div>
          <input className="form-control my-3" placeholder="Article Title" type="text" name="title" value={title} onChange={event => setTitle(event.target.value)} required />
        </div>
        <div>
          <textarea name="description" rows={descriptionRow} className="form-control mb-3" value={description} onChange={handleInputDescription} placeholder="Article Description" required></textarea>
        </div>
        { (isOwner) ?
          shared.map((val, idx)=> {
            if(val._destroy === true){
              return
            }
            return (
              <div className="row" key={idx}>
                <div className="col-md-5">
                  <input className="form-control mb-3" type="text" placeholder={val.email.email} readOnly></input>
                </div>
                <div className="col-md-4">
                  <input className="form-control mb-3" type="text" placeholder={val.role.label} readOnly></input>
                </div>
                <div className="col-md-3 add-button-container">
                  <a onClick={removeUser.bind(null, idx)} className="form-control btn btn-danger float-right mb-3" >Remove user</a> 
                </div>
              </div>
            )
          }) : ''
        }
        {(isOwner) ? (
        <div className="row">
          <div className="col-md-5">
              <input
                type="text"
                name="email"
                className="form-control mb-3"
                placeholder="Email"
                onChange={event => setUserEmail(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <Select className="mb-3" options={roleOptions} name="role" id="role" placeholder="Select Role" onChange={selectedOption => setUserRole(selectedOption)}/>
            </div>
            <div className="col-md-3 add-button-container">
              <a className="form-control btn btn-success float-right mb-3" onClick={addUser}>Add user</a>
            </div>
          </div>) : ''}
          <button type="submit" className="mb-3 btn btn-primary float-right">Submit</button>
      </form>
    </div>
  );
}

export default EditNote;