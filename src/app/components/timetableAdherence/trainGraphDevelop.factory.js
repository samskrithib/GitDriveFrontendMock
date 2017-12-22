/** Created by Samskrithi on 18/11/2016. */

(function () {
  'use strict';
  angular
    .module('timetableAdherenceModule')
    .factory('trainGraphDevelopFactory', trainGraphDevelopFactory);

  function trainGraphDevelopFactory($log, UtilityService, DRIVE_COLORS, trainGraphLegend) {
    var timetableAdherenceChart;
    // OVERLAP FIXING
    var fixOverlaps = function (data) {
      // sort from highest to smallest
      data = _.sortBy(data, 'value').reverse(); // using underscore.js here
      // get y-axis distance within which is considered 'overlap'
      // taken as a factor of highest value in series.. so it scales
      var tooClose = data[0].value / 35;
      // loop, find overlappers and write offset values into them
      _.each(data, function (val, key) {
        data[key].class = 'grid' + data[key].tiploc
      })
      for (var i = 1; i < data.length; i++) {
        var prev = data[i - 1];
        var curr = data[i];
        if (prev.value - curr.value <= tooClose) {
          // set the offset based on the length of the previous item's name (cumulative) ..add 2 for padding
          curr.offset = ((!prev.offset) ? prev.text.length : prev.offset + prev.text.length) + 2;
        }
      }
      return data;
    };

    function dataLoop(data, xvalue, newnames, scheduledSeriesNames, ActualRunSeriesNames, FlatOutSeriesNames, xs, columns) {
      _.each(data, function (val, key) {
        // var array = data[key].scheduledAndActualTimetables; // old version
        var array = data[key].scheduledActualAndFlatOutTimetables; // withflatout json

        _.each(array, function (val, index) {
          var timeDistanceArray = array[index].timeAndDistanceList
          var identifier = d3.keys(timeDistanceArray[0].identifierAndDistance)
          var seriesName = identifier;
          var splitIdentifier = _.rest(identifier.toString().split(" "), [1]);// using underscore.js here
          newnames[seriesName] = splitIdentifier.join(" ");
          // allNames[allNames.length] = seriesName;
          if (array[index].timetableType === 'SCHEDULED') {
            scheduledSeriesNames[scheduledSeriesNames.length] = seriesName.toString();
          } else if (array[index].timetableType === 'FLATOUT') {
            FlatOutSeriesNames.push(seriesName.toString())
          } else {
            ActualRunSeriesNames.push(seriesName.toString())
          }
          var distances = _.pluck(_.pluck(timeDistanceArray, 'identifierAndDistance'), identifier) // using underscore.js here
          var distancesArray = _.map(distances, function (num) {
            return num === -1 ? null : num
          });
          var seriesDistances = identifier.concat(distancesArray)
          var timesArray = _.pluck(timeDistanceArray, xvalue)
          // for JSON , to be removed when working with server
          if (key === 1) {
            if (xvalue === 'unixTime') {
              _.map(timesArray, function (num, i) {
                return timesArray[i] = (num + 3600000);
              })
            } else {
              _.map(timesArray, function (num, i) {
                return timesArray[i] = (num + 3600);
              })
            }
          }
          /*end to be removed when working with server*/
          var seriesTimesArrayName = [];
          seriesTimesArrayName.push(identifier + "_time");
          var seriesTimes = seriesTimesArrayName.concat(timesArray);
          xs[identifier] = seriesTimesArrayName[0];
          columns.push(seriesDistances);
          columns.push(seriesTimes)
        })
      });

      return {
        newnames: newnames,
        ActualRunSeriesNames: ActualRunSeriesNames,
        scheduledSeriesNames: scheduledSeriesNames,
        FlatOutSeriesNames: FlatOutSeriesNames,
        columns: columns,
        xs: xs
      }
    }

    function computeDimensions(selection) {
      var dimensions = null;
      var node = selection.node();

      if (node instanceof SVGElement) {
        dimensions = node.getBBox();
      } else {
        dimensions = node.getBoundingClientRect();
      }
      console.clear();
      console.log(dimensions);
      return dimensions;
    }

    return {
      getDataFormat: function (data, xvalue) {
        var columns = [];
        var xs = {};
        var newnames = {};
        var ActualRunSeriesNames = [];
        var FlatOutSeriesNames = [];
        var scheduledSeriesNames = [];
        var modifiedData;
        dataLoop(data, xvalue, newnames, scheduledSeriesNames, ActualRunSeriesNames, FlatOutSeriesNames, xs, columns)
        modifiedData = {
          xs: xs,
          columns: columns,
          xSort: false
        };
        return {
          modifiedData: modifiedData,
          newnames: newnames,
          ActualRunSeriesNames: ActualRunSeriesNames,
          scheduledSeriesNames: scheduledSeriesNames,
          FlatOutSeriesNames: FlatOutSeriesNames
        };
      },
      getTrainGraphChart: function (modifiedData, tickFormat, tooltipFormat, gridlines) {
        timetableAdherenceChart = c3.generate({
          bindto: '#trainGraph',
          size: {
            height: 600
          },
          padding: {
            right: 50,
            top: 10
          },
          data: modifiedData.modifiedData,
          line: {
            connectNull: false
          },
          color: {
            pattern: DRIVE_COLORS.trainGraphColorPattern
          },
          legend: {
            show: false
          },
          axis: {
            y: {
              label: {
                text: 'Distance(km)',
                position: 'outer-middle'
              },
              min: 0,
              padding: {bottom: 0}
            },
            x: {
              type: "timeseries",
              tick: {
                format: tickFormat,
                centered: true,
                fit: false,
                rotate: 45,
                culling: {
                  max: 5
                }
              }
            }
          },
          zoom: {
            enabled: true,
            rescale: true,
            extent: [1, 5000]
          },
          point: {
            r: 1
          },
          subchart: {
            show: true
          },
          grid: {
            lines: {
              front: false
            }
          },
          tooltip: {
            grouped: false,
            format: {
              title: tooltipFormat,
              value: function (d) {
                var obj = _.where(gridlines, {"value": d});// using underscore.js here
                return obj[0].text + " " + d3.format(".1f")(d);
              }
            }
          },
          onrendered: function () {
            var tG = d3.select('#trainGraph')
            var dimensions = computeDimensions(tG)
            trainGraphLegend.linestyleLegend(timetableAdherenceChart, modifiedData.ActualRunSeriesNames, modifiedData.scheduledSeriesNames, modifiedData.FlatOutSeriesNames, dimensions.width)
          }
        });
        // draw plotlines/gridlines
        fixOverlaps(gridlines).forEach(function (station) {
          timetableAdherenceChart.ygrids.add({
            value: station.value,
            text: station.text,
            class: station.class
          });
          var selector = ".c3-ygrid-line." + station.class;
          d3.select(selector).select('text')
            .attr('dx', function (id) {
              if (station.offset) {
                return -station.offset * 4.5;
              }
            })
        })
        //Style Flatout profile
        _.each(modifiedData.FlatOutSeriesNames, function (v) {
          var val = v.replace(/ |:/gi, "-");
          d3.selectAll(".c3-line-" + val)
            .style("stroke-dasharray", '10, 4')
        });
        //Style Actual profile
        _.each(modifiedData.ActualRunSeriesNames, function (v, i) {
          var val = v.replace(/ |:/gi, "-");
          d3.selectAll(".c3-line-" + val)
            .style("stroke-dasharray", '0.9')
            .style("stroke", 'black !important')
        });

        trainGraphLegend.customTrainGraphLegend(timetableAdherenceChart, modifiedData.ActualRunSeriesNames, modifiedData.newnames, modifiedData.scheduledSeriesNames, modifiedData.FlatOutSeriesNames)
      },

      LoadTrainGraphData: function (data, gridlines, xvalue) {
        var columns = [];
        var xs = {}
        var newnames = {};
        var ActualRunSeriesNames = [], FlatOutSeriesNames = [];
        var scheduledSeriesNames = [];
        timetableAdherenceChart.unload({
          done: function () {
            dataLoop(data, xvalue, newnames, scheduledSeriesNames, ActualRunSeriesNames, FlatOutSeriesNames, xs, columns)
            timetableAdherenceChart.load({
              columns: columns,
              xs: xs
            });
            trainGraphLegend.customTrainGraphLegend(timetableAdherenceChart, ActualRunSeriesNames, newnames, scheduledSeriesNames, FlatOutSeriesNames)
          }
        })

      }
    }
  }
})();

