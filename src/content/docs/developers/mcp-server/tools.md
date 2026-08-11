---
title: MCP Server Tools
oldUrl: "https://developers.oncehub.com/docs/mcp-server/tools/"
description: Reference documentation for the Get available time slots and Schedule a meeting tools.
products:
  - oncehub
---

The MCP Server exposes a set of tools that follow the same logic and rules as the existing OnceHub Booking API, but are accessed through the standardized MCP layer.

## 1. Get Available Time Slots

The **Get available time slots** (`get_booking_time_slots`) tool allows an AI Agent to retrieve a list of bookable times for a specific Booking Calendar.

### Function

Retrieves a list of valid bookable time slots within a specified date range.

### How It Works

The tool queries your Booking Calendar's configuration to identify valid available time slots. It respects all supported scheduling settings found on the Booking Settings tab, including:

- Availability
- Busy times from connected calendar
- Buffer settings

:::note
The only exception to the Booking Settings tab is Bookable days; instead the search window is determined by the specific date range provided in the tool request.
:::

### Date Range Rules

- The date range (start → end) must be less than or equal to 30 days.
- If no range is provided, the tool searches the next 7 days by default.
- The start date cannot be in the past.

### Usage

This tool must be the first step in a conversational booking process.

For example, you might ask an AI Agent:

> "Find me a time slot next Tuesday morning."

The AI Agent calls this tool to obtain available times for you to choose from.

## 2. Schedule A Meeting

The **Schedule a meeting** (`schedule_meeting`) tool allows an AI Agent to book a specific time slot on a Booking Calendar.

### Function

Creates a new booking on a Booking Calendar at a time selected from the available slots.

### How It Works

Once you choose a time slot from the results of **Get available time slots**, the AI Agent calls this tool and sends the required details:

- Guest name
- Guest email
- Selected Date: Format: `YYYY-MM-DDTHH:MM:SSZ`
- Start Time: Must be provided in ISO 8601 format
- Time Zone: Must be provided in IANA Time Zone format (e.g., `America/New_York`)
- Location (must match with the one returned from previous step)

The tool then finalizes and creates the booking for you.

### Usage

After presenting time options and receiving user confirmation, the AI Agent calls this tool to book the appointment.
