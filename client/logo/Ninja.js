//width and height should be from center points, portions of the circles will be outside


var makeLogo = function (xPos, yPos, height, margin) {
  var width = height;
  var gr = 1.61803398875
  var biggestSize = (height-margin*2)/Math.pow(gr, 3);

  var $logo = $('<div class="logo"></div>');
  $logo.css({'top': yPos, 
             'left': xPos, 
             'width': width, 
             'height': height
           });
  var getCenterPoints = function (dim) {
    var h = dim;
    var h1 = h/gr;
    var h2 = h1/gr;
    var h3 = h2/gr;
    var h4 = h3/gr;
    var h5 = h4/gr;
    var h6 = h5/gr;
    var h7 = h6/gr;
    var h8 = h7/gr;
    var sq2 = Math.sqrt(2);

    var lTop = [{}, {}, {}];
    lTop[0].size = biggestSize/Math.pow(gr, 1);
    lTop[1].size = lTop[0].size/Math.pow(gr, -1);
    lTop[2].size = lTop[0].size/Math.pow(gr, -2);
    lTop[0].x = 0;
    lTop[0].y = h;
    lTop[1].x = 0;
    lTop[1].y = h1;
    lTop[2].x = 0;
    lTop[2].y = 0;

    var lBot = [{}, {}, {}]
    lBot[0].size = lTop[0].size/Math.pow(gr, 0);
    lBot[1].size = lBot[0].size/Math.pow(gr, 1);
    lBot[2].size = lBot[0].size/Math.pow(gr, 2);
    lBot[0].x = 0;
    lBot[0].y = h;
    lBot[1].x = h2;
    lBot[1].y = h;
    lBot[2].x = h1;
    lBot[2].y = h;

    var kTop = [{}, {}, {}];
    kTop[0].size = biggestSize/Math.pow(gr, 0);
    kTop[1].size = kTop[0].size/Math.pow(gr, 1);
    kTop[2].size = kTop[0].size/Math.pow(gr, 2);
    kTop[2].x = h2;
    kTop[2].y = h1;
    kTop[0].x = h; //h
    kTop[0].y = 0; //0
    kTop[1].x = kTop[2].x + (kTop[0].x - kTop[2].x)/gr/gr;
    kTop[1].y = kTop[2].y + (kTop[0].y - kTop[2].y)/gr/gr;

    var kBot = [{}, {}, {}];
    kBot[2].size = kTop[1].size/Math.pow(gr, 0);
    kBot[1].size = kBot[2].size/Math.pow(gr, 1);
    kBot[0].size = kBot[2].size/Math.pow(gr, 2);
    kBot[2].x = kTop[1].x; //h2 + h3 (h2)
    kBot[2].y = kTop[1].y; //h2 - h4 (h3)
    kBot[0].x = h; //h
    kBot[0].y = h; //h
    kBot[1].x = kBot[2].x + (kBot[0].x - kBot[2].x)/gr;
    kBot[1].y = kBot[2].y + (kBot[0].y - kBot[2].y)/gr;

    return {l : {top: lTop, bot: lBot}, k: {top: kTop, bot: kBot}};
  }

  var lk = getCenterPoints(height - biggestSize - margin*2);

  for(var letter in lk) {
    var ch = lk[letter]
    for(var side in ch) {
      var s = ch[side]
      for(var i = 0; i < s.length; i++) {
        var attributes = s[i]
        var circle = $('<div></div>');
        var x = Math.floor(attributes.x - attributes.size/2 + biggestSize/2);
        //console.log(xPos, margin, attributes.x, attributes.size/2, biggestSize/2)
        var y = Math.floor(attributes.y - attributes.size/2 + biggestSize/2);
        circle.addClass('circle').addClass(letter).addClass(side);
        circle.css({'top' : y, 'left' : x});
        circle.css({'height': attributes.size, 'width': attributes.size});
        //circle.css({'borderWidth': attributes.size/gr/gr/2, 'border-style': 'solid'});
        $logo.append(circle);
      }
    }
  }

  return $logo;


  /*
  */
}

  
var logo = $('.logo-container').first()
logo.prepend(makeLogo(0, 0, 100, 0));
logo.next().prepend(makeLogo(0, 150, 100, 0));





