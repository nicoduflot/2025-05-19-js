import Compte from './Compte.js';

export default class CompteInteret extends Compte{
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