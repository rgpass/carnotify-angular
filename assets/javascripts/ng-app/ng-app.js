angular
  .module('myApp', [
    'ui.router',
    'ct.ui.router.extras'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
        .state('donations', {
          url: '/',
          // template: '<h1>Donation</h1>' // Working!
          templateUrl: 'partials/donations', // Got it to work by creating views/donations.erb and a Sinatra route for it
          // templateUrl: 'donations.html'//,
          controller: 'myCtrl'
        })
        .state('blah', {
          url: '/blah',
          // template: '<h1>Blah</h1>' // Working!
          templateUrl: 'partials/blah', // Got it to work by creating views/donations.erb and a Sinatra route for it
          // templateUrl: 'donations.html'//,
          controller: 'myCtrl'
        })
      // $routeProvider.
      //   when("/", {
      //     templateUrl: "donations.html"//,
      //     // controller: "BoardCtrl"
      //   })

      // default fall back route
      $urlRouterProvider.otherwise('/');

      // enable HTML5 Mode for SEO
      // $locationProvider.html5Mode(true);
  }]);