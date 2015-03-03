angular.module('myApp')
.controller('myCtrl', ['$scope', 'myService', function ($scope, myService) {
  $scope.query = myService.query;
}]);