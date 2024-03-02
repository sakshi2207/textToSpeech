chrome.tabs.onUpdated.addListener((tabId, changeInfo,tab) => {
    if (changeInfo.status === "complete" && tab.url && /^http/.test(tab.url)) {
      chrome.scripting.executeScript(
        {
          target: { tabId },

          func: () => {
            const text = document.body.innerText; 
            console.log("Text",text);
            chrome.runtime.sendMessage({ text });
          },
        },
        () => {}
      );
    }
  });
  