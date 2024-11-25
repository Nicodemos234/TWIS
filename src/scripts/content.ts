const button = document.querySelector(".js-authorize");
if (button && button instanceof HTMLButtonElement) {
  button.click();
}

if (document.location.href.includes("https://nicodemos234.github.io/")) {
  const hash = decodeURI(document.location.hash).split("&");
  const token = hash[0].replace("#access_token=", "");
  chrome.runtime.sendMessage({
    type: "updateBadgeToFollowers",
    text: token + "",
  });
  chrome.storage.local.set(
    {
      token,
    },
    function() {
      window.open("", "_self")?.close?.();
    }
  );
}
