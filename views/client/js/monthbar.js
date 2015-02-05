function monthBar(elem) {
  var monthStr = ['JAN', 'FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  var lineTemplate = "<div class='month-line'>" +
    "<% for(var i = 0; i < 12; i++) { %>" +
        "<div class='month-block block-<%= i + 1%>'><%= month[i]%></div>" + 
    "<% } %>" +
    "</div>";
  this.today = new Date();
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
    $('.month-line').eq(0).addClass('position-first-1');
    $('.month-line').eq(1).addClass('position-second-1');
    $('.month-line').eq(0).children().eq(6).addClass('middle-block');
    //move to current month()
    var targetElem;
    var targetX;
    var targetY;
    var middleX;
    var middleY;
    $('.month-block').click(function (evt) {
      //find target and midle block
      for (var i = 0; i < 2; i++) {
        for (var j =0; j < 12; j++) {
          // filte middle element
          if ($(evt.target).hasClass('middle-block')) {
            console.log('middle');
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
      var direction, GORIGHT = -1, GOLEFT = 1;
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
          this._move(targetElem, direction, movement, -1);
        } else {
          _prepend();
          this._move(targetElem, direction, movement, 0);
          _remove(0);
        }
        break;
        case GOLEFT:
        if (middleX == 0) {
          this._move(targetElem, direction, movement, -1);
        } else {
          _append();
          this._move(targetElem, direction, movement, 1);
          _remove(2);
        }
        break;
      }
    });
  }

  this._move = function (targetElem, direction, movement, addition) {//0:front, 1:end
    this.parent.find('.month-line .middle-block').removeClass('middle-block');
    targetElem.addClass('middle-block');    
    for(var i = 1; i <= 12; i++) {
      if (this.parent.find('.month-line').eq(0).hasClass('position-first-' + i)
        || this.parent.find('.month-line').eq(0).hasClass('position-begin-' + i)) {
        var index = 0
        if (addition == 0) {
          this.parent.find('.month-line').eq(index).addClass('position-begin-' + (i + direction * movement));
          this.parent.find('.month-line').eq(index).addClass('transition-' + movement);
          this.parent.find('.month-line').eq(index).removeClass('position-begin-' + i);
          index++;
        }

        this.parent.find('.month-line').eq(index).addClass('position-first-' + (i + direction * movement));
        this.parent.find('.month-line').eq(index).addClass('transition-' + movement);
        this.parent.find('.month-line').eq(index).removeClass('position-first-' + i);
        index++

        this.parent.find('.month-line').eq(index).addClass('position-second-' + (i + direction * movement));
        this.parent.find('.month-line').eq(index).addClass('transition-' + movement);
        this.parent.find('.month-line').eq(index).removeClass('position-second-' + i);
        index++

        if (addition == 1) {
          this.parent.find('.month-line').eq(index).addClass('position-after-' + (i + direction * movement));
          this.parent.find('.month-line').eq(index).addClass('transition-' + movement);
          this.parent.find('.month-line').eq(index).removeClass('position-after-' + i);
        }
        window.setInterval(function () {
            this.parent.find('.month-line').eq(0).removeClass('transition-' + movement);
            this.parent.find('.month-line').eq(1).removeClass('transition-' + movement);
            if (addition == 0 || addition == 1) 
              this.parent.find('.month-line').eq(2).removeClass('transition-' + movement);
          } , 500 * movement);
        return;
      }
    }
  }

  this._prepend = function () {
    this.parent.prepend(_.template(lineTemplate)({month: monthStr}));
    for(var i = 1; i <= 12; i++) {
      if (this.parent.find('.month-line').eq(1).hasClass('position-first-' + i))
        this.parent.find('.month-line').eq(0).addClass('position-begin-' + i);
    }
  }

  this._append = function () {
    this.parent.append(_.template(lineTemplate)({month: monthStr}));    
    for(var i = 1; i <= 12; i++) {
      if (this.parent.find('.month-line').eq(0).hasClass('position-first-' + i))
        this.parent.find('.month-line').eq(2).addClass('position-after-' + i);
    }
  }

  this._remove = function (index) {
    this.parent.find('.month-line').eq(index).remove();
  }

  this.init();
}


$('document').ready(function () {
  monthbar = new monthBar($('.month-bar'));
});