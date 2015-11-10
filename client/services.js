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
      if(text[text.length - 2] !== '.' && text[text.length - 1] !== '.') {
        if(text[text.length - 1] === '.') {
          text += ' '
        } else {
          text += '. '
        }
      }
      for(var ci = 0; ci < text.length; ++ci) {
        var character = text[ci];
        sent += character;
        if(character === '.' || character === '\n') {
          if(character === '.') {
            sentArr.push(sent);
          }
          sent = '';
        }
      }
      return JSON.stringify(sentArr);
    }
    return {getPage: getPage, sendText: sendText};
  });
