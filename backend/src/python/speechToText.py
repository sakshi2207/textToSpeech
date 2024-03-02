from transformers import VitsModel, VitsTokenizer
from IPython.display import Audio
import torch
import sys
# from pydub import AudioSegment

def textToSpeech(text):
    model = VitsModel.from_pretrained("facebook/mms-tts-deu")
    tokenizer = VitsTokenizer.from_pretrained("facebook/mms-tts-deu")
    text_example = (text)
    
    inputs = tokenizer(text_example, return_tensors="pt")
    input_ids = inputs["input_ids"]

    with torch.no_grad():
        outputs = model(input_ids)
    speech = outputs["waveform"]

    return Audio(speech, rate=20000)

def saveToAudio(speech):
    with open('./test.wav', 'wb') as f:
        f.write(speech.data)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python ./python.py <text>")
        sys.exit(1)

    text = sys.argv[1]
    speech = textToSpeech(text)
    saveToAudio(speech)
    print("Audio saved to audio_file.wav")






