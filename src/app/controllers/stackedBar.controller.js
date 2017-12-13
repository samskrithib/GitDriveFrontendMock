/** Created by Samskrithi on 10/27/2016. */
(function () {
  'use strict';

  angular
    .module('timetableAdherenceModule')
    .controller('stackedBarController', stackedBarController);

  function stackedBarController() {
    var vm = this;

    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
      width = 600 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    // Parse the date / time
    var parseDate = d3.time.format("%b %Y").parse;

// Set the ranges
    var y = d3.time.scale().range([height, 0]);
    var x = d3.scale.linear().range([0, width]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis().scale(y)
      .orient("left").ticks(5);

// Define the line
    var priceline = d3.svg.line()
      .x(function(d) { return x(d.identifierAndDistance['SCHEDULED 06:04 2T03']); })
      .y(function(d) { return y(d.unixTime); });

    // Adds the svg canvas
    var svg = d3.select("#d3chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("id", "test")
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    d3.json("/assets/DriverRunJSON.json", function(data) {
      console.log("data", data);

      /*var times =data.timetableAdherenceGraph.timetableAdherenceGraphSeriesList[0].scheduledAndActualTimetables[0].timeAndDistanceList
      _.each(times, function (v, i) {
        console.log(moment(v.unixTime).format('M/D LT'))
        console.log(v.identifierAndDistance['SCHEDULED 06:04 2T03'])
      })

      x.domain([0, d3.max(times, function(d) { return d.identifierAndDistance['SCHEDULED 06:04 2T03']; })]);

      y.domain(d3.extent(times, function (d) {
        return d.unixTime;
      }))*/

      // Add the X Axis
      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate("+ margin.left +"," + height + ")")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate("+ margin.left +"," + 0 + ")")
        .call(yAxis);


      // Add the priceline path.
      svg.append("path")
        .attr("class", "line")
        .attr("transform", "translate("+ margin.left +"," + 0 + ")")
        // .attr("d", priceline(times));
    });


  }
})();


