//width and height should be from center points, portions of the circles will be outside

var makeLogo = function (height, margin, target, font) {

  var width = height;
  var gr = 1.61803398875
  var sizeFactor = 1/Math.pow(gr, 3);
  var biggestSize = (height - margin*2)*sizeFactor/(1-sizeFactor);
  var h = height - biggestSize - 2*margin;

  var $container = $('<div class="logo-container"></div>')
  var $logo = $('<svg class="logo"></svg>')
  // $logo.css({'height': 'auto', 'width': 'auto'});
  $container.append($logo);
  target.append($container)
  var getCenterPoints = function () {
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
    lTop[0].size = biggestSize/Math.pow(gr, 2);
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
    kTop[0].size = biggestSize/Math.pow(gr, 1);
    kTop[1].size = kTop[0].size/Math.pow(gr, 1);
    kTop[2].size = kTop[0].size/Math.pow(gr, 2);
    kTop[2].x = h2;
    kTop[2].y = h2;
    kTop[0].x = h; //h
    kTop[0].y = 0; //0
    kTop[1].x = kTop[2].x + (kTop[0].x - kTop[2].x)/gr/gr;
    kTop[1].y = kTop[2].y + (kTop[0].y - kTop[2].y)/gr/gr;

    var kBot = [{}, {}, {}];
    kBot[2].size = kTop[1].size/Math.pow(gr, 0);
    kBot[1].size = kBot[2].size/Math.pow(gr, -1);
    kBot[0].size = kBot[2].size/Math.pow(gr, -2);
    kBot[2].x = kTop[1].x; //h2 + h3 (h2)
    kBot[2].y = kTop[1].y; //h2 - h4 (h3)
    kBot[0].x = h; //h
    kBot[0].y = h; //h
    kBot[1].x = kBot[2].x + (kBot[0].x - kBot[2].x)/gr/gr;
    kBot[1].y = kBot[2].y + (kBot[0].y - kBot[2].y)/gr/gr;
    return {'l' : lTop.concat(lBot), 'k' : kTop.concat(kBot)};
  }

  var lk = getCenterPoints(height);

  var l = lk['l'];
  var k = lk['k'];

  for(var letter in lk) {
    var ch = lk[letter]
    for(var i = 0; i < ch.length; i++) {
      lk[letter][i]['letter'] = letter;
    }
  }

  lk = l.concat(k)

  d3.select('.logo')
    .attr('viewBox', '0 0 '+ height +' '+ height)
    .attr('preserveAspectRatio', 'xMidYMid meet')

  var filter = d3.select('.logo').append('filter')
                                      .attr('id', 'drop-shadow')
                                      .attr('height', '300%')
                                      .attr('width', '300%')
  filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 2)
        .attr("result", "blur");

  filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 2)
        .attr("dy", 2)
        .attr("result", "offsetBlur");      

  var feMerge = filter.append("feMerge");

  feMerge.append("feMergeNode")
      .attr("in", "offsetBlur")
  feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");

  d3.select('.logo').selectAll('circle').data(k).enter()
    .append('circle')
  d3.selectAll('circle').data(k).attr('cx', function (d) {return margin + d.x + biggestSize/2})
                      .attr('cy', function (d) {return margin + d.y + biggestSize/2})
                      .attr('r', function (d) {return d.size/2})
                      .attr('class', function (d) {
                        if(d.letter === 'l') {
                          return 'circle l'
                        } else if (d.letter === 'k') {
                          return 'circle k';
                        }
                      })
                      .style("filter", "url(#drop-shadow)");

  d3.select('.logo').selectAll('rect').data(l).enter()
    .append('rect')

  d3.selectAll('.logo rect').data(l).attr('x', function (d) {return margin + d.x + biggestSize/2 - d.size/2})
                      .attr('y', function (d) {return margin + d.y + biggestSize/2  - d.size/2})
                      .attr('width', function (d) {return d.size})
                      .attr('height', function (d) {return d.size})
                      .attr('class', function (d) {
                        if(d.letter === 'l') {
                          return 'circle l'
                        } else if (d.letter === 'k') {
                          return 'circle k';
                        }
                      })
                      .attr("stroke-width", 2)
                      .style("filter", "url(#drop-shadow)")
  d3.selectAll('.logo svg').transition().duration(400).attr('y', 300)
                            .transition().duration(400).attr('y', margin + 0 + biggestSize/2)
  
  return $container;

}

var h = 200;
makeLogo(h, h/30, $('body'), 'f1');




