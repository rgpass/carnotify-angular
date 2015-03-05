angular.module('myApp')
.service('carSelectService', ["$http", '$timeout', function($http, $timeout) {
  var that = this;
  var makesUrl = '/api/v1/makes';

  this.grabMakesModels = function(year) {
    params = { year: year };
    return $http.get(makesUrl + '?year=' + year);
  };

  // this.grabModels = function(make) {
  //   return [{ name: 'Accord', id: 100000402 }, 
  //           { name: 'CRV',    id: 100000403 }];
  // };
}]);