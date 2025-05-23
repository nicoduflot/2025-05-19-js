import CompteInteret from './CompteInteret.js';
import CompteCheque from './CompteCheque.js'

const compteInteret = new CompteInteret('Duflot', 'Nicolas', 2000, 1.05);
console.log(compteInteret);
console.log(compteInteret.calculerInteret());
console.log(compteInteret.crediterInteret());
console.log(compteInteret.retirerDeLArgent(2100));

const compteCheque = new CompteCheque('duflot', 'Nicolas', 2000, '1234');
console.log(compteCheque);
console.log(compteCheque.payerParCarte(200, '1234'));
console.log(compteCheque.payerParCarte(200, '4321'));