angular.module('myApp')
.controller('maintenanceReportCtrl',
['$scope', '$rootScope', 'maintenanceReportService', '$stateParams', '$location', 'navigationService', '$sce',
function ($scope, $rootScope, maintenanceReportService, $stateParams, $location, navigationService, $sce) {

  alignVariables();

  if (isMissingParams()) {
    // Forwarding to '/' wouldn't work. Need to force this route to get to work.
    $location.path('/report/');
  }

  if (!$scope.report) {
    maintenanceReportService
      .getReport($stateParams)
      .success(alignVariables)
      .success(storeSearchParams)
  } else if (!isSameSearch()) {
    clearVariables();
    maintenanceReportService
      .getReport($stateParams)
      .success(alignVariables)
      .success(storeSearchParams)
  }

  $scope.actionAndPart = function(item) {
    return item.action + " " + item.item.toLowerCase();
  };

  $scope.itemTotalCost = function(item) {
    return '$' + (item.labor_cost + item.parts_cost).toFixed(2);
  }

  $scope.itemCosts = function(item) {
    return 'Labor: $' + item.labor_cost.toFixed(2) +
      ', Parts: $' + item.parts_cost.toFixed(2)
  }

  $scope.intervalCosts = function(interval) {
    return 'Labor: $' + interval.sum_labor_cost.toFixed(2) +
      ', Parts: $' + interval.sum_parts_cost.toFixed(2)
  }

  $scope.smartText = function(item) {
    var smartDescription  = item.itemDescription
                              .replace(/engine/g, '<a href="https://www.youtube.com/watch?v=1p91gmhlPNo" target="_blank">engine</a>')
                              .replace(/rear-wheel\sdrive/g, '<a href="https://www.youtube.com/watch?v=mWtFkEwF61I" target="_blank">rear-wheel drive</a>')
                              .replace(/front-wheel\sdrive/g, '<a href="https://www.youtube.com/watch?v=WwMYGF2avrs" target="_blank">front-wheel drive</a>')
                              .replace(/catalytic\sconverters/g, '<a href="https://www.youtube.com/watch?v=HADOcrcMikA" target="_blank">catalytic converters</a>')
                              .replace(/mufflers/g, '<a href="https://www.youtube.com/watch?v=30JJSXWKIC8" target="_blank">mufflers</a>')
                              .replace(/differential/g, '<a href="https://youtu.be/K4JhruinbWc?t=1m50s" target="_blank">differential</a>')
                              .replace(/radiator/g, '<a href="https://www.youtube.com/watch?v=Q56k37FsRcA" target="_blank">radiator</a>')
                              
    // Trusting the source.
    return $sce.trustAsHtml(smartDescription);
  } 

  /* Utility functions */
  function alignVariables() {
    $scope.year = maintenanceReportService.year;
    $scope.make = maintenanceReportService.make;
    $scope.model = maintenanceReportService.model;
    $scope.zip = maintenanceReportService.zip;
    $scope.modelYearId = maintenanceReportService.id;
    $scope.report = maintenanceReportService.report;
  }

  function isMissingParams() {
    return !$stateParams.zip
      || $stateParams.makeNiceName == ""
      || $stateParams.modelNiceName == ""
      || $stateParams.year == "";
  }

  function storeSearchParams() {
    maintenanceReportService.paramsYear = $stateParams.year;
    maintenanceReportService.makeNiceName = $stateParams.makeNiceName;
    maintenanceReportService.modelNiceName = $stateParams.modelNiceName;
    maintenanceReportService.zip = $stateParams.zip;
    navigationService.year = $stateParams.year;
    navigationService.make = $stateParams.makeNiceName;
    navigationService.model = $stateParams.modelNiceName;
    navigationService.zip = $stateParams.zip;
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
