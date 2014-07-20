;(function($){
  // Setup containers and templates
  var warnings = [],
      warningMessage = 'COUNT &mdash; MINUTES minutes to EVENT (warn at TIME)',
      callMessage = 'COUNT &mdash; EVENT (call at TIME)',
      scheduleMessage = 'TIME (COUNT) &mdash; EVENT',
      eventContainer = '<li class="event-unprocessed"></li>',
      countdownContainer = '<span class="countdown"></span>';

  // Run through the call list to build out the necessary warning events:
  $.each(calls, function(index, call){
    call.mtime = moment(call.time, 'hh:mma');
    call.time = call.mtime.toDate();

    // For each warning in this call ("X minutes until EVENT"), make a new warning event
    $.each(call.warnings, function(index, minutes){
      warnings.push({
        mtime: moment(call.mtime).subtract('minutes', minutes),
        time: moment(call.mtime).subtract('minutes', minutes).toDate(),
        minute: minutes,
        event: call.event,
      });
    })
  });

  // Sort both the calls and warnings arrays by time
  calls.sort(function(a,b) { return (a.time) - (b.time) } );
  warnings.sort(function(a,b) { return (a.time) - (b.time) } );

  // For each warning event, build out the message and put it in the call list
  $.each(warnings, function(index, warning){
    var count = countdown(null, warning.mtime.toDate()),
        time = warning.mtime.format('hh:mma')
        content = (warning.minute > 0) ?
          warningMessage.replace('COUNT', countdownContainer).replace('MINUTES', warning.minute).replace('EVENT', warning.event).replace('TIME', time) :
          callMessage.replace('COUNT', countdownContainer).replace('EVENT', warning.event).replace('TIME', time);

    $(eventContainer)
      .data('mtime', warning.mtime.toDate())
      .data('type', 'warning')
      .html(content)
      .appendTo('#calls');
  });

  // For each call event, build out the message and add it to the schedule list
  $.each(calls, function(index, call){
    var count = countdown(null, call.mtime.toDate());
    $(eventContainer)
      .data('mtime', call.mtime.toDate())
      .data('type', 'call')
      .html(scheduleMessage.replace('TIME', call.mtime.format('hh:mma')).replace('COUNT', countdownContainer).replace('EVENT', call.event))
      .appendTo('#schedule');
  });

  // Add to the Number prototype a few functions to make testing more legible:
    // A function to see if one number is between two others
    Number.prototype.between = function(low,high){ return (this > low && this <= high); }

    // A function to see if a time is in the future (is it positive?)
    Number.prototype.future =  function(){ return (this > 0); }

  // A function to update each countdown label and add/remove classes
  var updateEvents = function() {
    var now = false;

    $('li').each(function(){
      var count = countdown(null, $(this).data('mtime')),
          minutesRemaining = countdown(null, $(this).data('mtime'), countdown.MINUTES),
          remaining = (count.value > 0) ? [count.hours, count.minutes, count.seconds].join(":") : (minutesRemaining.minutes + ' minutes ago'),
          newClass = '';

      // Do we have a call at this exact moment?
      if (minutesRemaining.minutes == 0) { now = true; }

      // Add classes to the list item based on how long
      if (count.value.future()) {
        // Future calls:
        if      (minutesRemaining.minutes > 15)            { newClass = 'event-future';   }
        else if (minutesRemaining.minutes.between(5, 15))  { newClass = 'event-upcoming'; }
        else if (minutesRemaining.minutes.between(2, 5))   { newClass = 'event-soon';     }
        else if (minutesRemaining.minutes.between(-1, 2))  { newClass = 'event-call';     }
      } else {
        // Now / Past calls:
        if      (minutesRemaining.minutes.between(-1, 1))  { newClass = 'event-call';     }
        else if (minutesRemaining.minutes.between(1, 5))   { newClass = 'event-recent';   }
        else if (minutesRemaining.minutes > 5)             { newClass = 'event-past';     }
      }

      $(this).removeClass().addClass(newClass);

      // Warnings can be removed from the DOM after they're expired
      if ( $(this).data('type') == 'warning' && newClass == 'event-past' ) { $(this).remove(); }

      // Update the readout of the countdown:
      $('.countdown', this).text(remaining);
    });

    // For thirty seconds before/after an exact call time, add a body class.
    if (now) { $('body').addClass('call-now');    }
    else     { $('body').removeClass('call-now'); }
  }

  var refresh = window.setInterval(updateEvents, 1000);
})(jQuery);
