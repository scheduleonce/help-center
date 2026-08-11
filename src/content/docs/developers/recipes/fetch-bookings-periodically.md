---
title: Fetch Bookings Periodically
oldUrl: "https://developers.oncehub.com/docs/recipes/fetch-bookings-periodically/"
description: Learn how to periodically fetch updated bookings from the OnceHub API using pagination
products:
  - oncehub
---

This recipe demonstrates how to periodically poll the OnceHub API to fetch bookings that have been updated since your last fetch. It handles pagination automatically and can be customized to run at your desired interval.

## Prerequisites

- Node.js version >= 18.0.0 (for native `fetch` support)
- An OnceHub API key
- The `parse-link-header` npm package

:::info[Node.js Version]
This recipe uses native `fetch` in Node.js. If you're using an older version of Node.js (< 18.0.0), you can use the [node-fetch](https://github.com/node-fetch/node-fetch) library instead.
:::

## Installation

First, install the required dependency:

```bash
npm install parse-link-header
```

## Complete Example

```javascript
import parse from "parse-link-header";

const baseUrl = "https://api.oncehub.com";
const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
const headers = { "api-key": apiKey };

let lastFetchTime = new Date();

/**
 * Fetches all bookings updated since the specified date
 * Automatically handles pagination
 */
async function fetchBookingsSince(date) {
  let results = [];

  async function fetchNextPage(url) {
    const res = await fetch(url, { headers });
    const data = await res.json();
    results = results.concat(data.data);

    // Check if there's a next page
    const nextUrl = parse(res.headers.get("link"))?.next?.url;
    if (nextUrl) {
      await fetchNextPage(nextUrl);
    }
  }

  // Initial fetch with filter
  const res = await fetch(
    `${baseUrl}/v2/bookings?limit=10&last_updated_time.gt=${date.toISOString()}`,
    { headers },
  );

  const data = await res.json();
  results = results.concat(data.data);

  // Handle pagination
  const nextUrl = parse(res.headers.get("link"))?.next?.url;
  if (nextUrl) {
    await fetchNextPage(nextUrl);
  }

  return results;
}

/**
 * Main polling function that runs periodically
 */
async function fetchPeriodically() {
  try {
    const data = await fetchBookingsSince(lastFetchTime);

    if (data.length) {
      lastFetchTime = new Date();

      // Process the bookings
      console.log(`Fetched ${data.length} updated booking(s)`);
      console.log(data);

      // Add your custom logic here:
      // - Update your database
      // - Send notifications
      // - Sync with other systems
    } else {
      console.log("No new booking updates");
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }

  // Schedule next fetch (60 seconds)
  setTimeout(fetchPeriodically, 60 * 1000);
}

// Start polling
fetchPeriodically();
```

## Key Configuration Options

### API Key

Replace `YOUR_API_KEY` with your actual OnceHub API key:

```javascript
const apiKey = "YOUR_API_KEY";
```

### Initial Fetch Time

By default, the script fetches bookings updated since it started running. To fetch all historical bookings, set:

```javascript
let lastFetchTime = new Date(0); // Fetches from the beginning of time
```

Or fetch bookings from a specific date:

```javascript
let lastFetchTime = new Date("2024-01-01"); // Fetches from January 1, 2024
```

### Polling Interval

Change the polling frequency by modifying the timeout value (in milliseconds):

```javascript
setTimeout(fetchPeriodically, 60 * 1000); // 60 seconds (default)

// Examples:
// 30 seconds: 30 * 1000
// 5 minutes: 5 * 60 * 1000
// 1 hour: 60 * 60 * 1000
```

### Page Size

Adjust the number of bookings fetched per page:

```javascript
const res = await fetch(
  `${baseUrl}/v2/bookings?limit=100&last_updated_time.gt=${date.toISOString()}`,
  { headers },
);
```

Valid values: 1-100 (default: 10)

## How It Works

1. **Pagination**: The script automatically follows pagination links in the API response headers to fetch all pages of results.

2. **Filtering**: Uses the `last_updated_time.gt` query parameter to only fetch bookings updated after the last successful fetch.

3. **Polling**: Runs continuously on a timer, checking for updates at your specified interval.

4. **Error Handling**: Includes try-catch to handle API errors gracefully without stopping the polling loop.

## API Response Example

```json
{
  "data": [
    {
      "id": "abc123",
      "status": "completed",
      "start_time": "2024-11-21T10:00:00Z",
      "last_updated_time": "2024-11-21T09:55:00Z"
      // ... other booking fields
    }
  ],
  "has_more": false,
  "object": "list"
}
```

## Best Practices

- **Rate Limits**: Be mindful of API rate limits. Don't set the polling interval too low.
- **Error Handling**: Add robust error handling for network issues and API errors.
- **Logging**: Implement proper logging for production environments.
- **Webhooks**: Consider using [webhooks](/developers/webhooks/introduction-to-webhooks) instead of polling for real-time updates.

## See Also

- [Bookings API Reference](/developers/api/#tag/bookings)
- [Pagination](/developers/overview/pagination)
- [Rate Limits](/developers/overview/rate-limits)
- [Webhooks](/developers/webhooks/introduction-to-webhooks)
