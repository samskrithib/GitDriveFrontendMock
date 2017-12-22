(function() {
  'use strict';

  angular
    .module('driveFrontend')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/components/login/partials/login.html',
        controller: 'loginController',
        controllerAs: 'vm'
      })
      .state('dashboard', {
        url: '/dashboard',
        template: '<div id="wrapper"> <acme-navbar></acme-navbar> <div ui-view></div></div>\n' +
        '</div>'
      })
      .state('dashboard.view', {
        url: '/view',
        templateUrl: 'app/components/viewMyRuns/partials/view-my-runs-input.html',
        controller: 'ViewMyRunsInputController',
        controllerAs: 'vm'
      })
      .state('dashboard.view-my-runs', {
        url: '/view-my-runs',
        templateUrl: 'app/components/viewMyRuns/partials/view-my-runs.html',
        controller: 'ViewMyRunsController',
        controllerAs: 'vm'
      })
      .state('dashboard.periodicInput', {
        url: '/periodicInput',
        templateUrl: 'app/components/periodicReports/partials/periodicReportsInput.html',
        controller: 'PeriodicReportsInputController',
        controllerAs: 'vm'
      })
      .state('dashboard.periodicReports', {
        url: '/periodicReports',
        templateUrl: 'app/components/periodicReports/partials/periodicReports.html',
        controller: 'PeriodicReportsController',
        controllerAs: 'vm'
      })
      .state('dashboard.timetableAdherenceInput', {
        url: '/timetableAdherenceInput',
        templateUrl: 'app/components/timetableAdherence/partials/trainGraphInput.html',
        controller: 'TimetableAdherenceInputController',
        controllerAs: 'vm'
      })
      .state('dashboard.timetableAdherenceInputScreen2', {
        url: '/ttAInput2',
        templateUrl: 'app/components/timetableAdherence/partials/trainGraphInputScreen2.html',
        controller: 'TimetableAdherenceInput_2_Controller',
        controllerAs: 'vm'
      })
      .state('dashboard.timetableAdherence', {
        url: '/timetableAdherence',
        templateUrl: 'app/components/timetableAdherence/partials/trainGraph.html',
        controller: 'TrainGraphController',
        controllerAs: 'vm'
      })
      .state('dashboard.demo', {
        url: '/viewDemo',
        templateUrl: 'app/components/viewMyRuns/partials/view-my-runs-inputDevelop.html',
        controller: 'ViewMyRunsInputController',
        controllerAs: 'vm'
      })
      .state('dashboard.demoView', {
        url: '/viewRunsDemo',
        templateUrl: 'app/components/viewMyRuns/partials/view-my-runs.html',
        controller: 'ViewMyRunsControllerDevelop',
        controllerAs: 'vm'
      })
      .state('dashboard.NV', {
        url: '/NV',
        templateUrl: 'views/test.html',
        controller: 'testController',
        controllerAs: 'vm'
      })
      .state('dashboard.dwellTimesInput',{
         url: '/dwellTimesInput',
        templateUrl: 'app/components/dwellTimes/partials/dwellTimesPerJourneyInput.html',
        controller: 'dwellTimesInputController',
        controllerAs: 'vm'
      })
      .state('dashboard.dwellTimes',{
         url: '/dwellTimes',
        templateUrl: 'app/components/dwellTimes/partials/dwellTimesPerJourney.html',
        controller: 'dwellTimesController',
        controllerAs: 'vm'
      })
      .state('dashboard.comparemyrunsInput', {
        url: '/comparemyrunsInput',
        templateUrl: 'app/components/compareRuns/partials/compare-my-runs-input.html',
        controller: 'CompareMyRunsInputController',
        controllerAs: 'vm'
      })
      .state('dashboard.comparemyruns', {
        url: '/comparemyruns',
        templateUrl: 'app/components/compareRuns/partials/compare-my-runs.html',
        controller: 'CompareMyRunsController',
        controllerAs: 'vm'
      })
      .state('dashboard.404',{
        url: '/404',
        templateUrl: 'app/components/error/404.html',
        controller: 'ErrorController',
        controllerAs:'err'
      })
      ;

    $urlRouterProvider.otherwise('/login');
  }

})();
