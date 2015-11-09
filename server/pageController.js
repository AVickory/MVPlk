var Sentence = require(.SentenceModel);

var getPage = function (parentId, page, next) {
  return Sentence.find({'parent': parentId})
    .then(function (children) {
      if(pageLen <= 2400) {
        var child = children[Math.floor(children.length*Math.random())];
        page.push(child);
        page.len += child.text.length;
        getPage(child._id, page, next);
      } else {
        next(page);
      }
    });
};

module.exports.sendPage = function (req, res) {
  var previousSentenceId = req.body;
  var page = [];
  var page.len = 0;
  getPage(previousSentenceId, page, function () {
    res.json(page);
  });
}

module.exports.addBranch = function (req, res) {
  var previousSentenceId = req.body.id;
  var sentences = req.body.text.split('.');
  var parent = previousSentenceId;
  for(var i = 0; i < sentences.length; ++i) {
    if(sentences[i]) {
      sentences[i] += '.';
      child = Sentence.build({text: sentence[i], parentId: parentId});
      child.save();
      parent = child._id;
    }
  }
  res.send(201);

}
