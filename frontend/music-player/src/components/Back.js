import React from 'react';

const Back = ({ onClick }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'  }} className='back'>
      <h3 onClick={onClick} className="back-img">back</h3>
    </div>
  );
};

export default Back;
