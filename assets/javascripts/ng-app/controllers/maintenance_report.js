angular.module('myApp')
.controller('maintenanceReportCtrl',
['$scope', 'maintenanceReportService', '$stateParams',
function ($scope, maintenanceReportService, $stateParams) {

  alignVariables();

  function alignVariables() {
    $scope.year = maintenanceReportService.year;
    $scope.make = maintenanceReportService.make;
    $scope.model = maintenanceReportService.model;
    $scope.modelYearId = maintenanceReportService.id;
    $scope.report = maintenanceReportService.maintenance_list;
  }
  
  $scope.paramsYear = $stateParams.year;
  $scope.makeNiceName = $stateParams.makeNiceName;
  $scope.modelNiceName = $stateParams.modelNiceName;

  if (!$scope.report) {
    maintenanceReportService.getReport($scope.paramsYear, $scope.makeNiceName, $scope.modelNiceName).success(function(data) {
      $scope.year = data.year;
      $scope.make = data.make;
      $scope.model = data.model;
      $scope.modelYearId = data.id;
      $scope.report = data.maintenance_list
    })
  }
}]);