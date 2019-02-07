//Node modules
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3030, function () {
    console.log('Server running on port 3030...');
});

app.get('/', function (req, res) {
    res.send('<p>Serving time...</p>');
});

//socket.io
io.on('connection', function (socket) {
    var date = new Date();
    var hora = date.getHours();
    var minuto = date.getMinutes();
    var segundo = date.getSeconds();
    minuto = checkTime(minuto);
    segundo = checkTime(segundo);

    socket.emit('serverTime', {
        H: hora,
        M: minuto,
        S: segundo
    });
});

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}