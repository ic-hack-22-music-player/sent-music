let express = require('express');
let router = express.Router();
let fs = require('fs');
let fetch = require('node-fetch')


const flaskURL = 'http://127.0.0.1:5000'
const music_rnn = require('@magenta/music/node/music_rnn');
const core = require('@magenta/music/node/core');

const model = new music_rnn.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
model.initialize();

const TWINKLE_TWINKLE = {
    notes: [
        {pitch: 60, startTime: 0.0, endTime: 0.5},
        {pitch: 60, startTime: 0.5, endTime: 1.0},
        {pitch: 67, startTime: 1.0, endTime: 1.5},
        {pitch: 67, startTime: 1.5, endTime: 2.0},
        {pitch: 69, startTime: 2.0, endTime: 2.5},
        {pitch: 69, startTime: 2.5, endTime: 3.0},
        {pitch: 67, startTime: 3.0, endTime: 4.0},
        {pitch: 65, startTime: 4.0, endTime: 4.5},
        {pitch: 65, startTime: 4.5, endTime: 5.0},
        {pitch: 64, startTime: 5.0, endTime: 5.5},
        {pitch: 64, startTime: 5.5, endTime: 6.0},
        {pitch: 62, startTime: 6.0, endTime: 6.5},
        {pitch: 62, startTime: 6.5, endTime: 7.0},
        {pitch: 60, startTime: 7.0, endTime: 8.0},
    ],
    totalTime: 8
};


router.post('/makeMusic', (req, res) => {
    let sample_path = req.body.sample_path
    fs.readFile(sample_path, function (err, data) {
        let ns = core.midiToSequenceProto(data)
        const qns = core.sequences.quantizeNoteSequence(ns, 4)
        qns.notes.forEach(n => {
            if (n.pitch <= 50) {
                n.pitch = 51
            }
            if (n.pitch >= 80) {
                n.pitch = 79
            }
        })
        // const qns = core.sequences.quantizeNoteSequence(TWINKLE_TWINKLE, 4);

        model
            .continueSequence(qns, 100, 1.2)
            .then((sample) => {
                sample.notes.forEach(n => n.velocity = 100)
                console.log(sample)
                let converted = core.sequenceProtoToMidi(sample)
                console.log(converted.length)
                let bytes = Buffer.alloc(converted.length);
                for (let i = 0; i < bytes.length; i++) {
                    bytes[i] = converted[i];
                }

                fs.writeFile("../frontend/music-player/src/generated.mid", bytes, "binary", (err) => {
                    if (err) {
                        console.log(err);
                        res.end(JSON.stringify({msg: 'failed to generate'}))
                    } else {
                        console.log("YESSS");
                        res.end(JSON.stringify({msg: 'generated'}))
                    }
                })
            });
    });
})

router.get('/test_url_note', (req, res) => {
    // let sample_path = '../../music-sentneuron/vgmidi/labelled/phrases/Final_Fantasy_7_BattleTheme_3.mid'
    let sample_path = '../frontend/music-player/src/test.mid'
    fetch('http://127.0.0.1:3001/makeMusic', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'sample_path': sample_path})
    }).then(res => res.json()).then(data => {
        console.log(data);
        res.end('bro')
    })
})

router.post('/sendVoice', (req, res, next) => {
    res.set({"Access-Control-Allow-Origin": "http://localhost:3000"});

    let buf = Buffer.from(req.body.blob, 'base64');
    console.log(req.body.blob)
    fs.writeFile('../backend-python/speech.webm', buf, (err) => {
            if (err) {
                console.log('not able to save file')
                res.end(JSON.stringify({
                    msg: err
                }))
            } else {
                console.log("SUCCESS");

                fetch(flaskURL + '/sentiment')
                    .then(res => res.json()).then(
                    data => {
                        console.log(data);
                        if (data.msg === "success") {
                            console.log("success getting sample path");
                            console.log(data.sample_path);

                            let sample_path = data.sample_path
                            fetch('http://127.0.0.1:3001/makeMusic', {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({'sample_path': sample_path})
                            }).then(res => res.json()).then(data => {
                                console.log(data);
                                res.end(JSON.stringify({
                                        msg: "SUCCESS, maybe"
                                    }
                                ));
                            })
                        } else {
                            console.log(data.msg);
                            res.end(JSON.stringify({msg: 'sth went wrong again >('}))
                        }
                    }
                ).catch(err => console.log(err))
            }
        }
    );

})

router.post('/sendResult', (req, res, next) => {

})

module.exports = router;
