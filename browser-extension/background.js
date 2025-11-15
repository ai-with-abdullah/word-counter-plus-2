// Background service worker for context menu
chrome.runtime.onInstalled.addListener(() => {
  // Create context menu item
  chrome.contextMenus.create({
    id: "analyzeText",
    title: "Analyze with Word Counter Plus",
    contexts: ["selection"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "analyzeText" && info.selectionText) {
    // Store the selected text
    chrome.storage.local.set({ 
      selectedText: info.selectionText,
      timestamp: Date.now()
    }, () => {
      // Open popup
      chrome.action.openPopup();
    });
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSelectedText") {
    chrome.storage.local.get(["selectedText"], (result) => {
      sendResponse({ text: result.selectedText || "" });
    });
    return true; // Keep channel open for async response
  }
});
