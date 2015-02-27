var monthStr = ['JAN', 'FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
var lineTemplate = "<div class='month-line'>" +
  "<% for(var i = 0; i < 12; i++) { %>" +
      "<div class='month-block block-<%= i + 1%>'><%= month[i]%></div>" + 
  "<% } %>" +
  "</div>";

var parent;
var animating = false;
var startPos = 17; 
/*
 * line-1: 17 - 6
 * line-2: 29 - 18
 * total: 0 - 35
 */
var leftPos = [ -130.9, -123.2, -115.5, -107.8, -100.1, -92.4,-84.7, -77,
                -69.3, -61.6, -53.9,-46.2, -38.5, -30.8, -23.1, -15.4, -7.7,
                0,7.7, 15.4, 23.1, 30.8, 38.5, 46.2, 53.9, 61.6, 69.3,
                77, 84.7, 92.4, 100, 107.7, 115.4, 123.1, 130.8, 138.5
              ];

//init 2 line
function init() {
  var lineHtml;
  var currentMonth = new Date().getMonth();
  parent = $('.month-bar');
  //start with 1 2 3 4 5 6 7 8 9 10 11 12 1
  var htmlStr = lineTemplate + lineTemplate;
  if (typeof _ === 'undefined') {
      throw new Error("Underscore was not found. Please include underscore.js OR provide a custom render function.");
  } else {
    // we're just going ahead and using underscore here if no render method has been supplied.
    lineHtml = _.template(lineTemplate + lineTemplate);
  }
  parent.html(lineHtml({month: monthStr}));
  $('.month-line').eq(0).css('left', leftPos[startPos] + '%');
  $('.month-line').eq(1).css('left', leftPos[startPos + 12] + '%');
  $('.month-line').eq(0).children().eq(6).addClass('middle-block');
  //move to current month
  if (currentMonth > 6) {
    //after July
    _move($('.month-line').eq(0).children().eq(currentMonth), -1, currentMonth - 6, -1, false);
  } else if (currentMonth < 6) {
    _prepend();
    _move($('.month-line').eq(1).children().eq(currentMonth), 1, 6 - currentMonth, 0, false);
    _remove(2);
  }
}

function _move(targetElem, direction, movement, addition, animation) {//0:front, 1:end
  parent.find('.month-line .middle-block').removeClass('middle-block');
  targetElem.addClass('middle-block');
  // if(aniation) {
  if (animation) {
    animating = true;
    var from = startPos, to =  startPos + movement * direction;
    var start = null;
    var times = 0;
    var step = function (timestamp) {
      if (!start) // init 
        start = timestamp;
      var progress = timestamp - start;
      if (times == 2) {
        times = 0;
        var index = 0, posF = from, posT = to, end = false;
        for (var j = 0; j < 3; j++) {
          if (j == 2 && (addition != 0 && addition != 1)) 
            break;
          var newPercentage = leftPos[posF] + (leftPos[posT] - leftPos[posF]) * (progress / ( movement * 500));
          if (direction < 0)
            parent.find('.month-line').eq(index).css('left', Math.max(newPercentage, leftPos[posT]) + '%');
          else
            parent.find('.month-line').eq(index).css('left', Math.min(newPercentage, leftPos[posT]) + '%');

          if (newPercentage * direction > leftPos[posT] * direction)
            end = true;
          index++;
          posF += 12;
          posT += 12;
        }
        if (!end) {
          window.requestAnimationFrame(step);
        } else { // animation stop
          startPos += movement * direction;
          if (addition == 0)
            _remove(2)
          else if (addition == 1)
            _remove(0);
          animating = false;
        }
      } else {
          times++;
          window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  } else { 
    startPos += movement * direction
    var index = 0, pos = startPos;
    for (var j = 0; j < 3; j++) {
      if (j == 2 && (addition != 0 && addition != 1)) 
        break;
      parent.find('.month-line').eq(index).css('left', leftPos[pos] + '%');
      index++;
      pos += 12;
    }
  }
}

function _prepend () {
  parent.prepend(_.template(lineTemplate)({month: monthStr}));
  startPos -= 12;
  parent.find('.month-line').eq(0).css('left', leftPos[startPos] + '%');
}

function _append () {
  parent.append(_.template(lineTemplate)({month: monthStr}));
  parent.find('.month-line').eq(2).css('left', l[startPos + 24] + '%');
}

function _remove (index) {
  if (index == 0) 
    startPos += 12;
  parent.find('.month-line').eq(index).remove();
}

function _clickedfunct(evt) {
  if (animating) return;
  var targetElem, targetX, targetY, middleX, middleY;
  //find target and midle block
  for (var i = 0; i < 2; i++) {
    for (var j =0; j < 12; j++) {
      // filte middle elemen
      if ($(evt.target).hasClass('middle-block')) {
        return;
      }
      var elem = $('.month-bar').children().eq(i).children().eq(j);
      if (elem.is(evt.target)) {
        targetX = i;
        targetY = j;
        targetElem = elem;
      } else if (elem.hasClass('middle-block')) {
        middleX = i;
        middleY = j;
      }
    }
  }
  //counpute movement -> 4type
  var direction, GORIGHT = 1, GOLEFT = -1;
  var movement = (targetX * 12 + targetY) - (middleX * 12 + middleY);
  if (movement < 0) {
    direction = GORIGHT;
    movement *= -1;
  } else {
    direction = GOLEFT;
  }
  switch(direction) {
    case GORIGHT://add to left
    if (middleX == 1) {
      _move(targetElem, direction, movement, -1, true);
    } else {
      if (movement >= middleY - 6) {
        _prepend();
        _move(targetElem, direction, movement, 0, true);
      } else {
        _move(targetElem, direction, movement, -1, true);
      }
    }
    break;
    case GOLEFT:
    if (middleX == 0) {
      _move(targetElem, direction, movement, -1, true);
    } else {
      if (movement >= 5 - middleY) {
        _append();
        _move(targetElem, direction, movement, 1, true);
      } else {
        _move(targetElem, direction, movement, -1, true);
      }
    }
    break;
  }
}
//b: start
function easeOutBack(x, t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
}

function easeOutElastic(x, t, b, c, d) {
  var s=1.70158;var p=0;var a=c;
  if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
  if (a < Math.abs(c)) { a=c; var s=p/4; }
  else var s = p/(2*Math.PI) * Math.asin (c/a);
  return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
}

$('document').ready(function () {
  init();
  $('.month-bar').click(_clickedfunct);
});