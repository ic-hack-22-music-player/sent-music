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
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";
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
    setLoading(!loading);
    console.log("Loading " + loading);
    setShowRecord(!showRecord);
    console.log("Spin starts");
  }

  const togglePlayer = () => {
      setLoading(!loading);
      setShowPlayer(!showPlayer);
  }

  return (
    <div className="app">
      <MouseParallaxContainer>
        <MouseParallaxChild
          factorX={0.03}
          factorY={0.1}
          updateStyles={{
            backgroundPositionY: "100%",
            backgroundPositionX: "100%",
            // transform: "scale(1.2)",
            position: "absolute",
            filter: "blur(4px) brightness(20%)",
            backgroundSize: "auto",
            backgroundRepeat: "repeat",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden"
          }}
        />
        <MouseParallaxChild
          factorX={0.03}
          factorY={0.1}>
          <Header title={"mood jam 🎼"}></Header>
        </MouseParallaxChild>
        <MouseParallaxChild
          factorX={0.02}
          factorY={0.05}>
          {showRecord && <h1>How are you <b><i>feeling</i></b> today?</h1>}
        </MouseParallaxChild>
        <MouseParallaxChild
          factorX={0.01}
          factorY={0.01}>
          <Subtitle subtitle={showRecord ? "Press start and say it out loud!" : "Enjoy your song!"} />
        </MouseParallaxChild>
      </MouseParallaxContainer>
      {showRecord && <Microphone onToggle={toggleRecord} changeAudio={changeAudio} onTogglePlayer={togglePlayer} />}
      {loading && <div className='tail-spin'><TailSpin color="#00BFFF" height={80} width={80}/></div>}
      {showPlayer && <MidiAudio
        audio={require('./generated.mid')}
        disc={require('./album.jpg')}
      />}
      {showPlayer && <Back onClick={resetState} />}
    </div >
  );
}

export default App;
