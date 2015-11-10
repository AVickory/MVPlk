angular.module('lexikana.rw', [])
  .controller('rwCtrl', function ($scope, $http, Sentences) {
    $scope.read = true;
    $scope.newText = '';
    var newIndex;
    var prevPages = [];
    var nextPages = [];
    var getPage = function (id) {
      Sentences.getPage(id, function (sentenceList) {
        $scope.sentences = sentenceList.data;
      });
    }
    getPage(null);
    $scope.toggleRead = function (index) {
      if($scope.read) {
        newIndex = index;
        $scope.before = $scope.sentences.slice(0, index);
        $scope.after = $scope.sentences.slice(index);
        $scope.newText = '';
        newIndex = index;
      }
      $scope.read = !$scope.read;
    }
    $scope.send = function () {
      Sentences.sendText($scope.sentences[newIndex]._id, $scope.newText, function (sentenceList) {
        $scope.sentences = $scope.before.concat(sentenceList.data);
        $scope.toggleRead();
      })
    };
    $scope.next = function () {
      prevPages.push($scope.sentences);
      getPage($scope.sentences[$scope.sentences.length -1]._id);
    }
    $scope.previous = function () {
      if(prevPages.length > 0) {
        nextPages.push($scope.sentences);
        $scope.sentences = prevPages.pop();
      }
    }
  });
