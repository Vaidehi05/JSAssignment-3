const body = document.querySelector('.ham-close')
const showMenu = document.querySelector('.hamburger-logo')
const closeMenu = document.querySelector('.ham-open-logo')

showMenu.addEventListener('click', function () {
    body.className = 'ham-close hamburger-open transition'
    document.querySelector('.list').innerHTML = `<ul>
                        <li><a href="/">HOME</a></li>
                        <li><a href="/card">CARDS</a></li>
                        <li><a href="/images">IMAGES</a></li>
                        <li><a href="/about">ABOUT</a></li>
                        <li><a href="/contact">CONTACT</a></li>
    </ul>`
})

closeMenu.addEventListener('click', function () {
    body.className = 'ham-close transition'
})