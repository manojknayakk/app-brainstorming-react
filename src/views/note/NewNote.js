import React, { useState, useContext, useEffect } from 'react';
import { store } from '../../store';
import Select from 'react-select'

const NewNote = (props) => {

  const globalState = useContext(store);

  const [shared, setShared] = useState([])
  const [userEmail, setUserEmail] = useState({})
  const [userRole, setUserRole] = useState({})
  const [roleOptions, setRoleOptions] = useState([])

  useEffect( () => {
    const fetchData = async () => {
      const response = await fetch( process.env.REACT_APP_BASE_URL + '/notes/get_roles', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': globalState.state.Authentication
        },
        method: 'get'
      })
      if (response.ok) {
        const roles_option = await response.json()
        setRoleOptions(roles_option)
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
    setShared(shared.filter((item, index) => index !== idx));
    return
  }

  const handleCreateNoteSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    let role_access_data = []
    shared.map((val)=> {
      role_access_data.push({
        role_id: val.role.value,
        user_id: val.email.id
      })
    });
    const data = {
      note: {
        title: event.target.title.value,
        content: event.target.description.value,
        notes_accesses_attributes: role_access_data
      }
    }
    const response = await fetch( process.env.REACT_APP_BASE_URL + '/notes', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': globalState.state.Authentication
      },
      method: 'post',
      body: JSON.stringify(data)
    })
    if (response.ok) {
      props.history.push('/notes');
    } else {
      return false
    }
  }

  return (
    <div className="notes-form-container">
      <form className="notes-form" onSubmit={handleCreateNoteSubmit}>
        <div>
          <input className="form-control my-3" placeholder="Article Title" type="text" name="title" required />
        </div>
        <div>
          <textarea name="description" className="form-control mb-3" placeholder="Article Description" required>
        </textarea>
        </div>
        {
          shared.map((val, idx)=> {
            let email = `email-${idx}`, role = `role-${idx}`
            return (
              <div className="row" key={idx}>
                <div className="col-md-5">
                  <input className="form-control mb-3" type="text" placeholder={val.email.email} readonly></input>
                </div>
                <div className="col-md-4">
                  <input className="form-control mb-3" type="text" placeholder={val.role.label} readonly></input>
                </div>
                <div className="col-md-3 add-button-container">
                  <a onClick={removeUser.bind(null, idx)} className="form-control btn btn-danger float-right mb-3" >Remove user</a> 
                </div>
              </div>
            )
          })
        }
        <div className="row">
          <div className="col-md-5">
            <input
              type="text"
              name="email"
              // id="email"
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
        </div>
        <button type="submit" className="mb-3 btn btn-primary float-right">Submit</button>
      </form>
    </div>
  );
}

export default NewNote;