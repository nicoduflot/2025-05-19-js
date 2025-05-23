import Compte from './Compte.js';
export default class CompteCheque extends Compte{
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