---
title: Getting Started with OnceHub Platform MCP Server
description: Step-by-step guide to configure your AI Agent with the OnceHub Platform MCP Server for automated meeting scheduling.
products:
  - oncehub
---

This section guides you through setting up your environment to use the OnceHub Platform MCP Server. The MCP Server is intended for developers and users familiar with the Model Context Protocol.

To begin, configure your AI Agent with the required server details and API key.

## Step 1: Get your API Key

1. Log in to your OnceHub account.
2. Click the gear icon in the top-right corner.
3. Select **Account Integrations** from the dropdown menu.
4. Click the **APIs & Webhooks** section to generate a unique API Key.

Your AI Agent will use this API Key for authentication.

## Step 2: Configure your MCP Client

Point your MCP-compatible AI Agent or application to the OnceHub Platform MCP Server endpoint:

```
https://mcp.oncehub.com/sse
```

Your AI Agent must include your API key in the request header as follows:

| Header Name | Value            |
| ----------- | ---------------- |
| `API-Key`   | `[Your API Key]` |

Example MCP configuration:

```json
{
  "servers": {
    "oncehub": {
      "url": "https://mcp.oncehub.com/sse",
      "type": "http",
      "headers": {
        "authorization": "Bearer YOUR_ONCEHUB_API_KEY"
      }
    }
  }
}
```

Replace `YOUR_ONCEHUB_API_KEY` with your actual OnceHub API Key.

For details on generating and managing API keys, see [Authentication](/developers/overview/authentication).

## Step 3: Start scheduling by integrating the tool calls

Integrate the two MCP tools into your AI Agent's normal conversation flow. To ensure the Agent interacts with the correct Booking Calendar, you must include the specific Booking Calendar ID in the Agent's system prompt or tool configuration.

- Use **Get available time slots** (`get_booking_time_slots`) to retrieve available meeting slots for your specific Booking Calendar ID.
- Once a time is confirmed, call **Schedule a meeting** (`schedule_meeting`) to create the appointment.

Once configured, your AI Agent can check availability and schedule meetings entirely through natural-language interaction with you.

**Prompting Tip**
In your AI Agent's system instructions, specify which Booking Calendar it should work with. For example:

> "If the user needs to meet with a specialist, offer to schedule a meeting using the MCP scheduling tools with Booking Calendar ID: BKC-XXXXXXXX."
