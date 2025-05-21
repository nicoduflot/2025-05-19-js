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
    quand on clique sur le bouton id btn, l'apparence du paragraphe id cible change

    si il y a une bordure, elle disparaît, sinon, la bordure doit avoir comme propriétés : 
    border-style: dashed
    border-color: black
    border-width: 2px
    */

   document.getElementById('btn').addEventListener('click', function(){
        const cible = document.getElementById('cible');
        if(cible.hasAttribute('style')){
            cible.removeAttribute('style');
        }else{
            cible.style.border = '2px dashed black';
        }
    });

    document.getElementById('btnProperty').addEventListener('click', function(){
        const cible = document.getElementById('cibleProperty');
        if(cible.style.cssText === ''){
            cible.style.setProperty('background-color', 'rgba(0, 0, 0, 0.2)');
            cible.style.setProperty('color', 'rgb(255, 0, 0)');
            cible.style.setProperty('font-size', '1.1rem');
        }else{
            console.log(cible.style.cssText);
            const tabProperty = cible.style.cssText.split('; ');
            console.log(tabProperty);
            tabProperty.map(function(prop){
                const tab = prop.split(': ');
                cible.style.removeProperty(tab[0]);
            });
            console.log(cible.style.cssText);
        }
    });

    /*
    
    Mini exercice
    Faire bouger le carré orange quand on clique sur les bouton : 
    il s'agit de la manipulation de classe associé à au carré
    */

    

});