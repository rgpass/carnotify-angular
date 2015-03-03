angular
  .module('myApp', [
    'ui.router'//,
    // 'ct.ui.router.extras'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
        .state('donations', {
          url: '/',
          templateUrl: 'partials/donations',
          controller: 'myCtrl'
        })
        .state('blah', {
          url: '/blah',
          templateUrl: 'partials/blah',
          controller: 'myCtrl'
        })

      // default fall back route
      $urlRouterProvider.otherwise('/');

      // enable HTML5 Mode for SEO
      // $locationProvider.html5Mode(true);
  }]);