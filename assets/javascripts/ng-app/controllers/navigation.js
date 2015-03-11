angular.module('myApp')
.controller('navigationCtrl',
  ['$scope', '$rootScope', 'navigationService',
  function ($scope, $rootScope, navigationService) {

    $rootScope.$on('carSelected', function() {
      $scope.year = navigationService.year;
      $scope.make = navigationService.make;
      $scope.model = navigationService.model;
    })

}]);