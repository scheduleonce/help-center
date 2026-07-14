---
sidebar:
  order: 5
title: Pagination
description: Navigate large result sets using cursor-based pagination with before, after, and limit parameters in list API methods.
products:
  - oncehub
  - scheduleonce
---

# Pagination

All API resources have support for bulk fetches via "list" API methods. For instance, you can list `bookings`, `booking-pages`, and `event-types`. These list API methods share a common structure, using at least these three parameters: `limit`, `after`, and `before`.

OnceHub utilizes cursor-based pagination by making use of the `after` and `before` parameters. Both parameters take an existing object ID value (see below) and return objects in reverse chronological order. The `before` parameter returns objects listed before the named object. The `after` parameter returns objects listed after the named object. These parameters are mutually exclusive - only one of `after` or `before` may be used.

## Navigation Parameters

To retrieve the next page of results, you can use the `after` parameter with the object ID of the last object that was returned in the list.

To retrieve the previous page of results, you can use the `before` parameter with the object ID of the first object that was returned in the list.

The `limit` parameter determines the number of objects that will be returned on each page. It will default to 10 if not specified and has a maximum limit of 100 objects per page.

## Link header

The [Link header](https://developer.mozilla.org/en-US/developers/Web/HTTP/Headers/Link) includes a `rel` parameter, where relation-types describes the relation of the linked page to the current page of results. The value can either be `previous` or `next`.

If your initial request doesn't return enough records to generate an additional page of results, then the response won't have a link header.

For example:

```http
Link: <https://api.oncehub.com/bookings?after=BKNG-22RN37EED5WS&limit=10>; rel="next",
  <https://api.oncehub.com/bookings?before=BKNG-D3EYIES69QMH&limit=10>; rel="previous"
```

_The example includes a line break for readability._

## Parameters Reference

The URL in the link header can include up to three parameters:

1. **`limit`**: A limit on the number of objects to be returned, between 1 and 100. Defaults to 10.
2. **`after`**: An object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, ending with `OBJ-XXXX`, your subsequent call can include `after=OBJ-XXXX` in order to fetch the next page of the list.
3. **`before`**: An object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, starting with `OBJ-YYYY`, your subsequent call can include `before=OBJ-YYYY` in order to fetch the previous page of the list.

:::tip[Tip]

Use the `Link` header to easily traverse the list of results.

:::
