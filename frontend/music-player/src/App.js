import discImg from './album.jpeg';
import test from './test.mid';
import './App.css';
import Audio from './components/Audio';
import Header from './components/Header';
import MidiAudio from './components/MidiAudio';
import Microphone from './components/Microphone';
import Subtitle from './components/Subtitle';
import 'html-midi-player';
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";
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
          factorX={0.1}
          factorY={0.05}
        >
          {/* <div className="container-box"> */}
          <Header title={"Music Player 🎼"}></Header>
        </MouseParallaxChild>
        <MouseParallaxChild
          factorX={0.02}
          factorY={0.05}
        >
          {showRecord && <h1>How are you <b><i>feeling</i></b> today?</h1>}
        </MouseParallaxChild>
        <MouseParallaxChild
          factorX={0.01}
          factorY={0.05}
        >
          <Subtitle subtitle={showRecord ? "Press start and say it out loud!" : "Enjoy your song!"} />
        </MouseParallaxChild>
        {showRecord && <Microphone toggleRecord={toggleRecord} />}
        {!showRecord && <MidiAudio
          audio={audio}
          disc={disc}
        />}
        {/* <img src={discImg} alt="" /> */}
        {/* </div> */}
      </MouseParallaxContainer>
    </div >
  );
}

export default App;
