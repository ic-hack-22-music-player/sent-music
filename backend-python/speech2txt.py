import io
# import re
# import pyaudio
# from six.moves import queue
# import sys
from typing import List

from google.cloud import speech


def transcribe_streaming(speech_file: str) -> List[str]:
    client = speech.SpeechClient()

    with io.open(speech_file, 'rb') as audio_file:
        content = audio_file.read()

    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.WEBM_OPUS,
        sample_rate_hertz=48000,
        language_code="en-US",
    )

    response = client.recognize(config=config, audio=audio)

    # Each result is for a consecutive portion of the audio. Iterate through
    # them to get the transcripts for the entire audio file.
    for result in response.results:
        # The first alternative is the most likely one for this portion.
        print(u"Transcript: {}".format(result.alternatives[0].transcript))

    return [r.alternatives[0].transcript for r in response.results]

#
# # Audio recording parameters
# RATE = 16000
# CHUNK = int(RATE / 10)  # 100ms
#
#
# class MicrophoneStream(object):
#     """Opens a recording stream as a generator yielding the audio chunks."""
#
#     def __init__(self, rate, chunk):
#         self._rate = rate
#         self._chunk = chunk
#
#         # Create a thread-safe buffer of audio data
#         self._buff = queue.Queue()
#         self.closed = True
#
#     def __enter__(self):
#         self._audio_interface = pyaudio.PyAudio()
#         self._audio_stream = self._audio_interface.open(
#             format=pyaudio.paInt16,
#             channels=1,
#             rate=self._rate,
#             input=True,
#             frames_per_buffer=self._chunk,
#             stream_callback=self._fill_buffer,
#         )
#
#         self.closed = False
#
#         return self
#
#     def __exit__(self, type, value, traceback):
#         self._audio_stream.stop_stream()
#         self._audio_stream.close()
#         self.closed = True
#         self._buff.put(None)
#         self._audio_interface.terminate()
#
#     def _fill_buffer(self, in_data, frame_count, time_info, status_flags):
#         self._buff.put(in_data)
#         return None, pyaudio.paContinue
#
#     def generator(self):
#         while not self.closed:
#             chunk = self._buff.get()
#             if chunk is None:
#                 return
#             data = [chunk]
#
#             while True:
#                 try:
#                     chunk = self._buff.get(block=False)
#                     if chunk is None:
#                         return
#                     data.append(chunk)
#                 except queue.Empty:
#                     break
#
#             yield b"".join(data)
#
#
# def listen_print_loop(responses):
#     num_chars_printed = 0
#     for response in responses:
#         if not response.results:
#             continue
#
#         result = response.results[0]
#         if not result.alternatives:
#             continue
#
#         transcript = result.alternatives[0].transcript
#
#         overwrite_chars = " " * (num_chars_printed - len(transcript))
#
#         if not result.is_final:
#             sys.stdout.write(transcript + overwrite_chars + "\r")
#             sys.stdout.flush()
#
#             num_chars_printed = len(transcript)
#
#         else:
#             print(transcript + overwrite_chars)
#             if re.search(r"\b(exit|quit)\b", transcript, re.I):
#                 print("Exiting..")
#                 break
#
#             num_chars_printed = 0
#
#
# def speech_to_text_func():
#     language_code = "en-US"
#     client = speech.SpeechClient()
#     config = speech.RecognitionConfig(
#         encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
#         sample_rate_hertz=RATE,
#         language_code=language_code,
#     )
#
#     streaming_config = speech.StreamingRecognitionConfig(
#         config=config, interim_results=True
#     )
#
#     with MicrophoneStream(RATE, CHUNK) as stream:
#         audio_generator = stream.generator()
#         requests = (
#             speech.StreamingRecognizeRequest(audio_content=content)
#             for content in audio_generator
#         )
#
#         responses = client.streaming_recognize(streaming_config, requests)
#
#         # Now, put the transcription responses to use.
#         listen_print_loop(responses)
