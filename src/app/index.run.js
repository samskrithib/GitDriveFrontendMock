(function() {
  'use strict';

  angular
    .module('dassimFrontendV04')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
