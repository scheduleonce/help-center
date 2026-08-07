---
sidebar:
  order: 4
title: Expanding Responses
description: Retrieve expanded nested objects in API responses using the expand parameter to reduce additional API calls.
products:
  - oncehub
---

By default, objects embedded in other objects are referenced by their object ID. For example, a booking contains a reference to the Booking Calendar:

```json
{
  "object": "booking",
  "id": "BKNG-J4FR05BKEWEX",
  // ...
  "booking_calendar": "BKC-8DJNDNL86G"
}
```

You can ask to _expand_ the `booking_calendar` object by passing an `expand` query parameter to the API:

```http
GET /bookings/BKNG-J4FR05BKEWEX?expand=booking_calendar
```

And the API will return the _expanded_ object:

```json
{
  "object": "booking",
  "id": "BKNG-J4FR05BKEWEX",
  // ...
  "booking_calendar": {
    "id": "BKC-8DJNDNL86G",
    "object": "booking_calendar",
    "name": "Andrea Hartie",
    "label": "AndreaHartie",
    "url": "https://go.oncehub.com/andreahartie",
    "active": true
  }
}
```

:::note

Expandable properties are listed in this API documentation as _expandable_.

:::

## Multiple Expansions

You can pass multiple objects to expand in the response using comma separated values. For example, to expand both `booking_calendar` and `user` you could request:

```http
GET /bookings/BKNG-J4FR05BKEWEX?expand=booking_calendar,user
```

## Expansions in Lists

Expansions on list requests start with the `data` property. For example, you would expand `data.booking_calendar` on a request to list bookings and associated Booking Calendars:

```http
GET /bookings/?expand=data.booking_calendar
```

:::warning

Expansions on list requests can result in a slower response time.

Since expanding specific data in the response causes additional lookups to multiple data tables, it may result in a slower response time. Only expand data if you have a need for it.

:::

:::info

Expansions have a maximum depth of two levels.

To avoid circular calls there is a hard limit to expand to a maximum of two levels.

:::

## Expansions and Webhooks

Included objects in Webhooks are expanded by default, but additional objects in these payloads cannot be expanded. If you need the fully expanded object, you could trigger a call to the appropriate API upon receiving the webhook.
