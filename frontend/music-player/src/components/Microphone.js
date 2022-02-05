import { ReactMic } from 'react-mic';
import React, { Component } from 'react';

export class Microphone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false
        }
    }

    startRecording = () => {
        this.setState({ record: true });
    }

    stopRecording = () => {
        this.setState({ record: false });
    }

    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
        const a = document.createElement('a');
        a.download = 'audio.webm';
        // a.href = URL.createObjectURL(recordedBlob);
        a.href = recordedBlob.blobURL;
        a.addEventListener('click', (e) => {
            setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        });
        a.click();

    }

    render() {
        return (
            <div>
                <ReactMic
                    record={this.state.record}
                    className="sound-wave"
                    onStop={this.onStop}
                    onData={this.onData}
                    strokeColor="#000000"
                    backgroundColor="#FF4081" />
                <button onClick={this.startRecording} type="button">Start</button>
                <button onClick={this.stopRecording} type="button">Stop</button>
            </div>
        );
    }
}

export default Microphone;