---
title: Embedded chatbot events
description: Listen to real-time events from embedded OnceHub chatbot widgets including loaded, opened, started, closed, and button click events.
products:
  - oncehub
  - scheduleonce
---

# Embedded chatbot events

## List of supported events

| Event name                       | Fires when                                                                     |
| :------------------------------- | :----------------------------------------------------------------------------- |
| `oncehub.chatbot.loaded`         | Chatbot widget is first loaded, on page load.                                  |
| `oncehub.chatbot.opened`         | Visitor clicks anywhere to interact with the chatbot.                          |
| `oncehub.chatbot.started`        | Visitor starts interacting with the chatbot.                                   |
| `oncehub.chatbot.closed`         | Visitor closes the chatbot widget.                                             |
| `oncehub.chatbot.button_clicked` | Visitor submits an answer in the chatbot (by clicking send or pressing enter). |

## Events payloads

### `oncehub.chatbot.loaded`

Payload example:

```json
{
  "type": "oncehub.chatbot.loaded",
  "payload": {
    "bot_id": "BOT-1234",
    "bot_name": "example bot"
  }
}
```

### `oncehub.chatbot.opened`

Payload example:

```json
{
  "type": "oncehub.chatbot.opened",
  "payload": {
    "bot_id": "BOT-1234",
    "bot_name": "example bot"
  }
}
```

### `oncehub.chatbot.started`

Payload example:

```json
{
  "type": "oncehub.chatbot.started",
  "payload": {
    "bot_id": "BOT-1234",
    "bot_name": "example bot"
  }
}
```

### `oncehub.chatbot.closed`

Payload example:

```json
{
  "type": "oncehub.chatbot.closed",
  "payload": {
    "bot_id": "BOT-1234",
    "bot_name": "example bot"
  }
}
```

### `oncehub.chatbot.button_clicked`

Payload example:

```json
{
  "type": "oncehub.chatbot.button_clicked",
  "payload": {
    "bot_id": "BOT-1234",
    "bot_name": "example bot",
    "button_text": "confirm",
    "interaction_label": "single_choice",
    "question_text": "Sales Team Calendar",
    "answer": "100-500"
  }
}
```

:::note
This event triggers whenever a visitor submits an answer in the chatbot (e.g., selecting an option, typing a response, or confirming), but does not trigger for AI-generated responses or live chat sessions with human agents.
:::
