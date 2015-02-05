function monthBar(elem) {
  var monthStr = ['JAN', 'FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  var lineTemplate = "<div class='month-line'>" +
    "<% for(var i = 0; i < 12; i++) { %>" +
      "<% if(i == 6) %>" +
        "<div class='month-block block-<%= i + 1%> middle-block'><%= month[i]%></div>" + 
      "<% else %>" +
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
    //move to current month()
    this.parent.click(function (evtOb) {
      console.log(evtOb);
    });
  }

  this.move = function (month) {

    middle_month = month;
  }

  this._insert = function () {
  
  }()

  this._append = function () {

  }

  this._move = function (month) {

  }

  this.init();
};

$('document').ready(function () {
  monthbar = new monthBar($('.month-bar'));
});

// </script>
//     <script type="text/javascript">
//       var GO_LEFT = -1, GO_RIGHT = 1;
//       var middle_month;
//       var month_array = ;
//       function createfunction(){
//         var today = new Date();
//         var month = today.getMonth() + 1 - 6;
//         var calender_parent = document.getElementsByClassName("monthbar");
//         middle_month = month;
//         for (var i = 0 ; i < 12; i++)
//         {
//           var elem = document.createElement("div");
//           elem.className = "position-" + i ;
//           elem.innerHTML = month_array[month - 1];
//           elem.onClick = swiftfunction;
//           calender_parent.appendChild(elem)
//           monthadd(month, 1);
//         }
//       }
//       function swiftfunction() {
//         var month = parseInt(getMonth(event.target.innerHTML));
//         var move = month - middle_month; // > 0 left, < 0 right
//         var direction = move > 0? GO_LEFT: GO_RIGHT;// -1 : left
//         if (move == 0)
//                 return;
//         if (move < 0)
//           move *= -1;
//         else
//           move = 1;
//         //add buffer
//         for (var i = 0; i < move; i++) {
//           var position, add_month;
//           if (direction == GO_RIGHT) {//go right-> add at 
//             position = -1 - i;
//             add_month = monthmines(middle_month, 7+ i);
//           } else {//go left -> add at right
//             position = 12 + i;
//             add_month = monthadd(middle_month, 6+ i);
//           }
//           var elem = document.createElement("div");
//           elem.className = "position-" + i ;
//           elem.innerHTML = month_array[month - 1];
//           elem.onClick = swiftfunction;
//           if (direction == GO_RIGHT) {
//             calender_parent.insertBefore(elem, calender_parent.childNodes[0]);
//           } else {
//             calender_parent.insertChild(elem)
//           }
//         }
//         //move
//         var children = calender_parent.childNodes;
//         for (var i = 0; i < 12 + move; i++) {
//           var new_position = direction == GO_RIGHT? i, i - move;
//           children[i].className = "position-" + new_position + " swift-animation" + move;
//           window.setInterval(function () {children[i].className = "position-" + new_position;}, move * 1000);
//         }
//         //removebuffer
//         for (var i = 0; i < move; i++) {
//           if (direction == GO_RIGHT) {
//             calender_parent.removeChild(calender_parent.childNodes[0]);
//           } else {
//             calender_parent.removeChild(calender_parent.childNodes[12]);
//           }
//         }
//         //adjust middle month
//         middle_month = month;
//       }
//       function getMonth(monthString) {
//         for (i = 0; i < 12; i++) {
//           if (month_array[i] == monthString)
//             return i + 1;
//         }
//         return null;
//       }
//       function monthadd(cur_month, adder) {
//         return (cur_month + adder) % 12;
//       }
//       function monthmines(cur_month, minus) {
//         cur_month = cur_month - minus; 
//         while (cur_month <= 0) {
//           cur_month + 12;
//         }
//         return cur_month;
//       }
//     </script>
