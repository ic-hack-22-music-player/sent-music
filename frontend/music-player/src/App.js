import discImg from './album.jpeg';
import test from './test.mid';
import './App.css';
import Audio from './components/Audio';
import Header from './components/Header';
import MidiAudio from './components/MidiAudio';
import Microphone from './components/Microphone';
import Subtitle from './components/Subtitle';
import 'html-midi-player';
import { useState } from 'react'

function App() {
  const [audio, setAudio] = useState(test);
  const [disc, setDisc] = useState(discImg);
  const [spinning, setSpinning] = useState(false);
  const [showRecord, setShowRecord] = useState(true);
  
  const toggleRecord = () => {
    setShowRecord(!showRecord);
  }

  return (
    <div className="app">
      <div className="container-box">
        <Header title={"Music Player 🎼"}></Header>
        {showRecord && <h1>How are you feeling today?</h1>}
        <Subtitle subtitle={showRecord? "Press start and say it out loud!" : "Enjoy your song!"}/>
        {showRecord && <Microphone toggleRecord={toggleRecord} />}
        {!showRecord && <MidiAudio 
          audio={audio} 
          disc={disc}

        />}
        {/* <img src={discImg} alt="" /> */}
      </div>
    </div>
  );
}

export default App;
