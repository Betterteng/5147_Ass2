/**
 * Author: Siqi Zhao
 * */

window.onload = function () {

    var chart = new CanvasJS.Chart("top20Suburbs", {
        animationEnabled: true,

        title:{
            text:"Top 20 Suburbs by Average Price"
        },
        axisX:{
            interval: 1
        },
        axisY2:{
            interlacedColor: "rgba(1,77,101,.2)",
            gridColor: "rgba(1,77,101,.1)",
            title: "Price"
        },
        data: [{
            type: "bar",
            indexLabel: "{y}",
            indexLabelPlacement: "inside",
            indexLabelOrientation: "horizontal",
            name: "suburbs",
            axisYType: "secondary",
            color: "#4E7AC7",
            dataPoints: top20SuburbsData
        }]
    });
    chart.render();

}