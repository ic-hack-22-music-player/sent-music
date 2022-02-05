import React, { useEffect } from 'react';
import Disc from './Disc';
import $ from 'jquery';


const MidiAudio = ({audio, disc}) => {
    useEffect(() => {
        // $('#myPlayer').start();
    })
  return (
    <div className='player-container'>
        <Disc disc={disc}/>
        {/* <img src={disc} alt="" /> */}
        <midi-player id="myPlayer" sound-font="https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus" src={audio}></midi-player>
    </div>
  );
};

export default MidiAudio;
