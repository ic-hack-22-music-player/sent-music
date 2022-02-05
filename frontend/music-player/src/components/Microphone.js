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
        console.log(recordedBlob);
        const blobToBase64 = (blob) => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = function () {
                resolve(reader.result.split(',')[1]);
              };
            });
          };
  
        (async () => {
            const b64 = await blobToBase64(recordedBlob.blob);
            const jsonString = JSON.stringify({blob: b64});
            console.log(jsonString);
            console.log(recordedBlob);
            fetch(serverURL+'/sendVoice', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Content-Type': 'application/json',
                },
                body: jsonString
            })
            .then(response => response.json())
            .then(data => {
                console.log("SUCCESS", data);
            }).catch(
                (err) => {
                    console.log(err);
                }
            )
          })();
        

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
                        <button className="recordBtn" onClick={this.startRecording} type="button">Start</button>
                        <button className="recordBtn" onClick={this.stopRecording} type="button">Stop</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Microphone;