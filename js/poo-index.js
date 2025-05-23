/*
un objet est composée d'au moins un attribut ou clef, qui contient une valeur ou une méthode
    méthode : c'est une fonction qui est utilisable seulement depuis une instance de classe 
        => donc d'un objet créé à partir de cette classe ou d'un objet litéral

*/

/* Objet litéral : objet créé "sur le pouce", pour un fonctionnement précis ne nécessitant pas forcément la création d'une classe */

const monObjet = {
    attribut: 'valeur',
    attributNum: 12,
    methode: function(){
        const message = `${this.attribut} ${this.attributNum} OK`;
        return message;
    }
};

console.log(monObjet);
console.log(monObjet.attribut);
console.log(monObjet.attributNum);
console.log(monObjet.methode);
console.log(monObjet.methode());

/*  
les objets sont prototypés => ils possèdent un constructeur qui crée l'instance (l'objet qui résulte de l'appel de la classe)

Pour créer un prototype, il faut un constructeur

Avant la possibilité d'écrire de sclasse pour créer des objets, on procédait comme ceci en JS
*/

/* le constructeur */

function Guerrier(nom, prenom, age){
    this.nom = nom;
    this.prenom = prenom;
    this.age = age;
    this.esperanceDeVie = this.age + Math.floor( Math.random() * 30 + 10 );
}

/* L'objet est utilisable, mais si on veut qu'il puisse faire des actions, il faut lui créer des méthodes */
Guerrier.prototype.monNom = function(){
    return `Je suis ${this.prenom} ${this.nom}`;
};

/*
Tous les guerriers vont crier quand ils ont mal
On peut créer des méthodes statiques, c'est à dire qu'on ne les appellent pas depuis l'objet créé à partir de Guerrier mais directement depuis "le prototype" de Guerrier
La classe Math est une classe dont on utilise les méthode sans créer d'objet Math
*/
Guerrier.crier = function(cri = ''){
    return `${cri} RRRRRRRRRRRRRRRRRRRRRRRRR !`;
}

const monPremierGuerrier = new Guerrier('LeBarbare', 'Conan', 22);

console.log(monPremierGuerrier);
console.log(monPremierGuerrier.monNom());
console.log(monPremierGuerrier.age);
console.log(monPremierGuerrier.esperanceDeVie);
console.log(Guerrier.crier());
console.log(Guerrier.crier('Par CROM !'));

console.log(monPremierGuerrier);


/*
EN JSON
Il est possible de créer un objet Litéral en JSON
*/

const monUser = {
    'id': 1,
    'name': 'Toto',
    'action': function(){
        return 'TAPER !';
    }
};

console.log(monUser);
console.log(monUser.name);
console.log(monUser.action());

/* 
utiliser class 
création de classes avec class est apparue en ES6
Il existe la possibilité d'utiliser des attribut et des méthode de façon privée (comme sur PHP par exemple) en utilisant le croisillon # (Hash names)?
Comme pour le PHP, il faut des accesseurs (getter) et des mutateurs (setter) pour accéder et modifier ces attribut et classes
*/

/* Créons un classe qui regroupe les élément de création d'objet vu précédent */
class Voiture{
    /*
    Le constructeur de la classe
    */
    /* pour utiliser les attributs privés, ils doivent être déclarés avec le croisillon avant d'être instanciés dans le constructeur */
    #marque;
    constructor(marque, modele, couleur){
        /* la marque sera un attribut privé */
        this.#marque = marque;
        this.modele = modele;
        this.couleur = couleur;
    }
    /*
    Si un attribut est privé, on ne peut ni récupérer sa valeur ni la changer directement comme les attributs publics.
    Pour accéder à sa valeur, il faut écrire une méthode qu'on nomme accesseur
    Pour modifier sa valeur, il faut écrire une méthode qu'on nomme mutateur
    */

    /* assesseur ou getter */
    static getMarque(obj){
        if(#marque in obj){
            return obj.#marque;
        }else{
            return `l'objet doit être une instance de Voiture`;
        }
    }

    /* mutateur ou setter */
    static setMarque(obj, newMarque){
        if(#marque in obj){
            obj.#marque = newMarque;
            return obj.#marque;
        }else{
            return `l'objet doit être une instance de Voiture`;
        }
    }

    /* Des méthodes de Voiture */
    demarrer(){
        return `la ${this.constructor.name} démarre`;
    }
    
    avancer(){
        return `la ${this.constructor.name} avance`;
    }

    /* méthode statique */
    static klaxonner(){
        return `POUET POUET !`;
    }

}

const maVoiture = new Voiture('Fiat', 'Panda', 'Blanc');
console.log(maVoiture);
console.log(maVoiture.constructor.name);
console.log(Voiture.getMarque(maVoiture));
console.log(Voiture.getMarque(monPremierGuerrier));
console.log(Voiture.setMarque(maVoiture, 'Ford'));
console.log(Voiture.getMarque(monPremierGuerrier, 'Ford'));
console.log(maVoiture);
console.log(maVoiture.demarrer());
console.log(maVoiture.avancer());
console.log(Voiture.klaxonner());

