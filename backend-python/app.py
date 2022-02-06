from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from os.path import exists

import sys

sys.path.insert(0, './')

from speech2txt import transcribe_streaming
from sentiment import get_sample

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/dummy')
def hello_world():
    return '<p>Hello, World!</p>'


@app.route('/sentiment')
@cross_origin()
def process_audio_and_sentiment():
    print('got a request')
    audio_file = 'speech.webm'
    if not exists(audio_file):
        print('oh no trash')
        data = {'msg': 'File speech.webm does not exist'}
        return jsonify(data), 200

    # sentences = transcribe_streaming(audio_file)
    # sample_path = get_sample(sentences[0])
    sample_path = 'phrases/Final_Fantasy_7_BattleTheme_3'
    sample_path = '../../music-sentneuron/vgmidi/labelled/' + sample_path + '.mid'
    print(f'sample path: {sample_path}')

    if sample_path is None:
        data = {'msg': 'Sth went wrong'}
    else:
        data = {'sample_path': sample_path, 'msg': 'success'}
    return jsonify(data), 200
