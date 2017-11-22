(function () {
  'use strict';
  angular
    .module('viewMyRunsModule')
    .factory('d3SDChart', d3SDChart);

  function d3SDChart(mathUtilsService) {

    return {
      console: function () {
        console.log("d3SD")
      },
      getspeedDistanceData: function (dataa, index) {
        d3.selectAll('#sign').remove();
        d3.xml("assets/trafficlight.svg").mimeType("image/svg+xml").get(function (error, xml) {
          if (error) throw error;
          var importedNode = document.importNode(xml.documentElement, true);
          var svg, data, x, y, xAxis, yAxis, dim, chartWrapper, line, path;
          var light;
          var xaxisData = dataa.speedDistanceReportPerJourney.speedDistanceReports[index].speedDistanceReportPerLink.speedDistanceProfiles.actualSpeedAndPositions;
          var signallingData = dataa.signallingSummaryReportPerJourney.trainSignallingDetailsPerLinkList[index];

          var border = 1;
          var bordercolor = 'none';
          var fill = 'lightblue';

          var margin = {top: 20, right: 40, bottom: 20, left: 60},
            width = 1060 - margin.left - margin.right,
            height = 240 - margin.top - margin.bottom;

          x = d3.scale.linear()
            .domain(d3.extent(d3.values(xaxisData), function (d) {
              return d.position
            }))
            .range([0, width])
            .clamp(true);

          var xValue = function (d) {
            return d.distanceInMetres;
          }
          var xMap = function (d) {
            return x(xValue(d));
          }
          xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")

          // console.log(signallingData.trainSignallingDetailsPerLinkList[index]);

          //setup y
          y = d3.scale.linear()
            .range([height, 0]);
          var yValue = function (d) {
            return 0.2;
          }
          var yMap = function (d) {
            return y(yValue(d));
          }


          var yValueActual = function (d) {
            return 0.7;
          }
          var yMapActual = function (d) {
            return y(yValueActual(d))
          }
          yAxis = d3.svg.axis()
            .scale(y)
            .ticks(0)
            .orient("left");


          svg =  d3.select("#testSpeedDistanceChart")
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 1060 250")
            // .classed("svg-content", true)
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top + margin.bottom)
            .attr("border", border)
            .attr("id", 'sign')
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis.tickFormat(d3.format(".2s")))
            .append("text")
            .text("Optimal")
            .style("text-anchor", "start")
            .style("font-size", "1.3em")
            .attr("transform", function(d) {
              return "rotate(-90)"
            });

          svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .text("Actual")
            .attr("x", -50)
            .attr("y", 0)
            .style("font-size", "1.3em")
            .attr("transform", function(d) {
              return "rotate(-90)"
            });

          svg.append("rect")
            .attr("class", "pane")
            .attr("width", width)
            .attr("height", height);
          // .call(d3.drag()
          //   .on("start.interrupt", function() { optimalTrainSlider.interrupt(); })
          //   .on("start drag", function() { optimalTrainPosition(x.invert(d3.event.x)); }));
          // var zoom = d3.behavior.zoom()

          var actual = svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", 100)
            .attr("width", width)
            .style("stroke", bordercolor)
            .style("fill", fill)
            .style("stroke-width", border);

          svg.append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("x", x(0))
            //.attr("y", y(1))
            .attr("y", 0)
            .attr("width", x(1) - x(0))
            //.attr("height", y(0) - y(1));
            .attr("height", 100);


          var optimal = svg.append("rect")
            .attr("x", 0)
            .attr("y", 100)
            .attr("height", 100)
            .attr("width", width)
            .style("stroke", bordercolor)
            .style("fill", "lightgreen")
            .style("stroke-width", border);

          svg.append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("x", x(0))
            //.attr("y", y(1))
            .attr("y", 0)
            .attr("width", x(1) - x(0))
            //.attr("height", y(0) - y(1));
            .attr("height", 100);
          // .call(zoom);

          // draw dots
          var signalsActual = svg.selectAll(".light")
            .data(signallingData.signalInitialStateAndPositionInMetresList)
            .enter()
            .append("g")
            .attr("transform", function (d, i) {
              // console.log("xMap", xMap(d), yMap(d))
              return "translate(" + xMap(d) + "," + yMapActual(d) + ")"
            })
            .each(function (d, i) {
              light = this.appendChild(importedNode.cloneNode(true));
              d3.select(light)
                .attr("id", function () {
                  return d.signalID + "actual"
                })
                .selectAll("circle")
                .attr("class", "actual")
                .style("fill", d.signallingColour);
            });
          var actualdrag = d3.behavior.drag()
            .on("drag", function (d) {
              actualTrainPosition(x.invert(d3.event.x));
            });
          var actualTrainSlider = svg.append("g")
            .attr("class", "optimalTrainSlider")
            .attr("transform", "translate(0," + 100 + ")");

          actualTrainSlider.append("line")
            .attr("class", "track")
            .attr("x1", x.range()[0])
            .attr("x2", x.range()[1])
            .select(function () {
              return this.parentNode.appendChild(this.cloneNode(true));
            })
            .attr("class", "track-inset")
            .select(function () {
              return this.parentNode.appendChild(this.cloneNode(true));
            })
            .attr("class", "track-overlay")
            .call(actualdrag);

          actualTrainSlider.insert("g", ".track-overlay")
            .attr("class", "ticks")
            .attr("transform", "translate(0," + 18 + ")")
            .selectAll("text")
            .data(x.ticks(10))
          /* .enter().append("text")
           .attr("x", x)
           .attr("text-anchor", "left")
           .text(function(d) { return d + "°"; });*/

          var actualTrainHandle = actualTrainSlider.insert("image", ".track-overlay")
            .attr("xlink:href", "assets/train.svg")
            .attr("width", 30)
            .attr("height", 30)
            .attr("align", "end")
            .attr("class", "handle")
            .attr("y", -30)
            .attr("x", 0);

          function actualTrainPosition(h) {
            actualTrainHandle.attr("x", x(h));
            _.each(signallingData.actualTrainPositionSignallingStateList, function (d, i) {
              if (h > d.distanceInMetres) {
                signallingColor(d, "actual")
              }
            });
          }

          var signalsOptimal = svg.selectAll(".light")
            .data(signallingData.signalInitialStateAndPositionInMetresList)
            .enter()
            .append("g")
            .attr("transform", function (d, i) {
              // console.log("xMap", xMap(d), yMap(d))
              return "translate(" + xMap(d) + "," + yMap(d) + ")"
            })
            .each(function (d, i) {
              light = this.appendChild(importedNode.cloneNode(true));
              d3.select(light)
                .attr("id", function () {
                  return d.signalID + "optimal"
                })
                .selectAll("circle")
                // .attr("class", "dot")
                .attr("class", "optimal")
                .style("fill", d.signallingColour);
            });
          /*.attr("r", 10)
                      .attr("cx", xMap)
                      .attr("cy", yMap)
                      .style("fill", function (d) {
                        return d.signallingColour
                      })
                      .on("mouseover", function (d) {
                        // tooltip.transition()
                        //   .duration(200)
                        //   .style("opacity", .9);
                        // tooltip.html(d["Cereal Name"] + "<br/> (" + xValue(d)
                        //   + ", " + yValue(d) + ")")
                        //   .style("left", (d3.event.pageX + 5) + "px")
                        //   .style("top", (d3.event.pageY - 28) + "px");
                      })
                      .on("mouseout", function (d) {
                        // tooltip.transition()
                        //   .duration(500)
                        //   .style("opacity", 0);
                      });*/

          var optimaldrag = d3.behavior.drag()
          // .on("interrupt", function() { optimalTrainSlider.interrupt(); })
            .on("drag", function (d) {
              optimalTrainPosition(x.invert(d3.event.x));
            });

          var optimalTrainSlider = svg.append("g")
            .attr("class", "optimalTrainSlider")
            .attr("transform", "translate(0," + height + ")");

          optimalTrainSlider.append("line")
            .attr("class", "track")
            .attr("x1", x.range()[0])
            .attr("x2", x.range()[1])
            .select(function () {
              return this.parentNode.appendChild(this.cloneNode(true));
            })
            .attr("class", "track-inset")
            .select(function () {
              return this.parentNode.appendChild(this.cloneNode(true));
            })
            .attr("class", "track-overlay")
            .call(optimaldrag);

          optimalTrainSlider.insert("g", ".track-overlay")
            .attr("class", "ticks")
            .attr("transform", "translate(0," + 18 + ")")
            .selectAll("text")
            .data(x.ticks(10))
          /*.enter().append("text")
          .attr("x", x)
          .attr("text-anchor", "left")
          .text(function(d) { return d + "°"; });*/

          var optimalTrainHandle = optimalTrainSlider.insert("image", ".track-overlay")
            .attr("xlink:href", "assets/train.svg")
            .attr("width", 30)
            .attr("height", 30)
            .attr("align", "end")
            .attr("class", "handle")
            .attr("y", -30)
            .attr("x", 0)
          /* var optimalTrainHandle = optimalTrainSlider.insert("circle", ".track-overlay")
             .attr("r", 9)
             .attr("class", "optimalTrainHandle");*/
          function optimalTrainPosition(h) {
            // optimalTrainHandle.attr("cx", x(h));
            optimalTrainHandle.attr("x", x(h));
            _.each(signallingData.optimalTrainPositionSignallingStateList, function (d, i) {
              if (h > d.distanceInMetres) {
                signallingColor(d, "optimal")
              }
            })
          }





          function signallingColor(d, className) {
            if(d.signallingColour === "RED"){
              d3.select("#" + d.signalID + className)
                .selectAll("." + className)
                .style("fill", "gray");
              d3.select("#" + d.signalID+ className )
                .select("circle:nth-child(1)")
                .style("fill", d.signallingColour)
            }else if(d.signallingColour === "YELLOW"){
              d3.select("#" + d.signalID + className)
                .selectAll("." + className)
                .style("fill", "gray");
              d3.select("#" + d.signalID+ className)
              // .selectAll(".optimal")
                .select("circle:nth-child(2)")
                .style("fill", d.signallingColour)
            }
            else if(d.signallingColour === "GREEN"){
              d3.select("#" + d.signalID + className )
                .selectAll("." + className)
                .style("fill", "gray");
              d3.select("#" + d.signalID+ className)
              // .selectAll(".optimal")
                .select("circle:nth-child(3)")
                .style("fill", d.signallingColour)
            }
          }
// --------------------------------************ Animation ***************** ----------------------------------------//
          /*optimalTrainHandle.transition() // Gratuitous intro!
            .duration(10000)
            .delay(100)
            // .attr("x", width)
            // .delay(100)
            .ease("easeLinear")
            .tween("optimalTrainPosition", function () {
              var i = d3.interpolate(0, x.domain()[1]);
              return function (t) {
                optimalTrainPosition(i(t));
              };
            })*/

          /*actualTrainHandle.transition() // Gratuitous intro!
            .duration(10000)
            // .attr("x", width)
            .delay(100)
            // .ease("easeLinear")
            .tween("actualTrainPosition", function () {
              var i = d3.interpolate(0, x.domain()[1]);
              return function (t) {
                actualTrainPosition(i(t));
              };
            });*/
// --------------------------------************ Animation ***************** ----------------------------------------//

        })
      }


    }

  }
})();
