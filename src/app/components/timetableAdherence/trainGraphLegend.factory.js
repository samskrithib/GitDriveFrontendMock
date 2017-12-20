/** Created by Samskrithi on 18/11/2016. */

(function () {
  'use strict';
  angular
    .module('timetableAdherenceModule')
    .factory('trainGraphLegend', trainGraphLegend);

  function trainGraphLegend($log, UtilityService, DRIVE_COLORS) {
    // var width = 450; //default

    return {
      linestyleLegend: function (timetableAdherenceChart, ActualRunSeriesNames, scheduledSeriesNames, FlatOutSeriesNames, width) {
        d3.selectAll("#lineStylelegend").remove();
        var linestyleLegendPosition = width/2.5;
        var legend = d3.select("#trainGraph")
          .select("svg")
          .selectAll(".legend")
          .data(["Flatout", "Scheduled", "Actual"].slice().reverse())
          .enter().append("g")
          .attr("class", "legend")
          .attr("id", "lineStylelegend")
          .attr("transform", function (d, i) {
            return "translate(" + i * 100 + " 20)";
          });

        legend.append("line")
          .attr("x1", linestyleLegendPosition)
          .attr("x2", linestyleLegendPosition + 25)
          .attr("y1", 10)
          .attr("y2", 10)
          .attr("class", function (d) {
            return d + "legendline"
          });

        legend.append("text")
          .attr("x", linestyleLegendPosition)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .style("font-size", "12px")
          .text(function (d) {
            return d;
          })
          .on('mouseover', function (id) {
            switch (id) {
              case "Flatout": {
                timetableAdherenceChart.focus(FlatOutSeriesNames)
                break;
              }
              case "Scheduled": {
                timetableAdherenceChart.focus(scheduledSeriesNames)
                break;
              }
              case "Actual": {
                timetableAdherenceChart.focus(ActualRunSeriesNames)
                break;
              }
            }
            d3.select(this).style("cursor", "pointer");
          })
          .on('mouseout', function (id) {
            timetableAdherenceChart.revert();
            d3.select(this).style("cursor", "pointer");
          })
          .on('click', function (id) {
            angular.element(this).toggleClass("c3-legend-item-hidden")
            switch (id) {
              case "Flatout": {
                timetableAdherenceChart.toggle(FlatOutSeriesNames)
                break;
              }
              case "Scheduled": {
                timetableAdherenceChart.toggle(scheduledSeriesNames);
                break;
              }
              case "Actual": {
                timetableAdherenceChart.toggle(ActualRunSeriesNames)
                break;
              }
            }
          })
      },
      customTrainGraphLegend: function (timetableAdherenceChart, ActualRunSeriesNames, newnames, scheduledSeriesNames, FlatOutSeriesNames) {
        d3.select('#legendItems').remove();
        d3.select('#toggle').remove();
        d3.select('#index0')
          .insert('div')
          .attr('class', 'container-fluid')
          .append('a')/*.attr('type', 'button')*/
          .attr("id", "toggle")
          .style("cursor", "pointer")
          // .attr("class", "btn btn-primary ")
          .text("Hide Trains >>")
          .on("click", function (d) {
            var active = !legendItems.active,
              visibility = active ? 'none' : 'block',
              text = active ? 'Show Trains >>' : 'Hide Trains >>'
            d3.select('#legendItems').style("display", visibility)
            d3.select('#toggle').text(text)
            legendItems.active = active;
          })

        d3.select('#index0')
          .insert('div')
          .attr('id', 'legendItems')
          .attr('class', 'container-fluid')
          .insert('div')
          .attr('class', 'legend')
          .insert('ul').attr('class', 'list-group list-group-horizontal')
          .selectAll('span')
          .data(ActualRunSeriesNames)
          .enter().append('li').attr('class', 'list-group-item')
          .attr('data-id', function (id) {
            return id;
          })
          .append('div', '.legend-label')
          .html(function (id) {
            return newnames[id];
          })
          .on('mouseover', function (id) {
            var fields = _.rest(id.toString().split(" "), [1]);
            var string = fields.join(" ");
            var newArray = [];
            var index_of_matchedString = UtilityService._findStringinArray(string, scheduledSeriesNames)
            newArray.push(scheduledSeriesNames[index_of_matchedString])
            newArray.push(id)
            newArray.push(FlatOutSeriesNames[index_of_matchedString])
            d3.select(this).style("cursor", "pointer");
            timetableAdherenceChart.focus(newArray);
          })
          .on('mouseout', function (id) {
            d3.select(this).style("cursor", "pointer");
            timetableAdherenceChart.revert();
          })
          .on('click', function (id) {
            var fields = _.rest(id.toString().split(" "), [1]);
            var string = fields.join(" ");
            var newArray = [];
            var index_of_matchedString = UtilityService._findStringinArray(string, scheduledSeriesNames)
            newArray.push(scheduledSeriesNames[index_of_matchedString])
            newArray.push(FlatOutSeriesNames[index_of_matchedString])
            newArray.push(id.toString())
            angular.element(this).toggleClass("c3-legend-item-hidden")
            timetableAdherenceChart.toggle(newArray);
          })
          .insert('span', '.legend-label').attr('class', 'badge-pill')
          .each(function (id) {
            d3.select(this).style('background-color', timetableAdherenceChart.color(id));
          })
          .html(function (id) {
            return '&nbsp&nbsp&nbsp&nbsp&nbsp'
          })
      }
    }
  }
})();

