import React from 'react';

const Notes = (props) => {
  
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );

  return (
    <div>
      <header>
        <h1>Notes Page</h1>
      </header>
      <ul>{listItems}</ul>
    </div>
  );
}

export default Notes;