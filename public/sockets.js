var socket = io();

function share_position() {
    geolocation()
    .then(position => {
        socket.emit('position', position);
    })   
}

socket.on('position', (data) => {
    addMarker(data);
    var audio = new Audio("/sounds/button-09.wav");
    audio.play();
});

