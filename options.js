document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveButton').addEventListener('click', saveOptions);

function saveOptions() {
  const historyLength = document.getElementById('historyLength').value;
  chrome.storage.sync.set(
    { maxHistoryLength: parseInt(historyLength) },
    () => {
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    }
  );
}

function restoreOptions() {
  chrome.storage.sync.get('maxHistoryLength', (data) => {
    document.getElementById('historyLength').value = data.maxHistoryLength || 5;
  });
}