---
sidebar:
  order: 1
title: Overview
description: Learn how to integrate with the ScheduleOnce REST API to access booking data, manage calendars, and automate scheduling workflows.
products:
  - scheduleonce
---

## ScheduleOnce Developer Center

The ScheduleOnce Developer Center provides tools and APIs for integrating ScheduleOnce scheduling and booking capabilities into your websites and business workflows. Our platform is designed for everyone who wants to build robust integrations that securely access booking data, manage scheduling and automate complex workflows using server-side **REST APIs** and **client-side APIs**.

## Integration Options

ScheduleOnce offers a variety of integration approaches. Users can select the method that best aligns with their specific use case and technical environment:

- **Server-Side REST APIs:** Best for synchronizing booking data, managing scheduling resources, and automating backend workflows following REST principles.
- **Webhooks:** Essential for receiving real-time, event-driven notifications for booking lifecycle events and cancellation events to keep your external systems synchronized.
- **Client-Side APIs:** Use these to embed ScheduleOnce interfaces directly into web applications and interact with them using client-side event listeners. This approach supports capturing real-time events booking pages.

## Developer Center Structure

The ScheduleOnce Developer Center is organized into two sections:

### Documentation

Covers shared concepts and platform standards across all integration types:

- Authentication and API keys
- Client configuration and embedded components
- API versioning, rate limits, pagination, and error handling
- Webhook event delivery and validation

### API Reference

Provides detailed endpoint documentation for ScheduleOnce product:

- [**Booking Pages API (Classic)**](/scheduleonce/developers/api/#tag/authentication): Access and manage data related to booking pages.

Each reference includes supported endpoints, parameters, authentication requirements and example responses.

## Getting Started

It requires an active ScheduleOnce account and valid API credentials.

### To Use REST API

1. [Sign up](https://account.oncehub.com/signup) for a ScheduleOnce account if you don't have one.
2. Create your API keys using the [Authentication guide](/scheduleonce/developers/overview/authentication/). You can maintain up to 25 active keys to segregate environments (Staging vs. Production) and manage third-party vendors securely.

### To Use Client-Side API

- Use the Website embed feature to publish your Booking Page directly on your site.
- Add a [JavaScript function](/scheduleonce/developers/client-side-api/embed-events/) to your embed code to collect real-time booking confirmation data or trigger custom analytics.

### To Use Webhooks

Webhooks can be configured through the ScheduleOnce application interface for a quick setup or via the API.

- To configure your webhooks directly in the ScheduleOnce Application, define your webhook URL (must be https://), select your triggers from the provided list, and save your Webhook Secret to verify data authenticity.
- Use the [Webhooks API](/scheduleonce/developers/api/#tag/webhooks/POST/webhooks) to create a new subscription (via POST request). You must define your destination url and an array of [event types](/scheduleonce/developers/api/#tag/webhook-events) (e.g., booking.scheduled) within the JSON request body. Once created, retrieve the signing_secret from the API response to implement signature verification on your server.
