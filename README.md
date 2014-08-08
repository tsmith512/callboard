# Callboard.js

![Callboard][IMAGE]

_(See introduction below for project background.)_

## Description for theatre people

This is a work-in-progress prototype for stage/deck managers to manage pre-show
calls. Given a list of events (Top of Show, Places, Fight Rehearsals, etc.),
this web application will give you a countdown to each call you must make ("Half
hour to Top of Show!", "Ten minutes to Sound Check!", or "Places, please!") so
that you can give each on-time without having to do subtraction in your head,
clearing you up to focus on other things (because there are always other things
to focus on).

### How to use this

**The setup:** It's not difficult, but there are a few setup steps. First,
you need to host this somewhere.

- _If you have a website or web server where you can put this:_ Just download
  the newest [release][R]. Edit the `calls.js` file in the `js` folder, and post
  it to your server.
- _Free hosting is available on GitHub Pages:_ You can use [GitHub][GH] to host
  it for free if you like. Register for an account, then:
  1. "[Fork][FORK]" this project on GitHub to host it there.
  2. Switch to the `gh-pages` branch
  3. Edit the `calls.js` file in the `js` folder
  4. See your project at `http://YOUR-USER-NAME.github.io/callboard` (for
     example, you can see this project with sample data at
     `[http://tsmith512.github.io/callboard][DEMO]`).
- For security reasons, generally browsers won't run scripts like this locally,
  so you can try downloading it and opening `index.html` in your browser, but
  it probably won't work.

**The display:** When you open the site, if it is set up correctly, you'll see
three tabs on the top of the screen above the lists:

- _Announce:_ Show all current warnings/calls for two minutes in big text. This
  is useful for an unattended display if you want to put a monitor backstage.
- _Calls:_ A running list of countdowns to all current and future warnings,
  color-coded by how soon they must be given. This is your "to-do" list for
  hollering.
- _Schedule:_ A full list of all the events you've defined and countdowns to
  each. This gets the warnings out of your way to see the bigger picture.

### Limitations

I built this for [Zilker Theatre Production's][ZTP] _Oklahoma!_ performance, so
once it met my individual needs, development on the product slowed down a bit.
I'm still actively working on this, and you can expect new stuff whenever I'm in
production for another show. In the meantime, here are some limitations to keep
in mind.

- The vibrating alert only works (at the moment):
  - On Android 4+ devices until Apple adds support for iOS. I do not know about
    support for Windows 8 phones and tablets at this time.
  - When the screen is on! Turning off your phone screen will pause the timers
    because that's how mobile browsers work. If they kept running stuff
    constantly, your battery would die even faster. ;)
- The countdowns and timers are based on the time
  _as it is set on the computer/device you're using:_
  - Hence my joking that I run my shows on "Verizon Standard Time"
  - This also means that there may be differences of a few seconds between
    different devices.

### Support

If it isn't working, you probably have a formatting or punctuation problem
("syntax error") in the `calls.js` file. In a future version, I'm hoping to
build a generator to build that file visually so you don't have to futz with
any code.

I cannot promise to support the whole world with this singlehandedly, but if you
need some assistance, and I am able, reach out to me on [Twitter][TW] or
[file an issue on this project at GitHub][GHI] (if you have a GitHub account).

## Description for developers

_(See introduction below for project background.)_

This is a work-in-progress prototype for stage/deck managers to review the
pre-show schedule and make calls (running around the space shouting, "Ten
minutes to places!"). Provided a list of events and the necessary warnings
(found in`js/calls.js`):

``` js

var calls = [
  {
    event: 'Actors to Venue',
    time: '7:00pm',
    warnings: []
    // No announcement for the venue call. You know your actors won't be early...
  },
  {
    event: 'Sound Check',
    time: '8:00pm',
    warnings: [10, 0]
  },
  {
    event: 'Top of Show',
    time: '8:30pm',
    // We don't give a warning for TOS, that's the Places call
    warnings: [30, 15, 5]
  },
  {
    event: 'Actors and Band to Places',
    time: '8:28pm',
    // Other warnings are for top-of-show, this is essentially a 2-minute warning event
    warnings: [0]
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

# Introduction (the accompanying blog post)

## JavaScript goes to the Theatre

When not building websites for [Four Kitchens][4K], I am a deck manager and
theatrical electrician. For [Zilker Theatre Production's][ZTP] _Oklahoma!_ in
2014, I gave many warning calls pre-show and also managed backstage scheduling
which varied day-to-day as supplementary rehearsals were added or timing changed
through the life of the production. With a wristwatch, short-term memory, focus,
and caffeine, this was very manageable. But distractions pop up backstage, and I
like automating things.

[Callboard.js][CB] ([demo][DEMO]) is a simple web app that takes an
easily-editable schedule and produces a list of countdowns for warnings and
events. When my phone buzzes, it's time to get up, make a lap of the space and
holler at people (politely).

(No, this website will not actually _talk_ for you, although that could be
developed, and there is a mode to show only current announcements in big text if
you wanted to put it on a television or monitor backstage.)

To illustrate, I defined these events:

- Actors to venue
- Fight and fall rehearsals
- Dance calls
- Sound check
- Top of Show
- Places

And the warnings that I wanted to give for each: ("Ten minutes to top of show!",
"Five minutes to the fight rehearsal!", etc.)

- _Actors to venue:_ Just an item on the schedule, no warnings.
- _Fight and fall rehearsals:_ 5 minutes and on-time. (Although really, I ran
  this as soon as folks were ready.)
- _Dance calls:_ 10 minutes, 5 minutes, and on-time.
- _Sound check:_ 10 minutes and on-time.
- _Top of Show:_ 30, 15, 10, and 5 minutes (_no_ on-time, since I'd call places
  at two minutes minutes).
- _Places:_ On-time for the event, which was defined as two minutes before Top
  of Show.

At the space, I navigate to this webpage on my phone and check it periodically
while I handle my other pre-show tasks.

[IMAGE]: gfx/callboard.jpg
[4K]: http://www.fourkitchens.com
[ZTP]: http://www.zilker.org
[CB]: http://www.github.com/tsmith512/callboard
[DEMO]: http://tsmith512.github.io/callboard
[R]: https://github.com/tsmith512/callboard/releases
[GH]: https://github.com/
[FORK]: https://help.github.com/articles/fork-a-repo
[TW]: http://twitter.com/tsmith512
[GHI]: https://github.com/tsmith512/callboard/issues/new
