angular.module('myApp')
.controller('carSelectCtrl', ['$scope', 'myService', function ($scope, myService) {
  // DEFAULTS AND RANGES
  $scope.years = _.range(1990, 2016).reverse();
  $scope.year = 'year';
  $scope.make = 'make';
  $scope.model = 'model';

  $scope.updateMakes = function() {
    $scope.makes = [];
    $scope.make = 'make';
    $scope.model = 'model';
    // $scope.makes = carSelectService.grabMakesModels($scope.year);
  };

  $scope.updateModels = function() {
    $scope.models = [];
    $scope.model = 'model';
  };

}]);