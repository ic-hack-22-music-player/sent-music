import React from 'react';

const MidiAudio = ({audio}) => {
  return (
    <div className='player-container'>
        <midi-player src={audio}></midi-player>
    </div>
  );
};

export default MidiAudio;
