import { useEffect} from 'react';
import appIcon from '/Icon32.svg'; // Assuming you have the icon file in the same directory
import './App.css';

function AudioPlayer({ Url }: { Url: string }) {


  useEffect(() => {
   
    const fetchTab = async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab.url && tab.url.startsWith("chrome://")) {
        console.error("Cannot execute script on this URL:", tab.url);
        return;
      }
      chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: () => {
          const audioPlayerDiv = document.createElement('div');
          audioPlayerDiv.style.cssText = `
            position: fixed;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            background-color: #fff;
            padding: 20px;
            border-left: 2px solid #000;
          `;
          audioPlayerDiv.innerHTML = `
            <audio controls>
              <source src="${Url}" type="audio/mp3">
              Your browser does not support the audio element.
            </audio>
          `;
          document.body.appendChild(audioPlayerDiv);
        },
      });
    };

    fetchTab();

    return () => {
      const audioPlayerDiv = document.querySelector('#audioPlayerDiv');
      if (audioPlayerDiv) {
        audioPlayerDiv.remove();
      }
    };
  }, [Url]); 
  return null; 
}

function App() {
  const audioUrl='';

  return (
    <>
      <div>
          <img src={appIcon} className="logo" alt="App logo" />
      </div>
       {audioUrl &&  <AudioPlayer Url={audioUrl} />}
      <p className="read-the-docs">This is the Chrome extension to play audio on webpages.</p>
    </>
  );
}

export default App;
