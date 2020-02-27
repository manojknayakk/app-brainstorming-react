import React, { useContext, useState } from 'react';

const EditNote = (props) => {

  const [userDetails, setUserDetails] = useState({email: "", password: ""})

  const handleUpdateNoteSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const response = await fetch('https://app-brainstormings.herokuapp.com/note', {
      method: 'put',
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
      <header onSubmit={handleUpdateNoteSubmit}>
        <h1>EditNote Page</h1>
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
        <button type="submit">Edit note</button>
      </form>
    </div>
  );
}

export default EditNote;
