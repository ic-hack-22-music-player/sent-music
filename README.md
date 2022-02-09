# mood jam

You are stuck with something, you feel a lack of creativity, or you are just simply bored. You need some motivation, but
how do you get it?

Why not use your feeling to create? Why not listen to music that's generated based on your mood? Why not mood jam?

## Requirements

### Backend (python)

- flask (server)
- google-cloud-speech (speech to text)
- samila (cover art generation)
- [vgmidi dataset](https://github.com/lucasnfe/vgmidi) (music sample)

### Frontend

- Node.js
- React.js
- magenta.js

## Running

Flask server (in `backend-python/` dir):

```
export GOOGLE_APPLICATION_CREDENTIALS=...
export FLASK_APP=app
export FLASK_ENV=development
flask run
```

Node.js server (in `backend-node/` dir):

```
npm install
nodemon start
```

React.js (in `frontend/music-player/` dir):

```
npm install
npm start
```
