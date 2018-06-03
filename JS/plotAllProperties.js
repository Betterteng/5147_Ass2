/**
 * Author: Siqi Zhao
 * */

/**
 * Load the MelHousing data. When the data comes back, create an overlay.
 * */
d3.csv("../DATA/melhousing_no_na.csv", function (data) {

    const Mel_lat = -37.8136;
    const Mel_long = 144.9631;

    // Create the Google map and then pin it to the specific div whose ID is #map...
    var map = new google.maps.Map(d3.select("#map").node(), {
        zoom: 10,
        draggableCursor: 'crosshair',
        center: new google.maps.LatLng(Mel_lat, Mel_long),
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

            var marker = layer.selectAll("svg")
                .data(d3.entries(data))
                .each(transform) // update existing markers
                .enter().append("svg:svg")
                .each(transform)
                .attr("class", "marker");

            // Add a circle...
            marker.append("svg:circle")
                .attr("r", 2)
                .attr("cx", padding)
                .attr("cy", padding);

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

