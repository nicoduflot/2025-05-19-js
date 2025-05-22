window.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('p[data-module]').forEach(function(p){
        const module = p.dataset.module;
        switch(module){
            case 'color':
                //
                const color = p.dataset.color || '#ff0000';
                p.addEventListener('mouseenter', function(){
                    this.style.setProperty('color', color);
                });
                p.addEventListener('mouseleave', function(){
                    this.style.removeProperty('color');
                });
            break;
            case 'font':
            case 'magie':
                //
                const weight = p.dataset.weight || 'bolder';
                p.addEventListener('mouseenter', function(){
                    this.style.setProperty('font-weight', weight);
                });
                p.addEventListener('mouseleave', function(){
                    this.style.removeProperty('font-weight');
                });
            break;
            case 'after':
            default:
                /*
                mini exercice
                modifier le HTML et le JS pour afficher le style d'écriture du paragraphe  en italique quand on le survol.
                font-style: italic
                font-style: normal
                */
                const style = p.dataset.style || 'italic';
                p.addEventListener('mouseenter', function(){
                    this.style.setProperty('font-style', style);
                });
                p.addEventListener('mouseleave', function(){
                    this.style.removeProperty('font-style');
                });

        }
    });

    /*
    Menu glissant
    Il s'agit simplement d'ajouter une classe à un élément qui est situé hors affichage (en dehors du viewport)

    On repère le clic sur les boutons avec la classe toggle-menu
    Le bouton cliqué nous donne le menu ciblé grâce au dataset target
    on ajoute à la cible la classe qui déclenche l'action du menu
    quand on clique à nouveau sur le bouton on enlève la classe et le menu sort de l'écran
    */
    document.querySelectorAll('button.toggle-menu').forEach(function(button){
        button.addEventListener('click', function(){
            document.querySelector(this.dataset.target).classList.toggle('toggle-element');
        });
    });

    /*
    On ajoute un bouton pour fermer le menu dans le menu

    On clic sur ce bouton close contenu dans une nav ayant la classe slide-menu
    on reprère l'élément parent du bouton
    on remove la classe toggle-element du parent
    */
    document.querySelectorAll('.slide-menu button.btn-close').forEach(function(button){
        button.addEventListener('click', function(){
            this.parentElement.classList.remove('toggle-element');
        });
    });

    /* 
    Interactivité sur un tableau
    parcourir toutes les td du tableau id coord, abonner chaque td aux événements mouseenter et mouseleave
        - mouseenter : on récupère les dataset de la td column et line
        on applique à chaque td ayant la même colonne un background color rgba(255,0,0,0.5)
        on applique à la tr parent le même background color

        - mouseleave :  on récupère les dataset de la td column et line
        on retire le background color des td avec le meme dataset column
        on retire le background de la tr parente
    */
    document.querySelectorAll('#coord td').forEach(function(td){
        td.addEventListener('mouseenter', function(){
            const column = this.dataset.column;
            const line = this.dataset.line;
            document.getElementById('xy').innerHTML = `x : ${column} - y : ${line}` ;
            document.getElementById('xValue').value = column;
            document.getElementById('yValue').value = line;
            document.querySelectorAll(`#coord td[data-column="${column}"]`).forEach(function(tdy){
                tdy.style.setProperty('background-color', 'rgba(255,0,0,0.5)');
            });
            this.parentElement.style.setProperty('background-color', 'rgba(255,0,0,0.5)');
        });
        
        td.addEventListener('mouseleave', function(){
            const column = this.dataset.column;
            const line = this.dataset.line;
            document.getElementById('xy').innerHTML = `x : &nbsp; - y : &nbsp;` ;
            document.getElementById('xValue').value = 0;
            document.getElementById('yValue').value = 0;
            document.querySelectorAll(`#coord td[data-column="${column}"]`).forEach(function(tdy){
                tdy.style.removeProperty('background-color');
            });
            this.parentElement.style.removeProperty('background-color');
        });
    });

});