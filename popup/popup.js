const userMenu = document.querySelector('.user-menu')
const loginBtn = document.querySelector('#login-btn')
const loggedUserDiv = document.querySelector('#logged-user')
const logoutBtn = document.querySelector('#logout-button')
const cardList = document.querySelector('.card-list')
const notLoggedBody = document.querySelector('.not-logged-body')
const aboutBtn = document.querySelector('#about-button')

loggedUserDiv?.addEventListener('click', () => {
  const userMenuDisplay = userMenu?.style?.display
  userMenu.style.display = userMenuDisplay === 'flex' ? 'none' : 'flex'
})

logoutBtn?.addEventListener('click', () => {
  chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError
    if (error) {
        console.error(error)
    } else {
      loggedUserDiv.style.display = 'none'
      userMenu.style.display = 'none'
      cardList.style.display = 'none'
      loginBtn.style.display = 'flex'
      notLoggedBody.style.display = 'flex'
    }
})
})

const twitchApi = {
  api: "https://id.twitch.tv/oauth2/authorize",
  response_type: 'token',
  client_id: '2tmc0zaqoqsblbtv0v3tbj583q6kl5',
  scope: 'user:read:follows',
  redirect_uri: 'https://nicodemos234.github.io/twitch.html'
}
loginBtn.addEventListener('click', (event) => {
  event.preventDefault()

  chrome.tabs.create({ url: `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${twitchApi.client_id}&redirect_uri=${twitchApi.redirect_uri}&scope=${twitchApi.scope}` })
})

const handleUser = (user, token) => {
  loggedUserDiv.style.display = 'flex'
  loggedUserDiv.querySelector('p').innerText = user.display_name
  cardList.innerHTML = ''
  cardList.style.display = 'flex'
  notLoggedBody.style.display = 'none'
  $.ajax({
    url: `https://api.twitch.tv/helix/streams/followed?user_id=${user.id}`,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Client-Id": twitchApi.client_id
    }
  }).then(resp => {
    resp.data.forEach(stream => {
      cardList.innerHTML = cardList.innerHTML + `
      <a class="card" href="https://twitch.tv/${stream.user_login}" target="_blank">
      <div>
        <div class="image-wrapper">
          <img src="${stream.thumbnail_url.replace('{width}', '500').replace('{height}', '280')}" />
          <div class="time-area">${getTimeStreaming(stream.started_at)}</div>
        </div>
      </div>
      <div class="info-area">
        <p class="live-user">${stream.user_name}</p>
        <p class="other-info">${stream.game_name} - ${stream.viewer_count}</p>
        <p class="other-info limit-line-1">${stream.title}</p>
      </div>
    </a>
      `
    })
  })
}

chrome.storage?.local?.get("token", function (data) {
  if (!!data.token) {
    // Remove the login btn if is logged
    loginBtn.style.display = 'none'
    chrome.storage.local.get("user", function (user) {
      const token = data.token
      if (!user.user) {
        $.ajax({
          url: 'https://api.twitch.tv/helix/users',
          headers: {
            "Authorization": `Bearer ${token}`,
            "Client-Id": twitchApi.client_id
          }
        }).then(resp => {
          const user = resp.data[0]
          chrome.storage.local.set({
            user
          }, function () { })
          handleUser(user, token)
        })
      } else {
        handleUser(user.user, token)
      }
    })
  }
})

const getTimeStreaming = (started) => {
  const datePast = new Date(started)
  const dateNow = new Date()
  // get total seconds between the times
  let delta = Math.abs(dateNow - datePast) / 1000;

  // calculate (and subtract) whole hours
  let hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  hours = hours.toFixed()

  // calculate (and subtract) whole minutes
  let minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  minutes = minutes.toFixed()

  // what's left is seconds
  let seconds = delta % 60;
  seconds = seconds.toFixed()
  return `${hours !== '0' ? hours + ':' : ''}${minutes !== '0' ? minutes + ':' : ''}${seconds}`
}

aboutBtn.addEventListener('click', () => {
  chrome.tabs.create({ url: `https://github.com/Nicodemos234/twis` })
})