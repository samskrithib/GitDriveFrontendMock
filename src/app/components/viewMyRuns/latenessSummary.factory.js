/** Created by Samskrithi on 18/11/2016. */

(function () {
    'use strict';
    angular
        .module('viewMyRunsModule')
        .factory('latenessSummaryFactory', latenessSummaryFactory)

    function latenessSummaryFactory($log, $window, $filter, chartColors, DRIVE_COLORS) {
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
              var modData=[];
              _.each(data, function (v, i) {
                console.log(v)
              })
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
                LatenessSummaryChart = c3.generate({
                    bindto: '#viewMyRunslatenessSummaryChart',
                    size: {
                        height: 300
                    },
                    data: {
                      mimeType: 'json',
                        json: [latenessSummary],
                        keys: {
                          // x: 'stackedActualArrivalLatenesss',
                            value: ['stackedActualArrivalLatenesss.unitPerformanceLatenessInSeconds',
                              'stackedActualArrivalLatenesss.signallingLatenessInSeconds',
                              'stackedActualArrivalLatenesss.dwellTimeExceedanceLatenessInSeconds',
                              'stackedActualArrivalLatenesss.originLateDepartureLatenessInSeconds',
                              'stackedAcheivableArrivalLatenesss.unitPerformanceLatenessInSeconds',
                              'stackedAcheivableArrivalLatenesss.signallingLatenessInSeconds',
                              'stackedAcheivableArrivalLatenesss.dwellTimeExceedanceLatenessInSeconds',
                              'stackedAcheivableArrivalLatenesss.originLateDepartureLatenessInSeconds',
                              'actualArrivalEarlinessInSeconds']
                        },
                        type: 'bar',
                      groups: [
                        ['stackedActualArrivalLatenesss.unitPerformanceLatenessInSeconds',
                          'stackedActualArrivalLatenesss.signallingLatenessInSeconds',
                          'stackedActualArrivalLatenesss.dwellTimeExceedanceLatenessInSeconds',
                          'stackedActualArrivalLatenesss.originLateDepartureLatenessInSeconds'],
                        ['stackedAcheivableArrivalLatenesss.unitPerformanceLatenessInSeconds',
                          'stackedAcheivableArrivalLatenesss.signallingLatenessInSeconds',
                          'stackedAcheivableArrivalLatenesss.dwellTimeExceedanceLatenessInSeconds',
                          'stackedAcheivableArrivalLatenesss.originLateDepartureLatenessInSeconds']
                      ],
                        // names: graphLabels.seriesLabels,
                        // labels: true
                        /*colors: {
                            'stackedActualArrivalLatenesss.unitPerformanceLatenessInSeconds': function () {
                                return chartColors.colors(graphIndicator)
                            },
                            'stackedActualArrivalLatenesss.signallingLatenessInSeconds': function () {
                                return chartColors.colors(graphIndicator)
                            },
                            'actualArrivalEarlinessInSeconds': DRIVE_COLORS.green
                        }*/
                    },
                    title: {
                        text: graphLabels.graphTitle
                    },

                    legend: {
                        show: true
                    },
                    axis: {
                        /*x: {
                            /!*tick:{
                             format: function(){ return '' }
                           },*!/
                            type: 'category',
                            // categories:['stackedActualArrivalLatenesss', 'stackedAcheivableArrivalLatenesss', 'actualArrivalEarlinessInSeconds'],
                            //   categories: graphLabels.xAxisLabels,
                            height: 50
                        },*/
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
                            ratio: 0.5 // this makes bar width 30% of length between ticks
                        }
                    },
                    grid: {
                        lines: {
                            front: true
                        },
                        y: {
                            lines: [
                                { value: 0 }
                            ]
                        }
                    }
                });
            },

            setLatenessSummaryChart: function (latenessSummary, graphLabels, graphIndicator) {
                // $log.debug(graphLabels)
                // LatenessSummaryChart.data.names(graphLabels.seriesLabels)
                LatenessSummaryChart.axis.labels({
                    y: graphLabels.yAxisLabel
                })
                LatenessSummaryChart.load({
                    json: latenessSummary,
                    keys: {
                        value: ['stackedActualArrivalLatenesss.unitPerformanceLatenessInSeconds',
                          'stackedActualArrivalLatenesss.signallingLatenessInSeconds',
                          'stackedActualArrivalLatenesss.dwellTimeExceedanceLatenessInSeconds',
                          'stackedActualArrivalLatenesss.originLateDepartureLatenessInSeconds',
                          'stackedAcheivableArrivalLatenesss.unitPerformanceLatenessInSeconds',
                          'stackedAcheivableArrivalLatenesss.signallingLatenessInSeconds',
                          'stackedAcheivableArrivalLatenesss.dwellTimeExceedanceLatenessInSeconds',
                          'stackedAcheivableArrivalLatenesss.originLateDepartureLatenessInSeconds',
                          'actualArrivalEarlinessInSeconds']
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

        }
    }
})();

