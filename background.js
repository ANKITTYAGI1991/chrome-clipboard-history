const MAX_HISTORY_LENGTH = 5;

// Initialize storage on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ clipboardHistory: [] });
  console.log("Clipboard History Manager initialized.");
});

// Main message listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "textCopied") {
    handleNewCopy(request.text);
  } else if (request.type === "getHistory") {
    chrome.storage.local.get("clipboardHistory", (data) => {
      sendResponse(data.clipboardHistory || []);
    });
    // Return true to indicate you wish to send a response asynchronously
    return true;
  }
});

function handleNewCopy(text) {
  if (!text || !text.trim()) {
      return; // Ignore empty copies
  }

  chrome.storage.local.get("clipboardHistory", (data) => {
    let history = data.clipboardHistory || [];

    // Avoid adding duplicates of the most recent item
    if (history.length > 0 && history[0] === text) {
      return;
    }

    // Add the new item to the beginning of the array
    history.unshift(text);

    // Trim the array to the maximum length
    if (history.length > MAX_HISTORY_LENGTH) {
      history = history.slice(0, MAX_HISTORY_LENGTH);
    }

    // Save the updated history
    chrome.storage.local.set({ clipboardHistory: history });
  });
}