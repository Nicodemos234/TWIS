const button = document.querySelector('.js-authorize')
if (button) {
  button.click()
}

if (document.location.href.includes('https://nicodemos234.github.io/')) {
  const hash = decodeURI(document.location.hash).split('&')
  const token = hash[0].replace('#access_token=', '')
  // setting state
  chrome.storage.local.set({
    token
  }, function () {window.open('','_self').close()})
}


