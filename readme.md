# Clipboard History Manager - Chrome Extension

A simple yet powerful Chrome extension to manage your clipboard history. It stores your last 5 copied text items, making them easily accessible for pasting anywhere on the web.

## Features

*   **Stores Recent Copies**: Automatically saves the last 5 unique text items you copy.
*   **Two Ways to Paste**: Access your history through a clean popup UI or a convenient on-page menu.
*   **Popup UI**: Click the extension icon in your toolbar to view your history. Click any item to copy it to your clipboard again.
*   **Custom Paste Shortcut**: Overrides the default `Ctrl+V` (or `Cmd+V` on Mac) to display a history menu directly on the page for quick pasting.
*   **Lightweight & Secure**: Built using Manifest V3, ensuring it's efficient and adheres to modern Chrome security standards.
*   **No Empty Copies**: Ignores empty or whitespace-only selections to keep your history clean.

## How It Works

This extension provides two primary methods for interacting with your clipboard history.

### 1. The Popup Interface

*   Click the extension icon in the Chrome toolbar.
*   A dropdown will appear listing your last 5 copied items.
*   Click on any item in the list. It will be instantly copied back to your clipboard, and the popup will close.

### 2. The Custom Paste Menu (Ctrl+V)

*   On any webpage with a text field (like a search bar, a form, or a document editor), press `Ctrl+V` (or `Cmd+V` on Mac).
*   Instead of the default paste, a custom overlay menu will appear in the center of the screen.
*   This menu shows your history. Click on any item to paste it directly into the active text field.
*   To close the menu without pasting, simply press the `Esc` key or click outside the menu.

## Installation

Since this is an unpacked extension, you'll need to load it through Chrome's Developer Mode.

*   **Download the Code**: Download and unzip the project folder, or clone the repository to your local machine.
*   **Open Chrome Extensions**: Open Google Chrome and navigate to `chrome://extensions`.
*   **Enable Developer Mode**: In the top-right corner of the Extensions page, toggle on the "Developer mode" switch.
*   **Load the Extension**:
    *   Click the "Load unpacked" button that appears on the top-left.
    *   In the file selection dialog, navigate to and select the root project folder (the one containing `manifest.json`).
*   **Done!**: The "Clipboard History Manager" extension will now appear in your list of extensions and is ready to use. You can pin its icon to your toolbar for easy access.

## File Structure

Here's a brief overview of the key files in this project:

*   `manifest.json`: The core configuration file that defines the extension's permissions, scripts, and properties for Chrome.
*   `background.js`: The service worker that runs in the background. It's responsible for listening for copy events and managing the clipboard history in `chrome.storage`.
*   `popup.html`: The HTML structure for the extension's popup window.
*   `popup.js`: The JavaScript logic for the popup, responsible for fetching and displaying the history.
*   `popup.css`: The stylesheet for the popup window.
*   `content.js`: A script injected into every webpage. It listens for copy events and the `Ctrl+V` shortcut to trigger the custom paste UI.
*   `content.css`: The stylesheet for the custom on-page paste UI, designed to minimize conflicts with website styles.
*   `/icons`: A directory containing the icons for the extension (16x16, 48x48, 128x128).