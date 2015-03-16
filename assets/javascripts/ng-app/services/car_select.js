angular.module('myApp')
.service('carSelectService', ["$http", '$timeout', function($http, $timeout) {
  var that = this;
  var makesUrl = '/api/v1/makes';

  this.waitIcon = true;

  this.grabMakesModels = function(year) {
    params = { year: year };
    return $http.get(makesUrl, { params: params });
  };

}]);