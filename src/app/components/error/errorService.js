(function () {
  'use strict';

  angular
    .module('errorModule', [])
    .controller('ErrorController', errorController)
    .factory('errorService', errorService)

    function errorController(errorService){
      var vm = this;
      vm.errorMessage = errorService.getErrorMessage();
      vm.datamessage = vm.errorMessage.data.message || 'Bad request';
      vm.statusText = vm.errorMessage.statusText || 'Bad request';
      vm.status = vm.errorMessage.status || '404';
    }
    function errorService($log){
      var error;
      return {
        console: function(){
          console.log("error")
        },
        addErrorMessage: function(err){
          error = err;
        },
        getErrorMessage: function () {
          return error;
        }

      }
    }

})();
