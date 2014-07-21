# Call Board

A work-in-progress prototype for stage/deck managers to manage calls. Provided
a list of calls and the necessary warnings (found in `js/calls.js`):

``` js

var calls = [
  {
    event: 'Actors to Venue',
    time: '7:00pm',
    warnings: [0]
  },
  {
    event: 'Sound Check',
    time: '8:00pm',
    warnings: [10, 0]
  },
  {
    event: 'Openers to Places',
    time: '8:23pm',
    warnings: [15, 5, 0]
  },
  {
    event: 'Actors and Band to Places',
    time: '8:28pm',
    warnings: [60, 30, 15, 10, 5, 0]
  },
  {
    event: 'Standby Sound; Go Band',
    time: '8:30pm',
    warnings: [0]
  }
];
```

Generate three displays:
- **Announce:** Show all current warnings for two minutes, useful for an
  unattended display.
- **Calls:** A running list of countdowns to all current and future warnings,
  color-coded by how soon they must be given.
- **Schedule:** A full list of countdowns to the events in `calls.js`.
