let map;
var geocoder;
// Initialize map
function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 18.234922,
      lng:-78.129626

    },
    zoom: 13.
  });
  map.addListener("click", function(e) {
    showInfoWindow(e.latLng);
  });
}

// Search location by address
function getCoordinates() {
  let address = document.getElementById("address").value;
  geocoder.geocode({
    "address": address
  }, function(results, status) {
    if(status == "OK") {
      map.setCenter(results[0].geometry.location);
      let marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}


// Function to place a marker on the map
function placeMarker() {
  const latitude = parseFloat(document.getElementById("marker-latitude").value);
  const longitude = parseFloat(document.getElementById("marker-longitude").value);
  const marker = new google.maps.Marker({
    position: {
      lat: latitude,
      lng: longitude
    },
    map: map
  });
}
// Function to get directions from origin to destination
function getDirections() {
  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    map: map
  });
  directionsRenderer.setMap(map);
  directionsService.route({
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if(status === "OK") {
      directionsRenderer.setDirections(response);
    } else {
      window.alert("Directions request failed due to" + status);
    }
  });
}
// Function to place a circle
function placeCircle() {
  const latitude = parseFloat(document.getElementById("circle-latitude").value);
  const longitude = parseFloat(document.getElementById("circle-longitude").value);
  const radius = parseFloat(document.getElementById("circle-radius").value);
  const circle = new google.maps.Circle({
    center: {
      lat: latitude,
      lng: longitude
    },
    radius: radius,
    map: map
  });
}
// Function to place a rectangle
function placeRectangle() {
  const northLat = parseFloat(document.getElementById("north-coord").value);
  const southLat = parseFloat(document.getElementById("south-coord").value);
  const eastLng = parseFloat(document.getElementById("east-coord").value);
  const westLng = parseFloat(document.getElementById("west-coord").value);
  const rectangle = new google.maps.Rectangle({
    bounds: {
      north: northLat,
      south: southLat,
      east: eastLng,
      west: westLng
    },
    map: map
  });
}
// Function to place a polygon
function placePolygon() {
  const plat1 = parseFloat(document.getElementById("polygon-lat1").value);
  const plng1 = parseFloat(document.getElementById("polygon-lng1").value);
  const plat2 = parseFloat(document.getElementById("polygon-lat2").value);
  const plng2 = parseFloat(document.getElementById("polygon-lng2").value);
  const plat3 = parseFloat(document.getElementById("polygon-lat3").value);
  const plng3 = parseFloat(document.getElementById("polygon-lng3").value);
  const plat4 = parseFloat(document.getElementById("polygon-lat4").value);
  const plng4 = parseFloat(document.getElementById("polygon-lng4").value);
  const pathCoordinates = [{
    lat: plat1,
    lng: plng1
  }, {
    lat: plat2,
    lng: plng2
  }, {
    lat: plat3,
    lng: plng3
  }, {
    lat: plat4,
    lng: plng4
  }];
  const polygon = new google.maps.Polygon({
    paths: pathCoordinates,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map: map
  });
}
// Function to place a polyline
function placePolyline() {
  const lat1 = parseFloat(document.getElementById("lat1").value);
  const lng1 = parseFloat(document.getElementById("lng1").value);
  const lat2 = parseFloat(document.getElementById("lat2").value);
  const lng2 = parseFloat(document.getElementById("lng2").value);
  const lat3 = parseFloat(document.getElementById("lat3").value);
  const lng3 = parseFloat(document.getElementById("lng3").value);
  const lat4 = parseFloat(document.getElementById("lat4").value);
  const lng4 = parseFloat(document.getElementById("lng4").value);
  const pathCoordinates = [{
    lat: lat1,
    lng: lng1
  }, {
    lat: lat2,
    lng: lng2
  }, {
    lat: lat3,
    lng: lng3
  }, {
    lat: lat4,
    lng: lng4
  }];
  const polyline = new google.maps.Polyline({
    path: pathCoordinates,
    geodesic: true,
    strokeColor: "#FF0000 ",
    strokeOpacity: 1.0,
    strokeWeight: 2,
    map: map
  });
}
// Shows latitude and longitude when user clicks
function showInfoWindow(coord) {
  const infoWindow = new google.maps.InfoWindow({
    content: `Latitude: ${coord
  .lat()
  .toFixed(6)}, Longitude: ${coord.lng().toFixed(6)}`
  });
  infoWindow.setPosition(coord);
  infoWindow.open(map);
}
window.initMap = initMap;