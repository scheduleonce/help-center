# ScheduleOnce API v1 (Deprecated)

- **OpenAPI Version:** `3.1.0`
- **API Version:** `1.0.0`

DEPRECATION NOTICE This API version (v1) is deprecated and will be removed in the future. **Please migrate to our current API:**

- [Booking Calendars API](/developers/api/)

New integrations should not use this API version.

## Servers

- **URL:** `https://api.oncehub.com/v1`

## Operations

### Validate API key

- **Method:** `GET`
- **Path:** `/test`

#### Parameters

##### `API-Key`

- **In:** `header`

An api key from your OnceHub account

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`message`**

  `string`

**Example:**

```json
{
  "message": "The API key is valid for account: admin@example.com"
}
```

##### Status: 401 401

###### Content-Type: application/json

**One of:**

- **`message`**

  `string`

- **`type`**

  `string`

* **`message`**

  `string`

* **`type`**

  `string`

**Example:**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### Status: 403 403

###### Content-Type: application/json

- **`message`**

  `string`

- **`type`**

  `string`

**Example:**

```json
{
  "type": "authentication_error",
  "message": "Your account plan does not support API access. To use the ScheduleOnce API, you must upgrade to the Enterprise plan."
}
```

### Create Webhook

- **Method:** `POST`
- **Path:** `/webhooks`

Creates a Webhook subscription.

#### Parameters

##### `API-Key`

- **In:** `header`

An api key from your OnceHub account

`string`

#### Request Body

##### Content-Type: application/json

- **`events`**

  `array` — An array of Booking lifecycle events that will trigger the Webhook.

  **Items:**

  `string`

- **`name`**

  `string` — Unique name for your Webhook subscription. This name is only used by you for reference.

- **`url`**

  `string` — URL for receiving POST messages from OnceHub

**Example:**

```json
{
  "url": "",
  "name": "",
  "events": [
    ""
  ]
}
```

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`creation_time`**

  `string`

- **`events`**

  `array`

  **Items:**

  `string`

- **`id`**

  `string`

- **`name`**

  `string`

- **`object`**

  `string`

- **`url`**

  `string`

**Example:**

```json
{
  "object": "webhook",
  "id": "whk_164xRv2eZvKYlo2CZxJZWm1E",
  "name": "New booking webhook",
  "url": "https://mywebsite.com/webhooks/booking",
  "events": [
    "booking.completed"
  ],
  "creation_time": "2017-09-06T20:57:17.467Z"
}
```

### List all Webhooks

- **Method:** `GET`
- **Path:** `/webhooks`

Returns a list of your Webhook subscriptions, sorted by creation date.

#### Parameters

##### `API-Key`

- **In:** `header`

An api key from your OnceHub account

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

### Get a single Webhook

- **Method:** `GET`
- **Path:** `/webhooks/{id}`

Returns a single Webhook subscription by ID.

#### Parameters

##### `API-Key`

- **In:** `header`

An api key from your OnceHub account

`string`

##### `id` required

- **In:** `path`

ID of the Webhook

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`creation_time`**

  `string`

- **`events`**

  `array`

  **Items:**

  `string`

- **`id`**

  `string`

- **`name`**

  `string`

- **`object`**

  `string`

- **`url`**

  `string`

**Example:**

```json
{
  "object": "webhook",
  "id": "whk_164xRv2eZvKYlo2CZxJZWm1E",
  "name": "New booking webhook",
  "url": "https://mywebsite.com/webhooks/booking",
  "events": [
    "booking.completed"
  ],
  "creation_time": "2017-09-06T20:57:17.467Z"
}
```

### Delete Webhook

- **Method:** `DELETE`
- **Path:** `/webhooks/{id}`

#### Parameters

##### `API-Key`

- **In:** `header`

An api key from your OnceHub account

`string`

##### `id` required

- **In:** `path`

ID of the Webhook to delete

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`deleted`**

  `boolean`, default: `true`

- **`id`**

  `string`

**Example:**

```json
{
  "deleted": true,
  "id": "whk_164xRv2eZvKYlo2CZxJZWm1E"
}
```

### List all bookings

- **Method:** `GET`
- **Path:** `/bookings`

List all the bookings in the account

#### Parameters

##### `API-Key`

- **In:** `header`

An api key from your OnceHub account

`string`

##### `booking_page`

- **In:** `query`

Only return bookings from the given booking page.

`string`

##### `status`

- **In:** `query`

Only return orders that have the given status.

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

##### Status: 404 404

###### Content-Type: application/json

- **`message`**

  `string`

- **`type`**

  `string`

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No existing booking with this ID can be found."
}
```

### Get a single booking

- **Method:** `GET`
- **Path:** `/bookings/{id}`

Returns a single booking by ID

#### Parameters

##### `id` required

- **In:** `path`

ID of the booking

`string`

##### `API-Key`

- **In:** `header`

An api key from your OnceHub account

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`booking_page`**

  `object`

  - **`category`**

    `string`

  - **`internal_label`**

    `string`

  - **`link`**

    `string`

  - **`public_name`**

    `string`

  - **`time_zone_description`**

    `string`

- **`cancel_reschedule_link`**

  `string`

- **`cancel_reschedule_reason`**

  `object`

- **`canceled_booking_tracking_id`**

  `object`

- **`creation_time`**

  `string`

- **`customer_time_zone_description`**

  `string`

- **`duration_minutes`**

  `integer`, default: `0`

- **`event_type`**

  `object`

  - **`category`**

    `string`

  - **`description`**

    `string`

  - **`name`**

    `string`

- **`external_calendar`**

  `object`

  - **`event_id`**

    `string`

  - **`id`**

    `string`

  - **`name`**

    `string`

  - **`type`**

    `string`

- **`form_submission`**

  `object`

  - **`company`**

    `object`

  - **`custom_fields`**

    `array`

    **Items:**

    - **`name`**

      `string`

    - **`value`**

      `string`

  - **`email`**

    `string`

  - **`guests`**

    `array`

    **Items:**

    `string`

  - **`mobile_phone`**

    `string`

  - **`name`**

    `string`

  - **`note`**

    `string`

  - **`phone`**

    `string`

- **`master_page`**

  `object`

  - **`label`**

    `string`

  - **`link`**

    `string`

  - **`name`**

    `string`

- **`name_of_customer_who_canceled_rescheduled`**

  `object`

- **`name_of_user_who_canceled_rescheduled`**

  `object`

- **`object`**

  `string`

- **`owner`**

  `string`

- **`package_id`**

  `object`

- **`starting_time`**

  `string`

- **`status`**

  `string`

- **`subject`**

  `string`

- **`tracking_id`**

  `string`

- **`virtual_or_physical_location`**

  `string`

**Example:**

```json
{
  "object": "booking",
  "tracking_id": "D36E0002",
  "subject": "Budget management",
  "status": "Scheduled",
  "creation_time": "2018-03-22T09:48:48Z",
  "starting_time": "2018-03-22T04:30:00Z",
  "owner": "Andrea Hartie",
  "package_id": null,
  "duration_minutes": 60,
  "virtual_or_physical_location": "1600 Pennsylvania Avenue",
  "customer_time_zone_description": "(GMT-5) United States; Eastern time",
  "cancel_reschedule_link": "https://go.oncehub.com/financefirm?Params=IPLa6BkbZ-QjWTEeZH3cb7afCgcinMNuLvaH-7mTZO4",
  "canceled_booking_tracking_id": null,
  "cancel_reschedule_reason": null,
  "name_of_user_who_canceled_rescheduled": null,
  "name_of_customer_who_canceled_rescheduled": null,
  "form_submission": {
    "name": "Carrie Customer",
    "email": "so.carrie.customer@gmail.com",
    "phone": "",
    "mobile_phone": "1-2025550195",
    "note": "I want to discuss how to save more money each month.",
    "company": null,
    "guests": [
      ""
    ],
    "custom_fields": [
      {
        "name": "Profession",
        "value": "Executive assistant"
      }
    ]
  },
  "booking_page": {
    "public_name": "Andrea Hartie",
    "internal_label": "AndreaHartie",
    "link": "https://go.oncehub.com/andreahartie",
    "category": "Financial planning firm",
    "time_zone_description": "(GMT-5) United States; Eastern time"
  },
  "master_page": {
    "name": "Financial Services Inc.",
    "label": "financefirm",
    "link": "https://go.oncehub.com/financefirm"
  },
  "event_type": {
    "name": "Budget management",
    "description": "We analyze your current income, expenses and debt. From this we work with you to create a sound financial plan that will allow you to enjoy life and meet your financial obligations simultaneously.",
    "category": "Budgeting & Saving"
  },
  "external_calendar": {
    "type": "Google",
    "name": "andrea.hartie@example.com",
    "id": "andrea.hartie@example.com",
    "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
  }
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message`**

  `string`

- **`type`**

  `string`

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No existing booking with this ID can be found."
}
```

### List all booking pages

- **Method:** `GET`
- **Path:** `/booking-pages`

List all the booking pages in the account

#### Parameters

##### `API-Key`

- **In:** `header`

An api key from your OnceHub account

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

##### Status: 400 400

###### Content-Type: application/json

**Example:**

```json
{}
```

### Get a single booking page

- **Method:** `GET`
- **Path:** `/booking-pages/{id}`

Returns a single booking page by ID.

#### Parameters

##### `id` required

- **In:** `path`

ID of the booking page

`string`

##### `API-Key`

- **In:** `header`

An api key from your OnceHub account

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`category`**

  `string`

- **`id`**

  `string`

- **`internal_label`**

  `string`

- **`link`**

  `string`

- **`object`**

  `string`

- **`public_name`**

  `string`

- **`time_zone_description`**

  `string`

**Example:**

```json
{
  "id": "BP-3F7JAWT4UA",
  "object": "booking_page",
  "public_name": "Andrea Hartie",
  "internal_label": "AndreaHartie",
  "link": "https://go.oncehub.com/andreahartie",
  "category": "Financial planning firm",
  "time_zone_description": "(GMT-5) United States; Eastern time"
}
```

##### Status: 400 400

###### Content-Type: application/json

**Example:**

```json
{}
```
