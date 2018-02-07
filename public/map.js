var map;

function initMap() {
    var rome = {lat: 41.890251, lng: 12.492373};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: rome
    });
}

function addMarker(position) {
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: 'User'
      });
}


function geolocation() {
    var infoWindow = new google.maps.InfoWindow;
    var pos;
    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            addMarker(pos);
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
            resolve(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
      })
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }