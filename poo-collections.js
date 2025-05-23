/*
Collection : Dictionnaires (ou tableau associatifs)
les "index" de la collection sont des clefs
*/

/*
ILLÉGAL !
*/
const tabAssoPirate = [];
tabAssoPirate['toto'] = 23;
tabAssoPirate['titi'] = 43;
console.log(tabAssoPirate);
/*
La classe Map() permet de créer correctement ce type de données
*/

const map = new Map();
console.log(map);

map.set('lastName', 'Doe');
map.set('firstName', 'John')
    .set('email', 'john.doe@missing.com')
    .set('phone', '0123456789')
    .set('phone', '9876543210');

console.log(map);
console.log(map.size);
console.log(map.get('lastName'));

map.forEach(function(valeur, clef, data){
    console.log(`${clef} => ${valeur}`);
});

console.log(map.has('email'));
console.log(map.has('details'));

/*
le Map() produit un objet itérable, il possède ce qu'on un "design pattern" iterator
*/

/*
.entries()
.keys()
.values()
*/

console.log(`|${'KEY'.padEnd(20, ' ')}|${'VALUE'.padStart(24, ' ')}|`);
console.log(`|${''.padEnd(20, '-')}|${''.padStart(24, '-')}|`);
for(let [key, value] of map.entries()){
    console.log(`|${key.padEnd(20, ' ')}|${value.padStart(24, ' ')}|`);
}
console.log(`|${''.padEnd(20, '-')}|${''.padStart(24, '-')}|`);
for(let key of map.keys()){
    console.log(`|${key.padEnd(20, ' ')}|${'****'.padStart(24, ' ')}|`);
}
console.log(`|${''.padEnd(20, '-')}|${''.padStart(24, '-')}|`);
for(let value of map.values()){
    console.log(`|${'****'.padEnd(20, ' ')}|${value.padStart(24, ' ')}|`);
}

map.delete('phone');
console.log(map);

/*
Set()
Tableau a valeur unique : la clef du tableau est aussi la valeur
*/

const set = new Set(['Jon', 'Sansa']);
console.log(set);
set.add('Sansa')
    .add('Rob')
    .add('Joffrey')
    .add('Sansa')
    .add('Hodor')
    .add('Oona');
console.log(set);

console.log(`|${'KEY'.padEnd(20, ' ')}|${'VALUE'.padStart(24, ' ')}|`);
console.log(`|${''.padEnd(20, '-')}|${''.padStart(24, '-')}|`);
for(let [key, value] of set.entries()){
    console.log(`|${key.padEnd(20, ' ')}|${value.padStart(24, ' ')}|`);
}
console.log(`|${''.padEnd(20, '-')}|${''.padStart(24, '-')}|`);
for(let key of set.keys()){
    console.log(`|${key.padEnd(20, ' ')}|${'****'.padStart(24, ' ')}|`);
}
console.log(`|${''.padEnd(20, '-')}|${''.padStart(24, '-')}|`);
for(let value of set.values()){
    console.log(`|${'****'.padEnd(20, ' ')}|${value.padStart(24, ' ')}|`);
}
set.delete('Joffrey');

if(!set.has('Joffrey')){
    console.log('Youpi il était méchant');
}