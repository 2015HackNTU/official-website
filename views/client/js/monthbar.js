function monthBar(elem) {
  var monthStr = ['JAN', 'FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  var lineTemplate = "<div class='month-line'>" +
    "<% for(var i = 0; i < 12; i++) { %>" +
        "<div class='month-block block-<%= i + 1%>'><%= month[i]%></div>" + 
    "<% } %>" +
    "</div>";
  this.currentMonth = new Date().getMonth();
  this.parent = elem;
  this.lineHtml;

  //init 2 line
  this.init = function () {
    //start with 1 2 3 4 5 6 7 8 9 10 11 12 1
    var htmlStr = lineTemplate + lineTemplate;
    if (typeof _ === 'undefined') {
        throw new Error("Underscore was not found. Please include underscore.js OR provide a custom render function.");
    } else {
      // we're just going ahead and using underscore here if no render method has been supplied.
      this.lineHtml = _.template(lineTemplate + lineTemplate);
    }
    this.parent.html(this.lineHtml({month: monthStr}));
    $('.month-line').eq(0).addClass('position-18');
    $('.month-line').eq(1).addClass('position-30');
    $('.month-line').eq(0).children().eq(6).addClass('middle-block');
    //move to current month
    if (this.currentMonth > 6) {
      //after July
      this._move($('.month-line').eq(0).children().eq(this.currentMonth), -1, this.currentMonth - 6, -1, false);
    } else if (this.currentMonth < 6) {
      this._prepend();
      this._move($('.month-line').eq(1).children().eq(this.currentMonth), 1, 6 - this.currentMonth, 0, true);
      this._remove(2);
    }
  }

  this._move = function (targetElem, direction, movement, addition, animation) {//0:front, 1:end
    this.parent.find('.month-line .middle-block').removeClass('middle-block');
    targetElem.addClass('middle-block');
    for(var i = 0; i < 12; i++) {
      if (this.parent.find('.month-line').eq(0).hasClass('position-' + i)){
        var index = 0;
        var pos = i;
        for (var j = 0; j < 3; j++) {
          if (j == 2 && (addition != 0 && addition != 1))
            break;
          if(animation) 
            this.parent.find('.month-line').eq(index).addClass('transition-' + movement);
          this.parent.find('.month-line').eq(index).addClass('position-' + (pos + direction * movement));
          this.parent.find('.month-line').eq(index).removeClass('position-' + pos);
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
            }, 5000 * movement);
        break;
      }
    }
  }

  this._prepend = function () {
    this.parent.prepend(_.template(lineTemplate)({month: monthStr}));
    for(var i = 0; i < 12; i++) {
      if (this.parent.find('.month-line').eq(1).hasClass('position-' + (18 - i)))
        this.parent.find('.month-line').eq(0).addClass('position-' + (6 - i));
    }
  }

  this._append = function () {
    this.parent.append(_.template(lineTemplate)({month: monthStr}));    
    for(var i = 0; i < 12; i++) {
      if (this.parent.find('.month-line').eq(1).hasClass('position-' + (30 - i)))
        this.parent.find('.month-line').eq(2).addClass('position-' + (36 - i));
    }
  }

  this._remove = function (index) {
    this.parent.find('.month-line').eq(index).remove();
  }

  this._clickedfunct = function (evt) {   
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
          this._move(targetElem, direction, movement, -1, true);
        } else {
          this._prepend();
          this._move(targetElem, direction, movement, 0, true);
          this._remove(0);
        }
        break;
        case GOLEFT:
        if (middleX == 0) {
          this._move(targetElem, direction, movement, -1, true);
        } else {
          this._append();
          this._move(targetElem, direction, movement, 1, true);
          this._remove(2);
        }
        break;
      }
  }

  this.init();
}


$('document').ready(function () {
  var monthbar = new monthBar($('.month-bar'));
  $('.month-block').click(monthbar._clickedfunct);
});