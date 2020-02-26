import React from 'react';

const ViewNote = (props) => {

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