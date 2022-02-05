import csv
import random
import requests
from typing import Optional

VGMIDI_PATH = '/Users/kittygu/Desktop/music-sentneuron/vgmidi/labelled'

pos_midi = []
neg_midi = []
with open(VGMIDI_PATH + '/vgmidi_sent_train.csv', newline='') as f:
    reader = csv.reader(f, delimiter=',')
    for i, row in enumerate(reader):
        if i > 0:
            sent, _, path = row
            if sent == '1':
                pos_midi.append(path)
            else:
                neg_midi.append(path)


def get_sentiment(text: str) -> Optional[int]:
    r = requests.post('http://text-processing.com/api/sentiment/', data={'text': text})
    if r.status_code != 200:
        return None
    r = r.json()
    neg_p = r['probability']['neg']
    pos_p = r['probability']['pos']

    return -1 if neg_p > pos_p else 1


def get_sample(text: str) -> Optional[str]:
    sentiment = get_sentiment(text)
    if sentiment is None:
        return None
    return random.choice(pos_midi) if sentiment == 1 else random.choice(neg_midi)
