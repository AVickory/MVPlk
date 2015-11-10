angular.module('lexikana.rw', [])
  .controller('rwCtrl', function ($scope, $http, Sentences) {
    $scope.read = true;
    $scope.newText = '';
    var newIndex;
    var newIndicies = [];
    Sentences.getPage(null, function (sentenceList) {
      $scope.sentences = sentenceList.data;
      console.log('derp', $scope.sentences)
    });
    $scope.toggleRead = function (index) {
      if($scope.read) {
        newIndex = index;
        $scope.before = $scope.sentences.slice(0, index);
        $scope.after = $scope.sentences.slice(index);
        $scope.newText = '';
      }
      $scope.read = !$scope.read;
    }
    $scope.send = function () {
      Sentences.send($scope.sentences[index], newText, function (sentenceList) {
        $scope.sentences = before.concat(sentenceList.data);
        $scope.read = true;
      })
    };
  });
