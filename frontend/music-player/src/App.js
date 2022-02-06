import discImg from './album.jpeg';
import test from './test.mid';
import './App.css';
import Audio from './components/Audio';
import Header from './components/Header';
import MidiAudio from './components/MidiAudio';
import Microphone from './components/Microphone';
import Subtitle from './components/Subtitle';
import Back from './components/Back';
import 'html-midi-player';
import { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';

function App() {
  const [audio, setAudio] = useState(test);
  const [disc, setDisc] = useState(discImg);
  const [spinning, setSpinning] = useState(false);
  const [showRecord, setShowRecord] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const resetState = () => {
    setAudio(test);
    setDisc(discImg);
    setSpinning(false);
    setShowRecord(true);
    setShowPlayer(false);
    setLoading(false);
  }

  const changeAudio = (newAudio) => {
    setAudio(newAudio);
  }

  const toggleRecord = () => {
    loadspin();
    setShowRecord(!showRecord);
    console.log("Spin starts");
  }


  const loadspin = () => {
    // console.log("Spin start");
    setLoading(!loading);
    console.log("Loading " + loading);
    setTimeout(() => {
      setLoading(loading);
      console.log("Loading " + loading);
      setShowPlayer(!showPlayer);
    }, 5000);
  }

  return (
    <div className="app">
      <div className="container-box">
        <Header title={"Music Player 🎼"}></Header>
        {showRecord && <h1>How are you feeling today?</h1>}
        <Subtitle subtitle={showRecord? "Press start and say it out loud!" : "Enjoy your song!"}/>
        {showRecord && <Microphone onToggle={toggleRecord} changeAudio={changeAudio} />}
        {loading && <TailSpin color="#00BFFF" height={80} width={80}/>}
        {showPlayer && <MidiAudio 
          audio={audio} 
          disc={disc}
        />}
        {showPlayer && <Back onClick={resetState}/>}
        {/* <img src={discImg} alt="" /> */}
      </div>
    </div>
  );
}

export default App;
