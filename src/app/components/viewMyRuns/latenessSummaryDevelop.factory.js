/** Created by Samskrithi on 18/11/2016. */

(function () {
    'use strict';
    angular
        .module('viewMyRunsModule')
        .factory('latenessSummaryFactoryDevelop', latenessSummaryFactoryDevelop)

    function latenessSummaryFactoryDevelop($log, $window, $filter, chartColors, DRIVE_COLORS) {
        function modifyData (data) {
            var modData = [];
            modData.push(data.stackedActualArrivalLatenesss)
            modData.push(data.stackedAcheivableArrivalLatenesss)
            modData.push(data.actualArrivalEarlinessInSeconds)
            return modData;
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
               var latenessSummaryData =  modifyData(latenessSummary)
                LatenessSummaryChart = c3.generate({
                    bindto: '#viewMyRunslatenessSummaryChart',
                    size: {
                        height: 300
                    },
                    data: {
                        mimeType: 'json',
                        json: latenessSummaryData,
                        keys: {
                            // x: 'stackedActualArrivalLatenesss',
                            value: ['unitPerformanceLatenessInSeconds',
                                'signallingLatenessInSeconds',
                                'dwellTimeExceedanceLatenessInSeconds',
                                'originLateDepartureLatenessInSeconds',
                            ]
                        },
                        type: 'bar',
                        groups: [
                            ['unitPerformanceLatenessInSeconds',
                                'signallingLatenessInSeconds',
                                'dwellTimeExceedanceLatenessInSeconds',
                                'originLateDepartureLatenessInSeconds']

                        ],
                        names: {
                          unitPerformanceLatenessInSeconds: 'Unit Performance',
                          signallingLatenessInSeconds: 'Signalling',
                          dwellTimeExceedanceLatenessInSeconds: 'Dwell Time Exceedance',
                          originLateDepartureLatenessInSeconds: 'Origin Late Departure'
                        }
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
                        x: {
                            /* tick: {
                                format: function () { return '' }
                            }, */
                            type: 'category',
                            categories:['Actual Arrival Latenesss', 'Acheivable Arrival Latenesss', 'Actual Arrival Earliness'],
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
                                { value: 0 }
                            ]
                        }
                    }
                });
            },

            setLatenessSummaryChart: function (latenessSummary, graphLabels, graphIndicator) {
                $log.debug(latenessSummary)
                // LatenessSummaryChart.data.names(graphLabels.seriesLabels)
                var latenessSummaryData =  modifyData(latenessSummary)
                LatenessSummaryChart.axis.labels({
                    y: graphLabels.yAxisLabel
                })
                LatenessSummaryChart.load({
                    json: latenessSummaryData,
                    keys: {
                        value: ['unitPerformanceLatenessInSeconds',
                            'signallingLatenessInSeconds',
                            'dwellTimeExceedanceLatenessInSeconds',
                            'originLateDepartureLatenessInSeconds',
                            ]
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

