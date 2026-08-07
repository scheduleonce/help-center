---
sidebar:
  order: 6
title: Rate Limits
description: Learn about OnceHub API rate limits, including per-account and per-IP restrictions, and best practices to avoid hitting limits.
products:
  - oncehub
---

To ensure fair usage and maintain API stability, requests are subject to rate limiting based on both the account and the originating IP address:

- **Per Account**: You are limited to **5 requests per second**.
- **Per IP Address**: You are limited to **200 requests per 5 minutes**.

## Rate Limit Errors

When you exceed the rate limits, the API will respond with a `429 Too Many Requests` status code and a `rate_limit_error` type:

```json title="429 Too Many Requests"
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

## Best Practices

:::tip

Avoid periodically fetching entire resource collections just to check for updates. This can quickly consume your rate limit allowance. Instead, utilize our [Webhooks](/developers/webhooks/introduction-to-webhooks/) to receive notifications proactively when data changes, leading to more efficient integration.

:::

## Additional Recommendations

- **Implement exponential backoff**: When you receive a rate limit error, wait before retrying the request
- **Cache responses**: Store frequently accessed data locally to reduce API calls
- **Use webhooks**: Subscribe to relevant events instead of polling for changes
- **Batch operations**: Group multiple operations into single requests when possible
