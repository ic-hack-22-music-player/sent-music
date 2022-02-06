import React from 'react';

const Back = ({onClick}) => {
  return (
    <div className='back'>
        <img onClick={onClick} className="back-img" src={require("../home.png")} alt="" />
    </div>
  );
};

export default Back;
