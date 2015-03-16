angular.module('myApp')
.service('maintenanceReportService', ["$http", '$timeout', function($http, $timeout) {
  var that = this;
  var maintenanceUrl = '/api/v1/maintenance';

  this.year = null;
  this.make = null;
  this.model = null;
  this.zip = null;
  this.modelYearId = null;
  this.report = null;

  this.getReport = function(stateParams) {
    params = {
      year: stateParams.year,
      make: stateParams.makeNiceName,
      model: stateParams.modelNiceName,
      zip: stateParams.zip
    };
    return $http.get(maintenanceUrl, { params: params }).success(function(data) {
      that.year = data.year;
      that.make = data.make;
      that.model = data.model;
      that.zip = data.zip;
      that.modelYearId = data.id;
      that.report = data.maintenance_list;
    });
  };

}]);
