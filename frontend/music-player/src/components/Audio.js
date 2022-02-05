import React, { Component } from 'react';
import 'midi-player-js';
import MIDISounds from 'midi-sounds-react';

var MidiPlayer = require('midi-player-js');

// const Audio = () => {
//   const playTestInstrument = () => {
//     this.midiSounds.playChordNow(3, [60], 2.5);
//   }
//   return (
//       // <audio controls>
        
//       // </audio>
//       // <midi-player src="test.mid"></midi-player>
//       <div>
//         <p className="App-intro">Press Play to play instrument sound.</p>
//         <p><button onClick={playTestInstrument}>Play</button></p>
//         <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[3]} />
//       </div>

//   );
// };

class Audio extends Component {
    playTestInstrument() {
      this.midiSounds.playChordNow(3, [60], 2.5);
  }
  render() {
    return (
      <div className="App">
        <p className="App-intro">Press Play to play instrument sound.</p>
        <p><button onClick={this.playTestInstrument.bind(this)}>Play</button></p>
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[3]} />	
      </div>
    )
  }
}

export default Audio;
