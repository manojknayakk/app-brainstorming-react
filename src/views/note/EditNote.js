import React, { useState, useContext, useEffect } from 'react';
import { store } from '../../store';
import Select from 'react-select'

const EditNote = (props) => {

  const globalState = useContext(store);

  const [shared, setShared] = useState([])
  const [isOwner, setIsOwner] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [userEmail, setUserEmail] = useState({})
  const [userRole, setUserRole] = useState({})
  const [roleOptions, setRoleOptions] = useState([])

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
        return false
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
        return false
      }
    }
    fetchData();
  },[]);

  const addUser = async (e) => {
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
    if (response.ok) {
      const response_data = await response.json()
      if (response_data.is_valid){
        const userDetails = {id: response_data.id, email: response_data.email}
        setShared((prevState) => ([...prevState, {email: userDetails, role: userRole}]));
      }
    } else {
      return false
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
    if (response.ok) {
      props.history.push('/notes');
    } else {
      return false
    }
  }

  return (
    <div>
      <header>
        <h1>EditNote Page</h1>
      </header>
      <form onSubmit={handleUpdateNoteSubmit}>
        <div>
          <label>Title</label>
          <input type="text" name="title" value={title} onChange={event => setTitle(event.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <input type="text" name="description" value={description} onChange={event => setDescription(event.target.value)} required />
        </div>
        { (isOwner) ?
          shared.map((val, idx)=> {
            if(val._destroy === true){
              return
            }
            let email = `email-${idx}`, role = `role-${idx}`
            return (
              <div key={idx}>
                <label htmlFor={email}>{`User #${idx + 1}`} :</label>
                <label name={email} data-id={idx} id={email}>{val.email.email}</label>

                <label htmlFor={role}>Role :</label>
                <label name={role} data-id={idx} id={role}>{val.role.label}</label>

                <button onClick={removeUser.bind(null, idx)}>remove user</button> 
              </div>
            )
          }) : ''
        }
        {(isOwner) ? (<div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={event => setUserEmail(event.target.value)}
          />
          <label htmlFor="role">Role</label>
          <Select options={roleOptions} name="role" id="role" onChange={selectedOption => setUserRole(selectedOption)}/>
          <button onClick={addUser}>Add new user</button>
        </div>) : ''}
        <button type="submit">Create note</button>
      </form>
    </div>
  );
}

export default EditNote;