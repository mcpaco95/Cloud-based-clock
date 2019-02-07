var secondServerOn = false;
//Initialize system
function init() {
    setTimeout(getDate, 50);
    getServerTime();
}

//Client-side clock
function getDate() {
    var date = new Date();
    var hora = date.getHours();
    var minuto = date.getMinutes();
    var segundo = date.getSeconds();
    minuto = checkTime(minuto);
    segundo = checkTime(segundo);
    if (document.getElementById('clientClock') == null) {
        return;
    } else {
        document.getElementById('clientClock').innerHTML = hora + ":" + minuto + ":" + segundo;
    }
    setTimeout(getDate, 500);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}

//Server-side clock
function getServerTime(){
    var socket = io.connect('http://localhost:3000/');
    socket.on('serverTime', function (data) {

        //console.log(data);
        document.getElementById('serverClock').innerHTML = data.H + ':' + data.M + ':' + data.S
    });
}

//Server time update
setInterval(function() {
    getServerTime();
    if (secondServerOn == true) {
        getSecondServerTime();
    }
}, 500);

//Second clock
var url = '';
function getSecondServerTime(){
    var url = document.getElementById('urlInput').value;
    secondServerOn = true;
    
    var socket = io.connect(url);
    socket.on('serverTime', function (data) {

        document.getElementById('serverClock2').innerHTML = data.H + ':' + data.M + ':' + data.S
    });
     
}

//Modal
function showModal(){
    $("#modificarRefaccion").modal();
}