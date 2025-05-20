/* session */
function sessionUserNameLogged(){
    const username = document.getElementById('sessionUser').value;
    console.log(username);
    if('' !== username){
        sessionStorage.setItem('username', username);
        document.getElementById('sessionUserLogged').innerHTML = `<b>${username}</b>`;
    }
}

function checkSessionUser(){
    if(username = sessionStorage.getItem('username')){
        document.getElementById('sessionUserLogged').innerHTML = `<b>${username}</b>`;
    }
}

function sessionUserNameDelete(){
    sessionStorage.removeItem('username');
    document.getElementById('sessionUserLogged').innerHTML = '';
}

function sessionUserNameClear(){
    sessionStorage.clear();
    document.getElementById('sessionUserLogged').innerHTML = '';
}

/* local */

function localUserNameLogged(){
    const username = document.getElementById('localUser').value;
    console.log(username);
    if('' !== username){
        localStorage.setItem('username', username);
        document.getElementById('localUserLogged').innerHTML = `<b>${username}</b>`;
    }
}

function checkLocalUser(){
    if(username = localStorage.getItem('username')){
        document.getElementById('localUserLogged').innerHTML = `<b>${username}</b>`;
    }
}

function localUserNameDelete(){
    localStorage.removeItem('username');
    document.getElementById('localUserLogged').innerHTML = '';
}

function localUserNameClear(){
    localStorage.clear();
    document.getElementById('localUserLogged').innerHTML = '';
}

/* cookie */
console.log(document.cookie);
/*
'nom=valeur; max-age=secondes; path=/storage; Samesite=Strict; secure'
*/

/* généralement, on peut aussi utiliser une date d'expiration pour la durée d'un cookie */

/* les date en JS */
const dateNow = new Date();
console.log(dateNow);
console.log(dateNow.getMonth());
console.log(dateNow.getTime());
console.log(dateNow.toUTCString());
console.log(dateNow.setTime(dateNow.getTime() + (24 * 60 * 60 * 1000)));
console.log(dateNow.toUTCString());
console.log(dateNow);
/*
on utilisera max-age, qui est la durée du cookie pour se simplifier la création de cookie
*/

/**
 * 
 * @param {String} name - nom du cookie
 * @param {String} value - valeur du cookie
 * @param {Int} days - nombre de jour de validité du cookie
 * @returns 
 */
function setCookie(name, value = '', days = -1){
    const maxAge = days * 24 * 60 * 60;
    const chaineCookie = `${name}=${value}; max-age=${maxAge}; path=/storage.html; Samesite=Strict; secure`;
    document.cookie = chaineCookie;
    return true;
}

function getCookie(name){
    const tabCookie = document.cookie.split('; ');
    for(cookie of tabCookie){
        const tabValue = cookie.split('=');
        if(tabValue[0] === name){
            return tabValue[1];
        }
    }
    return '';
}

/*console.log(getCookie('truc'));*/

function cookieUserNameLogged(){
    const userName = document.getElementById('cookieUser').value;
    if(userName !== ''){
        setCookie('username', userName, 1);
        document.getElementById('cookieUser').value = '';
        checkCookieUser();
    }
}

function cookieUserNameDelete(){
    setCookie('username');
    checkCookieUser();
}

function checkCookieUser(){
    document.getElementById('cookieUserLogged').innerHTML = getCookie('username');
}