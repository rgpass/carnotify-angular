angular
  .module('myApp', [
    'ui.router'//,
    // 'ct.ui.router.extras'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
        .state('carSelect', {
          url: '/',
          templateUrl: 'partials/car_select',
          controller: 'carSelectCtrl'
        })
        .state('donations', {
          url: '/donations',
          templateUrl: 'partials/donations'
        })
        .state('maintenanceReport', {
          url: '/report/:makeNiceName/:modelNiceName/:year',
          templateUrl: 'partials/maintenance_report',
          controller: 'maintenanceReportCtrl'
        })

      // default fall back route
      $urlRouterProvider.otherwise('/');

      // enable HTML5 Mode for SEO
      // $locationProvider.html5Mode(true);
  }]);