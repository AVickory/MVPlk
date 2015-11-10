angular.module('lexikana.logo', [])
  .controller('LogoCtrl', function ($scope) {
    console.log('herp')
    var height = $scope.logo.height;
    var margin = height/30;
    $scope.logo.margin = margin; //will have to make new logo if you want to change this
    var gr = 1.61803398875;
    var sizeFactor = 1/Math.pow(gr, 3);
    $scope.logo.biggestSize = (height - margin*2)*sizeFactor/(1-sizeFactor);
    $scope.logo.font = 'f1';
  });


