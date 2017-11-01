(function () {
  'use strict';

  angular
    .module('dassimFrontendV04')
    .config(config)
/*
    .factory('$exceptionHandler', function($log, $location){
      return function (exception, cause){
        $log.warn("exceptions", exception, cause);
        $location.path('/dashboard/404')
      }
    });*/

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);


  }

})();
