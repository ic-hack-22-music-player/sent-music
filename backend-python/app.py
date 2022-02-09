import multiprocessing
from os.path import exists
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

import sys

sys.path.insert(0, './')

from speech2txt import transcribe_streaming
from sentiment import get_sample
from cover_art import gen_cover_art

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

    # Use google speech to text　API
    # Google API might charge money, so use the dummy sample_path for testing purpose
    # sentences = transcribe_streaming(audio_file)
    # sample_path = get_sample(sentences[0])
    sample_path = 'phrases/Final_Fantasy_7_BattleTheme_3'
    sample_path = '../../music-sentneuron/vgmidi/labelled/' + sample_path + '.mid'
    print(f'sample path: {sample_path}')

    if sample_path is None:
        data = {'msg': 'Sth went wrong when getting samplen'}
    else:
        thread = multiprocessing.Process(target=gen_cover_art)
        thread.start()
        thread.join()
        print('art generated')
        data = {'sample_path': sample_path, 'msg': 'success', 'secondary_msg': 'got sample, generated cover art'}

    return jsonify(data), 200


@app.route('/gen_cover_art')
def generate_cover_art():
    thread = multiprocessing.Process(target=gen_cover_art)
    thread.start()
    thread.join()
    return jsonify({'msg': 'success'})
