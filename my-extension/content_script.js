function extractText() {
    return document.body.innerText;
}

// Send the extracted text to the background script
chrome.runtime.sendMessage({ method: "getText", data: extractText() });