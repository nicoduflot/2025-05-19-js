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
        pour créer un élément qui soit directement configurable dans le DOM, on utilise la méthode .createElement() de l'objet document
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

    /*
    Stop Propagation : 
    quand un événement arrive sur un élément, certains événements "remontent" (bubbling) aux éléments parents
    */

    /* on surveille le clic sur la div stop01 et sur le bouton à l'intérieur sans arrêter le bubbling */
    document.getElementById('stopP01').addEventListener('click', function(){
        console.log('stopP01');
    });

    document.querySelector('#stopP01 button').addEventListener('click', function(){
        console.log('button stopP01');
    });
    
    /* on surveille le clic sur la div stopP02 et sur le bouton à l'intérieur en arrêtant la propagation du clic */
    document.getElementById('stopP02').addEventListener('click', function(){
        console.log('stopP02');
    });
    
    document.querySelector('#stopP02 button').addEventListener('click', function(event){
        event.stopPropagation();
        console.log('button stopP02');
    });

    /*
    preventDefault : quand un événement survient, il implique parfois une réponse du navigateur : 
    - cliquer sur un lien fait ouvrir la source du lien
    - cliquer sur un boutton de soumission de formulaire enclenche la tentative d'envoi du formulaire
    preventdefault va permettre d'empêcher ce comportement, de pouvoir exécuter du script (vérification, lancement de téléchargement, appel ajax, etc) et js nous permet ensuite de revenir au comportement par défaut si besoin est
    */

    /* repérer le clic sur les liens ayant la classe testPreventLink */
    document.querySelectorAll('.testPreventLink').forEach(function(a){
        a.addEventListener('click', function(event){
            event.preventDefault();
            console.log(this.getAttribute('id'));
        });
    });

    /*
    guetter le clic sur le bouton addSpan, créer une span avec du texte dedans et l'ajouter au paragraphe avec l'id test
    */

    let cptSpan = 0;
    document.getElementById('addSpan').addEventListener('click', function(){
        const span = document.createElement('span');
        cptSpan = cptSpan + 1;
        span.innerText = `toto ${cptSpan}`;
        span.classList.add('m-1', 'p-2', 'bg-secondary', 'col-2');
        document.getElementById('test').append(span);
        span.addEventListener('click', function(){
            this.remove();
        });
    });

    /*
    to do list : surveiller deux événements différents : 
    quand on appuie sur la touche entrée quand le curseur de saisi est dans l'élément de formulaire avec l'id listItem
    Surveiller le click sur le bouton avec l'id addItem

    quand l'un ou l'autres des événements intervient, il faut vérifier que l'attribut value de l'élément de formulaire contienne au moins un caractère (non vide), dans ce cas, on crée un élément de liste (li) qu'on ajoute à la liste (ul) avec l'id toDoList

    cela implique de créer une fonction pour la création d'et l'ajout de l'élément de liste, et c'est cette fonction qu'on déclenche lors des événements surveillés
    */

    /* contrôle de la touche entrée saisie dans le champs de saisie */
    document.getElementById('listItem').addEventListener('keyup', function(event){
        event.stopPropagation();
        if(event.key === 'Enter'){
            addItemList();
        }
    });

    /* surveiller le clic sur le bouton et virification du champs de saisie si non vide */
    document.getElementById('addItem').addEventListener('click', addItemList);
    /* quand on appelle directement une fonction (et pas une fonction de rappel anonyme) a éxécuter lors de l'événement, il ne faut pas écrire les parenthèse de la fonction nommée, sinon JS pense qu'il d'une fonction de rappel anonyme défectueuse */

    /* fonction d'ajout dans la liste si le champs n'est pas vide */
    function addItemList(){
        /* si le champ n'est pas vide */
        if(document.getElementById('listItem').value !== ''){
            /* on crée un balise li */
            const li = document.createElement('li');
            /* on ajoute une classe pour le regroupement d'élément de liste bootstrap */
            li.classList.add('list-group-item');
            /* on crée un noeud de text contenant la valeur du champ de saisie qu'on ajourte en enfant dans li */
            li.append(document.createTextNode(document.getElementById('listItem').value));
            /* on ajoute li dans la liste */
            document.getElementById('toDoList').append(li);
            /* on vide le champ de saisie poue une nouvelle saisie */
            document.getElementById('listItem').value = '';
            /* on surveille le clic sue la li créée */
            li.addEventListener('click', function(event){
                /* on stoppe la propagation du clic */
                event.stopPropagation();
                /* si la li à l'attribut style */
                if(this.hasAttribute('style')){
                    /* on supprime l'attribut */
                    this.removeAttribute('style');
                }else{
                    /* sinon on ajoute la propriété css line-through en créant l'attribut style */
                    this.style.setProperty('text-decoration', 'line-through');
                }
            });
            /* on crée un bouton de fermeture */
            const closeButton = document.createElement('button');
            /* les attributs et classes bootstrap sont ajouté pour l'affichage*/
            closeButton.setAttribute('aria-label', 'close');
            closeButton.classList.add('btn-close', 'float-end');
            /* on ajoute le bouton à la suite du noeud de texte */
            li.append(closeButton);
            /* on surveille le clic */
            closeButton.addEventListener('click', function(event){
                /* stop progation clic */
                event.stopPropagation();
                /* on supprime l'élément parent */
                this.parentElement.remove();
                /* on supprime le bouton */
                this.remove();
            });
        }
    }

    /* vérification de formulaire */
    /*
    - surveiller le clic sur le bouton type submit
    - récupérer l'événement
    - arrête le comportement par défaut de lévénement de formulaire submit (preventDefault)
    - vérifier que les deux champs soient non vide
    - si les deux ne sont pas vide, applique la méthode submit au formulaire
    */
    document.querySelector('#formValid button[type="submit"]').addEventListener('click', function(event){
        event.preventDefault();
        const nom = document.querySelector('#formValid input[name="nom"]');
        const prenom = document.querySelector('#formValid input[name="prenom"]');
        if(nom.value !== '' && prenom.value !== ''){
            document.querySelector('#formValid').submit();
        }else{
            /* contrôle et identification des champs vides */
            console.log(nom.value, prenom.value);
            if(nom.value === ''){
                nom.classList.add('border', 'border-danger');
                document.getElementById(nom.getAttribute('aria-describedby')).classList.remove('visually-hidden');
            }else{
                nom.classList.remove('border', 'border-danger');
                document.getElementById(nom.getAttribute('aria-describedby')).classList.add('visually-hidden');
            }
            if(prenom.value === ''){
                prenom.classList.add('border', 'border-danger');
                document.getElementById(prenom.getAttribute('aria-describedby')).classList.remove('visually-hidden');
            }else{
                prenom.classList.remove('border', 'border-danger');
                document.getElementById(prenom.getAttribute('aria-describedby')).classList.add('visually-hidden');
            }
        }
        
    });

});