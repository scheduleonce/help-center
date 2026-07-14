---
title: API changelog
sidebar:
  order: 0
description: Track updates, new features, and breaking changes to the OnceHub API with detailed release notes and version history.
products:
  - oncehub
  - scheduleonce
---

## 2025-12-25

- Added new **SMS Notifications API** endpoint `GET /v2/notifications/sms` to retrieve SMS notification logs with filtering and pagination capabilities:
  - Filter by recipient (contact or user), recipient type, and creation time
  - Support for data expansion on the `recipient` field to include full contact or user details
  - Includes delivery status, phone number, message body, and segment count for each SMS notification

## 2025-12-11

- Added `payment_information` field to Booking object for booking calendars that collect payments via Stripe. This includes `amount_charged` (in smallest currency unit), `currency` ([ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code), and `transaction_id` ([Stripe charge](https://docs.stripe.com/api/charges/object) ID).

## 2025-10-22

- Introduced the shared `ListResponseBase` schema so list endpoints return consistent envelopes and safely support empty `data` arrays.
- Added standardized 4XX error responses and license metadata across the OnceHub API specification.
- Updated Scalar viewer configuration to use the latest options and improve API reference downloads.
