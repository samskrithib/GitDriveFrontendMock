/** Created by Samskrithi on 10/14/2016. */

(function () {
  'use strict';
  angular
    .module('driveFrontend')
    .factory('UtilityService', function UtilityService($log, typeaheadService) {
      var tabsList = [];
      var checkedItems;

      return {
        addCheckedItems: function (item) {
          checkedItems = item;
          //$log.debug("items : " + item);
        },
        getCheckedItems: function () {
          return checkedItems;
        },
        clean: function () {
          checkedItems = '';
          return checkedItems;
        },
        addTab: function (tab, id) {
          tabsList.push({
            title: tab,
            id: id
          });
          return tabsList;
        },
        getTab: function () {
          return tabsList;
        },
        removeTab: function (tab) {
          tabsList = _.without(tabsList, _.findWhere(tabsList, { title: tab }));
          //$log.debug(tab);
        },
        clearTab: function () {
          tabsList.splice(0, tabsList.length);
          // $log.debug(tabsList);
        },

        getAllIndexes: function (array, value) {
          var indexes = [];
          _.each(array, function (val, key) {
            if (array[key] == value) {
              indexes.push(key);
              $log.debug(key)
            }
            return indexes;
          })
        },

        _includes: function (string, substring) {
          if (string.includes(substring)) {
            return true;
          }
        },

        _findStringinArray: function (string, searcharr) {
          return jQuery.inArray(true, jQuery.map(searcharr, function (s) {
            return s.indexOf(string) > -1;
          }))

        },

        searchBySmartOrder: function (obj) {
          var queryObj = typeaheadService.getQueryObject(),
            key = Object.keys(queryObj)[0],
            query = queryObj[key];
          if (obj[key].toLowerCase().indexOf(query.toLowerCase()) === 0) {
            return ('a' + obj[key]);
          }
          return ('b' + obj[key]);
        },

        numberOfDaysBetweenDates: function (date1, date2) {
          var a = moment(date1)
          var b = moment(date2)
          var numOfdays = a.diff(b, 'days') + 1
          return numOfdays;
        },

        daysOfDatesSelected: function (fromDate, toDate, daysRange) {
          var currentDate = fromDate.getTime();
          var array = [];
          while (currentDate <= toDate.getTime()) {
            var day = moment(currentDate).format('dddd');
            if (_.contains(daysRange, day)) {
              array.push(day)
            }
            currentDate = moment(currentDate).add(1, 'days');
          }
          return array;
        }

      }
    });
})();
