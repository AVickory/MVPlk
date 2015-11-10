var mongoose = require('mongoose');
var Sentence = require('./sentenceModel.js');


var getPage = function (parentId, page, next) {
  return Sentence.find({'parent': parentId})
    .exec(function (err, children) {
      if(page.len <= 20 && children.length) {
        var child = children[Math.floor(children.length*Math.random())];
        page.push(child);
        page.len += child.text.length;
        getPage(child.id, page, next);
      } else {
        next(page);
      }
    });
};

module.exports.sendPage = function (req, res) {
  var previousSentenceId = req.url.split('/text/');
  previousSentenceId = previousSentenceId[previousSentenceId.length-1]
  var page = [];
  page.len = 0;
  if(previousSentenceId === 'null') {
    Sentence.findOne({}).exec(function (err, sent) {
      if(err) {console.log('err',err);}
      page.push(sent);
      page.len += sent.text.length;
      getPage(sent.id, page, function () {
        res.json(page);
      })
    });
  } else {
    getPage(previousSentenceId, page, function () {
      res.json(page);
      
    });
  }
}

module.exports.addBranch = function (req, res) {
  var previousSentenceId = req.url.split('/text/');
  previousSentenceId = previousSentenceId[previousSentenceId.length-1]
  console.log('req', req.body);
  var sentences = req.body;

  var writeSentence = function (parent_id, index, callback) {
    if(index < sentences.length) {
      Sentence.create({text: sentences[index], parent: parent_id}, function (err, sent) {
        sentences[index] = sent;
        writeSentence(sent.id, index+1, callback)
      })
    } else {
      callback()
    }
  }

  writeSentence(previousSentenceId, 0, function () {
    res.json(sentences);
    console.log('gotcha!')
  });

}
