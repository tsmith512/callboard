// If you have just downloaded this project to use it on your own, be sure
// to set each event as you need it, and change the "time" to something like
// '7:30pm' instead. Watch out that you have commas in the right places,
// since JavaScript can get fussy about that. If the project doesn't work for
// you, that's the most likely place to look.

// This shows up in the page title, so it would be in your bookmarks list.
var show = 'My New Show';

// This is where each event, and the warnings for each, are set:
var calls = [
  {
    event: 'Actors to Venue',
    time: '7:00pm',
    warnings: [] // Don't need to make any warnings? Don't set any.
  },
  {
    event: 'Fight Rehearsals',
    time: '7:10pm',
    warnings: [5, 0]
  },
  {
    event: 'Sound Check',
    time: '8:10pm',
    warnings: [10, 0]
  },
  {
    event: 'Top of Show',
    time: '8:30pm',
    warnings: [60, 30, 15, 10, 5]
    // If you want to give a places call at 2-minutes out , just don't do an
    // on-time warning for Top of Show.
  },
  {
    event: 'Places',
    time: '8:28pm',
    warnings: [0]
  },
  {
    event: 'Band Go',
    time: '8:30pm',
    warnings: [0]
  }
];
