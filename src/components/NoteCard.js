import React from 'react';

const NoteCard = ({ children }) => {
  return (
    <div className='jumbotron'>
      <div>{children}</div>
    </div>
  );
};

export default NoteCard;
