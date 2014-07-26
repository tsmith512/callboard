// This is a sample version of calls which sets up calls and warnings relative
// to when the page was loaded, for demonstration purposes. For each of these,
// 'time' should be a value like '7:30pm' instead.

var show = 'Callboard Sample';

var calls = [
  {
    event: 'Page loaded',
    time: moment().format('hh:mma'),
    warnings: [] // Warnings can be empty, if the event just needs to be on the schedule
  },
  {
    event: 'Actors to Venue',
    time: moment().subtract('hour', 1).format('hh:mma'),
    warnings: [0]
  },
  {
    event: 'Fight Rehearsals',
    time: moment().add('minutes', 7).format('hh:mma'),
    warnings: [5, 0]
  },
  {
    event: 'Sound Check',
    time: moment().add('minutes', 20).format('hh:mma'),
    warnings: [10, 0]
  },
  {
    event: 'Actors and Band to Places',
    time: moment().add('minutes', 63).format('hh:mma'),
    warnings: [60, 30, 15, 10, 5, 0]
  },
  {
    event: 'Standby Sound; Go Band',
    time: moment().add('minutes', 65).format('hh:mma'),
    warnings: [0]
  }
];
