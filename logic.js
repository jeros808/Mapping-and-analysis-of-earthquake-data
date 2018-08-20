// Creating map object
var myMap = L.map("map", {
  center: [36.00, -96.02],
  zoom: 4
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

function markerSize(population) {
    return population / 40;
};

// Building API query URL
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson?";

d3.json(baseURL, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {
    function chooseColor(d) {
        if (d <= 1) {
            return "red";
        }
        else if (d > 1 && d <= 2) {
            return "orange";
        }
        else if (d > 2 && d <= 3) {
            return "gold";
        }
        else if (d > 3 && d <= 4){
            return "yellow";
        }
        else if (d > 4 && d <= 5){
            return "green";
        }
        else if (d > 5) {
            return "blue";
        }
        else {
        return "red";
        }
}

    function onEachFeature(feature, layer) {
        L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            fillOpacity: 0.65,
            color: "#3e3e3e",
            weight: 0.5,
            fillColor: chooseColor(feature.properties.mag),
            radius: (feature.properties.mag * 20000)
            }).bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"
            + "<hr><p>Magnitude: " + feature.properties.mag + "</p>").addTo(myMap);
    }

    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    legend.addTo(myMap);
}



