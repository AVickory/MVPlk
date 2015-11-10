angular.module('lexikana.services', [])
  .factory('Sentences', function ($http) {
    var getPage = function (prevId, callback) {
      $http.get('/text/' + prevId).then(callback, function (err) {
        console.log('bad page:', err);
      });
    }
    var sendText = function (prevId, text, callback) {
      $http.post('/text/' + prevId, parseTextToArr(text)).then(callback, function (err) {
        console.log('bad send:', err);
      })
    }
    var parseTextToArr = function (text) {
      var sent = '';
      var sentArr = [];
      for(var ci = 0; ci < text.length; ++ci) {
        var character = text[ci];
        sent += character;
        if(character === '.' || character === '\n') {
          // character === '.' ? sentArr.push(sent) : ;
          sent = '';
        }
      }
    }
    return {getPage: getPage, sendText: sendText};
  });
