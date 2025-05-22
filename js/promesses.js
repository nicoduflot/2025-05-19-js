/*
    Les promesses ou promise = créer une fonction asynchrone dont l'éxécution ne stoppe pas ou ne "fige" pas l'utilisation de la page

    Une promesse renvoie deux type de résultat : 
    Soit la demande abouti on a se qu'on appelle un         "resolve()"
    Soit la demande n'abouti pas on a se qu'on appelle un   "reject()"
*/

/*

Le traitement long n'est pas la fonction asynchrone, mais il est appelé par elle

on déclenche au clic sur un bouton une fonction asynchrone, elle attend la résilution d'une promesse, cette promesse renverra resolve ou reject à la fonction asynchrone qui contiuera ensuite le reste de son traitement sans empêcher l'utilisation et / ou l'affichage de la page

*/

function traitementLong(){
    /* 
    la fonction qui a un traitement long doit lancer ce traitement en utilisant une instance de promesse : 
    il donne la promesse de finir, quel que soit le résultat, bon ou mauvais, du traitement */

    /* pour simuler le cas ou on a un rejet, on va lancer un nombre entre 1 et 3, si c'est 2, c'est un rejet 
    [0;1[
    */
    const randError = Math.floor(Math.random()*3 + 1);
    console.log(randError);
    const data = 'Le formateur aime bien jouer à tout, tout le temps';
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            if(randError === 2){
                reject('erreur');
            }else{
                resolve(data);
            }
        }, 3000);

    });
    
}

/* traitementLong(); */

async function asyncCall() {
    const result = await traitementLong();
    return result;
}

window.addEventListener('DOMContentLoaded', function(){
    document.querySelector('button.read').addEventListener('click', function(){
        let data = '';
        asyncCall()
        .then(function(result){
            console.log(result);
            data = data + result;
        })
        .catch(function(erreur){
            console.error(erreur);
            data = data + erreur;
        })
        .finally(function(){
            console.log('traitement est terminé');
            data = data + '<br />Fonction asynchrone terminée';
            document.getElementById('result').innerHTML = data;
        });
    });
});