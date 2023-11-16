// Create map with openstreetmap basemap
var myMap = L.map('mapDIV', {
    center: [53.558231,9.95316],
    zoom: 12
  });
var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
      maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

var parksData
var markers = L.layerGroup();  

OpenStreetMap_DE.addTo(myMap);

// Get centroids from geoJSON file and add it to map
 $.getJSON('census_centroid_data.json', function(centroid_geojson){
  L.geoJSON(centroid_geojson).addTo(myMap)
})

// Get bbox from geoJSON file and add it to map
$.getJSON('census_bbox_data.json', function(bbox_geojson){
  L.geoJSON(bbox_geojson).addTo(myMap)
})