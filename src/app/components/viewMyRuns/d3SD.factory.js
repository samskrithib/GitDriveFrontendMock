(function () {
  'use strict';
  angular
    .module('viewMyRunsModule')
    .factory('d3SDChart', d3SDChart);

  function d3SDChart() {

    return {
      console: function () {
        console.log("d3SD")
      },
      getspeedDistanceData: function (dataa, index) {
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
            width = 960 - margin.left - margin.right,
            height = 100 - margin.top - margin.bottom;

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
            .orient("bottom");
          // console.log(signallingData.trainSignallingDetailsPerLinkList[index]);

          //setup y
          y = d3.scale.linear()
            .range([height, 0]);
          var yValue = function (d) {
            return 0.7;
          }
          var yMap = function (d) {
            return y(yValue(d));
          }

          yAxis = d3.svg.axis()
            .scale(y)
            .ticks(0)
            .orient("left");

          svg = d3.select("#testSpeedDistanceChart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("border", border)
            .attr("id", 'sign')
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          // .call(d3.drag()
          //   .on("start.interrupt", function() { slider.interrupt(); })
          //   .on("start drag", function() { hue(x.invert(d3.event.x)); }));
          // var zoom = d3.behavior.zoom()

          var borderPath = svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", height)
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
            .attr("height", height);

          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text");

          svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

          svg.append("rect")
            .attr("class", "pane")
            .attr("width", width)
            .attr("height", height)
          // .call(zoom);

          console.log("sign", signallingData.signalInitialStateAndPositionInMetresList)
          // draw dots
          var signals = svg.selectAll(".light")
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
                  return d.signalID
                })
                .selectAll("circle")
                .attr("class", "dot")
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




          var drag = d3.behavior.drag()
          // .on("interrupt", function() { slider.interrupt(); })
            .on("drag", function (d) {
              // console.log(x.invert(d3.event.x))
              hue(x.invert(d3.event.x));
            });


          var slider = svg.append("g")
            .attr("class", "slider")
            .attr("transform", "translate(0," + height + ")");

          slider.append("line")
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
            .call(drag);

          slider.insert("g", ".track-overlay")
            .attr("class", "ticks")
            .attr("transform", "translate(0," + 18 + ")")
            .selectAll("text")
            .data(x.ticks(10))
          /*.enter().append("text")
          .attr("x", x)
          .attr("text-anchor", "left")
          .text(function(d) { return d + "°"; });*/

         /* var handle = slider.insert("image", ".track-overlay")
            .attr("xlink:href", "assets/train.svg")
            .attr("width", 30)
            .attr("height", 30)
            .attr("align", "end")
            .attr("class", "handle")
            .attr("y", -25)
            .attr("x", -25)*/
            // .attr("r", 9);
          var handle = slider.insert("circle", ".track-overlay")
            .attr("r", 9)
            .attr("class", "handle");
          function hue(h) {
            handle.attr("cx", x(h));
            // handle.attr("x", x(h));
            /* d3.selectAll(".dot").style("fill", function () {
               return d3.hsl(h, 0.8, 0.8)
             });*/
            // borderPath.style("fill", d3.hsl(0.5, h, 0.8))

            _.each(signallingData.actualTrainPositionSignallingStateList, function (d, i) {
              if( h > d.distanceInMetres){
                d3.select("#"+ d.signalID).selectAll(".dot").style("fill", d.signallingColour)
              }
              // console.log(yMap(d.distanceInMetres))
              // console.log(d3.select("#"+ d.signalID).selectAll(".dot"), d.signallingColour, d.distanceInMetres)
            })
          }

          slider.transition() // Gratuitous intro!
            .duration(10000)
            .tween("hue", function() {
              var i = d3.interpolate(0,x.domain()[1]);
              return function(t) { hue(i(t)); };
            })

        })
      }


    }

  }
})();
