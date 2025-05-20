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

function cookieUserNameLogged(){

}

function cookieUserNameDelete(){

}

function checkCookieUser(){
    
}