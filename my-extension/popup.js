const inputText = document.getElementById('inputText');
const playButton = document.getElementById('playButton');
const audioPlayer = document.getElementById('audioPlayer');
const speedInput = document.getElementById('speedInput');
const voiceSelect = document.getElementById('voiceSelect');

const synth = window.speechSynthesis;

function populateVoiceList() {
    const voices = synth.getVoices();
    console.log("Voices",voices);
    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = voice.name;
        voiceSelect.appendChild(option);
    });
}

playButton.addEventListener('click', () => {
    const text = inputText.value;
    if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = parseFloat(speedInput.value); 
        utterance.voice = synth.getVoices().find((voice) => voice.name === voiceSelect.value);
        console.log("Text",text,utterance);    
        synth.speak(utterance);
    }
});


synth.onvoiceschanged = populateVoiceList;


// This script would be part of your Chrome extension's content script

// Function to get selected text
function getSelectedText() {
    return window.getSelection().toString();
}

// Function to send text to speech
function textToSpeech(text) {
    // Use the Web Speech API to speak the text
    // let msg = new SpeechSynthesisUtterance(text);
    // window.speechSynthesis.speak(msg);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = parseFloat(speedInput.value); 
    utterance.voice = synth.getVoices().find((voice) => voice.name === voiceSelect.value);
    console.log("Text",text,utterance);    
    synth.speak(utterance);
}
console.log("Chrome",chrome)
// Add a context menu item to trigger text-to-speech
chrome.contextMenus.create({
    title: "Read Aloud",
    contexts: ["selection"],
    onclick: function(info, tab) {
        const selectedText = getSelectedText();
        console.log("Text",selectedText);
        console.log("Text11",info);

        if (selectedText) {
            textToSpeech(selectedText);
        }
    }
});


chrome.runtime.sendMessage({ method: "getText" }, (response) => {
    const cleanedText = response.data;
    // Display the cleaned text in your popup UI
    console.log("Cleaned Text:", cleanedText);
});