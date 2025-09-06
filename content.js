// Listen for copy events on the page
document.addEventListener('copy', () => {
  const selectedText = document.getSelection().toString();
  if (selectedText) {
    chrome.runtime.sendMessage({ type: 'textCopied', text: selectedText });
  }
});

// Listen for the paste shortcut
document.addEventListener('keydown', (event) => {
  // Check for Ctrl+V on Windows/Linux or Cmd+V on Mac
  if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
    event.preventDefault(); // Prevent the default paste action
    requestHistoryAndShowUI();
  }
});

function requestHistoryAndShowUI() {
  // Remove any existing UI first
  removePasteUI();

  chrome.runtime.sendMessage({ type: 'getHistory' }, (history) => {
    if (history && history.length > 0) {
      createPasteUI(history);
    } else {
        // Fallback: If no history, perform a standard paste
        // This requires clipboardRead permission, but for a better UX,
        // it's better to just inform the user.
        console.log("Clipboard history is empty.");
        // We can't trigger a native paste easily, so we just do nothing.
    }
  });
}

function createPasteUI(history) {
  const activeElement = document.activeElement;
  
  // Create overlay and container
  const overlay = document.createElement('div');
  overlay.id = 'chm-overlay';
  
  const container = document.createElement('div');
  container.id = 'chm-container';

  const title = document.createElement('div');
  title.id = 'chm-title';
  title.textContent = 'Paste from History (Press Esc to close)';
  container.appendChild(title);

  history.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'chm-item';
    
    const itemIndex = document.createElement('span');
    itemIndex.className = 'chm-item-index';
    itemIndex.textContent = `${index + 1}.`;
    
    const itemText = document.createElement('span');
    itemText.className = 'chm-item-text';
    itemText.textContent = item;

    itemDiv.appendChild(itemIndex);
    itemDiv.appendChild(itemText);
    
    itemDiv.addEventListener('click', () => {
      pasteText(activeElement, item);
      removePasteUI();
    });
    container.appendChild(itemDiv);
  });
  
  document.body.appendChild(overlay);
  document.body.appendChild(container);

  // Add listeners to close the UI
  overlay.addEventListener('click', removePasteUI);
  document.addEventListener('keydown', closeOnEscape);
}

function pasteText(element, text) {
  if (element) {
    // Check if the element is an input, textarea, or contentEditable
    const isEditable = element.isContentEditable;
    const isInput = element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';

    if (isEditable || isInput) {
      const start = element.selectionStart;
      const end = element.selectionEnd;
      const originalValue = element.value || element.textContent;
      
      const newValue = originalValue.slice(0, start) + text + originalValue.slice(end);
      
      if (isInput) {
        element.value = newValue;
      } else {
        element.textContent = newValue;
      }

      // Restore cursor position
      const newCursorPos = start + text.length;
      element.focus();
      if (isInput) {
        element.setSelectionRange(newCursorPos, newCursorPos);
      } else {
        // For contentEditable, this is more complex, but we can try
        const range = document.createRange();
        const sel = window.getSelection();
        // This part can be tricky across browsers for contentEditable
        if (element.childNodes.length > 0) {
            range.setStart(element.childNodes[0], newCursorPos > element.textContent.length ? element.textContent.length : newCursorPos);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
      }
    }
  }
}

function removePasteUI() {
  const overlay = document.getElementById('chm-overlay');
  const container = document.getElementById('chm-container');
  if (overlay) overlay.remove();
  if (container) container.remove();
  document.removeEventListener('keydown', closeOnEscape);
}

function closeOnEscape(event) {
  if (event.key === 'Escape') {
    removePasteUI();
  }
}