export default class Compte{
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