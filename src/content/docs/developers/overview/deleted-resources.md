---
sidebar:
  order: 8
title: Deleted Resources
description: Understand how OnceHub API handles deleted resources in redacted mode and how they appear in responses and expansions.
products:
  - oncehub
---

Deleted resources are usually still accessible after deletion in _redacted_ mode:

1. The deleted resource will not be returned in any list request.
2. If the resource is requested specifically, it will be returned but will only contain the `id`, `object`, and an additional `deleted` field with the value of `true`.

For example, a call to

```http
GET /booking-calendars/BKC-X0LCRU5LES
```

Will return the object in redacted mode:

```json
{
  "id": "BKC-X0LCRU5LES",
  "object": "booking_calendar",
  "deleted": true
}
```

However, `BKC-X0LCRU5LES` booking calendar will not be returned when listing all booking calendars via

```http
GET /booking-calendars
```

## Deleted Resources in Expansions

The same is true for expanded responses. When expanded, deleted objects will return in _redacted_ mode as well.

:::info

This behavior ensures that your application can gracefully handle references to deleted resources without breaking, while still providing feedback that the resource has been deleted.

:::
