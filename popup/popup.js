document.querySelector('.logged-user').addEventListener('click', () => {
  const userMenu = document.querySelector('.user-menu')
  const userMenuDisplay = userMenu.style.display
  userMenu.style.display = userMenuDisplay === 'flex' ? 'none' : 'flex'
})