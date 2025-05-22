function jsonToList(data) {
    /*
    on va vérifier si les données reçues sont contenues dans un tableau
    si elle ne le sont pas, on crée un tableau dans lequelle on pousse la donnée unique, sinon on copie le talbeau dans le tableau de traitement
    */
    let tabData = [];
    const ul = document.createElement('ul');
    if (!Array.isArray(data)) {
        tabData.push(data);
    } else {
        tabData = data.slice();
    }
    /* on parcour le ou les enregistrements reçus */
    for (enreg of tabData) {
        /* chaque enregistrement génère un élément de liste qui contiendra la liste des attributs at leur valeur */
        const liUSer = document.createElement('li');
        liUSer.append(document.createElement('br'));
        ul.append(liUSer);
        const ulUser = document.createElement('ul');
        liUSer.append(ulUser);
        /* on crée donc un élément de liste par attribut */
        for (key in enreg) {
            const li = document.createElement('li');
            if ((typeof enreg[key]) === 'object') {
                /* si la donné dans l'attribut est un objet, alors on envoi cet objet dans la même fonction => c'est la récusrivité  Quand le dernier objet parcouru par la fonction est traité, le résultat est renvoyé au précédent traitement, qui est renvoyé au précédent, jusqu'à l'appel initial dans le fetch */
                const content = document.createTextNode(key);
                li.append(content);
                li.append(jsonToList(enreg[key]));
            } else {
                /* si la donnée dans l'attribut n'est pas un objet, on crée simplement un élément de liste avec la clef et son contenu */
                const content = document.createTextNode(`${key} : ${enreg[key]}`);
                li.append(content);
            }
            /* une fois qu'une clef est traiétée, elle est ajoutée à la liste parente  */
            ulUser.append(li);
        }
    }
    /* quand la liste parente a récupéré toutes ses clefs sous forme d'élément de liste, on renvoie le résultat à l'appel de la fonction précédent */
    return ul;
}

function jsonToTable(data) {
    let tabData = [];
    /* un booléen pour vérifier si on est à la première ligne, pour créer le thead du tableau */
    let firstLine = true;
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    /* on intègre le thead au tableau */
    table.append(thead);
    /* on intègre le tbody au tableau */
    table.append(tbody);
    table.classList.add('table');
    if (!Array.isArray(data)) {
        tabData.push(data);
    } else {
        tabData = data.slice();
    }
    /* on crée la ligne d'entête */
    const trHead = document.createElement('tr');
    for (enreg of tabData) {
        /* on crée la ligne d'un enregistrement */
        const tr = document.createElement('tr');
        /* on parcours chaque enregistrement */
        for (key in enreg) {
            /* on ne traite que les enregistrements qui ne contiennent pas d'objet */
            if ((typeof enreg[key]) !== 'object') {
                /* si c'est la première ligne, on aliment l'entête avec de th qui contiennent les clefs */
                if (firstLine) {
                    const th = document.createElement('th');
                    th.append(document.createTextNode(key));
                    /* on ajoute la cellule de tête de colonne à la ligne d'entête */
                    trHead.append(th);
                }
                //console.log(key);   
                /* on crée les cellule qui contiennent les valeurs des clefs */
                const td = document.createElement('td');
                td.append(document.createTextNode(enreg[key]));
                td.setAttribute('data-key', key);
                /* on ajoute la cellule à la ligne d'enregistrement */
                tr.append(td);
            }
        }
        /* si c'est le premier enregistrement */
        if (firstLine) {
            /* on ajoute la ligne d'entête au thead */
            thead.append(trHead);
            /* on indique qu'on passe à unexième ligne */
            firstLine = false;
        }
        /* on ajoute la ligne d'enregistrement au tbody */
        tbody.append(tr);
    }
    /* on renvoi le tableau une fois tous les enregistrements traités */
    return table;
}

function jsonSearch(data, searchTerm) {
    let tabData = [];
    if (!Array.isArray(data)) {
        tabData.push(data);
    } else {
        tabData = data.slice();
    }
    let result = [];
    let lineOk = false;
    for (enreg of tabData) {
        for (key in enreg) {
            if ((typeof enreg[key]) !== 'object') {
                const info = (enreg[key].toString()).toLowerCase()
                if (info.indexOf(searchTerm) > -1) {
                    lineOk = true;
                }
            }
        }
        if (lineOk) {
            result.push(enreg);
            lineOk = false;
        }
    }
    return result;
}

window.addEventListener('DOMContentLoaded', function () {
    /* recherche d'une ressource en ajax */
    document.querySelectorAll('button.read').forEach(function (button) {
        button.addEventListener('click', function () {
            const url = this.dataset.url;
            //console.log(url);
            fetch(url)
                .then(function (reponse) {
                    return reponse.json();
                })
                .then(function (data) {
                    document.getElementById('result').innerHTML = '';
                    document.getElementById('result').append(jsonToTable(data));
                })
                .catch(function (erreur) {
                    console.error(erreur);
                    console.log(erreur.name);
                    console.log(erreur.message);
                })
                .finally(function () {
                    console.log('tentative de connexion terminée');
                });
        });
    });

    /* afficher la ligne des tableaux générés par le recherche de ressources */
    document.getElementById('result').addEventListener('click', function (event) {
        /* l'événement clic nous permet de trouver la cible du clic, on peut retrouver l'élément parent de la cible, comme il s'agit d'un tableau, la cible est une td ou un th */
        if (event.target.tagName !== 'TH') {
            const line = event.target.parentElement.children;
            for (value of line) {
                console.log(`${value.dataset.key} :  ${value.innerText}`);
            }
        }
    });

    /* chercher un renregistrement contenant une chaîne de caractère entrée dans un champ de saisie */
    document.querySelector('.search').addEventListener('click', function () {
        const url = './ressources/users.json';
        const searchTerm = document.querySelector('input[name="search"').value.toLowerCase();
        document.querySelector('input[name="search"').value = '';
        //console.log(searchTerm);
        fetch(url)
            .then(function (reponse) {
                return reponse.json();
            })
            .then(function (data) {
                document.getElementById('resultSearch').innerHTML = '';
                const results = jsonSearch(data, searchTerm);
                document.getElementById('resultSearch').append(jsonToTable(results));
        });
    });
});