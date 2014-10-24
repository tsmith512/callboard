# Callboard.js

![Callboard][IMAGE]

_(Are you a theatrical worker? [Skip to the how-to](#for-theatre-folks).)_

## JavaScript goes to the theatre

When not building websites for [Four Kitchens][4K], I am a deck manager and
theatrical electrician. For [Zilker Theatre Production's][ZTP] _Oklahoma!_ in
2014, I managed backstage scheduling and gave warning calls to the rest of
the company as we worked through the schedule each evening. With a wristwatch, a
bit of focus, and lots of caffeine, this was very manageable. But distractions
pop up backstage, and I like automating things.

[Callboard.js][CB] ([demo][DEMO]) is a simple web app that takes an
easily-editable schedule and produces a list of countdowns for warnings and
events. At the space, I navigated to the site on my phone and checked it
periodically while I handled my other pre-show tasks. When my phone buzzed, it
was time to get up, make a lap of the space and holler at people (politely).

I defined these events:

- Actors to venue
- Fight and fall rehearsals
- Dance calls
- Sound check
- Top of Show
- Places

And the warnings that I wanted to give for each:  
_("Ten minutes to top of show!", "Five minutes to the fight rehearsal!", etc.)_

- _Actors to venue:_ Just an item on the schedule, no warnings.
- _Fight and fall rehearsals:_ 5 minutes and on-time. (Although really, I ran
  this as soon as cast members were ready.)
- _Dance calls:_ 10 minutes, 5 minutes, and on-time.
- _Sound check:_ 10 minutes and on-time.
- _Top of Show:_ 30, 15, 10, and 5 minutes (_no_ on-time, since I'd call places
  at two minutes).
- _Places:_ On-time for the event, which was defined as two minutes before Top
  of Show.

Combined, that looks like this:

``` js

var calls = [
  {
    event: 'Actors to Venue',
    time: '7:00pm',
    // No announcement for the venue call. It's not like they'll be early...
    warnings: []
  }
  {
    event: 'Sound Check',
    time: '8:00pm',
    warnings: [10, 0]
  },
  {
    event: 'Top of Show',
    time: '8:30pm',
    // We don't give a warning for TOS, that's the Places call
    warnings: [30, 15, 10, 5]
  },
  {
    event: 'Actors and Band to Places',
    time: '8:28pm',
    // Other warnings are for top-of-show, this is essentially a 2-minute warning event
    warnings: [0]
  },
  {
    event: 'Go for Act One',
    time: '8:30pm',
    warnings: [0]
  }
];
```

Callboard takes these data and builds out three displays:

- **Announce:** Show current warnings for two minutes in large text, useful for
  an unattended display.
- **Calls:** A running list of countdowns to current and future _warnings_,
  color-coded by how soon they must be called. Events are not included.
- **Schedule:** A full list of countdowns to each _event_. Warnings are not
  included.

![Three displays][DISPLAY]


### Retrospective: was it useful and did it work?

Yeah! This bit of cross-disciplinary nerdiness worked out well. It was useful to
have a brain backup because preshow hours can be very busy. This helped me to
make sure everyone had the prep time they needed for each item on the schedule
so we were ready to start on time each evening, and to minimize surprises if the
schedule had to change.

### Future roadmap / current limitations

I'll keep tweaking this as I use it for future shows (or maybe you've got some
good ideas?). Currently there are a handful of things I'd like to work on:

- **A generator for the `calls.js` file which defines the events and warnings.**
  - For anyone who isn't handy with a code editor, this project is less useful
    than if the config file were automatically generated.
- **Offline access**
  - _Oklahoma!_ was performed outdoors. In July and August. In Texas.
  - ![Words of wisdom, or lack thereof][BRAIN]
  - At least the cell service was solid there. Indoor theatres frequently have
    poor reception or wifi that is used for equipment control instead of
    internet access.
  - This web app won't work without a network connection (at least to the
    hosting environment). I'd like to change that so it can work locally.
- **Performance tweaks**
  - When I saved the webapp to my [homescreen as a webapp][HOMESCREEN], the
    counts would stall out if I switched to another tab for too long, or turned
    off the screen. I think suspending the update interval when the window loses
    focus could fix this.
  - There's not a loading indicator while the lists are being setup, but there
    is a noticeable delay between pageload and the appearance of any generated
    content. I'd to fix both of these issues.
- **Stopwatch or "Act Two" features**
  - Act two started fifteen minutes after houselights came up following act one.
    I just started a stopwatch on my phone for that and did the math to make
    those calls, since there were fewer. It would be nice to have an easy way
    to add that second "mode".
  - A current workaround would be to host two separate copies of this project,
    one setup as described, and the other setup like the [demo][DEMO] where the
    "events" are all set relative to the time at pageload and load that when
    intermision starts.
- **Midnight is a problem**
  - How I invoked simple time parsing in Moment.js ignores dates, so a call at
    11:30pm happens "tonight," but a call at 12:30am would have already happened
    "this morning," which wouldn't be the intention. But I also didn't have a
    show schedule that surfaced this condition.
- **On-the-fly changes**
  - Not sure what form this would take, but sometimes you just know you're gonna
    have to hold house. The counts can't be updated from the phone, and there is
    no "delay" feature, but something like that could be useful... unfortunately.
  - _(Shoutout to the_ Oklahoma! _crew, in a whole summer, that only happened
    twice, and they got us back on track very quickly.)_

--------------------------------------------------------------------------------

# For theatre folks

## Project description

This is a work-in-progress prototype for stage/deck managers to manage pre-show
calls. Given a list of events (Top of Show, Places, Fight Rehearsals, etc.),
this web application will give you a countdown to each call you must make ("Half
hour to Top of Show!", "Ten minutes to Sound Check!", or "Places, please!") so
that you can give each on-time without having to do subtraction in your head,
clearing you up to focus on other things (because there are always other things
to focus on).

## How to use it

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
     [`http://tsmith512.github.io/callboard`][DEMO]).
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

## Support

If it isn't working, you probably have a formatting or punctuation problem
("syntax error") in the `calls.js` file. In a future version, I'm hoping to
build a generator to build that file visually so you don't have to futz with
any code.

I cannot promise to support the whole world with this singlehandedly, but if you
need some assistance, and I am able, reach out to me on [Twitter][TW] or
[file an issue on this project at GitHub][GHI] (if you have a GitHub account).

## Known limitations

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
  _as it is set on the computer/device you're using._
  - Hence my comment about running shows on "Verizon Standard Time"
  - This also means that there may be differences of a few seconds between
    different devices.
- It will not work offline.
  - You need to have a connection to the place it is hosted to load the page,
    but after that, it'll keep running.
- Midnight is a problem.
  - Callboard doesn't think about days, just hours. So an 11:30pm event would
    happen "tonight," but something that is scheduled for an hour later at
    12:30am would have "already happened this morning," according to the page.
  - If this affects you before I fix it, just reload the page at midnight.

[IMAGE]: gfx/callboard.jpg
[4K]: http://www.fourkitchens.com
[ZTP]: http://www.zilker.org
[CB]: http://www.github.com/tsmith512/callboard
[DEMO]: http://tsmith512.github.io/callboard
[DISPLAY]: gfx/displays.png
[R]: https://github.com/tsmith512/callboard/releases
[GH]: https://github.com/
[FORK]: https://help.github.com/articles/fork-a-repo
[TW]: http://twitter.com/tsmith512
[GHI]: https://github.com/tsmith512/callboard/issues/new
[HOMESCREEN]: https://developer.chrome.com/multidevice/android/installtohomescreen
[BRAIN]: gfx/brainmissing.jpg
