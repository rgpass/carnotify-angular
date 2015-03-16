angular.module('myApp')
.controller('carSelectCtrl',
  ['$scope', 'carSelectService', 'navigationService',
  function ($scope, carSelectService, navigationService) {

  toggleWaitIcon();

  // DEFAULTS AND RANGES
  $scope.years = _.range(1990, 2016).reverse();
  $scope.selectedYear = 'year';
  $scope.selectedMake = 'make';
  $scope.selectedModel = 'model';

  $scope.updateMakes = function() {
    $scope.selectedMake = 'make';
    $scope.selectedModel = 'model';
    $scope.waitIcon = false;
    $scope.makes = [];
    $scope.models = [];
    $scope.makes = carSelectService.grabMakesModels($scope.selectedYear)
      .success(function(data) {
        $scope.makes = data;
        $scope.waitIcon = true;
      });
  };

  $scope.updateModels = function(makeNiceName) {
    $scope.selectedModel = 'model';
    var make = _.find($scope.makes, function(make) {
      return make.niceName == makeNiceName;
    });
    $scope.models = make.models;
  };

  function toggleWaitIcon() {
    $scope.waitIcon = carSelectService.waitIcon;
  }

}]);