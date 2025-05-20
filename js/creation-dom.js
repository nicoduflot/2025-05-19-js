window.addEventListener('DOMContentLoaded', function(){
    /*
    
    il est possible de lister toutes les td du tableau et de les abonner chacune à l'événement clic
    Ajouter un écouteur d'événement joue sur les performance.
    Pour des éléments répétitif, normés et déjà présent, il est parfois plus intéressant d'écouter l'événement clic sur conteneur (ici la balise table), d'identifier la cible du clic (ici une balise td) et de repérer son élément parent (ici la tr) et de récupérer pour ces deux éléments les dataset col pour td et line pour tr
    */
    document.querySelector('table.table.table-bordered').addEventListener('click', function(event){
        /*
        quand un événement survient, on peut capter l'événement et déterminer, entre autre, la cible de l'événement
        Ici, la cible du clic est une cellule, on peut donc récupérer la colonne de la cellule, et le parent de la cellule est une ligne, on peut donc récupérer le numéro de ligne
        */
        console.log(event.target.dataset.col, event.target.parentNode.dataset.line);
        /*
        pour créer un élément qui soit directement configurable dans le DOM, on utilise laméthode .createElement() de l'objet document
        */
        const span = document.createElement('span');
        /*
        maintenant que cet élément existe, on peut ajouter des classes
        */
        span.classList.add('badge', 'rounded-pill', 'text-bg-primary');
        /*
        mettre du HTML dedans
        */
        span.innerHTML = "&nbsp;";
        /*
        et l'ébonner à un écouteur d'événement
        */
        span.addEventListener('click', function(event){
            /*
            il faut arrêter la propagation du clic sur l'élément, car il est dans le tableau, 
            et js tenterai sinon de récupérer des données qui n'existe pas sur span (ici le dataset col)
            */
            event.stopPropagation();
            /*
            en mettant du html dans le parent, l'élément n'apparaît plus mais il existe toujours.
            */
            this.parentNode.innerHTML = '&nbsp;';
            /*
            pour le supprimer définitivement, on applique sur lui la méthode .remove() qui le supprime du DOM
            */
            this.remove();
        });
        /*
        quand l'élément est créé, configuré et abonné à un événement, on remplace le HTML de la cible par un chaîne de caractère vide
        */
        event.target.innerHTML = '';
        /*
        on ajoute ensuite l'élément créé à la cible en utilisant la méthode .append()
        */
        event.target.append(span);
        /*console.log(span);*/
    });
});