/**
 * Author: Siqi Zhao
 * */

// Global variable - map...
var map;

// Create the map and the center is pinned on Melbourne CBD...
function initMap() {
    // map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: -37.8136, lng: 144.9631},
    //     zoom: 13,
    //     mapTypeId: google.maps.MapTypeId.TERRAIN
    // });
    map = new google.maps.Map(d3.select("#map").node(), {
        draggableCursor: 'crosshair',
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        backgroundColor: "white",
        mapMaker: 'True',
        styles: [
            {
                featureType: "all",
                elementType: "labels",
                stylers: [{ visibility: "off" }]  // Hide the points of interests...
            }
        ]
    });
}

// // Define the div for the tooltip
// var div = d3.select("body").append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);

d3.csv("../DATA/test.csv", function(error, data) {
    if (error) throw error;

    // console.log('sss');
    // console.log(data[0]);
    //
    // var overlay = new google.maps.OverlayView();
    // // Add the container when the overlay is added to the map.
    // overlay.onAdd = function() {
    //     var layer = d3.select(this.getPanes().overlayLayer).append("div")
    //         .attr("class", "stations");
    //     // Draw each marker as a separate SVG element.
    //     // We could use a single SVG, but what size would it have?
    //     overlay.draw = function() {
    //         var projection = this.getProjection(),
    //             padding = 10;
    //         var marker = layer.selectAll("svg")
    //             .data(d3.entries(data))
    //             .each(transform) // update existing markers
    //             .enter().append("svg")
    //             .each(transform)
    //             .attr("class", "marker");
    //         // Add a circle.
    //         marker.append("circle")
    //             .attr("r", 4.5)
    //             .attr("cx", padding)
    //             .attr("cy", padding);
    //         // Add a label.
    //         marker.append("text")
    //             .attr("x", padding + 7)
    //             .attr("y", padding)
    //             .attr("dy", ".31em")
    //             .text(function(d) {
    //                 //console.log(d.value.Suburb);
    //                 return d.value.Address;
    //             });
    //         function transform(d) {
    //             d = new google.maps.LatLng(d.value.Lattitude, d.value.Longtitude);
    //             d = projection.fromLatLngToDivPixel(d);
    //             return d3.select(this)
    //                 .style("left", (d.x - padding) + "px")
    //                 .style("top", (d.y - padding) + "px");
    //         }
    //     };
    // };
    // // Bind our overlay to the map…
    // overlay.setMap(map);





    var overlay = new google.maps.OverlayView();

    // // Add the container when the overlay is added to the map.
    // overlay.onAdd = function() {
    //     var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
    //         .attr("class", "hgdp");
    //
    //     // Draw each marker as a separate SVG element.
    //     overlay.draw = function() {
    //         var projection = this.getProjection(),
    //             padding = 10;
    //
    //         var color = d3.scale.linear()
    //             .domain([0, 100000000])
    //             .range(["blue", "red"]);
    //
    //         var tooltip = d3.select("body")
    //             .append("div")
    //             .attr("class", "tooltip")
    //             .style("opacity", 0);
    //
    //         var marker = layer.selectAll("svg")
    //             .data(d3.entries(data))
    //             .each(transform) // update existing markers
    //             .enter().append("svg:svg")
    //             .each(transform)
    //             .attr("class", "marker");
    //
    //         // Add a circle.
    //         marker.append("svg:circle")
    //             .attr("r", 5)
    //             .attr("cx", padding)
    //             .attr("cy", padding)
    //             .on("mouseover", function(d) {
    //
    //                 console.log(d);
    //
    //                 tooltip.transition()
    //                     .duration(200)
    //                     .style("opacity", .9);
    //                 tooltip.html(d.value.Address)
    //                     .style("left", (d3.event.pageX + 5) + "px")
    //                     .style("top", (d3.event.pageY - 28) + "px");
    //             })
    //             .on("mouseout", function(d) {
    //                 tooltip.transition()
    //                     .duration(200)
    //                     .style("opacity", 0);
    //             });
    //
    //         marker.append("text")
    //             .attr("x", padding + 7)
    //             .attr("y", padding)
    //             .attr("dy", ".31em")
    //             .text(function(d) {
    //                 //console.log(d.value.Suburb);
    //                 return d.value.Address;
    //             });
    //
    //         function transform(d) {
    //             //console.log(d);
    //
    //             pos = new google.maps.LatLng(d.value.Lattitude, d.value.Longtitude);
    //             pos = projection.fromLatLngToDivPixel(pos);
    //
    //             //console.log(pos);
    //             return d3.select(this)
    //                 .style("left", (pos.x - padding) + "px")
    //                 .style("top", (pos.y - padding) + "px")
    //                 .attr('fill', color(d.value.Price))
    //         }
    //     };
    // };

    // Add the container when the overlay is added to the map.
    overlay.onAdd = function() {
        var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
            .attr("class", "hgdp");

        // Draw each marker as a separate SVG element.
        overlay.draw = function() {
            var projection = this.getProjection(),
                padding = 10;

            var color = d3.scale.linear()
                .domain([0, 1])
                .range(["blue", "red"]);

            var tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            var marker = layer.selectAll("svg")
                .data(d3.entries(data))
                .each(transform) // update existing markers
                .enter().append("svg:svg")
                .each(transform)
                .attr("class", "marker");

            // Add a circle.
            marker.append("svg:circle")
                .attr("r", 5)
                .attr("cx", padding)
                .attr("cy", padding)
                .on("mouseover", function(d) {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html('Population: ' + d.value.Address + '<br>')
                        .style("left", (d3.event.pageX + 5) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });

            function transform(d) {
                pos = new google.maps.LatLng(d.value.Lattitude, d.value.Longtitude);
                pos = projection.fromLatLngToDivPixel(pos);
                return d3.select(this)
                    .style("left", (pos.x - padding) + "px")
                    .style("top", (pos.y - padding) + "px")
                    //.attr('fill', color(d.value[2]))
            }
        };
    };

    // Bind our overlay to the map…
    overlay.setMap(map);
});