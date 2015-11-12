angular.module('lexikana.signin', [])
  .controller('SigninCtrl', function ($scope, $location) {
    console.log('derp')
    $scope.user = {};
    $scope.logo = {};
    $scope.logo.height = 150;

    $scope.toRW = function () {
      $location.path('/rw');
    }
  })
