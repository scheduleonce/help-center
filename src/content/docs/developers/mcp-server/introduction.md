---
title: Introduction to the Model Context Protocol (MCP) Server
description: Learn how to use the OnceHub Platform MCP Server to enable AI agents to automate meeting scheduling through natural language interaction.
products:
  - oncehub
  - scheduleonce
---

# Introduction to the Model Context Protocol (MCP) Server

## What is the OnceHub Platform MCP Server?

The OnceHub Platform MCP Server provides a standardized way for AI models and agents to interact directly with your OnceHub scheduling API. Rather than sending users a booking link and asking them to schedule manually, an AI Agent can retrieve availability and schedule meetings on the user's behalf using MCP tools, through a natural language flow.

This solution enables external AI Agents to access OnceHub scheduling APIs within AI-driven workflows using the standardized Model Context Protocol (MCP) remote server.

## Use Cases

The OnceHub Platform MCP Server is ideal for organizations that:

- Enable AI Agents to automate the meeting scheduling process by calling specialized tools to fetch available slots and schedule meetings during a live conversation.

## Primary Endpoint

AI Agents communicate with the OnceHub scheduling system through the following public MCP endpoint:

```
https://mcp.oncehub.com/sse
```

You must configure this endpoint in your MCP compatible AI Agent to begin interacting with the scheduling tools.
