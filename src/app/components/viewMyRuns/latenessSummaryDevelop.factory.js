/** Created by Samskrithi on 18/11/2016. */

(function () {
  'use strict';
  angular
    .module('viewMyRunsModule')
    .factory('latenessSummaryFactoryDevelop', latenessSummaryFactoryDevelop);

  function latenessSummaryFactoryDevelop($log, $window, $filter, chartColors, DRIVE_COLORS) {
    function modifyData(data) {
      var modData = [];
      _.each(data, function (v, i) {
        modData.push(v)
      });
      return modData;
    }
    var ticformatter = function updateFormatter(x) {
      return x;
    }

    var LatenessSummaryChart;
    return {
      //------------------------------Graph Labels --------------------------------------------------//
      getavgLatenessSummaryChartLabels: function () {
        var graphLabelsAndTitles = {
          "yAxisLabel": "Total lateness (s)",
          "graphTitle": "Actual vs Achievable Arrival Lateness/Earliness",
          "seriesLabels": {
            actualArrivalLatenessInSeconds: "Actual Arrival Lateness",
            actualArrivalEarlinessInSeconds: "Actual Arrival Earliness",
            achievableArrivalLatenessInSeconds: "Achievable Arrival Lateness"
          }
        }
        return graphLabelsAndTitles;
      },
      modData: function (data) {
        var modData = [];
        modData.push(data.stackedActualArrivalLatenesss)
        modData.push(data.stackedAcheivableArrivalLatenesss)
        modData.push(data.actualArrivalEarlinessInSeconds)
        return modData;
      },
      getLatenessSummaryChartLabels: function () {
        var graphLabelsAndTitles = {
          "yAxisLabel": "Lateness (s)"
        }
        return graphLabelsAndTitles;
      },
      //------------------------------Generate c3 chart----------------------------------------------//
      getLatenessSummaryChart: function (latenessSummary, graphLabels, graphIndicator) {
        var latenessSummaryData = [latenessSummary]
        console.log(latenessSummary)
        LatenessSummaryChart = c3.generate({
          bindto: '#viewMyRunslatenessSummaryChart',
          size: {
            height: 300
          },
          data: {
            mimeType: 'json',
            json: latenessSummaryData,
            keys: {
              value: ['optimalArrivalLatenessInSeconds', 'actualArrivalLatenessInSeconds', 'actualArrivalEarlinessInSeconds']
            },
            type: 'bar',
            names: {
              optimalArrivalLatenessInSeconds: 'Optimal Arrival Lateness',
              actualArrivalLatenessInSeconds: 'Actual Arrival Lateness',
              actualArrivalEarlinessInSeconds: 'Actual Arrival Earliness'
            },
            labels: true,
            colors: {
                'stackedActualArrivalLatenesss.unitPerformanceLatenessInSeconds': function () {
                    return chartColors.colors(graphIndicator)
                },
                'stackedActualArrivalLatenesss.signallingLatenessInSeconds': function () {
                    return chartColors.colors(graphIndicator)
                },
                'actualArrivalEarlinessInSeconds': DRIVE_COLORS.green
            }
          },
          title: {
            text: graphLabels.graphTitle
          },

          legend: {
            show: true
          },
          axis: {
            x: {
               /*tick: {
                  format: function (x) { return ticformatter(x) }
              },*/
              type: 'category',
              categories: ['Actual Arrival Latenesss', 'Acheivable Arrival Latenesss', 'Actual Arrival Earliness'],
              //   categories: graphLabels.xAxisLabels,
              height: 50
            },
            y: {
              //min: 0,
              label: {
                text: graphLabels.yAxisLabel,
                position: 'outer-middle'
              },
              padding: {
                top: 100
              }
            }
          },
          bar: {
            width: {
              ratio: 0.3 // this makes bar width 30% of length between ticks
            }
          },
          grid: {
            lines: {
              front: true
            },
            y: {
              lines: [
                {value: 0}
              ]
            }
          }
        });
      },

      setLatenessSummaryChart: function (latenessSummary, graphLabels, graphIndicator) {
        LatenessSummaryChart.unload({
          done: function () {
            var latenessSummaryData = modifyData(latenessSummary);
            LatenessSummaryChart.load({
              json: latenessSummaryData,
              keys: {
                value: ['unitPerformanceLatenessInSeconds',
                  'signallingLatenessInSeconds',
                  'dwellTimeExceedanceLatenessInSeconds',
                  'originLateDepartureLatenessInSeconds'
                ],
              },
              colors: {
                'stackedActualArrivalLatenesss.unitPerformanceLatenessInSeconds': function () {
                  return chartColors.colors(graphIndicator)
                },
                'stackedActualArrivalLatenesss.signallingLatenessInSeconds': function () {
                  return chartColors.colors(graphIndicator)
                },
                'actualArrivalEarlinessInSeconds': DRIVE_COLORS.green
              }

            });
          }
        });
        LatenessSummaryChart.groups([
          ['unitPerformanceLatenessInSeconds',
            'signallingLatenessInSeconds',
            'dwellTimeExceedanceLatenessInSeconds',
            'originLateDepartureLatenessInSeconds']
        ])
        LatenessSummaryChart.data.names({
          unitPerformanceLatenessInSeconds: 'Unit Performance',
          signallingLatenessInSeconds: 'Signalling',
          dwellTimeExceedanceLatenessInSeconds: 'Dwell Time Exceedance',
          originLateDepartureLatenessInSeconds: 'Origin Late Departure'
        })
        LatenessSummaryChart.axis.labels({
          y: graphLabels.yAxisLabel
        })
        LatenessSummaryChart.categories(['Actual Arrival Latenesss', 'Acheivable Arrival Latenesss', 'Actual Arrival Earliness'])
      },

      setLatenessSummaryAllChart: function (latenessSummary, graphLabels, graphIndicator) {
        LatenessSummaryChart.unload({
          done: function () {
            var latenessSummaryData = [latenessSummary];
            LatenessSummaryChart.load({
              json: latenessSummaryData,
              keys: {
                value: ['optimalArrivalLatenessInSeconds', 'actualArrivalLatenessInSeconds', 'actualArrivalEarlinessInSeconds']
              }
            });
          }
        });
        LatenessSummaryChart.axis.labels({
          y: graphLabels.yAxisLabel
        })
      }
    }
  }
})();

