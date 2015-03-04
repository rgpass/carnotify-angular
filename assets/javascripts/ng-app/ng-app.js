angular
  .module('myApp', [
    'ui.router'//,
    // 'ct.ui.router.extras'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'partials/home'
        })
        .state('donations', {
          url: '/donations',
          templateUrl: 'partials/donations'
        })
        .state('maintenanceReport', {
          url: '/report',
          templateUrl: 'partials/maintenance_report',
          controller: 'maintenanceReportCtrl'
        })

      // default fall back route
      $urlRouterProvider.otherwise('/');

      // enable HTML5 Mode for SEO
      // $locationProvider.html5Mode(true);
  }]);