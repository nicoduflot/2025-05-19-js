/*
C'est dans ce fichier où l'on va importer les différentes fonctions des bibliothèque qu'on va utiliser sur la page
*/
/* le script appliqué sur la page */

import test, {m} from './Others.js';
console.log(test());
console.log(m);

import * as another from './Anothers.js';
console.log(another.test());
console.log(another.m);

import Company from './Company.js';
const monEntreprise = new Company('Dawan');
console.log(monEntreprise);
console.log(monEntreprise.showName());

import Toto from './Company.js';
const entrepriseConcurrente = new Toto('IEE');
console.log(entrepriseConcurrente.showName());
