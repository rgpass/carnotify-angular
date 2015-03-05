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
    $scope.makes = carSelectService.grabMakesModels($scope.selectedYear)
      .success(function(data) {
        $scope.makes = data;
      });
  };

  $scope.updateModels = function(makeNiceName) {
    $scope.selectedModel = 'model';
    var make = _.find($scope.makes, function(make) {
      return make.niceName == makeNiceName;
    });
    $scope.models = make.models;
  };

}]);