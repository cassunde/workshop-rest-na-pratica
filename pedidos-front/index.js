createRequest();
createOrderByInputs();
createChart();

var orders = [];

function print(){
    let name = "";
    name = "xuxu";
    var multiply = (x, y = 1) => x * y;
    console.log(multiply(2,5));
}

function excetionWithError(){    
    try {     
        // var b = "oi";
        console.log("Variable "+ b);
    } catch (error) {
        console.log(error instanceof ReferenceError);
        console.log("Do something after error");
        console.log(error.message);
    }
}

function createObject(){    
    return {
        name:"Mattheus",
        idate: 12,
        sexo: "Indefinido"
    }
}

//Funcionalidade de request
function createRequest(){
    createRequestBase('http://localhost:8080/order')
    .then(response => response.json())
    .then(response => mountTable(response))
    .catch(error => console.error(error));
}

//Funcionalidade de request com parametros no request
function createRequestComplex(){
    const request = new Request('https://api.github.com/users', {method: 'POST'}) 
    fetch(request)
    .then(response => {
        if(response.status == 200){
            return response.json();
        }else{
            throw new Error('Ops... error')
        }        
    })
    .then(response => console.log(response))
    .catch(error => console.error(error));
}

async function createRequestBase(url, opts){
    const request = new Request(url, opts) 
    return fetch(request)
    .then(response => {
        if(response.status == 200){
            return response;
        }else{
            throw new Error('Ops... error')
        }        
    });
}

function mountTable(data){

    emptyTable();

    var tableRef = document.getElementById('table-order').getElementsByTagName('tbody')[0];
    orders = data;

    data.forEach((element, index) => {
        
        var newRow   = tableRef.insertRow(tableRef.rows.length);  
        var colId  = newRow.insertCell(0);
        var colCliente  = newRow.insertCell(1);
        var colProduto  = newRow.insertCell(2);
        var colValue  = newRow.insertCell(3);
        var colAction  = newRow.insertCell(4);
    
        var textId = document.createTextNode(index);
        var textClient  = document.createTextNode(element.client);
        var textProduct = document.createTextNode(element.product);
        var textValue = document.createTextNode(element.value);
        var btAction = document.createElement('input');
        btAction.setAttribute('value','Editar');
        btAction.setAttribute('type','button');
        btAction.setAttribute('onClick',`change(${index})`)



        colId.appendChild(textId);
        colCliente.appendChild(textClient);
        colProduto.appendChild(textProduct);
        colValue.appendChild(textValue);
        colAction.appendChild(btAction);

    });
}

function change(index){
    var order = orders[index];
    if(order != undefined){
        console.log(order.product);

        document.getElementById("txtId").value = order.id;
        document.getElementById("txtClient").value = order.client;
        document.getElementById("txtProduct").value = order.product;
        document.getElementById("txtValue").value = order.value;

        document.getElementById("btnDelete").disabled = false;
    }    
}

function createOrderByInputs(){

    var order = {
        "id":document.getElementById("txtId").value,
        "client": document.getElementById("txtClient").value,
        "product": document.getElementById("txtProduct").value,
        "value": document.getElementById("txtValue").value,
        "pending": true
    }

    return order;
}

function btnSalvar(){

    var orderToSave = createOrderByInputs(); 

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var methodCorrect = orderToSave.id == '' ? 'POST' : 'PUT';


    var opts = {
        method: methodCorrect,
        body: JSON.stringify(createOrderByInputs()),
        headers: myHeaders
        
    }

    createRequestBase('http://localhost:8080/order',opts)
    .then(response => createRequest())
    .catch(error => console.error(error));
}


function emptyTable(){
    var tables = document.getElementById('table-order-body');
    while(tables.rows.length > 0 ){
        tables.deleteRow(0);
    }    
}

function btnDeletes(){
    var orderToDelete = createOrderByInputs();

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var opts = {
        method: 'DELETE',
        headers: myHeaders        
    }

    createRequestBase(`http://localhost:8080/order/${orderToDelete.id}`,opts)
    .then(response => {
        createRequest()
        document.getElementById("txtId").value = "";
        document.getElementById("txtClient").value = "";
        document.getElementById("txtProduct").value = "";
        document.getElementById("txtValue").value = "";

    })
    .catch(error => console.error(error));

}

function createChart(){
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var config = {
        type: 'bar',
        data: {
            labels: MONTHS,
            datasets: [{
                label: 'Orçamento',
                backgroundColor: window.chartColors.red,
                borderColor: window.chartColors.red,
                data: [
                    100234.90,
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                fill: false,
            }, {
                label: 'Realizado',
                fill: false,
                backgroundColor: window.chartColors.blue,
                borderColor: window.chartColors.blue,
                data: [
                    80222.90,
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Forecast'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        }
    };

    var ctx = document.getElementById('canvas').getContext('2d');
    new Chart(ctx, config);
}