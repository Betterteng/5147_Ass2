/**
 * Author: Siqi Zhao
 * */

// Global variable - map...
var map;

// Create the map and the center is pinned on Melbourne CBD...
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -37.8136, lng: 144.9631},
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });
}