---
title: FAQs
description: Frequently asked questions
products:
  - oncehub
  - scheduleonce
---

## Why isn't my API key working?

There may be a typo in the key.\
An account administrator might have regenerated the key.

## How can I test that the webhook subscription is configured correctly?

You can use a service like <a target="_blank" href="https://webhook.site/">Webhook Tester</a> to test your endpoint and make sure you are configured correctly to start receiving booking data.

## How can I sign up for a trial account?

To use the API you will need a OnceHub account. If you don't have an account yet, you can <a target="_blank" href="https://account.oncehub.com/signup">sign up for a trial account here</a>.

## Why am I not receiving a data payload from my webhook subscription?

Check that you have enabled the correct event triggers when creating your webhook subscription.

Check that your endpoint is set up correctly. [Learn more about configuring your webhook subscriptions](/scheduleonce/developers/webhooks/using-webhooks)

## Why am I seeing `null` fields in the webhook payload?

The Webhook payload returns a consistent data structure no matter what booking event type triggered it. For any given booking event type, some of the fields in the data object of the webhook payload will not be relevant. Fields with no values will appear as `null`.

## If my server is down will you send the payload again?

Yes. If for some reason your endpoint does not successfully receive the webhook payload, we will continue trying to send the HTTP POST message every hour, for up to three days.
