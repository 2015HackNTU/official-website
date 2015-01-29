// call this from the developer console and you can control both instances
var calendars = {};

$(document).ready( function() {

  // assuming you've got the appropriate language files,
  // clndr will respect whatever moment's language is set to.
  // moment.locale('ru');

  // here's some magic to make sure the dates are happening this month.
  var thisMonth = moment().format('YYYY-MM');

  var eventArray = [
    { startDate: thisMonth + '-10', endDate: thisMonth + '-14', title: 'Multi-Day Event' },
    { startDate: thisMonth + '-21', endDate: thisMonth + '-23', title: 'Another Multi-Day Event' },
    { date: thisMonth + '-27', title: 'Single Day Event' }
  ];

  // the order of the click handlers is predictable.
  // direct click action callbacks come first: click, nextMonth, previousMonth, nextYear, previousYear, or today.
  // then onMonthChange (if the month changed).
  // finally onYearChange (if the year changed).

  //get current month evt
  var events = [];
  var cur_month = new Date().getMonth() + 1;
  getCalender(cur_month, function(eventList) {
    var evt;
    for (evt in eventList) {
      var date = Date.parse(evt.datetime);
      var date_str = date.gerFullYear + '-' + (date.getMonth() + 1) + '-' + date.getDate();
       events.add({date: date_str, title: evt.name, url: '/activity/' + evt.id});
     }
  });

  calendars.clndr2 = $('.cal').clndr({
    events: eventArray,
    multiDayEvents: {
      startDate: 'startDate',
      endDate: 'endDate',
      singleDay: 'date'
    },
    startWithMonth: moment().add(0, 'month'),
    clickEvents: {
      click: function(target) {
        console.log(target);
      }
      // onMonthChange: function(month) {
      //   console.log('you just went to ' + month.format('MMMM, YYYY'));
      //   //send ajax
      //   getCalender(month, function(eventList) {
      //     var evt;
      //     var newEventList = [];
      //     for (evt in eventList) {
      //       var date = Date.parse(evt.datetime);
      //       var date_str = date.gerFullYear + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      //       newEventList.add({date: date_str, title: evt.name, url: '/activity/' + evt.id});
      //     }
      //     events = newEventList;
      //   })
      // }
    },
    events: events,
    forceSixRows: true
  });
});