import logo from './logo.svg';
import test from './test.mid';
import './App.css';
import Audio from './components/Audio';
import Header from './components/Header';
import MidiAudio from './components/MidiAudio';
import Microphone from './components/Microphone';
import 'html-midi-player';
import { useState } from 'react'

function App() {
  const [audio, setAudio] = useState(test);
  return (
    <div className="app">
      <div className="container-box">
        <Header title={"Music Player 🎼"}></Header>
        <h1>How are you <b><i>feeling</i></b> today?</h1>
        <h2>Press start and say it out loud!</h2>
        <Microphone />
        <MidiAudio audio={audio} />
      </div>
    </div>
  );
}

export default App;
