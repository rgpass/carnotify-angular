angular.module('myApp')
  .service('myService', ["$http", '$timeout', function($http, $timeout) {
    var that = this;

    that.query = 'From the service';
  }]);