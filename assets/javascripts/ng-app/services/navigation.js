angular.module('myApp')
.service('navigationService', ["$http", '$timeout', function ($http, $timeout) {
  
  var that = this;
  this.year = 2002;
  this.make = 'honda';
  this.model = 'accord';

}]);
