angular.module('myApp')
.controller('maintenanceReportCtrl',
['$scope', '$rootScope', 'maintenanceReportService', '$stateParams', '$location', 'navigationService',
function ($scope, $rootScope, maintenanceReportService, $stateParams, $location, navigationService) {

  alignVariables();

  if (isMissingParams()) {
    // Forwarding to '/' wouldn't work. Need to force this route to get to work.
    $location.path('/report/');
  }

  if (!$scope.report) {
    maintenanceReportService
      .getReport($stateParams.year, $stateParams.makeNiceName, $stateParams.modelNiceName)
      .success(alignVariables)
      .success(storeSearchParams)
  } else if (!isSameSearch()) {
    clearVariables();
    maintenanceReportService
      .getReport($stateParams.year, $stateParams.makeNiceName, $stateParams.modelNiceName)
      .success(alignVariables)
      .success(storeSearchParams)
  }


  /* Utility functions */
  function alignVariables() {
    $scope.year = maintenanceReportService.year;
    $scope.make = maintenanceReportService.make;
    $scope.model = maintenanceReportService.model;
    $scope.modelYearId = maintenanceReportService.id;
    $scope.report = maintenanceReportService.report;
  }

  function isMissingParams() {
    return !$stateParams.year || $stateParams.makeNiceName == "" || $stateParams.modelNiceName == "";
  }

  function storeSearchParams() {
    maintenanceReportService.paramsYear = $stateParams.year;
    maintenanceReportService.makeNiceName = $stateParams.makeNiceName;
    maintenanceReportService.modelNiceName = $stateParams.modelNiceName;
    navigationService.year = $stateParams.year;
    navigationService.make = $stateParams.makeNiceName;
    navigationService.model = $stateParams.modelNiceName;
    $rootScope.$emit('carSelected');
  }

  function isSameSearch() {
    var isSameYear = $stateParams.year == maintenanceReportService.year;
    var isSameMake = $stateParams.makeNiceName == maintenanceReportService.makeNiceName;
    var isSameModel = $stateParams.modelNiceName == maintenanceReportService.modelNiceName;
    return isSameYear && isSameMake && isSameModel;
  }

  function clearVariables() {
    $scope.year = null;
    $scope.make = null;
    $scope.model = null;
    $scope.modelYearId = null;
    $scope.report = null;
  }
}]);