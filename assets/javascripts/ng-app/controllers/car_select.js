angular.module('myApp')
.controller('carSelectCtrl',
  ['$scope', 'myService', 'carSelectService',
  function ($scope, myService, carSelectService) {

  // DEFAULTS AND RANGES
  $scope.years = _.range(1990, 2016).reverse();
  $scope.selectedYear = 'year';
  $scope.selectedMake = 'make';
  $scope.selectedModel = 'model';

  $scope.updateMakes = function() {
    $scope.selectedMake = 'make';
    $scope.selectedModel = 'model';
    $scope.makes = [];
    $scope.models = [];
    $scope.makes = carSelectService.grabMakes($scope.selectedYear);
  };

  $scope.updateModels = function() {
    $scope.selectedModel = 'model';
    $scope.models = [];
    $scope.models = carSelectService.grabModels($scope.make);
  };

}]);