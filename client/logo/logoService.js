angular.module('lexikana.services', [])
  .factory('Logo', function () {
    var drawLogo = function (font, height) {
      var margin = height/30 //will have to make new logo if you want to change this
      var width = height;
      var gr = 1.61803398875
      var sizeFactor = 1/Math.pow(gr, 3);
      var biggestSize = (height - margin*2)*sizeFactor/(1-sizeFactor);
      var h = height - biggestSize - 2*margin;

      var $container = $('<div class="logo-container"></div>')
      $container.css({'height': height})
      var $logo = $('<svg class="logo" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet"><filter id="drop-shadow" height="300%" width="300%"><feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"></feGaussianBlur><feOffset in="blur" dx="2" dy="2" result="offsetBlur"></feOffset><feMerge><feMergeNode in="offsetBlur"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter><circle cx="164.4917471916789" cy="35.508252808321075" r="17.825080524999205" class="circle k" style="filter: url(#drop-shadow);"></circle><circle cx="115.22443632495948" cy="65.95712545825434" r="11.016505616652612" class="circle k" style="filter: url(#drop-shadow);"></circle><circle cx="84.77556367502622" cy="84.77556367502622" r="6.808574908344991" class="circle k" style="filter: url(#drop-shadow);"></circle><circle cx="164.4917471916789" cy="164.4917471916789" r="28.841586141654407" class="circle k" style="filter: url(#drop-shadow);"></circle><circle cx="134.04287454173684" cy="103.59400189180356" r="17.825080524999205" class="circle k" style="filter: url(#drop-shadow);"></circle><circle cx="115.22443632495948" cy="65.95712545825434" r="11.016505616652612" class="circle k" style="filter: url(#drop-shadow);"></circle><rect x="24.491747191668463" y="153.4752415750263" width="22.033011233305224" height="22.033011233305224" class="circle l" stroke-width="2" style="filter: url(#drop-shadow);"></rect><rect x="17.68317228332187" y="97.399355799963" width="35.65016104999841" height="35.65016104999841" class="circle l" stroke-width="2" style="filter: url(#drop-shadow);"></rect><rect x="6.666666666666668" y="6.666666666666668" width="57.683172283308814" height="57.683172283308814" class="circle l" stroke-width="2" style="filter: url(#drop-shadow);"></rect><rect x="24.491747191668463" y="153.4752415750263" width="22.033011233305224" height="22.033011233305224" class="circle l" stroke-width="2" style="filter: url(#drop-shadow);"></rect><rect x="77.96698876668123" y="157.68317228333393" width="13.617149816689983" height="13.617149816689983" class="circle l" stroke-width="2" style="filter: url(#drop-shadow);"></rect><rect x="111.01650561665558" y="160.28381648337228" width="8.415861416613263" height="8.415861416613263" class="circle l" stroke-width="2" style="filter: url(#drop-shadow);"></rect></svg>');
      $logo.css({'height': height, 'width': height});
      
      var $text = $('<span class="title '+font+'"> \
                      <span class="L">L</span><span>exi</span><span class = "K">K</span><span>ana</span> \
                    </span>');
      $text.css({'font-size': height - margin, 'height': height, 
                  'margin-left': biggestSize/2});
      $container.append($logo);
      $container.append($text);
      return $container;

    }
    return Logo.drawLogo.bind(null, 'f1');
  })


