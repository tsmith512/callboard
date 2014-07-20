;(function($){
  // Setup containers and templates
  var warnings = [],
      warningMessage = 'COUNT &mdash; MINUTES PREPOSITION EVENT (warn at TIME)',
      callMessage = 'TIME (COUNT) &mdash; EVENT',
      eventContainer = '<li class="event-unprocessed"></li>',
      countdownContainer = '<span class="countdown"></span>';

  $.each(calls, function(index, call){
    call.mtime = moment(call.time, 'hh:mma');
    call.time = call.mtime.toDate();

    $.each(call.warnings, function(index, minutes){
      warnings.push({
        mtime: moment(call.mtime).subtract('minutes', minutes),
        time: moment(call.mtime).subtract('minutes', minutes).toDate(),
        minute: minutes,
        event: call.event,
      });
    })
  });

  calls.sort(function(a,b) { return (a.time) - (b.time) } );
  warnings.sort(function(a,b) { return (a.time) - (b.time) } );

  $.each(warnings, function(index, warning){
    var count = countdown(null, warning.mtime.toDate());
    var content = (warning.minute > 0) ?
          warningMessage.replace('COUNT', countdownContainer).replace('MINUTES', warning.minute).replace('PREPOSITION', 'minutes to').replace('EVENT', warning.event).replace('TIME', warning.mtime.format('hh:mma')) :
          warningMessage.replace('COUNT', countdownContainer).replace('MINUTES', '').replace('PREPOSITION', 'Go').replace('EVENT', warning.event).replace('TIME', warning.mtime.format('hh:mma'));

    $(eventContainer)
      .attr('id', 'warning-' + index)
      .data('mtime', warning.mtime.toDate())
      .data('type', 'warning')
      .html(content)
      .appendTo('ul#A');
  });

  $.each(calls, function(index, call){
    var count = countdown(null, call.mtime.toDate());
    $(eventContainer)
      .attr('id', 'call-' + index)
      .data('mtime', call.mtime.toDate())
      .data('type', 'call')
      .html(callMessage.replace('TIME', call.mtime.format('hh:mma')).replace('COUNT', countdownContainer).replace('EVENT', call.event))
      .appendTo('ul#B');
  });

  var updateEvents = function() {
    $('li').each(function(){
      var count = countdown(null, $(this).data('mtime')),
          minutesRemaining = countdown(null, $(this).data('mtime'), countdown.MINUTES),
          remaining = (count.value > 0) ? [count.hours, count.minutes, count.seconds].join(":") : (minutesRemaining.minutes + ' minutes ago');

      // Add classes to the list item based on how long
      if (count.value > 0 && minutesRemaining.minutes > 15) { $(this).removeClass().addClass('event-future'); }
      if (count.value > 0 && minutesRemaining.minutes > 5 && minutesRemaining.minutes <= 15) { $(this).removeClass().addClass('event-upcoming'); }
      if (count.value > 0 && minutesRemaining.minutes > 2 && minutesRemaining.minutes <= 5) { $(this).removeClass().addClass('event-soon'); }
      if (count.value > 0 && minutesRemaining.minutes <= 2) { $(this).removeClass().addClass('event-call'); }
      else if (count.value < 0 && minutesRemaining.minutes <= 5) { $(this).removeClass().addClass('event-recent'); }
      else if (count.value < 0 && minutesRemaining.minutes > 5) {
        $(this).removeClass().addClass('event-past');
        if ( $(this).data('type') == 'warning' ) { $(this).remove(); }
      }

      // Update the readout of the countdown:
      $('.countdown', this).text(remaining);
    });
  }

  var refresh = window.setInterval(updateEvents, 500);
})(jQuery);
