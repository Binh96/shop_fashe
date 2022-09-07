let buttonElement = $('.btn-open-menu');
let iconHeartEmptyElement = document.getElementsByClassName('iconEmptyHeart');
let iconFullHeartElement = document.getElementsByClassName('iconFullHeart');
let flag = false;
let formLogin = false;
function openMenu(){
    if(!flag){
        document.getElementById('nav-list-on-mobile').style.display = 'block';
        document.getElementById('nav-list-on-mobile').style.animation = 'topToBottom .4s ease';
        flag = true;
    }
    else{
        document.getElementById('nav-list-on-mobile').style.display = 'none';
        flag = false;
    }
}

// Sroll header
window.onscroll = function() {scrollFunction()};
function scrollFunction(){
    if(document.body.scrollTop > 42 || document.documentElement.scrollTop > 42){
        document.getElementById('nav-main').style.top = "0px";
        document.getElementById('nav-main').style.height = "65px";
        document.getElementById('header').classList.add('fixed-header');
    }
    else{
        document.getElementById('nav-main').style.top = "42px";
        document.getElementById('nav-main').style.height = "80px";
        document.getElementById('header').classList.remove('fixed-header');
    }
}

function showFullHeart(para){
    for(let i =0; i < iconHeartEmptyElement.length; i++){
        if(i == para){
            iconHeartEmptyElement[i].style.display = 'none';
            iconFullHeartElement[i].style.display = 'block';
        }
    }
}

function hideFullHeart(para){
    for(let i =0; i < iconHeartEmptyElement.length; i++){
        if(i == para){
            iconHeartEmptyElement[i].style.display = 'block';
            iconFullHeartElement[i].style.display = 'none';
        }
    }
}

function onpenFormLogin(){
    document.getElementById('login-signin').style.display = 'block';
}

function closeFormLogin(){
    document.getElementById('login-signin').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function openSignUp(){
    document.getElementById('login-signin').style.display = 'block';
    document.getElementById('signUp').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
}

function openLoginForm(){
    document.getElementById('signUp').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

