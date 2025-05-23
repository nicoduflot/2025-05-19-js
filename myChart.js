window.addEventListener('DOMContentLoaded', function () {
    
    function getChart(typeChart = 'bar'){
        /*
        récupérer la ressources csv, pour le fetch il faudra utiliser 
        la méthode .text() et non .json()
        */
        fetch('./csv/stats-films.csv')
            .then(function (reponse) {
                return reponse.text();
            }).then(function (data) {
                const tabLines = data.split('\r\n');
                //console.log(tabLines);
                const labels = [];
                const donnees = [];
                let firstLine = true;
                let title = '';
                tabLines.map(function (lines) {
                    const line = lines.split(';');
                    if (!firstLine) {
                        //console.log(line);
                        labels.push(line[0]);
                        donnees.push(line[1]);
                    } else {
                        title = `${line[1]} / ${line[0]}`;
                        firstLine = false;
                    }
                });
                //console.log(labels);
                //console.log(donnees);
                const ctx = document.getElementById('myChart');
    
                new Chart(ctx, {
                    type: typeChart,
                    data: {
                        labels: labels,
                        datasets: [{
                            label: title,
                            data: donnees,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
    
            })
        
    }

    getChart();

    document.querySelectorAll('[name="typeChart"]').forEach(function(radio){
        radio.addEventListener('click', function(){
            document.getElementById('myChart').remove();
            const chart = document.createElement('canvas');
            chart.setAttribute('id', 'myChart');
            document.getElementById('canvasChart').append(chart);
            getChart(this.value);
        });
    });
});