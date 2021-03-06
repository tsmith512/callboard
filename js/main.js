/**
 * Callboard is a simple web app that takes an easily-editable schedule and
 * produces a list of countdowns for warnings and events for use backstage by
 * theatrical stage managers.
 *
 * More info: https://github.com/tsmith512/callboard
 * Contact: http://www.tsmithcreative.com/contact or http://twitter.com/tsmith512
 *
 * Copyright (C) 2014 Taylor Smith
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

;(function($){
  // Setup containers and templates
  var warnings = [],
      warningMessage = '<header>COUNT</header> <div class="content">MINUTES minutes to EVENT</div> <footer>Warn at TIME</footer>',
      callMessage = '<header>COUNT</header> <div class="content">EVENT</div> <footer>Call at TIME</footer>',
      scheduleMessage = '<header>TIME (COUNT)</header> <div class="content">EVENT</div>',
      eventContainer = '<article class="event-unprocessed"></article>',
      countdownContainer = '<span class="countdown"></span>',
      supportsVibrate = "vibrate" in navigator;

  if (typeof show == "string") {
    document.title = [show, "Calls"].join(' | ');
  }

  // Run through the call list to build out the necessary warning events:
  $.each(calls, function(index, call){
    call.mtime = moment(call.time, 'hh:mma');
    call.time = call.mtime.toDate();

    // If there aren't any warnings for this event, skip it.
    if (! "warnings" in call || typeof call.warnings != "object") { return; }

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
        time = warning.mtime.format('h:mma')
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

    // We output countdown components manually, let's pad those numbers to two-digits
    Number.prototype.pad =  function(){ return (this < 10) ? '0' + this : this; }

  // A function to update each countdown label and add/remove classes
  var updateEvents = function() {
    var now = false;

    $('article').each(function(){
      var count = countdown(null, $(this).data('mtime')),
          minutesRemaining = countdown(null, $(this).data('mtime'), countdown.MINUTES),
          remaining = (count.value > 0) ? [count.hours.pad(), count.minutes.pad(), count.seconds.pad()].join(":") : (minutesRemaining.minutes + ' minutes ago'),
          newClass = '';

      // Do we have a call at this exact moment?
      if (minutesRemaining.minutes == 0) { now = true; }

      // If able, vibrate the host device _once_ if this call should should be
      // announced. Because of countdown.js rounding, the call is highlighted at
      // and the vibration happens at :30 before which works well with delays backstage.
      if (supportsVibrate && minutesRemaining.minutes == 0 && typeof $(this).data('alert') == 'undefined') {
        $(this).data('alert', true);
        navigator.vibrate([500, 250, 500, 250, 500]);
      }

      // Add classes to the list item based on how long
      if (count.value.future()) {
        // Future calls:
        if      (minutesRemaining.minutes > 15)            { newClass = 'event-future';   }
        else if (minutesRemaining.minutes.between(5, 15))  { newClass = 'event-upcoming'; }
        else if (minutesRemaining.minutes.between(0, 5))   { newClass = 'event-soon';     }
        else if (minutesRemaining.minutes.between(-1, 0))  { newClass = 'event-call';     }
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


  $('nav a').click(function(){
    $('nav a').removeClass('active');
    $(this).addClass('active');
    $('body').removeClass().addClass( 'show-' + $(this).data('show') );
  });

  $(document).ready(function(){
    var refresh = window.setInterval(updateEvents, 1000);
    $('#show-calls').click();
  });
})(jQuery);
