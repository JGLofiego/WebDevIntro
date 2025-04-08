const body = document.querySelector('body').style
const header = document.querySelector('header').style
const link = document.getElementsByClassName('links-underline')[0].style
const navButton = document.getElementsByClassName('nav-img')[0]
const verified = document.getElementsByClassName('verified')[0]
const twitter = document.getElementsByName('twitter-icon')[0]
const figma = document.getElementsByName('figma-icon')[0]
const instagram = document.getElementsByName('instagram-icon')[0]
var checkbox = document.getElementsByClassName('darkmode-button')[0]

function changeMode() {
    header.transition = '0.3s'
    body.transition = '0.3s'
    if (checkbox.checked) {
        body.setProperty('--wht', '#222222');
        body.setProperty('--blk', '#FAF4E6');
        body.setProperty('--blackCheckbox', '#FAF4E6');
        body.setProperty('--blue', '#FAF4E6');
        body.setProperty('--approvalColor', '#3C3B3A')
        body.setProperty('--whtHDesktop', '#3C3B3A')
        body.setProperty('--checkboxBG', '#FAF4E6')
        link.setProperty('text-decoration', 'underline')

        if (navButton.src.indexOf("assets/images/navButton.svg") != -1) {
            navButton.src = "assets/images/darkNavButton.svg"
        } else {
            navButton.src = "assets/images/darkExitNavButton.svg"
        }

        verified.src = "assets/images/darkVerified.svg"
        twitter.src = "assets/images/darkTwitter.svg"
        figma.src = "assets/images/darkFigma.svg"
        instagram.src = "assets/images/darkInstagram.svg"
    } else {
        body.setProperty('--wht', '#FFFFFF');
        body.setProperty('--blk', '#202020');
        body.setProperty('--blackCheckbox', '#3C3B3A');
        body.setProperty('--blue', '#0065FF');
        body.setProperty('--approvalColor', '#F8F9FA')
        body.setProperty('--whtHDesktop', '#FFFFFF')
        body.setProperty('--checkboxBG', '#E5E5E5')
        link.setProperty('text-decoration', 'none')

        if (navButton.src.indexOf("assets/images/darkNavButton.svg") != -1) {
            navButton.src = "assets/images/navButton.svg"
        } else {
            navButton.src = "assets/images/exitNavButton.svg"
        }



        verified.src = "assets/images/verified.svg"
        twitter.src = "assets/images/twitter.svg"
        figma.src = "assets/images/figma.svg"
        instagram.src = "assets/images/instagram.svg"
    }
}

function toggleMenu() {
    const nav0 = document.getElementById('nav-section')
    const nav1 = document.getElementById('nav-social')
    const nav2 = document.getElementById('nav-button')
    const navBtnMarg = navButton.style.getPropertyValue('margin-bottom')

    navButton.style.setProperty('margin-bottom', '100vh')
    navButton.style.transition = '0.3s'
    if (navBtnMarg == '100vh') {
        navButton.style.setProperty('margin-bottom', '0')
    }

    if (navButton.src.indexOf("assets/images/navButton.svg") != -1) {
        navButton.src = "assets/images/exitNavButton.svg"
    } else if (navButton.src.indexOf("assets/images/darkNavButton.svg") != -1) {
        navButton.src = "assets/images/darkExitNavButton.svg"
    } else if (navButton.src.indexOf("assets/images/darkExitNavButton.svg") != -1) {
        navButton.src = "assets/images/darkNavButton.svg"
    } else {
        navButton.src = "assets/images/navButton.svg"
    }

    nav0.classList.toggle('active')
    nav1.classList.toggle('active')
    nav2.classList.toggle('active')
}