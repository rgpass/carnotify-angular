angular.module('myApp')
.controller('navigationCtrl',
  ['$scope', 'navigationService',
  function ($scope, navigationService) {

    $scope.year = 2002;
    $scope.make = 'honda';
    $scope.model = 'accord';

}]);