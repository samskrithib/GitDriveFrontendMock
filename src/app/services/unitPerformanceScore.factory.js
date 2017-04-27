/** Created by Samskrithi on 18/11/2016. */

(function () {
    'use strict';
    angular
        .module('dassimFrontendV03')
        .factory('unitPerformanceScoreFactory', unitPerformanceScoreFactory)
        .factory('chartColors', chartColors)
    function chartColors(DRIVE_COLORS) {

        return {
            colors: function (performanceIndicator, d) {
                var indicator;
                switch (performanceIndicator[d.x]) {
                    case 'GOOD_DRIVING': {
                        indicator = DRIVE_COLORS.green_actual;
                        break;
                    }
                    case 'AVERAGE_DRIVING': {
                        indicator = DRIVE_COLORS.orange;
                        break;
                    }
                    case 'POOR_DRIVING': {
                        indicator = DRIVE_COLORS.red;
                        break;
                    }

                }
                return indicator;
            }
        }
    }
    function unitPerformanceScoreFactory($log, $window, $filter, chartColors) {
        var unitPerformanceScoreChart;
        return {
            //------------------------------Graph Labels --------------------------------------------------//
            getUnitPerformanceScoreChartLabels: function () {
                var chartLabelsAndTitles = {
                    "yAxisLabel": "%",
                    "chartTitle": "Unit Performance Score",
                    "seriesLabels": null
                }
                return chartLabelsAndTitles;
            },

            //------------------------------Generate c3 chart----------------------------------------------//
            getUnitPerformanceScoreChart: function (unitPerformanceScores, performanceIndicators, chartLabels) {
                unitPerformanceScoreChart = c3.generate({
                    bindto: '#chart0',
                    size: {
                        height: 350
                    },
                    data: {
                        json: unitPerformanceScores,
                        keys: {
                            value: ['percentageScore']
                        },
                        xSort: false,
                        type: 'bar',
                        labels: true,
                        colors: {
                            'percentageScore': function (d) {
                                return chartColors.colors(performanceIndicators, d)
                            }
                        }
                    },
                    legend: {
                        show: false
                    },
                    title: {
                        text: chartLabels.chartTitle
                    },
                    axis: {

                        y: {
                            //min: 0,
                            label: {
                                text: chartLabels.yAxisLabel,
                                position: 'outer-middle'
                            },
                            padding: {
                                top: 100
                            }
                        }
                    },
                    bar: {
                        width: {
                            ratio: 0.1 // this makes bar width 30% of length between ticks
                        }
                    },
                    grid: {
                        lines: {
                            front: true
                        }

                    }
                });
            },

            setUnitPerformanceScoreChart: function (unitPerformanceScores, performanceIndicatorsArray) {
                unitPerformanceScoreChart.load({
                    json: unitPerformanceScores,
                    keys: {
                        value: ['percentageScore']
                    },
                    colors: {
                        'percentageScore': function (d) {
                            return chartColors.colors(performanceIndicatorsArray, d)
                        }
                    }
                })
            }

        }
    }
})();

