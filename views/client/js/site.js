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
  var events = [{date:'2015-1-19', title:'haha', url:'http://www.google.com'}, {date:'2015-1-29', title:'haha', url:'http://www.google.com'}];
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
    template: my_clndrTemplate,
    events: eventArray,
    multiDayEvents: {
      startDate: 'startDate',
      endDate: 'endDate',
      singleDay: 'date'
    },
    startWithMonth: moment().add(0, 'month'),
    // clickEvents: {
    //   click: function(target) {
    //     console.log(target);
    //   }
    //   // onMonthChange: function(month) {
    //   //   console.log('you just went to ' + month.format('MMMM, YYYY'));
    //   //   //send ajax
    //   //   getCalender(month, function(eventList) {
    //   //     var evt;
    //   //     var newEventList = [];
    //   //     for (evt in eventList) {
    //   //       var date = Date.parse(evt.datetime);
    //   //       var date_str = date.gerFullYear + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    //   //       newEventList.add({date: date_str, title: evt.name, url: '/activity/' + evt.id});
    //   //     }
    //   //     events = newEventList;
    //   //   })
    //   // }
    // },   
    clickEvents: {
      click: function(target) {
        if(target.events.length) {
          var daysContainer = $('.cal').find('.days-container');
          daysContainer.toggleClass('show-events', true);
          $('.cal').find('.x-button').click( function() {
            daysContainer.toggleClass('show-events', false);
          });
        }
      }
    },
    events: events,
    adjacentDaysChangeMonth: true,
    forceSixRows: true
  });
  // This is the default calendar template. This can be overridden.
  var my_clndrTemplate = "<div class='clndr-controls'>" +
    "<div class='clndr-control-button'><span class='clndr-previous-button'>&lsaquo;</span></div><div class='month'><%= month %> <%= year %></div><div class='clndr-control-button rightalign'><span class='clndr-next-button'>&rsaquo;</span></div>" +
    "</div>" +
    "<div class='clndr-grid'>" +
      "<div class='days-of-the-week clearfix'>" +
      "<% _.each(daysOfTheWeek, function(day) { %>" +
      "<div class='header-day'><%= day %></div>" +
      "<% }); %>" +
    "</div>" +
    "<div class='days clearfix'>" +
      "<% _.each(days, function(day) { %>" +
      "<div class='<%= day.classes %>' id='<%= day.id %>'>" +
        "<span class='day-number'><%= day.day %></span>" +
      "</div>" +
      "<% }); %>" +
      "</div>" +
    "</div>" +
    "<div class='event-listing'>" +
      "<div class='event-listing-title'>EVENTS THIS MONTH</div>" +
      "<% _.each(eventsThisMonth, function(event) { %>" +
          "<div class='event-item'>" +
            "<div class='event-item-name'><%= event.name %></div>" +
            "<div class='event-item-location'><%= event.location %></div>" +
          "</div>" +
        "<% }); %>" +
    "</div>";
});