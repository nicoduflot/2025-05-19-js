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
console.log(Voiture.setMarque(monPremierGuerrier, 'Ford'));
console.log(maVoiture);
console.log(maVoiture.demarrer());
console.log(maVoiture.avancer());
console.log(Voiture.klaxonner());

/*
Je dois créer une ambulance pour un hopital
Un ambulance est une voiture, mais une voiture n'est pas forcément une ambulance
Une ambulance, c'est une voiture modifiée pour accueillir des blessés, des malades et équipées d'un sirène.
On ne va pas mettre ces option possible dans la classe voiture, on va créer une classe "fille", qui héritera de tous les éléments communs avec toutes les voiture mais les spécificités de l'ambulance y seront intégrées
*/

class Ambulance extends Voiture{
    /*
    Bien qu'une ambulance est la classe enfant de Voiture, elle nécéssite quand même un constructeur
    */
    constructor(marque, modele, couleur, porteLaterale){
        /*
        On n'a pas besoin de redéclarer tous les attributs et méthode de la classe parentes dans la classe enfants, on va les "récupérer" grace à la méthode super()
        */
        super(marque, modele, couleur);
        this.couleur = (this.couleur !== 'Blanc')? 'Blanc' : this.couleur;
        this.sirene = false;
        this.porteLaterale = porteLaterale;
    }

    /*
    Si une méthode héritée de la classe mêre doit être un peu ou complètement différente dans sont utilisation ou action, on peut la surcharger dans la classe fille
    */
    demarrer(){
        let bruit = '';
        bruit = (this.sirene)? 'PIN PON PIN PON PIN PON !': 'Vrrrrr rrrrr rrrrr rr';
        return `${super.demarrer()} ${bruit}`;
    }
}

const monAmbulance = new Ambulance('Renault','R21', 'Bleue', 1);
console.log(monAmbulance);
console.log(monAmbulance.demarrer());
console.log(monAmbulance.avancer());
console.log(monAmbulance.constructor.name);
monAmbulance.sirene = true;
console.log(monAmbulance.demarrer());

/* créer une classe mère 
Compte 
    Attributs :
    - nom 
    - prenom
    - solde
    Méthodes
    - retirer de l'argent
    - ajouter de l'argent

une classe fille CompteInteret
    Attributs :
    - nom 
    - prenom
    - solde
    - tauxInteret

    - retirer de l'argent
    - ajouter de l'argent

une classe fille CompteCourant
    Attributs :
    - nom 
    - prenom
    - solde
    - #codePin
    Méthodes
    - retirer de l'argent
    - ajouter de l'argent
    - payer avec la carte
*/

class Compte{
    constructor(nom, prenom, solde){
        this.nom = nom;
        this.prenom = prenom;
        this.solde = solde;
    }

    retirerDeLArgent(montant){
        this.solde = this.solde - montant;
        return `${montant} € retiré(s), solde ${ (this.solde >= 0)? 'créditeur': 'débiteur' } : ${this.solde} €`;
    }
    
    ajouterDeLArgent(montant){
        this.solde = this.solde + montant;
        return `${montant} € ajouté(s), solde ${ (this.solde >= 0)? 'créditeur': 'débiteur' } : ${this.solde} €`;
    }
}

const compte = new Compte('Duflot', 'Nicolas', 2000);
console.log(compte);
console.log(compte.ajouterDeLArgent(800));
console.log(compte.retirerDeLArgent(400));

class CompteInteret extends Compte{
    constructor(nom, prenom, solde, tauxInteret){
        super(nom, prenom, solde);
        this.tauxInteret = tauxInteret;
    }

    retirerDeLArgent(montant){
        if(montant <= this.solde){
            return super.retirerDeLArgent(montant);
        }else{
            return 'Transaction non autorisée, le débit est supérieur au crédit';
        }
    }

    calculerInteret(){
        return ((this.tauxInteret - 1) * this.solde).toFixed(2);
    }

    crediterInteret(){
        return super.ajouterDeLArgent(parseFloat(this.calculerInteret()));
    }
}

const compteInteret = new CompteInteret('Duflot', 'Nicolas', 2000, 1.05);
console.log(compteInteret);
console.log(compteInteret.calculerInteret());
console.log(compteInteret.crediterInteret());
console.log(compteInteret.retirerDeLArgent(2100));

class CompteCheque extends Compte{
    #codePin;
    constructor(nom, prenom, solde, codePin){
        super(nom, prenom, solde);
        this.#codePin = codePin;
    }

    /* getter pour le codepin */
    static getCodePin(obj){
        if(#codePin in obj){
            return obj.#codePin;
        }else{
            return `l'objet doit être une instance de CompteCheque`;
        }
    }

    payerParCarte(montant, codePin){
        if(CompteCheque.getCodePin(this) === codePin){
            return this.retirerDeLArgent(montant);
        }else{
            return `Une tentative de paiement par carte pour le montant de ${montant} € a échoué`;
        }
    }
}

const compteCheque = new CompteCheque('duflot', 'Nicolas', 2000, '1234');
console.log(compteCheque);
console.log(compteCheque.payerParCarte(200, '1234'));
console.log(compteCheque.payerParCarte(200, '4321'));
