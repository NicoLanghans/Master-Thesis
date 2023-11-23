// Create map with openstreetmap basemap
var myMap = L.map('mapDIV', {
    center: [53.558231,9.95316],
    zoom: 17
  });
var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
      maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

var parksData
var markers = L.layerGroup();  

OpenStreetMap_DE.addTo(myMap);

// Get park data from geoJSON file and add it to map
 $.getJSON('data.json', function(geojson){
  var parks = L.geoJSON(geojson).addTo(myMap)

  // Create on entrance object saving park name and coordinates
  parks.eachLayer(function(layer){
    var parkName = layer.feature.properties.name;
    layer.bindPopup(parkName)
    layer.on('click', function(event) {
      var clickedPark = {
        name: parkName,
        lat: event.latlng.lat,
        long: event.latlng.lng
      };

      if (!parksData) {
        parksData = [];
      }
      // Add clicked park entrance to parksData object
      parksData.push(clickedPark);
      console.log(clickedPark)
      console.log(parksData)
  
      // Create on click markers showing park name and coordinates
      var marker = L.marker(event.latlng).addTo(markers);
      marker.bindPopup(parkName + '<br>' + 'Coordinates: ' + event.latlng.toString());

    });
  })
  // Add markers to map
  markers.addTo(myMap);
});
// Event handler for download button
document.getElementById('downloadButton').addEventListener('click', function() {
  saveParksData(parksData);
});
// Event handler for remove marker button
document.getElementById('removeMarkerButton').addEventListener('click', function() {
  removeLastMarker();
});

// Save list of park entries in json file
function saveParksData(data) {
  var jsonData = JSON.stringify(data, null, 2);
  var blob = new Blob([jsonData], { type: 'application/json' });

  // Creating download link
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'parkEntrances.json';

  // Add link to document, simulate click and remove link
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
// Remove last clicked marker (for case of misclick)
function removeLastMarker() {
  if (markers.getLayers().length > 0) {
    var lastMarker = markers.getLayers().pop(); 
    markers.removeLayer(lastMarker);  

    if (parksData.length > 0) {
      parksData.pop();
    }
  }
}
