---
title: Embedded booking events
description: Track embedded booking calendar events including calendar loaded, time slot selection, and booking completion with detailed payload data.
products:
  - oncehub
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BookingConfirmationTocToggle from '@site/src/components/BookingConfirmationTocToggle';

<BookingConfirmationTocToggle />

# Embedded booking events

Subscribe to events from embedded booking calendars or booking pages to track visitor interactions and booking completions.

## List of supported events

<Tabs groupId="product" queryString className="product-tabs">
  <TabItem value="booking-calendars" label="Booking Calendars [New]" default>

| Event name                                    | Fires when                                                                                  |
| :-------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `oncehub.booking_calendar.loaded`             | Booking calendar is first loaded, on page load.                                             |
| `oncehub.booking_calendar.time_slot_selected` | Visitor selects a time slot and confirms it.                                                |
| `oncehub.booking.scheduled`                   | Visitor successfully completes the final step of the booking, and the meeting is scheduled. |

  </TabItem>
  <TabItem value="booking-pages" label="Booking Pages [Classic]">

For Booking Pages, use the `SOAfterConfirmationFunction()` JavaScript function to collect booking confirmation data when a booking is scheduled. See [Collecting data from an embedded Booking page](/developers/client-side-api/collecting-data-from-embedded-booking-page) for the legacy implementation details.

The function executes when a booking is successfully completed and provides a comprehensive booking data payload.

  </TabItem>
</Tabs>

## Events payloads

<Tabs groupId="product" queryString className="product-tabs">
  <TabItem value="booking-calendars" label="Booking Calendars [New]" default>

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

  </TabItem>
  <TabItem value="booking-pages" label="Booking Pages [Classic]">

### Booking confirmation data payload

The `SOAfterConfirmationFunction()` returns a comprehensive JSON object containing booking information. See the [Collecting data from an embedded Booking page](/developers/client-side-api/collecting-data-from-embedded-booking-page) documentation for the complete payload structure and implementation details.

The payload includes customer information (name, email, phone), meeting times in multiple time zones (UTC, customer time zone, booking page time zone), cancel/reschedule links, calendar event files (ICS and VCS), and error status codes.

  </TabItem>
</Tabs>
