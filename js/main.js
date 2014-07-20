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
    $('<li/>').attr('id', 'warning-' + index).data('mtime', warning.mtime.toDate()).html([warning.mtime.format('hh:mma'), '-', warning.minute, 'minutes to', calls[warning.forEvent].event, '<span class="countdown"></span>'].join(' ')).appendTo('ul#A');
  });

  $.each(calls, function(index, call){
    var count = countdown(null, call.mtime.toDate());
    $('<li/>').attr('id', 'call-' + index).data('mtime', call.mtime.toDate()).html([call.event, '<span class="countdown"></span>'].join(' ')).appendTo('ul#B');
  });

  var updateCalls = function() {
    $('li').each(function(){
      var count = countdown(null, $(this).data('mtime'));
      var remaining = [count.hours, count.minutes, count.seconds].join(":")
      $('.countdown', this).text(remaining);
    });
  }

  var refresh = window.setInterval(updateCalls, 500);
})(jQuery);
