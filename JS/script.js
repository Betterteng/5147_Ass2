/**
 * Author: Siqi Zhao
 * */

// Global variable - map...
var map;

// Create the map and the center is pinned on Melbourne CBD...
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -37.8136, lng: 144.9631},
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });
}

d3.csv("../DATA/test.csv", function(error, data) {
    if (error) throw error;

    console.log('sss');
    console.log(data[0]);

    var overlay = new google.maps.OverlayView();
    // Add the container when the overlay is added to the map.
    overlay.onAdd = function() {
        var layer = d3.select(this.getPanes().overlayLayer).append("div")
            .attr("class", "stations");
        // Draw each marker as a separate SVG element.
        // We could use a single SVG, but what size would it have?
        overlay.draw = function() {
            var projection = this.getProjection(),
                padding = 10;
            var marker = layer.selectAll("svg")
                .data(d3.entries(data))
                .each(transform) // update existing markers
                .enter().append("svg")
                .each(transform)
                .attr("class", "marker");
            // Add a circle.
            marker.append("circle")
                .attr("r", 4.5)
                .attr("cx", padding)
                .attr("cy", padding);
            // Add a label.
            marker.append("text")
                .attr("x", padding + 7)
                .attr("y", padding)
                .attr("dy", ".31em")
                .text(function(d) {
                    //console.log(d.value.Suburb);
                    return d.value.Suburb;
                });
            function transform(d) {
                d = new google.maps.LatLng(d.value.Lattitude, d.value.Longtitude);
                d = projection.fromLatLngToDivPixel(d);

                //console.log("!!!!!!" + d);

                return d3.select(this)
                    .style("left", (d.x - padding) + "px")
                    .style("top", (d.y - padding) + "px");
            }
        };
    };
    // Bind our overlay to the map…
    overlay.setMap(map);
});