import React from 'react';

const Back = ({ onClick }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'  }} className='back'>
      <h1 onClick={onClick} className="back-img">🏠</h1>
    </div>
  );
};

export default Back;
