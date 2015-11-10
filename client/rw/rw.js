angular.module('lexikana.rw', [])
  .controller('rwCtrl', function ($scope, $http, Sentences) {
    $scope.read = true;
    $scope.newText = '';
    var newIndex;
    var currentPage;
    $scope.atEnd = true;
    $scope.atBeginning = true;

    var getPage = function (lastPage) {
      var id = lastPage ? lastPage.sentences[lastPage.sentences.length-1]._id : null;
      Sentences.getPage(id, function (sentenceList) {
        changePage(new Sentences.Page(sentenceList.data, lastPage))
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
        var newPage = new Sentences.Page($scope.before.concat(sentenceList.data, currentPage.parent));
        changePage(newPage);
        $scope.toggleRead();
      })
    };
    $scope.next = function () {
      if(currentPage.children.length === 0) {
        getPage(currentPage);
      } else {
        changePage(currentPage.children[currentPage.next]);
      }
      $scope.read = true;
    }
    $scope.previous = function () {
      if(currentPage.parent) {
        currentPage.parent.next = currentPage.branchIndex
        changePage(currentPage.parent)
      }
      $scope.read = true;
    }
    $scope.previousBranch = function () {
      if($scope.atBeginning) {
        getPage(currentPage.parent);
      } else if(currentPage.branchIndex) {
        changePage(currentPage.parent.children[currentPage.branchIndex-1])
      }
    }
    $scope.nextBranch = function () {
      if($scope.atEnd) {
        getPage(currentPage.parent);
      } else if(currentPage.branchIndex || currentPage.branchIndex === 0) {
        changePage(currentPage.parent.children[currentPage.branchIndex+1]);
      }
    }



    var changePage = function (changeTo) {
      currentPage = changeTo;
      $scope.sentences = currentPage.sentences;
      console.log(currentPage, changeTo)
      if(currentPage.parent) {

        currentPage.parent.next = currentPage.branchIndex;
        $scope.atEnd = currentPage.branchIndex === currentPage.parent.children.length -1;
        $scope.atBeginning = currentPage.branchIndex === 0;
      }
    }
  });
