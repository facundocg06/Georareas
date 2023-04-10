var map = L.map('map-template').setView([-17.7764507,-63.1949026], 15);

const tileURL = 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png' 
const tileURL2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

const tile = L.tileLayer(tileURL2);

// Socket Io
const socket = io.connect();

// Marker
//-17.7764507,-63.1949026
const marker = L.marker([-17.776, -63.194]); // kiev, ukraine
marker.bindPopup('-17.7764507,-63.1949026');
map.addLayer(marker);
var circle = L.circle([-17.776, -63.194], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 250
}).addTo(map);
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(map);
        const userIcon = L.icon({
          iconUrl: '/img/icon1.png',
          iconSize: [38, 42], });  
        var marker = L.marker(e.latlng,{
          icon: userIcon 
        }).addTo(map)
}

map.on('click', onMapClick);

// Geolocation
map.locate({enableHighAccuracy: true})
map.on('locationfound', (e) => {
  const coords = [e.latlng.lat, e.latlng.lng];
  const newMarker = L.marker(coords); 
  newMarker.bindPopup(e.latlng.toString());
  map.addLayer(newMarker);
  socket.emit('userCoordinates', e.latlng);

});
//area
var polygon = L.polygon([
  [-17.775, -63.196],
  [-17.774, -63.191],
  [-17.773, -63.192],
  [-17.774, -63.1947]
]).addTo(map);
// socket new User connected
socket.on('newUserCoordinates', (coords) => {  
  console.log(coords);
  const userIcon = L.icon({
    iconUrl: '/img/icon1.png',
    iconSize: [38, 42],
  })
  const newUserMarker = L.marker([coords.lat, coords.lng], {
    icon: userIcon 
  });
  newUserMarker.bindPopup('Su Ubivacion');
  map.addLayer(newUserMarker);
}); 

map.addLayer(tile);

