/**
 * Author: Siqi Zhao
 * */

/**
 * Load the MelHousing data. When the data comes back, create an overlay.
 * */
d3.csv("../DATA/test.csv", function (data) {

    // Find the mean value of lat in order to determine the center of Google Map...
    var mean_lat = d3.mean(data, function (d) {
        return d.Lattitude
    });
    // Find the mean value of long in order to determine the center of Google Map...
    var mean_long = d3.mean(data, function (d) {
        return d.Longtitude
    });

    // Create the Google map and then pin it to the specific div whose ID is #map...
    var map = new google.maps.Map(d3.select("#map").node(), {
        zoom: 15,
        draggableCursor: 'crosshair',
        center: new google.maps.LatLng(mean_lat, mean_long),
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        backgroundColor: "white",
        mapMaker: 'True',
        styles: [
            {
                featureType: "all",
                elementType: "labels",
                stylers: [{visibility: "on"}]
            }
        ]
    });

    // Create the overlay to do the preparation for the scatter...
    var overlay = new google.maps.OverlayView();

    // Find the max Price in the csv file in order to set the domain...
    // Then we can change the colour of nodes depending on the price of the house...
    var max_domain = d3.max(data, function (d) {
        return d.Price
    });
    // Find the min Price in the csv file in order to set the domain...
    // Then we can change the colour of nodes depending on the price of the house...
    var min_domain = d3.min(data, function (d) {
        return d.Price
    });

    // Add the container when the overlay is added to the map...
    overlay.onAdd = function () {
        var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
            .attr("class", "hgdp");

        // Draw each marker as a separate SVG element.
        overlay.draw = function () {
            var projection = this.getProjection(),
                padding = 10;

            var color = d3.scale.linear()
                .domain([min_domain, max_domain])
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

            // Add a circle...
            marker.append("svg:circle")
                .attr("r", 7)
                .attr("cx", padding)
                .attr("cy", padding)
                .on("mouseover", function (d) {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html('<b>Suburb: </b>' + d.value.Suburb + '<br>' + '<b>Address: </b>' + d.value.Address + '<br>' +
                        '<b>Number of rooms: </b>' + d.value.Rooms + '<br>' + '<b>Price: </b>' + d.value.Price + ' AUD' + '<br>' +
                        '<b>Distance to CBD: </b>' + d.value.Distance + ' km' + '<br>' + '<b>Number of Carpots: </b>' +
                        d.value.Car + '<br>' + '<b>Landsize: </b>' + d.value.Landsize + ' &#13217' + '<br>' + '<b>Building Size: </b>' +
                        d.value.BuildingArea + ' &#13217')
                        .style("left", (d3.event.pageX + 5) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function (d) {
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
                    .attr('fill', color(d.value.Price))
            }
        };
    };

    // Bind our overlay to the map...
    overlay.setMap(map);
});

