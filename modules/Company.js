export default class Company{
    constructor(nom){
        this.nom = nom;
    }

    showName(){
        return this.constructor.name;
    }
}