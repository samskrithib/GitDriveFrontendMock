/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('dassimFrontendV04')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('DRIVE_COLORS', {
      blue: '#7cb5ec',
      blue_dark: '#1f77b4',
      // red : '#D2527F',
      red: '#c96768',
      orange : '#FF7F0E',
      green : '#2ca02c',
      green_actual : '#5FD35F',
      green_light : '#CCCC00',
      black : '#000000',
      brown : '#8c564b',
      twoRunsColorPattern: ['#8fb8ec', '#1f77b4', '#ffbb78', '#ff7f0e', '#98df8a', '#2ca02c', '#ff9896', '#d62728', '#c5b0d5', '#9467bd', '#c49c94', '#8c564b', '#f7b6d2', '#e377c2', '#c7c7c7', '#7f7f7f', '#dbdb8d', '#bcbd22', '#9edae5', '#17becf'],
      //threecolor pattern - Dark, lighter, light
      threeShadeColorPattern: ['#1c3f9f','#8fb8ec', '#1f77b4','#cc5200', '#ffbb78', '#ff7f0e','#47b431', '#98df8a', '#2ca02c', '#cc0300', '#ff9896', '#d62728','#5d3e75', '#c5b0d5', '#9467bd','#73483f', '#c49c94', '#8c564b','#b8145b', '#f7b6d2', '#e377c2','#595959', '#c7c7c7', '#7f7f7f','#88882b', '#dbdb8d', '#bcbd22','#257d8d', '#9edae5', '#17becf'],
      //trainGraph color pattern - light(flatout), light(scheduled), dark(Actual)
      trainGraphColorPattern: ['#8fb8ec', '#8fb8ec','#1f77b4',
      '#ffbb78', '#ffbb78', '#ff7f0e',
      '#98df8a', '#98df8a', '#2ca02c',
      '#ff9896', '#ff9896', '#d62728',
      '#c5b0d5', '#c5b0d5', '#9467bd',
      '#c49c94', '#c49c94', '#8c564b',
      '#f7b6d2', '#f7b6d2', '#e377c2',
      '#c7c7c7', '#c7c7c7', '#7f7f7f',
      '#dbdb8d', '#dbdb8d', '#bcbd22',
      '#9edae5', '#9edae5', '#17becf'],
      SingleShadeColorPattern: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2','#7f7f7f', '#bcbd22', '#17becf']

    })

})();
