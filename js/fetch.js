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


window.addEventListener('DOMContentLoaded', function () {
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
                    document.getElementById('result').append(jsonToList(data));
                })
                .catch()
                .finally();
        });
    });
});