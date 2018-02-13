import * as d3 from 'd3';
  var loadedData = false;
  var updated3 = false;

function plotD3Chart() {
    var width = 600;
    var height = 300;
    var xoffs = 40;
    var yoffs = 40;

    var svg = d3.select("#root")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Get actual width
    width = svg.node().getBoundingClientRect().width;

    var domainX = [50, 85];
    var domainY = [0, 4];

    var x = d3.scaleLinear().domain(domainX).range([xoffs, width - 20]);
    var y = d3.scaleLinear().domain(domainY).range([height - yoffs, 20]);
  
    var linedata = d3.line()
      .x(function (d){return x(d["Temperature F"])})
      .y(function (d){return y(d["Erosion incidents"])});
    x.domain(domainX);
    y.domain(domainY);

    // Add axes first to show plots on top
    var x_axis = svg.append("g")
        .classed("x axis", true)
        .attr("transform", function () { return "translate(0," + y.range()[0] + ")" })
        .call(d3.axisBottom(x));

    var y_axis = svg.append("g")
        .classed("y axis", true)
        .attr("transform", function () { return "translate(" + x.range()[0] + ",0)" })
        .call(d3.axisLeft(y));
  var line_path = svg.append("path")
        .data([loadedData])
        .classed("line", true)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", "3px");
  
  function update() {

        // Sort the data to make the line work right
        loadedData.sort(function (x1, x2) {
            return d3.ascending(x1["Temperature F"], x2["Temperature F"]);
        })

        line_path.data([loadedData]);

        x.domain(domainX);
        y.domain(domainY);
        x_axis.transition().call(d3.axisBottom(x));
        y_axis.transition().call(d3.axisLeft(y));
        line_path.transition().attr("d", linedata);

        var markers = svg.selectAll(".marker")
            .data(loadedData);

        markers.exit().remove();

        var new_markers = markers.enter()
            .append("g")
            .classed("marker", true);

        function marker_translation(d) {
            return "translate(" + x(d["Temperature F"]) + ", " + y(d["Erosion incidents"]) + ")";
        }

        new_markers.attr("transform", marker_translation);
        // Set translation without transition on enter, with transition on update
        markers.transition().attr("transform", marker_translation);

        new_markers.append("circle")
            .attr("r", 8)
            .attr("fill", "red")
            .attr("stroke", "grey");

        new_markers.append("circle")
            .attr("r", 3)
            .attr("fill", "black")
            .attr("stroke", "grey");

    }

    // Call update to make inital data binding
    update();

    // Return update function to make it available for other
    // functions to call when appropriate
    return update;
}

export default function generateRandomD3Chart () {
  var myOwn_csv = "https://dl.dropbox.com/s/dn8ye79jy5zr4j1/challenger_data.csv?dl=0";

  d3.csv(myOwn_csv, function(data){
    data.forEach(function(d){
      d["Temperature F"] = +d["Temperature F"];
      d["Erosion incidents"] = +d["Erosion incidents"];
      d["Damage index"] = +d["Damage index"];      
    });
    loadedData = data;
    plotD3Chart();
  });

}
