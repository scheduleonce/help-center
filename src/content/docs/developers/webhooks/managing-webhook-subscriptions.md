---
title: Managing Webhook Subscriptions
description: Create, retrieve, and delete webhook subscriptions via the API or OnceHub application to manage your event notifications.
products:
  - oncehub
  - scheduleonce
---

## Managing Webhook Subscriptions via the API

The Webhook API allows you to create, retrieve, and delete your webhook subscriptions.

Create new webhook subscriptions by sending a POST request to the **/webhooks** endpoint. The User must specify the name of the webhook subscription; no two webhooks associated with the same account can share the same name. Each webhook is also assigned a unique and secure alphanumeric ID when it is created. [Learn more about creating Webhooks via the API](/developers/api/#tag/webhooks/POST/webhooks)

You can retrieve a list of all webhook subscriptions associated with your account by passing a GET request to the **/webhooks** endpoint. You can also retrieve a single webhook subscription by passing the ID of the desired webhook object. [Learn more about retrieving Webhooks via the API](/developers/api/#tag/webhooks/GET/webhooks)

If for some reason you need to delete your webhook subscriptions, you can do so by sending a DELETE request to the **/webhooks** endpoint, along with the ID of the webhook you wish to delete. [Learn more about deleting Webhooks via the API](/developers/api/#tag/webhooks/DELETE/webhooks/%7Bid%7D)

## Managing Webhook Subscriptions via the OnceHub Application

Administrators can create and manage webhook subscriptions through the APIs & Webhooks section of the OnceHub application.

Once created, you can view, manage, or delete these subscriptions directly on the <a target="_blank" href="https://app.oncehub.com/integrations/api"> API & Webhooks Integration page</a>.

### Create a Webhook

1. Click the gear icon (top-right) and select **Account Integrations**.
2. Select the **APIs & Webhooks** tile.
3. In the Webhooks section, click the **Create Webhook** button.
4. In the pop-up, provide the following details:
   - **Webhook Name:** A unique, descriptive name (must contain at least one alphanumeric character).
   - **Webhook URL:** The destination address (must start with `https://`).
5. Click **Next** and select the specific events that should trigger the payload.
6. Click **Create**. A **Webhook Secret** will be displayed. Click **Copy & close** to save this secret immediately. It is required to verify that the received data is authentic.

![API integration - Webhook subscription list](/img/screenshots/api-integration-webhook-subscription-list.png)
_Figure 1: API & Webhooks integration page - Webhook subscription list_
