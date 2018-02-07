const express = require('express');
const app = express();
const fs = require('fs');

//Https certificates load
var sslOptions = {
    key: fs.readFileSync('./certificates/key.pem'),
    cert: fs.readFileSync('./certificates/cert.pem'),
    passphrase: 'Trento'
}; 

const https = require('https').Server(sslOptions, app);
const io = require('socket.io')(https);

var port = 3000 || process.env.PORT;

//Load public directory for client files
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log("New socket: " + socket.id);
    
    socket.on('position', (data) => {
        socket.broadcast.emit('position', data);
    })
});

https.listen(port,() => {
    console.log("Server is running on port " + port);
})

