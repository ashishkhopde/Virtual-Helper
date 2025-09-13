import React, { useContext, useState } from 'react';
import bg from './assest/bg1.mp4';
import './App.css';

import { FaMicrophone } from "react-icons/fa6";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa"; // help icon

import noteContext from './context/noteContext';
import SpeechRecognition from 'react-speech-recognition';

import Help from './components/Help';

export default function App() {

  let {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useContext(noteContext);

  let { startListening, stopListening } = SpeechRecognition;
  const [showHelp, setShowHelp] = useState(false);

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support this lib.</div>;
  }

  return (
    <div className="app">
      <section className='bg'>
        <video autoPlay muted loop className="video-bg" src={bg}></video>
      </section>

      <button className="help-btn" onClick={() => setShowHelp(true)}>
        <FaQuestionCircle />
      </button>

      <section className='content'>

        <h1 className="title">🎙 Virtual Helper</h1>

        <p className='transcript'>
          {transcript || "Say something..."}
        </p>

        <div className="btns">
          {!listening ? (
            <button
              className="mic-btn"
              onClick={startListening}
            >
              <FaMicrophone />
            </button>
          ) : (
            <button
              className="stop-btn"
              onClick={stopListening}
            >
              <FaMicrophoneSlash />
            </button>
          )}
        </div>

        <button className="reset-btn" onClick={resetTranscript}>
          Reset
        </button>

      </section>

      {showHelp && <Help setShowHelp={setShowHelp} />}

    </div>
  );
}
