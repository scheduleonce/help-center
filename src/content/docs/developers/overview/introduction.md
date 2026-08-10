---
sidebar:
  order: 1
title: Overview
description: Learn how to integrate with the OnceHub REST API to access booking data, manage calendars, and automate scheduling workflows.
products:
  - oncehub
---

## OnceHub Developer Center

[**The OnceHub Developer Center**](/developers/overview/introduction/) provides tools and APIs for integrating OnceHub scheduling and booking capabilities into your websites, business workflows and AI agents. Our platform is designed for everyone who wants to build robust integrations that securely access booking data, manage scheduling and automate complex workflows using server-side **REST APIs**, **client-side APIs**, and **Model Context Protocol (MCP)** integrations.

## Integration Options

OnceHub offers a variety of integration approaches. Users can select the method that best aligns with their specific use case and technical environment:

- **Server-Side REST APIs:** Best for synchronizing booking data, managing scheduling resources, and automating backend workflows following REST principles.
- **Webhooks:** Essential for receiving real-time, event-driven notifications for booking lifecycle events, digital conversation interactions (Chatbots/ Live engagement), and cancellation events to keep your external systems synchronized.
- **Client-Side APIs:** Use these to embed OnceHub interfaces directly into web applications and interact with them using client-side event listeners. This approach supports capturing real-time events for Chatbots, Routing Forms and Booking Calendars.
- **URL Parameters & Embedding:** A powerful mechanism to **fetch data from** (pre-filling booking forms) or **pass information to** redirect parameters after a booking is completed.
- **MCP Server:** Designed for integrating OnceHub into Model Context Protocol (MCP) environments for AI-driven scheduling and automation workflows.

## Developer Center Structure

The OnceHub Developer Center is organized into two sections:

### Dev Docs

Covers shared concepts across all integration types:

- Authentication and API keys
- Client configuration and embedded components
- URL parameter reference
- API versioning, rate limits, pagination, and error handling
- MCP integration guidelines
- Webhook event delivery and validation

### API Reference

Provides detailed endpoint documentation for OnceHub products:

- [**Booking Calendars API:**](/developers/api/) Manage bookings, Booking Calendars, webhook event types, users, teams and scheduling resources.

The API reference includes supported endpoints, parameters, authentication requirements and example responses.

## Getting Started

Select your preferred integration method to begin. Most methods require an active OnceHub account and valid API credentials.

### To Use REST API or MCP Server

1. [**Sign up**](https://account.oncehub.com/signup) for a OnceHub account if you don’t have one.
2. Create your API keys using the [**Authentication guide**](/developers/overview/authentication/). You can maintain up to 25 active keys to segregate environments (Staging vs. Production) and manage third-party vendors securely.
3. Choose between REST APIs for standard integrations or the MCP Server for AI-driven workflows.

### To Use Client-Side API

- Use the Website embed feature to publish your Booking Calendar directly on your site.
- Add a [**JavaScript function**](/developers/client-side-api/embed-events/) to your embed code to collect real-time booking confirmation data or trigger custom analytics.

### To Use Webhooks

Webhooks can be configured through the OnceHub application interface for a quick setup or via the API.

- To configure your webhooks directly in the OnceHub Application, define your webhook URL (must be `https://`), select your triggers from the provided list, and save your Webhook Secret to verify data authenticity.

- Use the [**Webhooks API**](/developers/api/#tag/webhooks/POST/webhooks) to create a new subscription (via POST request). You must define your destination `url` and an array of [**event types**](/developers/api/#tag/webhook-events) (e.g., `booking.scheduled`) within the JSON request body. Once created, retrieve the `signing_secret` from the API response to implement signature verification on your server.

### To Use URL Parameters & Embedding

- Map your custom field names in the Booking Calendar's form settings to ensure data is correctly identified.
- Append parameters to your OnceHub URL to push data and pre-fill guest information in both [**Booking Forms**](/human-engagement/booking-calendars/sharing-embedding/prefilling-guest-information-in-your-booking-calendar) and [**Routing Forms**](/human-engagement/routing-forms/sharing-embedding/embedding-your-routing-form-on-your-website) for a frictionless scheduling experience.
