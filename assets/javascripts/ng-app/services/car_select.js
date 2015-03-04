angular.module('myApp')
.service('carSelectService', ["$http", '$timeout', function($http, $timeout) {
  var that = this;

  this.grabMakes = function(year) {
    return ['Honda', 'Acura'];
  };

  this.grabModels = function(make) {
    return [{ name: 'Accord', id: 100000402 }, 
            { name: 'CRV',    id: 100000403 }];
  };
}]);