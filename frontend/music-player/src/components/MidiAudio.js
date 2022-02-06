import React, { useEffect } from 'react';
import Disc from './Disc';
import $ from 'jquery';


const MidiAudio = ({audio, disc}) => {
    useEffect(() => {
        // $('#myPlayer').start();
        console.log(audio);
    })
  return (
    <div className='player-container'>
        <Disc disc={disc}/>
        {/* <img src={disc} alt="" /> */}
        <midi-player id="myPlayer" sound-font="https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus" src={require('../test.mid')}></midi-player>
    </div>
  );
};

export default MidiAudio;
