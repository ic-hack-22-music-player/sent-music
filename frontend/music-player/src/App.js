import logo from './logo.svg';
import test from './test.mid';
import './App.css';
import Audio from './components/Audio';
import Header from './components/Header';
import MidiAudio from './components/MidiAudio';
import 'html-midi-player';
import { useState } from 'react'

function App() {
  const [audio, setAudio] = useState(test);
  return (
    <div className="container">
      <Header></Header>
      <MidiAudio audio={audio} />
      {/* <img src={} alt="" /> */}
    </div>
  );
}

export default App;
