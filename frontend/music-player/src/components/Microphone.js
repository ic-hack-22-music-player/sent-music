import { ReactMic } from 'react-mic';
import React, { Component } from 'react';

const serverURL = 'http://localhost:3001'
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
        // console.log('recordedBlob is: ', recordedBlob);
        // const a = document.createElement('a');
        // a.download = 'audio.webm';
        // // a.href = URL.createObjectURL(recordedBlob);
        // a.href = recordedBlob.blobURL;
        // a.addEventListener('click', (e) => {
        //     setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        // });
        // a.click();
        fetch(serverURL+'/sendVoice', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recordedBlob)
        })
        .then(response => response.json())
        .then(data => {
            console.log("SUCCESS", data);
        })

    }

    render() {
        return (
            <div>
                <div>
                    <ReactMic
                        record={this.state.record}
                        className="sound-wave"
                        onStop={this.onStop}
                        onData={this.onData}
                        strokeColor="white"
                        backgroundColor="#9DE5B8" />
                    <div>
                        <button class="recordBtn" onClick={this.startRecording} type="button">Start</button>
                        <button class="recordBtn" onClick={this.stopRecording} type="button">Stop</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Microphone;