(function() {
  'use strict';

  angular
    .module('dassimFrontendV04')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);


  }

})();
