window.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('p[data-module]').forEach(function(p){
        const module = p.dataset.module;
        switch(module){
            case 'color':
                //
                const color = p.dataset.color || '#ff0000';
                p.addEventListener('mouseenter', function(){
                    this.style.setProperty('color', color);
                });
                p.addEventListener('mouseleave', function(){
                    this.style.removeProperty('color');
                });
            break;
            case 'font':
            case 'magie':
                //
                const weight = p.dataset.weight || 'bolder';
                p.addEventListener('mouseenter', function(){
                    this.style.setProperty('font-weight', weight);
                });
                p.addEventListener('mouseleave', function(){
                    this.style.removeProperty('font-weight');
                });
            break;
            case 'after':
            default:
                /*
                mini exercice
                modifier le HTML et le JS pour afficher le style d'écriture du paragraphe  en italique quand on le survol.
                */

        }
    });
});