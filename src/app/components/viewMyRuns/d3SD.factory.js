(function () {
  'use strict';
  angular
    .module('viewMyRunsModule')
    .factory('d3SDChart', d3SDChart);

  function d3SDChart() {
    var allData;
    var yAxisGroup = null;
    var xAxisGroup = null;
    var t = null,
      dataCirclesGroup = null,
      dataLinesGroup = null;
    var maxDataPointsForDots = 50,
      transitionDuration = 1000;
    return {
      console: function () {
        console.log("d3SD")
      },
      getspeedDistanceData: function (dataa) {
        var data = 	[
          [
            {
              "speed": 0,
              "position": 0
            },
            {
              "speed": 0,
              "position": 0
            },
            {
              "speed": 0.5,
              "position": 0
            },
            {
              "speed": 0.7,
              "position": 0.1
            },
            {
              "speed": 2.8,
              "position": 0.8
            },
            {
              "speed": 5,
              "position": 2.4
            },
            {
              "speed": 7.1,
              "position": 4.9
            },
            {
              "speed": 9.3,
              "position": 8.4
            },
            {
              "speed": 11.5,
              "position": 12.7
            },
            {
              "speed": 13.6,
              "position": 17.9
            },
            {
              "speed": 15.8,
              "position": 24
            },
            {
              "speed": 17.9,
              "position": 31.1
            },
            {
              "speed": 20.1,
              "position": 39
            },
            {
              "speed": 22.3,
              "position": 47.8
            },
            {
              "speed": 24.4,
              "position": 57.6
            },
            {
              "speed": 26.6,
              "position": 68.2
            },
            {
              "speed": 28.7,
              "position": 79.7
            },
            {
              "speed": 30.9,
              "position": 92.1
            },
            {
              "speed": 31.9,
              "position": 98.2
            },
            {
              "speed": 32.2,
              "position": 103.6
            },
            {
              "speed": 32.2,
              "position": 104.5
            },
            {
              "speed": 32.2,
              "position": 361.6
            },
            {
              "speed": 30.7,
              "position": 372.1
            },
            {
              "speed": 28.4,
              "position": 381.1
            },
            {
              "speed": 26,
              "position": 389.5
            },
            {
              "speed": 25.1,
              "position": 392.3
            },
            {
              "speed": 24,
              "position": 400.4
            },
            {
              "speed": 24,
              "position": 526.6
            },
            {
              "speed": 24.6,
              "position": 530.7
            },
            {
              "speed": 24.7,
              "position": 531.3
            },
            {
              "speed": 26.9,
              "position": 542.1
            },
            {
              "speed": 29,
              "position": 553.7
            },
            {
              "speed": 31.2,
              "position": 566.3
            },
            {
              "speed": 31.9,
              "position": 570.7
            },
            {
              "speed": 32.1,
              "position": 572.4
            },
            {
              "speed": 32.4,
              "position": 574.2
            },
            {
              "speed": 34.6,
              "position": 589.1
            },
            {
              "speed": 36.8,
              "position": 606
            },
            {
              "speed": 38.9,
              "position": 623.9
            },
            {
              "speed": 39.1,
              "position": 629.3
            },
            {
              "speed": 39.1,
              "position": 630.4
            },
            {
              "speed": 37.6,
              "position": 643.2
            },
            {
              "speed": 35.3,
              "position": 654.4
            },
            {
              "speed": 32.9,
              "position": 664.8
            },
            {
              "speed": 30.5,
              "position": 674.5
            },
            {
              "speed": 28.1,
              "position": 683.4
            },
            {
              "speed": 25.8,
              "position": 691.7
            },
            {
              "speed": 25.5,
              "position": 692.4
            },
            {
              "speed": 24.5,
              "position": 700.6
            },
            {
              "speed": 24.5,
              "position": 866.4
            },
            {
              "speed": 25,
              "position": 870.5
            },
            {
              "speed": 25.1,
              "position": 871.2
            },
            {
              "speed": 27.3,
              "position": 882.1
            },
            {
              "speed": 29.4,
              "position": 893.9
            },
            {
              "speed": 31.6,
              "position": 906.7
            },
            {
              "speed": 33.8,
              "position": 920.3
            },
            {
              "speed": 35.9,
              "position": 934.8
            },
            {
              "speed": 38.1,
              "position": 950.2
            },
            {
              "speed": 39.9,
              "position": 964.3
            },
            {
              "speed": 40.3,
              "position": 971
            },
            {
              "speed": 40.3,
              "position": 972.1
            },
            {
              "speed": 40.3,
              "position": 1126.6
            },
            {
              "speed": 40.8,
              "position": 1133.4
            },
            {
              "speed": 41,
              "position": 1134.5
            },
            {
              "speed": 43.1,
              "position": 1152
            },
            {
              "speed": 45.3,
              "position": 1170.4
            },
            {
              "speed": 47.4,
              "position": 1189.8
            },
            {
              "speed": 49.6,
              "position": 1210
            },
            {
              "speed": 51.9,
              "position": 1232.5
            },
            {
              "speed": 54.1,
              "position": 1256.1
            },
            {
              "speed": 56.2,
              "position": 1280.6
            },
            {
              "speed": 58.4,
              "position": 1307.7
            },
            {
              "speed": 60.5,
              "position": 1335.7
            },
            {
              "speed": 62.7,
              "position": 1366.6
            },
            {
              "speed": 64,
              "position": 1385.9
            },
            {
              "speed": 64.2,
              "position": 1394.8
            },
            {
              "speed": 64.2,
              "position": 1396.6
            },
            {
              "speed": 64.2,
              "position": 2755.6
            },
            {
              "speed": 62.7,
              "position": 2776.8
            },
            {
              "speed": 60.3,
              "position": 2795.6
            },
            {
              "speed": 57.9,
              "position": 2813.7
            },
            {
              "speed": 55.6,
              "position": 2831
            },
            {
              "speed": 53.2,
              "position": 2847.6
            },
            {
              "speed": 50.8,
              "position": 2863.5
            },
            {
              "speed": 48.4,
              "position": 2878.7
            },
            {
              "speed": 46.1,
              "position": 2893.1
            },
            {
              "speed": 43.7,
              "position": 2906.8
            },
            {
              "speed": 41.3,
              "position": 2919.8
            },
            {
              "speed": 40.2,
              "position": 2933.4
            },
            {
              "speed": 40.2,
              "position": 3387
            },
            {
              "speed": 40.8,
              "position": 3393.8
            },
            {
              "speed": 40.9,
              "position": 3394.9
            },
            {
              "speed": 43,
              "position": 3413.6
            },
            {
              "speed": 45.2,
              "position": 3434.4
            },
            {
              "speed": 47.4,
              "position": 3457.5
            },
            {
              "speed": 49.5,
              "position": 3483.1
            },
            {
              "speed": 51.8,
              "position": 3511.3
            },
            {
              "speed": 53.9,
              "position": 3540.6
            },
            {
              "speed": 56,
              "position": 3572.7
            },
            {
              "speed": 58.2,
              "position": 3607.6
            },
            {
              "speed": 60.3,
              "position": 3652.1
            },
            {
              "speed": 62.4,
              "position": 3727.1
            },
            {
              "speed": 64.5,
              "position": 3811.7
            },
            {
              "speed": 66.5,
              "position": 3906.3
            },
            {
              "speed": 68.6,
              "position": 4011.4
            },
            {
              "speed": 70.7,
              "position": 4082.8
            },
            {
              "speed": 72,
              "position": 4118.5
            },
            {
              "speed": 72.1,
              "position": 4124.5
            },
            {
              "speed": 72.1,
              "position": 4126.5
            },
            {
              "speed": 72.1,
              "position": 5155.5
            },
            {
              "speed": 70.6,
              "position": 5179.4
            },
            {
              "speed": 68.2,
              "position": 5200.6
            },
            {
              "speed": 65.8,
              "position": 5221
            },
            {
              "speed": 63.4,
              "position": 5240.8
            },
            {
              "speed": 61.1,
              "position": 5259.8
            },
            {
              "speed": 58.7,
              "position": 5278.1
            },
            {
              "speed": 56.3,
              "position": 5295.7
            },
            {
              "speed": 53.9,
              "position": 5312.5
            },
            {
              "speed": 51.6,
              "position": 5328.6
            },
            {
              "speed": 49.2,
              "position": 5344
            },
            {
              "speed": 46.8,
              "position": 5358.7
            },
            {
              "speed": 44.4,
              "position": 5372.6
            },
            {
              "speed": 42,
              "position": 5385.8
            },
            {
              "speed": 39.7,
              "position": 5398.3
            },
            {
              "speed": 37.3,
              "position": 5410.1
            },
            {
              "speed": 34.9,
              "position": 5421.1
            },
            {
              "speed": 32.5,
              "position": 5431.4
            },
            {
              "speed": 30.2,
              "position": 5441
            },
            {
              "speed": 27.8,
              "position": 5449.8
            },
            {
              "speed": 25.4,
              "position": 5458
            },
            {
              "speed": 23,
              "position": 5465.4
            },
            {
              "speed": 20.7,
              "position": 5472
            },
            {
              "speed": 18.3,
              "position": 5478
            },
            {
              "speed": 15.9,
              "position": 5483.2
            },
            {
              "speed": 13.5,
              "position": 5487.7
            },
            {
              "speed": 11.2,
              "position": 5491.5
            },
            {
              "speed": 8.8,
              "position": 5494.5
            },
            {
              "speed": 6.4,
              "position": 5496.8
            },
            {
              "speed": 4,
              "position": 5498.4
            },
            {
              "speed": 1.7,
              "position": 5499.3
            },
            {
              "speed": 0,
              "position": 5499
            }
          ],
          [
            {
              "speed": 0,
              "position": 0
            },
            {
              "speed": 0.1,
              "position": 0
            },
            {
              "speed": 0.2,
              "position": 0
            },
            {
              "speed": 2.5,
              "position": 0.6
            },
            {
              "speed": 4.7,
              "position": 2.2
            },
            {
              "speed": 7,
              "position": 4.8
            },
            {
              "speed": 9.3,
              "position": 8.4
            },
            {
              "speed": 11.5,
              "position": 13
            },
            {
              "speed": 13.8,
              "position": 18.6
            },
            {
              "speed": 15.1,
              "position": 22.7
            },
            {
              "speed": 15.2,
              "position": 23.1
            },
            {
              "speed": 17.3,
              "position": 42
            },
            {
              "speed": 19.3,
              "position": 63.4
            },
            {
              "speed": 20.8,
              "position": 80.1
            },
            {
              "speed": 20.8,
              "position": 80.6
            },
            {
              "speed": 20.8,
              "position": 81.2
            },
            {
              "speed": 22.9,
              "position": 126.1
            },
            {
              "speed": 23.2,
              "position": 133.1
            },
            {
              "speed": 23.2,
              "position": 133.8
            },
            {
              "speed": 25.2,
              "position": 168.8
            },
            {
              "speed": 27.3,
              "position": 206.7
            },
            {
              "speed": 29.4,
              "position": 247.6
            },
            {
              "speed": 31.3,
              "position": 289.8
            },
            {
              "speed": 31.3,
              "position": 290.7
            },
            {
              "speed": 31,
              "position": 372.8
            },
            {
              "speed": 31,
              "position": 373.6
            },
            {
              "speed": 33.1,
              "position": 402.1
            },
            {
              "speed": 35.2,
              "position": 432.5
            },
            {
              "speed": 37.3,
              "position": 464.7
            },
            {
              "speed": 37.3,
              "position": 465.7
            },
            {
              "speed": 39.3,
              "position": 558.3
            },
            {
              "speed": 39.6,
              "position": 573.6
            },
            {
              "speed": 39.6,
              "position": 574.7
            },
            {
              "speed": 39.6,
              "position": 575.8
            },
            {
              "speed": 37.7,
              "position": 691.8
            },
            {
              "speed": 37.6,
              "position": 692.8
            },
            {
              "speed": 35.5,
              "position": 720.3
            },
            {
              "speed": 33.4,
              "position": 746.1
            },
            {
              "speed": 31.3,
              "position": 770.4
            },
            {
              "speed": 30.8,
              "position": 775.5
            },
            {
              "speed": 30.8,
              "position": 776.4
            },
            {
              "speed": 30.8,
              "position": 790.1
            },
            {
              "speed": 30.8,
              "position": 794.4
            },
            {
              "speed": 30.6,
              "position": 861.6
            },
            {
              "speed": 30.6,
              "position": 862.5
            },
            {
              "speed": 32.7,
              "position": 910.8
            },
            {
              "speed": 34.3,
              "position": 950.7
            },
            {
              "speed": 34.3,
              "position": 951.7
            },
            {
              "speed": 36.3,
              "position": 1023.3
            },
            {
              "speed": 37.1,
              "position": 1050.8
            },
            {
              "speed": 38.9,
              "position": 1128.9
            },
            {
              "speed": 39.9,
              "position": 1170.4
            },
            {
              "speed": 40,
              "position": 1171.5
            },
            {
              "speed": 42.3,
              "position": 1191
            },
            {
              "speed": 44.5,
              "position": 1211.4
            },
            {
              "speed": 46.7,
              "position": 1233
            },
            {
              "speed": 49,
              "position": 1255.6
            },
            {
              "speed": 51.2,
              "position": 1279.2
            },
            {
              "speed": 52.1,
              "position": 1289.3
            },
            {
              "speed": 52.2,
              "position": 1290.7
            },
            {
              "speed": 54.4,
              "position": 1323.3
            },
            {
              "speed": 56.5,
              "position": 1357.2
            },
            {
              "speed": 58.7,
              "position": 1392.4
            },
            {
              "speed": 60.8,
              "position": 1428.9
            },
            {
              "speed": 62.2,
              "position": 1452.8
            },
            {
              "speed": 62.2,
              "position": 1454.5
            },
            {
              "speed": 64.3,
              "position": 1537.1
            },
            {
              "speed": 66.3,
              "position": 1622.4
            },
            {
              "speed": 66.5,
              "position": 1629.7
            },
            {
              "speed": 66.5,
              "position": 1631.6
            },
            {
              "speed": 67.2,
              "position": 2012.3
            },
            {
              "speed": 67.2,
              "position": 2014.1
            },
            {
              "speed": 66.8,
              "position": 2177.9
            },
            {
              "speed": 66.8,
              "position": 2179.8
            },
            {
              "speed": 65.9,
              "position": 2365.9
            },
            {
              "speed": 65.8,
              "position": 2367.7
            },
            {
              "speed": 63.8,
              "position": 2486.5
            },
            {
              "speed": 62.6,
              "position": 2556.6
            },
            {
              "speed": 62.6,
              "position": 2558.4
            },
            {
              "speed": 64.6,
              "position": 2682
            },
            {
              "speed": 65.1,
              "position": 2716.3
            },
            {
              "speed": 65,
              "position": 2718.1
            },
            {
              "speed": 62.7,
              "position": 2750
            },
            {
              "speed": 60.5,
              "position": 2780.8
            },
            {
              "speed": 58.2,
              "position": 2810.5
            },
            {
              "speed": 56,
              "position": 2839.1
            },
            {
              "speed": 53.8,
              "position": 2866.5
            },
            {
              "speed": 53,
              "position": 2875.4
            },
            {
              "speed": 52.8,
              "position": 2876.9
            },
            {
              "speed": 50.6,
              "position": 2898.4
            },
            {
              "speed": 48.3,
              "position": 2919
            },
            {
              "speed": 46.1,
              "position": 2938.7
            },
            {
              "speed": 43.8,
              "position": 2957.4
            },
            {
              "speed": 41.5,
              "position": 2975.2
            },
            {
              "speed": 39.7,
              "position": 2988.7
            },
            {
              "speed": 39.3,
              "position": 2996.4
            },
            {
              "speed": 39.4,
              "position": 3025.9
            },
            {
              "speed": 39.4,
              "position": 3027
            },
            {
              "speed": 39.4,
              "position": 3028.1
            },
            {
              "speed": 40.2,
              "position": 3098.9
            },
            {
              "speed": 40.1,
              "position": 3100
            },
            {
              "speed": 39,
              "position": 3208.9
            },
            {
              "speed": 39,
              "position": 3209.9
            },
            {
              "speed": 38.8,
              "position": 3239.1
            },
            {
              "speed": 38.8,
              "position": 3245.6
            },
            {
              "speed": 38.3,
              "position": 3315.2
            },
            {
              "speed": 38.3,
              "position": 3316.3
            },
            {
              "speed": 39.2,
              "position": 3422.7
            },
            {
              "speed": 39.3,
              "position": 3423.8
            },
            {
              "speed": 41.5,
              "position": 3442.9
            },
            {
              "speed": 43.7,
              "position": 3463
            },
            {
              "speed": 45.9,
              "position": 3484.2
            },
            {
              "speed": 48.1,
              "position": 3506.3
            },
            {
              "speed": 50.2,
              "position": 3529.6
            },
            {
              "speed": 52.4,
              "position": 3553.8
            },
            {
              "speed": 52.5,
              "position": 3555.3
            },
            {
              "speed": 54.6,
              "position": 3594
            },
            {
              "speed": 56.8,
              "position": 3634.2
            },
            {
              "speed": 58.9,
              "position": 3676
            },
            {
              "speed": 60.7,
              "position": 3710.9
            },
            {
              "speed": 60.7,
              "position": 3712.6
            },
            {
              "speed": 62.8,
              "position": 3784.6
            },
            {
              "speed": 64.8,
              "position": 3859
            },
            {
              "speed": 65.6,
              "position": 3886.2
            },
            {
              "speed": 65.6,
              "position": 3888
            },
            {
              "speed": 65.6,
              "position": 3889.8
            },
            {
              "speed": 67.7,
              "position": 3975
            },
            {
              "speed": 69.7,
              "position": 4062.8
            },
            {
              "speed": 70,
              "position": 4074.4
            },
            {
              "speed": 70,
              "position": 4078.3
            },
            {
              "speed": 70.2,
              "position": 4288.6
            },
            {
              "speed": 70.2,
              "position": 4290.5
            },
            {
              "speed": 70,
              "position": 4461.8
            },
            {
              "speed": 70,
              "position": 4463.7
            },
            {
              "speed": 72,
              "position": 4619.6
            },
            {
              "speed": 72.6,
              "position": 4659.7
            },
            {
              "speed": 72.6,
              "position": 4661.7
            },
            {
              "speed": 72.6,
              "position": 4714.2
            },
            {
              "speed": 72.1,
              "position": 5060.3
            },
            {
              "speed": 71.9,
              "position": 5062.3
            },
            {
              "speed": 69.7,
              "position": 5089.8
            },
            {
              "speed": 67.4,
              "position": 5116.5
            },
            {
              "speed": 65.2,
              "position": 5142.3
            },
            {
              "speed": 63,
              "position": 5167.2
            },
            {
              "speed": 60.7,
              "position": 5191.2
            },
            {
              "speed": 58.5,
              "position": 5214.4
            },
            {
              "speed": 56.2,
              "position": 5236.7
            },
            {
              "speed": 54,
              "position": 5258.1
            },
            {
              "speed": 51.7,
              "position": 5278.7
            },
            {
              "speed": 49.4,
              "position": 5298.4
            },
            {
              "speed": 47.2,
              "position": 5317.1
            },
            {
              "speed": 44.9,
              "position": 5335
            },
            {
              "speed": 42.6,
              "position": 5352
            },
            {
              "speed": 41.2,
              "position": 5362.5
            },
            {
              "speed": 41.2,
              "position": 5363.7
            },
            {
              "speed": 39.1,
              "position": 5407.1
            },
            {
              "speed": 37,
              "position": 5448.3
            },
            {
              "speed": 35.9,
              "position": 5469.5
            },
            {
              "speed": 35.9,
              "position": 5470.5
            },
            {
              "speed": 35.8,
              "position": 5471.5
            },
            {
              "speed": 35.7,
              "position": 5472.5
            },
            {
              "speed": 33.5,
              "position": 5486.9
            },
            {
              "speed": 31.3,
              "position": 5500.4
            },
            {
              "speed": 29.1,
              "position": 5513
            },
            {
              "speed": 26.9,
              "position": 5524.6
            },
            {
              "speed": 24.7,
              "position": 5535.4
            },
            {
              "speed": 22.5,
              "position": 5545.2
            },
            {
              "speed": 22,
              "position": 5547.1
            },
            {
              "speed": 21.8,
              "position": 5547.7
            },
            {
              "speed": 19.5,
              "position": 5553.4
            },
            {
              "speed": 17.1,
              "position": 5558.5
            },
            {
              "speed": 14.8,
              "position": 5562.9
            },
            {
              "speed": 12.5,
              "position": 5566.7
            },
            {
              "speed": 10.2,
              "position": 5569.9
            },
            {
              "speed": 7.9,
              "position": 5572.4
            },
            {
              "speed": 5.6,
              "position": 5574.2
            },
            {
              "speed": 3.2,
              "position": 5575.5
            },
            {
              "speed": 1,
              "position": 5576
            },
            {
              "speed": 0,
              "position": 5576
            }
          ],
          /*[{'x':1,'y':2},{'x':2,'y':7},{'x':3,'y':12},{'x':4,'y':2},{'x':5,'y':8},{'x':6,'y':13},{'x':7,'y':7},{'x':8,'y':2},{'x':9,'y':4},{'x':10,'y':7}],
          [{'x':1,'y':3},{'x':2,'y':8},{'x':3,'y':13},{'x':4,'y':3},{'x':5,'y':9},{'x':6,'y':14},{'x':7,'y':6},{'x':8,'y':1},{'x':9,'y':7},{'x':10,'y':9}],
          [{'x':1,'y':4},{'x':2,'y':9},{'x':3,'y':14},{'x':4,'y':4},{'x':5,'y':10},{'x':6,'y':15},{'x':7,'y':5},{'x':8,'y':0},{'x':9,'y':8},{'x':10,'y':5}]*/
        ];

        var colors = [
          'steelblue',
          'green',
          'red',
          'purple'
        ]


//************************************************************
// Create Margins and Axis and hook our zoom function
//************************************************************
        var margin = {top: 20, right: 30, bottom: 30, left: 50},
          width = 1160 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

        var x = d3.scale.linear()
          .domain([0, 6000])
          .range([0, width]);

        var y = d3.scale.linear()
          .domain([0, 100])
          .range([height, 0]);

        var xAxis = d3.svg.axis()
          .scale(x)
          .tickSize(-height)
          .tickPadding(10)
          .tickSubdivide(true)
          .orient("bottom");

        var yAxis = d3.svg.axis()
          .scale(y)
          .tickPadding(10)
          .tickSize(-width)
          .tickSubdivide(true)
          .orient("left");

        var zoom = d3.behavior.zoom()
          .x(x)
          .y(y)
          .scaleExtent([1, 10])
          .on("zoom", zoomed);





//************************************************************
// Generate our SVG object
//************************************************************
        var svg = d3.select("#testSpeedDistanceChart").append("svg")
          .call(zoom)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

        svg.append("g")
          .attr("class", "y axis")
          .append("text")
          .attr("class", "axis-label")
          .attr("transform", "rotate(-90)")
          .attr("y", (-margin.left) + 10)
          .attr("x", -height/2)
          .text('Axis Label');

        svg.append("clipPath")
          .attr("id", "clip")
          .append("rect")
          .attr("width", width)
          .attr("height", height);





//************************************************************
// Create D3 line object and draw data on our SVG object
//************************************************************
        var line = d3.svg.line()
          .interpolate("linear")
          .x(function(d) { return x(d.position); })
          .y(function(d) { return y(d.speed); });

        svg.selectAll('.line')
          .data(data)
          .enter()
          .append("path")
          .attr("class", "line")
          .attr("clip-path", "url(#clip)")
          .attr('stroke', function(d,i){
            console.log(colors[i%colors.length])
            return colors[i%colors.length];
          })
          .attr("d", line);




//************************************************************
// Draw points on SVG object based on the data given
//************************************************************
        var points = svg.selectAll('.dots')
          .data(data)
          .enter()
          .append("g")
          .attr("class", "dots")
          .attr("clip-path", "url(#clip)");

        points.selectAll('.dot')
          .data(function(d, index){
            var a = [];
            d.forEach(function(point,i){
              a.push({'index': index, 'point': point});
            });
            return a;
          })
          .enter()
          .append('circle')
          .attr('class','dot')
          .attr("r", 2.5)
          .attr('fill', function(d,i){
            return colors[d.index%colors.length];
          })
          .attr("transform", function(d) {
            return "translate(" + x(d.point.position) + "," + y(d.point.speed) + ")"; }
          );






//************************************************************
// Zoom specific updates
//************************************************************
        function zoomed() {
          svg.select(".x.axis").call(xAxis);
          svg.select(".y.axis").call(yAxis);
          svg.selectAll('path.line').attr('d', line);

          points.selectAll('circle').attr("transform", function(d) {
            return "translate(" + x(d.point.position) + "," + y(d.point.speed) + ")"; }
          );
        }

      }


    }

  }
})();
