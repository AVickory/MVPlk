var fs = require('fs');
var Sentence = require('../server/sentenceModel.js');

Sentence.find({}).exec(function (saved) {
  if(saved) {
    return;
  } else {
    var file = fs.createReadStream(__dirname + '/raw.txt');
    var text = ''
    file.on('data', function (data) {
      text += data.toString();
    });

    file.on('end', function () {
      var sentenceArr = [];
      var sentence = '';
      var character;
      for(var i = 0; i < text.length; ++i) {
        character = text[i];
        sentence += character;
        if(character === '.' || character === '\n') {
          if(character === '.') {
            sentenceArr.push(sentence);
          }
          sentence = '';
        }
      }
      var len = sentenceArr.length;

      var counter = 0;
      var current;
      var asyncCounter = 0;

      while(sentenceArr.length !== 0) {
        Sentence.create({text: sentenceArr.pop(), parent_id: null}, function (err) {
          counter++;
          if(counter === len) {
            Sentence.find({}).exec(function (err, sentencesWithIds) {
              for(var j = 1; j < len; j++) {
                parent = sentencesWithIds[Math.floor(j/2)]
                sentencesWithIds[j].parent = parent.id;
                parent.children.push(sentencesWithIds[j].id);
                sentencesWithIds[Math.floor(j/2)] = parent
              }
              for(var k = 0; k < len; k++) {
                sentencesWithIds[k].save(function (err, sent) {
                  asyncCounter++;
                  if(asyncCounter=== len) {
                    console.log('LOREM IPSUM');
                  }
                });
              }
            })
          }
        })
      }
    })
  }
});


