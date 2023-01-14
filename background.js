
chrome.alarms.create({ delayInMinutes: 0, periodInMinutes: 1, });

chrome.alarms.onAlarm.addListener(() => {
  chrome.storage?.local?.get("token", function (data) {
    if (!!data.token) {
      chrome.storage.local.get("user", function (user) {
        const token = data.token
        if (!!user.user) {
          fetch(`https://api.twitch.tv/helix/streams/followed?user_id=${user.user.id}`, {
            method: 'GET',
            headers: {
            "Authorization": `Bearer ${token}`,
            "Client-Id": "2tmc0zaqoqsblbtv0v3tbj583q6kl5",
          }}).then(response => {
            if(response.ok) {
              response.json().then(data => {
                chrome.storage.local.get("onlineStreams", (previousOnlines) => {
                  const onlineStreams = data.data
                  chrome.action.setBadgeText({text: onlineStreams.length + ""})
                  if(!previousOnlines.onlineStreams) {
                    chrome.storage.local.set({onlineStreams}, () => {})
                  } else {
                    const prev = previousOnlines.onlineStreams
                    const filtered = onlineStreams.filter(stream => prev.find(prevStream => prevStream.id === stream.id) === undefined)
                    if(filtered.length) {
                      filtered.forEach(streamFiltered => {
                        chrome.notifications.create({
                          type: "basic",
                          title: `${streamFiltered.user_name} is online now!`,
                          message: streamFiltered.title,
                          silent: false,
                          iconUrl: "images/icon.png"
                        })
                      })
                    }
                    chrome.storage.local.set({onlineStreams}, () => {})
                  }
                })
              })
            }
          })
        }
      })
    }
  })
});