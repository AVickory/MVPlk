angular.module('lexikana.signin', [])
  .controller('SigninCtrl', function ($scope) {
    console.log('derp')
    $scope.user = {};
    $scope.logo = {};
    $scope.logo.height = 150;
  })
