function controlScroll() {
  if (window.scrollY >= window.visualViewport.height * 1.02) {
    document.querySelector('aside').classList.add('fixed')
  } else {
    document.querySelector('aside').classList.remove('fixed')
  }
}
window.addEventListener('scroll', controlScroll)
window.addEventListener('unload', () => window.removeEventListener('scroll', controlScroll))
