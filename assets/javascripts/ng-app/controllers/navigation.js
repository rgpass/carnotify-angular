angular.module('myApp')
.controller('navigationCtrl',
  ['$scope', 'navigationService',
  function ($scope, navigationService) {
    
    $scope.$watchCollection(navServiceFn, function(newVal, oldVal) {
      $scope.year = newVal.year;
      $scope.make = navigationService.make;
      $scope.model = navigationService.model;
    })

    function navServiceFn() {
      return navigationService;
    }

}]);