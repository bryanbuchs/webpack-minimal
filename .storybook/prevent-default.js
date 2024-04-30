// Ignore clicks on links to "LINK"

document.addEventListener('click', function (event) {
  const link = event.target.closest('a[href="LINK"]')
  if (link) {
    event.preventDefault()

    // // simulate menu active/trail classes
    // const nav = event.target.closest('nav')
    // if (nav) {
    //   const actives = nav.querySelectorAll('.is-active')
    //   actives.forEach((link) => link.classList.remove('is-active'))
    //   link.classList.add('is-active')
    // }

    return false
  }
})
