const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId)
    const nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', () =>{
            nav.classList.toggle('show')
        })
    }
}

showMenu('nav-toggle','nav-menu');


const navLink = document.querySelectorAll('.nav__link'),
    navMenu = document.getElementById('nav-menu')

function linkAction() {
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', scorllActive)

function scorllActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
     })
}

window.onscroll = ()=>{
    const nav = document.getElementById('header');
    if(this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
} 

/*
const signUp = document.getElementById('sign-up'),
    signIn = document.getElementById('sign-in'),
    loginUp = document.getElementById('login-up'),
    loginIn = document.getElementById('login-in')

signUp.addEventListener ('click', ()=>{
    loginIn.classList.remove('block')
    loginUp.classList.remove('none')

    loginIn.classList.add('none')
    loginUp.classList.add('block')
})

signIn.addEventListener ('click', ()=>{
    loginIn.classList.remove('none')
    loginUp.classList.remove('block')

    loginIn.classList.add('block')
    loginUp.classList.add('none')
})*/