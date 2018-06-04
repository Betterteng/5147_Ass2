/**
 * Author: Siqi Zhao
 * */

window.onload = function () {

    var chart = new CanvasJS.Chart("relative", {
        animationEnabled: true,

        title: {
            text: "Relative Variable Importance"
        },
        axisX: {
            interval: 1
        },
        axisY2: {
            interlacedColor: "rgba(1,77,101,.2)",
            gridColor: "rgba(1,77,101,.1)",
            title: "Indicator"
        },
        data: [{
            type: "bar",
            indexLabel: "{y}",
            indexLabelPlacement: "inside",
            indexLabelOrientation: "horizontal",
            name: "suburbs",
            axisYType: "secondary",
            color: "#4E7AC7",
            dataPoints: relativeImportanceData
        }]
    });
    chart.render();

}