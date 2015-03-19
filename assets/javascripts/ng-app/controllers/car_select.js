angular.module('myApp')
.controller('carSelectCtrl',
  ['$scope', 'carSelectService', 'navigationService',
  function ($scope, carSelectService, navigationService) {

  $scope.isLoading = true;

  // DEFAULTS AND RANGES
  $scope.years = _.range(1990, 2016).reverse();
  $scope.selectedYear = 'year';
  $scope.selectedMake = 'make';
  $scope.selectedModel = 'model';

  $scope.updateMakes = function() {
    $scope.selectedMake = 'make';
    $scope.selectedModel = 'model';
    $scope.isLoading = false;
    $scope.makes = [];
    $scope.models = [];
    $scope.makes = carSelectService.grabMakesModels($scope.selectedYear)
      .success(function(data) {
        $scope.makes = data;
        $scope.isLoading = true;
      });
  };

  $scope.updateModels = function(makeNiceName) {
    $scope.selectedModel = 'model';
    var make = _.find($scope.makes, function(make) {
      return make.niceName == makeNiceName;
    });
    $scope.models = make.models;
  };

  $scope.validateZip = function() {
    $scope.isValidZip = String($scope.zip).match(/^\d{5}$/);
  };
}]);