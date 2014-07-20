;(function($){
  $.each(calls, function(index, call){
    call.mtime = moment(call.time, 'hh:mma');
    call.count = countdown(new Date(), call.mtime.toDate());
    var remaining = [call.count.hours, call.count.minutes, call.count.seconds].join(":")
    $('<li/>').attr('id', 'call-' + index).text([call.event, remaining].join(' ')).appendTo('ul');
  });

  var updateCalls = function() {
    $.each(calls, function(index, call){
      var remaining = [call.count.hours, call.count.minutes, call.count.seconds].join(":")
      $('li#call-' + index).text([call.event, remaining].join(' '));
    });
  }

  var refresh = window.setInterval(updateCalls, 500);
})(jQuery);
