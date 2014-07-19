# Calls

## Next Warnings:

Foreach `call` in `calls`, calculate the next upcoming `warning` time (where `warning[X]` is minutes before `time`). Display the next three warnings to give and the most recent two:

| `event`                                 | `warning value`              | Countdown            |
| --------------------------------------- | ---------------------------- | -------------------- |
| **Openers to Places (`event`)**         | 5 minutes (`warning value`)  | _HH:MM:SS to `time`_ |
| **Actors and Band to Places (`event`)** | 10 minutes (`warning value`) | _HH:MM:SS to `time`_ |

If possible, on a `warning` minute, vibrate the phone.

## All Calls:

Foreach `call` in `calls`:

| `event`                                 | Countdown            |
| --------------------------------------- | -------------------- |
| **Openers to Places (`event`)**         | _HH:MM:SS to `time`_ |
| **Actors and Band to Places (`event`)** | _HH:MM:SS to `time`_ |
| **Top of Show, Band Go (`event`)**      | _HH:MM:SS to `time`_ |
