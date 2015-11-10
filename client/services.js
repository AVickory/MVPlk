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

    var Page = function (sentences, parent) {
      this.sentences = sentences;
      this.children = [];
      this.parent = parent ? parent : null;
      this.branchIndex = null
      this.next = null;
      if(parent) {
        parent.children.push(this);
        this.branchIndex = parent.children.length - 1;
        this.parent.next = this.branchIndex;
      }
    }

    return {getPage: getPage, sendText: sendText, Page: Page};
  });
