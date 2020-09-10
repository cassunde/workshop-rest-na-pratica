createRequest();

function createRequest() {

    const request = new Request('https://api.mocki.io/v1/9a8ea026');
    fetch(request)
        .then(response => response.json())
        .then(json => createChart(json))

}


function createChart(dataChart){

    var ctx = document.getElementById('canvas').getContext('2d');

    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: dataChart.months,
        datasets: [
            {
                label: 'Oraçamento',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: dataChart.budget
            },
            {
                label: 'Realizado',
                backgroundColor: '#9282',
                borderColor: 'rgb(255, 99, 132)',
                data: dataChart.realy
            },
            {
                label: 'Realizado AA',
                borderColor: '#000',
                data: [50, 8, 3, 22, 90, 22, 12],
                type : 'line'
            }
        ]
    },
    options: {
        onClick: (evt, item) => {
            let index = item[0]["_index"];
            let month = item[0]["_chart"].data.labels[index];
            let value = item[0]["_chart"].data.datasets[0].data[index];
            let value1 = item[0]["_chart"].data.datasets[1].data[index];
            console.log(month);
            console.log(value);
            console.log(value1);
        }


    }
});
}

function createDoughnut(){

    var ctx = document.getElementById('canvas-doug').getContext('2d');
    var chart = new Chart(ctx, {
    
        type: 'doughnut',
			data: {
				datasets: [{
					data: [
						80,
						20
					],
					backgroundColor: [
						window.chartColors.red,
						window.chartColors.orange
					],
					label: 'Dataset 1'
				}],
				labels: [
					'Orçamento',
					'Realizado'
				]
			},
			options: {
				responsive: true,
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Percentual de Atingimento'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				}
			}
    })
}

