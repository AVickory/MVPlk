var mongoose = require('mongoose');
var Sentence = require('./sentenceModel.js');


var getPage = function (parent, page, next) {
  var children = parent.children
  if(page.len <= 100 && children.length) {
    var childId = children[Math.floor(children.length*Math.random())];
    Sentence.findById(childId, function (err, child) {
      page.push(child);
      page.len += child.text.length;
      getPage(child, page, next);
    })
  } else {
    next(page);
  }
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
      getPage(sent, page, function () {
        res.json(page);
      })
    });
  } else {
    Sentence.findById(previousSentenceId, function (err, sent) {
      getPage(sent, page, function () {
        res.json(page);
      });
    });
  }
}

module.exports.addBranch = function (req, res) {
  var previousSentenceId = req.url.split('/text/');
  previousSentenceId = previousSentenceId[previousSentenceId.length-1]
  var sentences = req.body;

  var writeSentence = function (parent, index, callback) {
    if(index < sentences.length) {
      Sentence.create({text: sentences[index], parent: parent.id}, function (err, sent) {
        sentences[index] = sent;
        parent.children.push(sent.id);
        parent.save();
        writeSentence(sent, index+1, callback)
      })
    } else {
      callback()
    }
  }
  if(!previousSentenceId) {
    Sentence.create({text: sentences[0], parent: null}, function (err, parent) {
      writeSentence(parent, 1, function () {
        res.json(sentences);
        // console.log('gotcha!');
      });
    });
  } else {
    Sentence.findById(previousSentenceId, function (err, parent) {
      writeSentence(parent, 0, function () {
        res.json(sentences);
        // console.log('gotcha!');
      });
    });
  }

}
