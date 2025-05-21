window.addEventListener('DOMContentLoaded', function(){
    const myDiv = document.getElementById('myDiv');
    myDiv.style.height = '100px';
    myDiv.style.margin = '10px 0';
    /*
    myDiv.style.setProperty('border-style', 'solid');
    myDiv.style.setProperty('border-width', '2px');
    myDiv.style.setProperty('border-color', 'black');
    */
    /*
    myDiv.style.setProperty('border', '2px solid black');
    */
    myDiv.style.border = '2px solid black';
    myDiv.style.backgroundColor = 'darkviolet';
    console.log(myDiv.style);    
    console.log(myDiv.style.getPropertyValue('background-color'));
    
    myDiv.addEventListener('click', function(){
        if(myDiv.style.getPropertyValue('background-color')){
            myDiv.style.removeProperty('background-color');
        }else{
            myDiv.style.setProperty('background-color', 'darkviolet');
        }
    });

    /*
    exercice : 
    quand on clicque sur le bouton id btn, l'apparence du paragraphe id cible change

    si il y a une bordure, elle disparaît, sinon, la bordure doit avoir comme propriétés : 
    border-style: dashed
    border-color: black
    border-width: 2px
    */

});