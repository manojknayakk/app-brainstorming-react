import React, { useContext, useState } from 'react';

const NewNote = (props) => {

  const [userDetails, setUserDetails] = useState({email: "", password: ""})

  const handleCreateNoteSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const response = await fetch( process.env.REACT_APP_BASE_URL + '/note', {
      method: 'post',
      body: {
        title: event.target.title.value,
        description: event.target.description.value,
      }
    })
    if (response.ok) {
      props.history.push('/notes');
    } else {
      return false
    }
  }

  return (
    <div>
      <header onSubmit={handleCreateNoteSubmit}>
        <h1>NewNote Page</h1>
      </header>
      <form>
        <div>
          <label>Title</label>
          <input type="text" name="title" required />
        </div>
        <div>
          <label>Description</label>
          <input type="text" name="description" required />
        </div>
        <div>
          <label>Shared With</label>
          <input type="text" name="shared_with1" required />
          <input type="text" name="shared_with2" required />
        </div>
        <button type="submit">Create note</button>
      </form>
    </div>
  );
}

export default NewNote;