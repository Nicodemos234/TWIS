import { getTwitchStreamFollowed } from "../api";

const button = document.querySelector(".js-authorize");
if (button && button instanceof HTMLButtonElement) {
  button.click();
}

if (document.location.href.includes("https://nicodemos234.github.io/")) {
  const hash = decodeURI(document.location.hash).split("&");
  const token = hash[0].replace("#access_token=", "");
  getTwitchStreamFollowed(token).then((data) => {
    chrome.runtime.sendMessage({ type: "setBadge", text: data.length + "" });
    chrome.storage.local.set(
      {
        token,
      },
      function() {
        window.open("", "_self")?.close?.();
      }
    );
  });
}
