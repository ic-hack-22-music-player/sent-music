import React from 'react';

const Disc = ({disc}) => {
  return (
    <div className="disc-container">
        <img className="spinning-disc" src={disc} alt="" />
    </div>
  )
};

export default Disc;
