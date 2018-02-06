const express = require('express');
const app = express();
const https = require('https').Server(app);
const io = require('socket.io')(https);

const fs = require('fs');

var port = 3000 || process.env.PORT;

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log("New socket: " + socket.id);
    io.on('ciao', (data) => {
        console.log(data)
    })
});

https.listen(port, () => {
    console.log("Server is listening on port " + port);
});