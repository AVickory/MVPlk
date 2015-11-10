var mongoose = require('mongoose');
var Sentence = require('./sentenceModel.js');


var getPage = function (parentId, page, next) {
  return Sentence.find({'parent': parentId})
    .exec(function (err, children) {
      if(page.len <= 1500 && children.length) {
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
