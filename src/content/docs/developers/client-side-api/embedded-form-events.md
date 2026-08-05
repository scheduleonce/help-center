---
title: Embedded form events
description: Track user interactions with embedded OnceHub forms through events including loaded, started, button clicked, and completed events.
products:
  - oncehub
---

# Embedded form events

## List of supported events

| Event name                    | Fires when                                                     |
| ----------------------------- | -------------------------------------------------------------- |
| `oncehub.form.loaded`         | Form is first loaded.                                          |
| `oncehub.form.started`        | Visitor starts interacting with the form.                      |
| `oncehub.form.button_clicked` | Visitor clicks on a button during the form submission process. |
| `oncehub.form.completed`      | Visitor successfully completes the form.                       |

## Events payloads

### `oncehub.form.loaded`

This event fires when the form is first loaded, before the user has interacted with it.

Payload example:

```json
{
  "type": "oncehub.form.loaded",
  "payload": {
    "form_id": "BOT-1033739F74",
    "form_name": "Example Form"
  }
}
```

### `oncehub.form.started`

This event fires when the visitor begins interacting with the form. This trigger varies based on the form's welcome message setting:

- **Title only:** The event fires when the visitor answers the first question.
- **Welcome message card:** The event fires when the visitor clicks the "Get Started" button.

Payload example:

```json
{
  "type": "oncehub.form.started",
  "payload": {
    "form_id": "BOT-1033739F74",
    "form_name": "Example Form"
  }
}
```

### `oncehub.form.button_clicked`

This event fires whenever a visitor clicks a button within an interaction. The payload will include standard fields and may also contain custom fields if they have been mapped to the form question.

Payload example:

```json
{
  "type": "oncehub.form.button_clicked",
  "payload": {
    "form_id": "BOT-1033739F74",
    "form_name": "Example Form",
    "button_text": "Next",
    "interaction_label": "single_choice",
    "question_text": "Sales Team Calendar",
    "company_size": "100-500"
  }
}
```

### `oncehub.form.completed`

This event is triggered only when the form is successfully completed by the visitor.

Payload example:

```json
{
  "type": "oncehub.form.completed",
  "payload": {
    "form_id": "BOT-1033739F74",
    "form_name": "Example Form"
  }
}
```
