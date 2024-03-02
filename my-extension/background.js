chrome.tabs.onUpdated.addListener((tabId, changeInfo,tab) => {
    if (changeInfo.status === "complete" && tab.url && /^http/.test(tab.url)) {
      chrome.scripting.executeScript(
        {
          target: { tabId },

          func: () => {
            const text = document.body.innerText; 
            console.log("Text",document.body,text);
            console.log("clean text",document.body.innerText);
            chrome.runtime.sendMessage({ text });
          },
        },
        () => {}
      );
    }
  });

  // background.js

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === "getText") {
      // Process the extracted text (e.g., remove unnecessary details)
      const cleanedText = processText(request.data);
      console.log("Clean text",cleanedText);
      // Send the cleaned text to the popup (or wherever needed)
      sendResponse({ data: cleanedText });
  }
});

// Example: Remove any unwanted characters or sections from the text
function processText(text) {
  // Implement your logic here (e.g., regex replacements, trimming, etc.)
  // For demonstration purposes, let's remove any numbers from the text
  return text.replace(/\d+/g, "");
}

  