var warnings = [];

;(function($){

  $.each(calls, function(index, call){
    call.mtime = moment(call.time, 'hh:mma');
    call.time = call.mtime.toDate();

    $.each(call.warnings, function(warningindex, minutes){
      warnings.push({
        mtime: moment(call.mtime).subtract('minutes', minutes),
        time: moment(call.mtime).subtract('minutes', minutes).toDate(),
        minute: minutes,
        forEvent: index,
      });
    })
  });

  calls.sort(function(a,b) { return (a.time) - (b.time) } );
  warnings.sort(function(a,b) { return (a.time) - (b.time) } );

  $.each(warnings, function(index, warning){
    var count = countdown(null, warning.mtime.toDate());
    var remaining = '(' + [count.hours, count.minutes, count.seconds].join(":") + ')';
    $('<li/>').attr('id', 'warning-' + index).text([warning.mtime.format('hh:mma'), '-', warning.minute, 'minutes to', calls[warning.forEvent].event, remaining].join(' ')).appendTo('ul#A');
  });

  $.each(calls, function(index, call){
    var count = countdown(null, call.mtime.toDate());
    var remaining = [count.hours, count.minutes, count.seconds].join(":")
    $('<li/>').attr('id', 'call-' + index).text([call.event, remaining].join(' ')).appendTo('ul#B');
  });

  var updateCalls = function() {
    $.each(calls, function(index, call){
      var count = countdown(null, call.mtime.toDate());
      var remaining = [count.hours, count.minutes, count.seconds].join(":")
      $('li#call-' + index).text([call.event, remaining].join(' '));
    });
    $.each(warnings, function(index, warning){
      var count = countdown(null, warning.mtime.toDate());
      var remaining = '(' + [count.hours, count.minutes, count.seconds].join(":") + ')';
      $('li#warning-' + index).text([warning.mtime.format('hh:mma'), '-', warning.minute, 'minutes to', calls[warning.forEvent].event, remaining].join(' '));
    });
  }

  var refresh = window.setInterval(updateCalls, 500);
})(jQuery);
