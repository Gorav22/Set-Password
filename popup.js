document.getElementById("setPassword").addEventListener("click", () => {
  const password = document.getElementById("password").value;
  if (password) {
    chrome.storage.local.set({ password: password }, () => {
      document.getElementById("message").innerText =
        "Password set successfully!";
    });
  } else {
    document.getElementById("message").innerText = "Password cannot be empty.";
  }
});
