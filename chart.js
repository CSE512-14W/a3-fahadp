/*global d3 */

// A direct copy from the crossfilter example:
// https://github.com/square/crossfilter/blob/50227903a5567d24c0d38141a5e94b5dec932b4c/index.html

var activeFilters=0;

function barChart() {
  if (!barChart.id) {
    barChart.id = 0;
  }

  var margin = {top: 10, right: 10, bottom: 20, left: 45};
  var x;
  var y = d3.scale.linear().range([150, 0]);
  var id = barChart.id++;
  var axis = d3.svg.axis().scale(x).orient("bottom");
  var yAxis = d3.svg.axis().scale(y).ticks(5).orient("left");
  var brush = d3.svg.brush();
  var brushDirty;
  var dimension;
  var group;
  var round;

  function chart(div) {
    var width = x.range()[1];
    var height = y.range()[0];

    y.domain([0, group.top(1)[0].value]);

    div.each(function() {
      var div = d3.select(this);
      var g = div.select("g");

      // Create the skeletal chart.
      if (g.empty()) {
        div.select(".title").append("a")
            .attr("href", "javascript:reset(" + id + ")")
            .attr("class", "reset")
            .text("Reset")
            //.style("display", "none")
			.style("visibility", "hidden");

        g = div.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        g.append("clipPath")
            .attr("id", "clip-" + id)
          .append("rect")
            .attr("width", width)
            .attr("height", height);

        g.selectAll(".bar")
            .data(["background", "foreground"])
          .enter().append("path")
            .attr("class", function(d) { return d + " bar"; })
            .datum(group.all());

        g.selectAll(".foreground.bar")
            .attr("clip-path", "url(#clip-" + id + ")");
			
		g.append("g")
            .attr("class", "y axis")
			.attr("id","y"+id)
            .attr("transform", "translate(0,0)")
            .call(yAxis);
		//axis = d3.svg.axis().scale(x).orient("bottom");
		//console.log(x('E'),x('K'));
		if(id==0){
			g.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(axis);
		}
		else if(id==1){
			var plainAxis = d3.svg.axis().scale(x).ticks(5).tickFormat(
			function(d) {if(d==1) return "Electric"; if(d==2) return "Elec/Kerosene"; if(d==3) return "Elec/Gas"; if(d==4) return "Kerosene"; return "";}).orient("bottom");
			g.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(plainAxis);
			/*g.append("text")
			.attr("x", 57)
			.attr("y", height+15)
			.attr("class","axis-plain")
			.text("Electric");
			g.append("text")
			.attr("x", 110)
			.attr("y", height+15)
			.attr("class","axis-plain")
			.text("Elec-Kerosene");
			g.append("text")
			.attr("x", 130)
			.attr("y", height+30)
			.attr("class","axis-plain")
			.text("Kerosene");
			g.append("text")
			.attr("x", 200)
			.attr("y", height+15)
			.attr("class","axis-plain")
			.text("Elec-Gas");
			g.append("text")
			.attr("x", 280)
			.attr("y", height+15)
			.attr("class","axis-plain")
			.text("Kerosene");*/
		}
		else if(id==2){
			var plainAxis = d3.svg.axis().scale(x).ticks(5).tickFormat(
			function(d) {if(d==1) return "Functional"; if(d==2) return "Non-Functional"; if(d==3) return "Unknown"; return "";}).orient("bottom");
			g.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(plainAxis);
			/*g.append("text")
			.attr("x", 70)
			.attr("y", height+15)
			.attr("class","axis-plain")
			.text("Functional");
			g.append("text")
			.attr("x", 150)
			.attr("y", height+15)
			.attr("class","axis-plain")
			.text("Non-Functional");
			g.append("text")
			.attr("x", 260)
			.attr("y", height+15)
			.attr("class","axis-plain")
			.text("Unknown");*/
		}
		
		
			
        // Initialize the brush component with pretty resize handles.
        var gBrush = g.append("g").attr("class", "brush").call(brush);
        gBrush.selectAll("rect").attr("height", height);
        gBrush.selectAll(".resize").append("path").attr("d", resizePath);
      }

      // Only redraw the brush if set externally.
      if (brushDirty) {
        brushDirty = false;
        g.selectAll(".brush").call(brush);
        div.select(".title a").style("visibility", brush.empty() ? "hidden" : "visible");//.style("display", brush.empty() ? "none" : null)
        if (brush.empty()) {
          g.selectAll("#clip-" + id + " rect")
              .attr("x", 0)
              .attr("width", width);
		  activeFilters--;
	      if(activeFilters==0)
		    d3.selectAll(".y").style("visibility","visible");
        } else {
          var extent = brush.extent();
          g.selectAll("#clip-" + id + " rect")
              .attr("x", x(extent[0]))
              .attr("width", x(extent[1]) - x(extent[0]));
		  activeFilters++;
	      d3.selectAll(".y").style("visibility","hidden");
        }
      }

      g.selectAll(".bar").attr("d", barPath);
    });

    function barPath(groups) {
      var path = [];
      var i = -1;
      var n = groups.length;
      var d;
      while (++i < n) {
        d = groups[i];
        path.push("M", x(d.key), ",", height, "V", y(d.value), "h9V", height);
      }
      return path.join("");
    }

    function resizePath(d) {
      var e = +(d === "e");
      var x = e ? 1 : -1;
      var y = height / 3;

      return "M" + (0.5 * x) + "," + y +
          "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6) +
          "V" + (2 * y - 6) +
          "A6,6 0 0 " + e + " " + (0.5 * x) + "," + (2 * y) +
          "Z" +
          "M" + (2.5 * x) + "," + (y + 8) +
          "V" + (2 * y - 8) +
          "M" + (4.5 * x) + "," + (y + 8) +
          "V" + (2 * y - 8);
    }
  }

  brush.on("brushstart.chart", function() {
    var div = d3.select(this.parentNode.parentNode.parentNode);
    div.select(".title a").style("visibility", "visible");//.style("display", null)
	d3.selectAll(".y").style("visibility","hidden");
	activeFilters++;
  });

  brush.on("brush.chart", function() {
    var g = d3.select(this.parentNode);
    var extent = brush.extent();

    if (round) {
      g.select(".brush")
        .call(brush.extent(extent = extent.map(round)))
      .selectAll(".resize").style("visibility", "visible");
        //.style("display", null)
    }
    g.select("#clip-" + id + " rect")
        .attr("x", x(extent[0]))
        .attr("width", x(extent[1]) - x(extent[0]));
    dimension.filterRange(extent);
  });

  brush.on("brushend.chart", function() {
    if (brush.empty()) {
      var div = d3.select(this.parentNode.parentNode.parentNode);
      div.select(".title a").style("visibility", "hidden");//.style("display", "none")
      div.select("#clip-" + id + " rect").attr("x", null).attr("width", "100%");
      dimension.filterAll();
	  activeFilters--;
	  if(activeFilters==0)
		d3.selectAll(".y").style("visibility","hidden");
    }
  });

  chart.margin = function(_) {
    if (!arguments.length) {
      return margin;
    }
    margin = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) {
      return x;
    }
    x = _;
    axis.scale(x);
    brush.x(x);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) {
      return y;
    }
    y = _;
    return chart;
  };

  chart.dimension = function(_) {
    if (!arguments.length) {
      return dimension;
    }
    dimension = _;
    return chart;
  };

  chart.filter = function(_) {
    if (_) {
      brush.extent(_);
      dimension.filterRange(_);
    } else {
      brush.clear();
      dimension.filterAll();
    }
    brushDirty = true;
    return chart;
  };

  chart.group = function(_) {
    if (!arguments.length) {
      return group;
    }
    group = _;
    return chart;
  };

  chart.round = function(_) {
    if (!arguments.length) {
      return round;
    }
    round = _;
    return chart;
  };

  return d3.rebind(chart, brush, "on");
}
