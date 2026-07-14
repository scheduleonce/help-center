---
title: Introduction to Webhooks
description: Learn how to use OnceHub webhooks to receive real-time notifications about booking and conversation events in your account.
products:
  - oncehub
  - scheduleonce
---

## What are Webhooks?

Our Webhooks API is an advanced feature that can be used to build integrations with third party applications. It is suitable for developers or technically savvy users with scripting or programming knowledge. Using webhooks, you can develop custom integrations with your own web applications, services, or data warehouse.

## The Webhooks API

The Webhooks API is used to communicate with third-party web services. Webhook subscriptions are configured with a POST URL and an array of User-specified event triggers representing different booking lifecycle events.

Multiple webhook subscriptions can be associated with the same OnceHub account. This lets you create different triggers for different booking and conversation lifecycle events.

An HTTP POST message is used to push relevant booking or conversation data to the webhook URL, and is triggered whenever the defined lifecycle event occurs. The data is sent as JSON key-value pairs (KVPs) to your receiving server when a booking lifecycle event occurs in your OnceHub account. For example, you can create a webhook that sends customer details whenever a new booking is scheduled. [View all available webhook events](/developers/api/#tag/webhook-events).

## Managing your Webhooks

Webhook subscriptions can be created, deleted, and retrieved via the webhooks API. You can also create, view and delete your webhooks from the [API & Webhooks Integration](https://app.oncehub.com/integrations/api) page. [Learn more about managing Webhook subscriptions](/developers/webhooks/managing-webhook-subscriptions)

![API Integration page with navigation menu](/img/screenshots/api-integration-webhook-subscription-list.png)
_Figure 1: API & Webhooks Integration page with navigation menu_
