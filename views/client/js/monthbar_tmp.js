var monthStr = ['JAN', 'FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
var lineTemplate = "<div class='month-line'>" +
  "<% for(var i = 0; i < 12; i++) { %>" +
      "<div class='month-block block-<%= i + 1%>'><%= month[i]%></div>" + 
  "<% } %>" +
  "</div>";
var currentMonth = new Date().getMonth();
var lineHtml, parent;

//init 2 line
function init() {
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
    $('.month-line').eq(0).addClass('position-18');
    $('.month-line').eq(1).addClass('position-30');
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
    if(animation)
      sleep(1000);
    for(var i = 0; i < 12; i++) {
      if (parent.find('.month-line').eq(0).hasClass('position-' + i)){
        var index = 0;
        var pos = i;
        for (var j = 0; j < 3; j++) {
          if (j == 2 && (addition != 0 && addition != 1))
            break;
          if(animation) 
            parent.find('.month-line').eq(index).addClass('transition-' + movement);
          parent.find('.month-line').eq(index).addClass('position-' + (pos + direction * movement));
          parent.find('.month-line').eq(index).removeClass('position-' + pos);
          index++;
          pos += 12;
        }
        if(animation)
          window.setInterval(function () {
              $('.month-line').eq(0).removeClass('transition-' + movement);
              $('.month-line').eq(1).removeClass('transition-' + movement);
              if (addition == 0 || addition == 1) {
                $('.month-line').eq(2).removeClass('transition-' + movement);
              }
            }, 300 * movement);
        break;
      }
    }
}

function _prepend () {
    parent.prepend(_.template(lineTemplate)({month: monthStr}));
    for(var i = 0; i < 12; i++) {
      if (parent.find('.month-line').eq(1).hasClass('position-' + (18 - i)))
        parent.find('.month-line').eq(0).addClass('position-' + (6 - i));
    }
}

function _append () {
    parent.append(_.template(lineTemplate)({month: monthStr}));    
    for(var i = 0; i < 12; i++) {
      if (parent.find('.month-line').eq(1).hasClass('position-' + (30 - i)))
        parent.find('.month-line').eq(2).addClass('position-' + (36 - i));
    }
}

function _remove (index) {
    parent.find('.month-line').eq(index).remove();
}

function _clickedfunct(evt) {   
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
      console.log(movement);
      if (movement < 0) {
        direction = GORIGHT;
        movement *= -1;
      console.log(movement);
      } else {
        direction = GOLEFT;
      }
      console.log(targetX + ', ' + targetY + ', ' + middleX + ', ' + middleY);
      console.log(movement);
      switch(direction) {
        case GORIGHT://add to left
        if (middleX == 1) {
console.log('go right');
          _move(targetElem, direction, movement, -1, true);
        } else {
          if (movement >= middleY - 6) {
console.log('go right: add 0');
            _prepend();
            _move(targetElem, direction, movement, 0, true);
            _remove(2);
          } else {
console.log('go right');
          _move(targetElem, direction, movement, -1, true);
          }
        }
        break;
        case GOLEFT:
        if (middleX == 0) {
console.log('go left');
          _move(targetElem, direction, movement, -1, true);
        } else {
          if (movement >= 5 - middleY) {
console.log('go left: add 2');
            _append();
            _move(targetElem, direction, movement, 1, true);
            _remove(0);
          } else {
console.log('go left');
            _move(targetElem, direction, movement, -1, true);
          }
        }
        break;
      }
}


$('document').ready(function () {
  init();
  $('.month-block').click(_clickedfunct);
});

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}