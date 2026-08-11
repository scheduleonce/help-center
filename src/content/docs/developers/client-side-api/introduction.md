---
title: Introduction to Client-Side API
oldUrl: "https://developers.oncehub.com/docs/client-side-api/introduction/"
description: Build direct integrations using booking confirmation data via URL parameters and JavaScript for Booking Pages and Booking Calendars.
products:
  - oncehub
---

## What is the OnceHub client-side API?

Our client-side API is a collection of advanced features that can be used to build direct integrations with third party applications, using booking confirmation data sent via URL parameters and JavaScript. It is suitable for developers or technically savvy users with scripting or programming knowledge. You can use the OnceHub client-side API to develop custom integrations with your own web applications, services, or data warehouse.

The client-side API is available for both **Booking Pages** and **Booking Calendars**, allowing you to integrate scheduling data seamlessly into your applications regardless of which OnceHub product you're using.

## Use Cases

### Redirecting booking confirmation data

Using Automatic redirect, you can send booking confirmation data to the redirect page via URL parameters. This feature can be used to personalize the scheduling process by displaying a custom thank you message, or help you streamline your customer pipeline by enabling client-side integrations such as pre-populating a form, among other client-side API use cases.

**Available for:** Booking Pages and Booking Calendars

### Collecting data from an embedded Booking page

If you have published your Booking page using Website embed, you can collect booking confirmation data from an embedded Booking page by adding a JavaScript function to your embed code. Use cases include:

- Enriching your customer data repository with high-value personal information submitted at the time of booking
- Displaying a custom confirmation message inside the embedding frame or a pop-up
- Triggering custom analytics or tracking events
- Integrating with your own application workflows

**Available for:** Booking Pages and Booking Calendars

## Product-Specific Features

While the core concepts of the client-side API remain the same across both products, there are some product-specific implementations and features:

- **Booking Pages**: Support for Master Pages, Event Types, and Booking Pages-specific fields
- **Booking Calendars**: Streamlined implementation focused on calendar-based scheduling

Throughout this documentation, we'll clearly indicate which features apply to which product, or if they apply to both.
