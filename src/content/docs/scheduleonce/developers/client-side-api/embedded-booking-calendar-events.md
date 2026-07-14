---
title: Embedded booking events
description: Subscribe to events from embedded Booking Pages (Classic) to track visitor interactions and booking completions.
products:
  - scheduleonce
---

# Embedded booking events (Classic)

For Booking Pages (Classic), use the `SOAfterConfirmationFunction()` JavaScript function to collect booking confirmation data when a booking is scheduled. See [Collecting data from an embedded Booking page](/scheduleonce/developers/client-side-api/collecting-data-from-embedded-booking-page) for the legacy implementation details.

The function executes when a booking is successfully completed and provides a comprehensive booking data payload.

### Booking confirmation data payload

The `SOAfterConfirmationFunction()` returns a comprehensive JSON object containing booking information. See the [Collecting data from an embedded Booking page](/scheduleonce/developers/client-side-api/collecting-data-from-embedded-booking-page) documentation for the complete payload structure and implementation details.

The payload includes customer information (name, email, phone), meeting times in multiple time zones (UTC, customer time zone, booking page time zone), cancel/reschedule links, calendar event files (ICS and VCS), and error status codes.
