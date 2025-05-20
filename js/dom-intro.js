console.log('chargement de la page');
window.addEventListener('DOMContentLoaded', function(){
    console.log('page chargée, début du script interaction utilisateur');
    /*
    pour récupérer un élément : 
    on peut utiliser plusieurs méthode
        - getElementById(id-de-l-element)
        - getElementsByClassName('classe recherchée')

    */
    const titrePrinc = document.getElementById('titre-principal');
    console.log(titrePrinc);
    titrePrinc.addEventListener('click', function(event){
        console.log(event);
        console.log(this.innerText);
        
    });

    /*
    const pStupid = document.getElementsByClassName('stupid');
    console.log(pStupid);
    */

    /* on utilise un sélecteur CSS pour cibler un seul élément */
    const headerSite = document.querySelector('body > header');
    console.log(headerSite);
    
    /* on utilise un sélecteur CSS pour récupérer une collection d'éléments correspondants à ce sélecteur */
    const allListItem = document.querySelectorAll('body > nav li a');
    console.log(allListItem);
    
    /* exercice */
    /* 
    répérez le click sur le bouton "testez-moi" et au click afficher un message dans la console
    */

    const buttonTest = document.querySelector('.test');
    console.log(buttonTest);

    buttonTest.addEventListener('click', function(event){
        event.stopPropagation();
        console.log(this.innerText);
        /*console.log(buttonTest.innerText);*/
    });

    console.log(document.querySelectorAll('main'));
    console.log(document.querySelectorAll('.container'));
    
    console.log(document.querySelector('p:not(p.stupid)'));
    console.log(document.querySelectorAll('p:not(p.stupid)'));
    console.log(document.querySelectorAll('p:not(.stupid)'));
    
    document.querySelectorAll('p:not(.special)').forEach(function(para){
        para.addEventListener('click', function(){
            this.classList.toggle('fondGris');
            /* Maintenant, il faut écrire dans la div avec l'id showP le texte contenu dans le paragraphe cliqué */
            document.getElementById('showP').innerText = this.innerText;
        });
    });

    /* repérer l'image et l'abonner à l'événement souris qui entre dans son "périmètre" (la surface que l'image occupe sur la page) */

    const imgOver = document.getElementById('img-over');
    imgOver.addEventListener('mouseenter', function(){
        this.setAttribute('src', './images/pip-boy-thumb-up.png');
        if(this.nextElementSibling){
            this.nextElementSibling.innerText = 'Pip boy pouce en l\'air'
        }
        if(this.previousElementSibling){
            this.previousElementSibling.innerText = 'Pip boy pouce en l\'air'
        }
    });
    imgOver.addEventListener('mouseleave', function(){
        this.setAttribute('src', './images/pip-boy-thumb-down.png');
        if(this.nextElementSibling){
            this.nextElementSibling.innerText = 'Pip boy pouce en bas';
        }
        if(this.previousElementSibling){
            this.previousElementSibling.innerText = 'Pip boy pouce en bas';
        }
    });


});