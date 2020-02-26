import React from 'react';

const NewNote = (props) => {

  return (
    <div>
      <header>
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