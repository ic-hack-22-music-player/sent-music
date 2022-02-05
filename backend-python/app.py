from flask import Flask, jsonify
from os.path import exists

import sys

sys.path.insert(0, './')

from speech2txt import transcribe_streaming
from sentiment import get_sample

app = Flask(__name__)


@app.route('/dummy')
def hello_world():
    return '<p>Hello, World!</p>'


@app.route('/sentiment')
def process_audio_and_sentiment():
    audio_file = 'speech.webm'
    if not exists(audio_file):
        data = {'msg': 'File speech.webm does not exist'}
        return jsonify(data), 200

    sentences = transcribe_streaming(audio_file)
    sample_path = get_sample(sentences[0])

    if sample_path is None:
        data = {'msg': 'Sth went wrong'}
    else:
        data = {'sample_path': sample_path, 'msg': 'success'}
    return jsonify(data), 200
