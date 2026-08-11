---
title: Embedded booking events
oldUrl: "https://developers.oncehub.com/docs/client-side-api/embedded-booking-calendar-events/"
description: Track embedded booking calendar events including calendar loaded, time slot selection, and booking completion with detailed payload data.
products:
  - oncehub
---

Subscribe to events from embedded booking calendars to track visitor interactions and booking completions.

## List of supported events

| Event name                                    | Fires when                                                                                  |
| :-------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `oncehub.booking_calendar.loaded`             | Booking calendar is first loaded, on page load.                                             |
| `oncehub.booking_calendar.time_slot_selected` | Visitor selects a time slot and confirms it.                                                |
| `oncehub.booking.scheduled`                   | Visitor successfully completes the final step of the booking, and the meeting is scheduled. |

## Events payloads

### `oncehub.booking_calendar.loaded`

Payload example:

```json
{
  "type": "oncehub.booking_calendar.loaded",
  "payload": {
    "id": "BKC-8DJNDNL86G",
    "subject": "Introductory Sales Call",
    "host": "USR-FN1DQZ5UTP",
    "url": "https://oncehub.com/PAGE-DFFBCE6467",
    "name": "Introductory Call With Sales",
    "duration_minutes": 30
  }
}
```

### `oncehub.booking_calendar.time_slot_selected`

Payload example:

```json
{
  "type": "oncehub.booking_calendar.time_slot_selected",
  "payload": {
    "id": "BKC-8DJNDNL86G",
    "subject": "Introductory Sales Call",
    "host": "USR-FN1DQZ5UTP",
    "url": "https://oncehub.com/PAGE-DFFBCE6467",
    "name": "Introductory Call With Sales",
    "duration_minutes": 30,
    "starting_time": "2026-06-15T14:45:00.000Z",
    "customer_timezone": "America/New_York"
  }
}
```

### `oncehub.booking.scheduled`

Payload example:

```json
{
  "type": "oncehub.booking.scheduled",
  "payload": {
    "id": "BKNG-YZ7MEBLJFRV8",
    "subject": "Introductory Sales Call",
    "status": "scheduled",
    "creation_time": "2026-06-18T10:17:50.141Z",
    "starting_time": "2026-06-18T13:00:00.000Z",
    "customer_timezone": "America/New_York",
    "host": "USR-8YB4TL0VW9",
    "duration_minutes": 30,
    "location_description": "",
    "attendees": [
      "henryhostmeeting@gmail.com",
      "donaldmembermeeting@hotmail.com",
      "markmembermeeting@outlook.com"
    ],
    "booking_calendar": "BKC-8DJNDNL86G",
    "cancel_url": "https://oncehub.com/m/BKNG-YZ7MEBLJFRV8/cancel",
    "reschedule_url": "https://oncehub.com/m/BKNG-YZ7MEBLJFRV8",
    "utm_campaign": "",
    "utm_content": "",
    "utm_medium": "",
    "utm_source": "",
    "utm_term": "",
    "ics_url": "https://oncehub.com/api/bookings/ics/e193123e-3ca9-4cad-bd4d-5ed4f75c2550-ljfrv8",
    "custom_fields": [
      {
        "name": "name",
        "value": "Mark"
      },
      {
        "name": "email",
        "value": "mark@outlook.com"
      }
    ]
  }
}
```
