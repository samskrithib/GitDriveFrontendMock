(function () {
  'use strict';
  angular
    .module('viewMyRunsModule')
    .factory('d3SDChart', d3SDChart);

  function d3SDChart(mathUtilsService) {
    var svg, x, y, xAxis, yAxis, gX, speedLimitSymbolsOptimal;
    var xSLValue, xSLMap, xMap, xValue;
    var yMapActual, yMap;
    var yValueSLOptimal, yMapSLOptimal;

    return {
      getspeedDistanceData: function (dataa, index) {
        d3.selectAll('#sign').remove();
        d3.queue()
          .defer(d3.xml, "assets/trafficlight.svg")
          .defer(d3.xml, "assets/speedlimit.svg")
          .await(makeMyViz);

        function makeMyViz(error, light, speedlimitSymbol) {
          if (error) throw error;
          var importedNode = document.importNode(light.documentElement, true);
          var speedLimitNode = document.importNode(speedlimitSymbol.documentElement, true);

          var speedLimit;
          var xaxisData = dataa.speedDistanceReportPerJourney.speedDistanceReports[index].speedDistanceReportPerLink.speedDistanceProfiles.actualSpeedAndPositions;
          var signallingData = dataa.signallingSummaryReportPerJourney.trainSignallingDetailsPerLinkList[index];
          var speedRestrictions = dataa.speedDistanceReportPerJourney.speedDistanceReports[index].trackInformation;
          var border = 1;
          var bordercolor = 'none';
          var margin = {top: 20, right: 40, bottom: 20, left: 40},
            width = 1060 - margin.left - margin.right,
            height = 240 - margin.top - margin.bottom;
          //setup x
          x = d3.scale.linear()
            .domain(d3.extent(d3.values(xaxisData), function (d) {
              return mathUtilsService.convertMetersToMilesSingleValue(d.position)
            }))
            .range([0, width])
            .clamp(true);

          xValue = function (d) {
            return mathUtilsService.convertMetersToMilesSingleValue(d.distanceInMetres);
          };
          xMap = function (d) {
            return x(xValue(d));
          };
          xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");


          //setup y
          y = d3.scale.linear()
            .range([height, 0]);
          var yValue = function (d) {
            return 0.2;
          };
          yMap = function (d) {
            return y(yValue(d));
          };

          var yValueActual = function (d) {
            return 0.7;
          };
          yMapActual = function (d) {
            return y(yValueActual(d))
          };
          yAxis = d3.svg.axis()
            .scale(y)
            .ticks(0)
            .orient("left");


          svg = d3.select("#speedDistanceSignalling")
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 1060 250")
            // .classed("svg-content", true)
            .attr("border", border)
            .attr("id", 'sign')
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


          gX = svg.append("g")
            .attr("class", "x axis")
            .attr("id", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .text("Optimal")
            // .style("text-anchor", "start")
            .attr("y", width + margin.top)
            .attr("transform", function (d) {
              return "rotate(-90)"
            });

          svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .text("Actual")
            .attr("x", -50)
            .attr("y", width + margin.top)
            .attr("transform", function (d) {
              return "rotate(-90)"
            });


          var actual = svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", 100)
            .attr("width", width)
            .style("stroke", bordercolor)
            .style("fill", 'lightblue')
            .style("stroke-width", border);

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
            .attr("y", 0)
            .attr("width", x(1) - x(0))
            .attr("height", 100);

          //draw speedLimits
          xSLValue = function (d) {
            return mathUtilsService.convertMetersToMilesSingleValue(d.point);
          };
          xSLMap = function (d) {
            // 23 is to correct the xaxis placement of symbol
            return x(xSLValue(d)) - 23;
          };

          var yValueSLActual = function (d) {
            return 0.9;
          };
          var yMapSLActual = function (d) {
            return y(yValueSLActual(d))
          };
          var speedLimitSymbolsActual = svg.selectAll(".speedLimits").append("g")
            .data(speedRestrictions.speedRestrictions)
            .enter()
            .append("g")
            .attr("id", "speedLimitsActual")
            .attr("transform", function (d, i) {
              return "translate(" + xSLMap(d) + "," + yMapSLActual(d) + ")"
            }).each(function (d, i) {
              speedLimit = this.appendChild(speedLimitNode.cloneNode(true));
              d3.select(speedLimit)
                .selectAll("circle")
                .attr("r", 10);
              d3.select(speedLimit)
                .selectAll("text")
                .style("font-size", "0.8em")
                .style("font-weight", "normal")
                .text(function () {
                  return mathUtilsService.convertKphtoMphSingleValue(d.value)
                })
            });
          //To remove last symbol as it is out of box
          speedLimitSymbolsActual.filter(function (d, i) {
            return i === speedLimitSymbolsActual.size() - 1;
          }).attr("display", "none");

          yValueSLOptimal = function (d) {
            return 0.4;
          };
          yMapSLOptimal = function (d) {
            return y(yValueSLOptimal(d))
          };

          //Optimal speed limits
          speedLimitSymbolsOptimal = svg.selectAll(".speedLimits").append("g")
            .data(speedRestrictions.speedRestrictions)
            .enter()
            .append("g")
            .attr("id", "speedLimits")
            .attr("transform", function (d, i) {
              return "translate(" + xSLMap(d) + "," + yMapSLOptimal(d) + ")"
            }).each(function (d, i) {
              speedLimit = this.appendChild(speedLimitNode.cloneNode(true));
              d3.select(speedLimit)
                .selectAll("circle")
                .attr("r", 10);
              d3.select(speedLimit)
                .selectAll("text")
                .style("font-size", "0.8em")
                .style("font-weight", "normal")
                .text(function () {
                  return mathUtilsService.convertKphtoMphSingleValue(d.value)
                })
            });
          //To remove last symbol as it is out of box
          speedLimitSymbolsOptimal.filter(function (d, i) {
            return i === speedLimitSymbolsOptimal.size() - 1;
          }).attr("display", "none");

// returns instance of signal texts
          function signalText(type) {
            var yvalueMapping;
            if (type === "actual") {
              yvalueMapping = yMapActual
            } else if (type === "optimal") (
              yvalueMapping = yMap
            );
            return (svg.selectAll(".signalText")
              .data(signallingData.signalPositionInMetresList)
              .enter()
              .append("text")
              .attr("id", "signalsText"+type)
              .attr("x", "20")
              .attr("y", "12")
              .attr("transform", function (d, i) {
                return "translate(" + xMap(d) + "," + yvalueMapping(d) + ")" + "rotate(-90)"
              })
              .text(function (d) {
                return d.signalID;
              })
              .style("text-anchor", "middle"))
          }

//////*********************************************** Signals *************************///////////////////////////////////////////

          if (signallingData.signalPositionInMetresList) {
            // Signal ID text
            signalText("actual");
            signalText("optimal");

            // draw signals
            var signalsActual = svg.selectAll(".light")
              .data(signallingData.signalPositionInMetresList)
              .enter()
              .append("g")
              .attr("id", "signalsActual")
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
                  .style("fill", "white");
              });
            signalsActual.each(function (d) {
              signallingColor(d, "actual")
            });

            var actualdrag = d3.behavior.drag()
              .on("drag", function (d) {
                actualTrainPosition(x.invert(d3.event.x));
              });
            var actualTrainSlider = svg.append("g")
              .attr("class", "optimalTrainSlider")
              .attr("transform", "translate(-25," + 100 + ")");

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
              .attr("transform", "translate(-25," + 18 + ")")
              .selectAll("text")
              .data(x.ticks(10));
            /* .enter().append("text")
             .attr("x", x)
             .attr("text-anchor", "left")
             .text(function(d) { return d + "°"; });*/

            var actualTrainHandle = actualTrainSlider.insert("image", ".track-overlay")
              .attr("xlink:href", "assets/train.svg")
              .attr("width", 50)
              .attr("height", 50)
              .attr("align", "end")
              .attr("class", "handle")
              .attr("y", -35)
              .attr("x", 0);

            function actualTrainPosition(h) {
              actualTrainHandle.attr("x", x(h));
              _.each(signallingData.actualTrainPositionSignallingStateList, function (d, i) {
                if (h >= mathUtilsService.convertMetersToMilesSingleValue(d.distanceInMetres)) {
                  _.each(d.values, function (t) {
                    signallingColor(t, "actual");
                  })
                } else {
                  var minVal = d3.min(_.pluck(signallingData.actualTrainPositionSignallingStateList, "distanceInMetres"));
                  if (h < mathUtilsService.convertMetersToMilesSingleValue(minVal)) {
                    signalsActual.each(function (d) {
                      signallingColor(d, "actual")
                    })
                  }
                }
              })
            }

            // Signals Optimal
            var signalsOptimal = svg.selectAll(".light")
              .data(signallingData.signalPositionInMetresList)
              .enter()
              .append("g")
              .attr("id", "signalsOptimal")
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
                  .style("fill", "white");
              });
            signalsOptimal.each(function (d) {
              signallingColor(d, "optimal")
            });


            var optimaldrag = d3.behavior.drag()
              .on("drag", function (d) {
                optimalTrainPosition(x.invert(d3.event.x));
              });

            var optimalTrainSlider = svg.append("g")
              .attr("class", "optimalTrainSlider")
              .attr("transform", "translate(-25," + height + ")");

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
              .attr("transform", "translate(-25," + 18 + ")")
              .selectAll("text")
              .data(x.ticks(10));


            var optimalTrainHandle = optimalTrainSlider.insert("image", ".track-overlay")
              .attr("xlink:href", "assets/train.svg")
              .attr("width", 50)
              .attr("height", 50)
              .attr("align", "end")
              .attr("class", "handle")
              .attr("y", -35)
              .attr("x", 0)


            function optimalTrainPosition(h) {
              optimalTrainHandle.attr("x", x(h));
              _.each(signallingData.optimalTrainPositionSignallingStateList, function (d, i) {
                if (h >= mathUtilsService.convertMetersToMilesSingleValue(d.distanceInMetres)) {
                  _.each(d.values, function (t) {
                    signallingColor(t, "optimal");
                  })
                } else {
                  var minVal = d3.min(_.pluck(signallingData.optimalTrainPositionSignallingStateList, "distanceInMetres"));
                  if (h < mathUtilsService.convertMetersToMilesSingleValue(minVal)) {
                    signalsOptimal.each(function (d) {
                      signallingColor(d, "optimal")
                    })
                  }
                }
              })
            }

// --------------------------------************ train transition Animation ***************** ----------------------------------------//
            optimalTrainHandle.transition() // Gratuitous intro!
              // .duration(3000)
              // .delay(100)
              // .ease("easeLinear")
              .tween("optimalTrainPosition", function () {
                var i = d3.interpolate(0, 0);
                return function (t) {
                  optimalTrainPosition(i(t));
                };
              });

            actualTrainHandle.transition() // Gratuitous intro!
              // .duration(10000)
              // .attr("x", width)
              // .delay(100)
              // .ease("easeLinear")
              .tween("actualTrainPosition", function () {
                var i = d3.interpolate(0, 0);
                return function (t) {
                  actualTrainPosition(i(t));
                };
              });
// --------------------------------************ Animation ***************** ----------------------------------------//
          }

          function signallingColor(d, className) {
            if (d.signallingColour === "RED") {
              d3.select("#" + d.signalID + className)
                .selectAll("." + className)
                .style("fill", "white");
              d3.select("#" + d.signalID + className)
                .select("circle:nth-child(3)")
                .style("fill", d.signallingColour)
            } else if (d.signallingColour === "YELLOW") {
              d3.select("#" + d.signalID + className)
                .selectAll("." + className)
                .style("fill", "white");
              d3.select("#" + d.signalID + className)
                .select("circle:nth-child(2)")
                .style("fill", d.signallingColour)
            }
            else if (d.signallingColour === "GREEN") {
              d3.select("#" + d.signalID + className)
                .selectAll("." + className)
                .style("fill", "white");
              d3.select("#" + d.signalID + className)
                .select("circle:nth-child(1)")
                .style("fill", d.signallingColour)
            }
          }
        }
      }

      ,

      SDSignallingOnZoom: function (d) {
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
        x.domain(d);
        xAxis.scale(x);
        svg.select("#x-axis")
          .transition().duration(150).ease("sin-in-out")
          .call(xAxis);
        svg.selectAll("g#speedLimits").attr("transform", function (t, i) {
          // console.log("xMap", xSLMap(d), yMapActual(d))
          // console.log("xMap", yMapSLOptimal(t))
          return "translate(" + xSLMap(t) + "," + yMapSLOptimal(t) + " )"
        });
        svg.selectAll("g#speedLimitsActual").attr("transform", function (t, i) {
          // console.log("xMap", xSLMap(d), yMapActual(d))
          return "translate(" + xSLMap(t) + "," + " 20 )"
        });
        svg.selectAll("g#signalsOptimal").attr("transform", function (t, i) {
          return "translate(" + xMap(t) + "," + 160 + " )"
        });
        svg.selectAll("g#signalsActual").attr("transform", function (t, i) {
          // console.log("xMap", xSLMap(d), yMapActual(d))
          return "translate(" + xMap(t) + "," + " 60 )"
        });
        svg.selectAll("text#signalsTextactual").attr("transform", function (t, i) {
          return "translate(" + xMap(t) + "," + yMapActual(t) + " )" + "rotate(-90)"
        });
        svg.selectAll("text#signalsTextoptimal").attr("transform", function (t, i) {
          // console.log("xMap", xSLMap(d), yMapActual(d))
          return "translate(" + xMap(t) + "," + yMap(t) + " )" + "rotate(-90)"
        })
      }
    }

  }
})();
