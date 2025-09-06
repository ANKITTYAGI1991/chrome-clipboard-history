document.addEventListener('DOMContentLoaded', () => {
  const historyContainer = document.getElementById('history-container');

  // Request the history from the background script
  chrome.runtime.sendMessage({ type: 'getHistory' }, (history) => {
    if (history && history.length > 0) {
      historyContainer.innerHTML = ''; // Clear the default message
      history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.textContent = item;

        // Add click listener to copy text to clipboard
        div.addEventListener('click', () => {
          navigator.clipboard.writeText(item).then(() => {
            // Provide visual feedback
            div.textContent = 'Copied!';
            div.classList.add('copied-feedback');
            setTimeout(() => {
              window.close(); // Close the popup after copying
            }, 600);
          }).catch(err => {
            console.error('Failed to copy text: ', err);
          });
        });
        historyContainer.appendChild(div);
      });
    }
  });
});