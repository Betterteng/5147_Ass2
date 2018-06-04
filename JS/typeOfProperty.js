/**
 * Author: Siqi Zhao
 * */

var result = [];

d3.csv("../DATA/melhousing_no_na.csv", function (data) {

    // Calculate number of records by the type of the property
    result = d3.nest()
        .key(function (d) {
            return d.Type
        })
        .rollup(function (v) {
            return v.length
        })
        .entries(data);

    // There are three types of properties in total: house; unit & townhouse...
    console.log(result);

    // Set the size of the pie chart...
    var w = 600,
        h = 600,
        r = 200,
        color = d3.scale.category20c();

    // Set the data...
    data = [{"label": "House", "value": result[0].values},
        {"label": "Unit", "value": result[1].values},
        {"label": "Townhouse", "value": result[2].values}];

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var vis = d3.select("#chartContainer")
        .append("svg:svg")              //  Create the SVG element inside the <body>
        .data([data])                   //  Associate our data with the document
        .attr("width", w)               //  Set the width and height of our visualization (these will be attributes of the <svg> tag)
        .attr("height", h)
        .append("svg:g")                // Make a group to hold our pie chart
        .attr("transform", "translate(" + r + "," + r + ")");    //  Move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              // This will create <path> elements for us using arc data
        .outerRadius(r);

    //  This will create arc data for us given a list of values
    //  We must tell it out to access the value of each element in our data array
    var pie = d3.layout.pie()
        .value(function (d) {
            return d.value;
        });

    //  This selects all <g> elements with class slice (there aren't any yet)
    var arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice")
        .on("mouseover", function (d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html('<b>Type: </b>' + d.data.label + '<br>' + '<b>Total number: </b>' + d.data.value)
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", 0);
        });

    //  Set the color for each slice to be chosen from the color function defined above...
    arcs.append("svg:path")
        .attr("fill", function (d, i) {
            return color(i);
        })
        .attr("d", arc);

    //  Add a label to each slice & set the label's origin to the center of the arc
    arcs.append("svg:text")
        .attr("transform", function (d) {
            //  Make sure to set these before calling arc.centroid
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function (d, i) {
            return data[i].label;    //  Get the label from our original data array
        });

});
