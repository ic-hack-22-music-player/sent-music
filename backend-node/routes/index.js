var express = require('express');
var router = express.Router();
var fs = require('fs');
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

router.post('/makeMusic', (req, res, next) => {
    res.set({"Access-Control-Allow-Origin": "http://localhost:3000"});
    const qns = core.sequences.quantizeNoteSequence(TWINKLE_TWINKLE, 4);
    model
    .continueSequence(qns, 20, 1.5)
    .then((sample) => {
        let converted = core.sequenceProtoToMidi(sample)
        console.log(converted);
        let bytes = Buffer.alloc(converted.length);
        for (let i = 0; i<bytes.length; i++) {
            bytes[i] = converted[i];
        }

        fs.writeFile("test.mid", bytes, "binary", (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("YESSS");
                res.end(JSON.stringify({
                    data: {
                        msg: "generated",
                        path: "../../backend-node/test.mid"
                    }
                }));
            }
        })
    });
})

router.post('/sendVoice', (req, res, next)=> {
    function download(data, filename, type) {
        var file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    }
    // res.set({"Access-Control-Allow-Origin": "*"});
    console.log(req.body);
    console.log(req.body.blobURL);
    // const a = document.createElement('a');
    // a.download = 'audio.webm';
    // // a.href = URL.createObjectURL(recordedBlob);
    // a.href = req.body.blobURL;
    // a.addEventListener('click', (e) => {
    //     setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    // });
    // a.click();
    // const file = new File(
    //     req.body,
    //     "test.webm",
    //     {
    //         type: req.body.type,
    //         lastModified: new Date().getTime()
    //     }
    // )
    

    res.end();
    // console.log(JSON.parse(req.body));
})

router.post('/sendResult', (req, res, next) => {

})

module.exports = router;