/** Created by Samskrithi on 10/14/2016. */

(function () {
  'use strict';
  angular
    .module('driveFrontend')
    .factory('mathUtilsService', function mathUtilsService($log) {
      var conversionValueforMeterstoMiles = 0.000621371;
      var conversionValueforKphtoMph = 0.621371;
      return {
        convertMetersToMilesSingleValue: function (val) {
          return val * conversionValueforMeterstoMiles;
        },
        convertKphtoMphSingleValue: function (val) {
          return Math.ceil(val * conversionValueforKphtoMph)
        },
        convertMetersToMiles: function (givenValue, convertedValue) {
          _.each(givenValue, function (val, key) {
            convertedValue[convertedValue.length] = givenValue[key] * conversionValueforMeterstoMiles;
          });
          return convertedValue;
        },
        convertKphtoMph: function (givenValue, convertedValue) {
          _.each(givenValue, function (val, key) {
            convertedValue[convertedValue.length] = givenValue[key] * conversionValueforKphtoMph;
          });
          return convertedValue;
        },
        formatNumToSIUnits: function (num) {
          if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'
          }
          if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
          }
          if (num >= 100) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '')
          }
          return num;
        }
      }
    });
})();
