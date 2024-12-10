chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ password: null }, () => {
    console.log("Password not set yet.");
  });
});

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get("password", (result) => {
    if (result.password) {
      const userPassword = prompt("Enter your password to access the browser:");
      if (userPassword !== result.password) {
        alert("Incorrect password! The browser will now close.");
        closeBrowser();
      }
    }
  });
});

function closeBrowser() {
  // Note: Directly closing the browser is not supported for security reasons. Here, we can close all tabs as a workaround.
  chrome.tabs.query({}, function (tabs) {
    for (let tab of tabs) {
      chrome.tabs.remove(tab.id);
    }
  });
}
