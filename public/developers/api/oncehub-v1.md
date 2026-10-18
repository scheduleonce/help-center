# ScheduleOnce API v1 (Deprecated)

- **OpenAPI Version:** `3.2.0`
- **API Version:** `1.0.0`

DEPRECATION NOTICE This API version (v1) is deprecated and will be removed in the future. **Please migrate to our current API:**

- [Booking Calendars API](/developers/api/)

New integrations should not use this API version.

## Contents

**Operations**

- [GET /test](#scalar-operation-get-test)
- [POST /webhooks](#scalar-operation-post-webhooks)
- [GET /webhooks](#scalar-operation-get-webhooks)
- [GET /webhooks/{id}](#scalar-operation-get-webhooksid)
- [DELETE /webhooks/{id}](#scalar-operation-delete-webhooksid)
- [GET /bookings](#scalar-operation-get-bookings)
- [GET /bookings/{id}](#scalar-operation-get-bookingsid)
- [GET /booking-pages](#scalar-operation-get-booking-pages)
- [GET /booking-pages/{id}](#scalar-operation-get-booking-pagesid)

<a id="scalar-context-global-servers"></a>

## Servers

- **URL:** `https://api.oncehub.com/v1`

<a id="scalar-context-global-authentication"></a>

## Authentication

- **sec0**: API key in header `API-Key`

## Operations

<a id="scalar-operation-get-test"></a>

### Validate API key

- **Method:** `GET`
- **Path:** `/test`
- **Operation ID:** `validate-api-key`

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Authentication

No authentication required.

#### Header parameters

- **`API-Key`**: `string`

  An api key from your OnceHub account

#### Responses

##### 200 200

**Content type:** `application/json`

- **`message`**: `string`

**Example: Result**

```json
"{\n  \"message\": \"The API key is valid for account: admin@example.com\"\n}"
```

##### 401 401

**Content type:** `application/json`

**One of:**

- `object`
  - **`message`**: `string`
  - **`type`**: `string`
- `object`
  - **`message`**: `string`
  - **`type`**: `string`

**Example: Result**

```json
"{\n  \"type\": \"authentication_error\",\n  \"message\": \"Expired API key. The key has been revoked by the account owner.\"\n}"
```

##### 403 403

**Content type:** `application/json`

- **`message`**: `string`
- **`type`**: `string`

**Example: Result**

```json
"{\n  \"type\": \"authentication_error\",\n  \"message\": \"Your account plan does not support API access. To use the ScheduleOnce API, you must upgrade to the Enterprise plan.\"\n}"
```

<a id="scalar-operation-post-webhooks"></a>

### Create Webhook

- **Method:** `POST`
- **Path:** `/webhooks`
- **Operation ID:** `create-webhook`

Creates a Webhook subscription.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Header parameters

- **`API-Key`**: `string`

  An api key from your OnceHub account

#### Request body

**Content type:** `application/json`

- **`events`**: `array of string`

  An array of Booking lifecycle events that will trigger the Webhook.
- **`name`**: `string`

  Unique name for your Webhook subscription. This name is only used by you for reference.
- **`url`**: `string`

  URL for receiving POST messages from OnceHub

<a id="scalar-example-1"></a>

**Generated example:**

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

##### 200 200

**Content type:** `application/json`

- **`creation_time`**: `string`
- **`events`**: `array of string`
- **`id`**: `string`
- **`name`**: `string`
- **`object`**: `string`
- **`url`**: `string`

**Example: Example response**

```json
"{\n  \"object\": \"webhook\",\n  \"id\": \"whk_164xRv2eZvKYlo2CZxJZWm1E\",\n  \"name\": \"New booking webhook\",\n  \"url\": \"https://mywebsite.com/webhooks/booking\",\n  \"events\": [\"booking.completed\", \"booking.rescheduled\"],\n  \"creation_time\": \"2017-09-06T20:57:17.467Z\"\n}"
```

<a id="scalar-operation-get-webhooks"></a>

### List all Webhooks

- **Method:** `GET`
- **Path:** `/webhooks`
- **Operation ID:** `list-webhooks`

Returns a list of your Webhook subscriptions, sorted by creation date.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Header parameters

- **`API-Key`**: `string`

  An api key from your OnceHub account

#### Responses

##### 200 200

**Content type:** `application/json`

**Example: Example response**

```json
"{\n  \"object\": \"list\",\n  \"data\": [\n    {\n      \"object\": \"webhook\",\n      \"id\": \"whk_164xRv2eZvKYlo2CZxJZWm1E\",\n      \"name\": \"New booking webhook\",\n      \"url\": \"https://mywebsite.com/webhooks/booking\",\n      \"events\": [\"booking.completed\", \"booking.rescheduled\"],\n      \"creation_time\": \"2017-09-06T20:57:17.467Z\"\n    },\n    {...},\n    {...}\n  ]\n}\n"
```

<a id="scalar-operation-get-webhooksid"></a>

### Get a single Webhook

- **Method:** `GET`
- **Path:** `/webhooks/{id}`
- **Operation ID:** `get-webhook`

Returns a single Webhook subscription by ID.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the Webhook

#### Header parameters

- **`API-Key`**: `string`

  An api key from your OnceHub account

#### Responses

##### 200 200

**Content type:** `application/json`

- **`creation_time`**: `string`
- **`events`**: `array of string`
- **`id`**: `string`
- **`name`**: `string`
- **`object`**: `string`
- **`url`**: `string`

**Example: Example response**

```json
"{\n  \"object\": \"webhook\",\n  \"id\": \"whk_164xRv2eZvKYlo2CZxJZWm1E\",\n  \"name\": \"New booking webhook\",\n  \"url\": \"https://mywebsite.com/webhooks/booking\",\n  \"events\": [\"booking.completed\", \"booking.rescheduled\"],\n  \"creation_time\": \"2017-09-06T20:57:17.467Z\"\n}"
```

<a id="scalar-operation-delete-webhooksid"></a>

### Delete Webhook

- **Method:** `DELETE`
- **Path:** `/webhooks/{id}`
- **Operation ID:** `delete-webhook`

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the Webhook to delete

#### Header parameters

- **`API-Key`**: `string`

  An api key from your OnceHub account

#### Responses

##### 200 200

**Content type:** `application/json`

- **`deleted`**: `boolean`, default: `true`
- **`id`**: `string`

**Example: Example response**

```json
"{\n  \"deleted\": true,\n  \"id\": \"whk_164xRv2eZvKYlo2CZxJZWm1E\"\n}"
```

<a id="scalar-operation-get-bookings"></a>

### List all bookings

- **Method:** `GET`
- **Path:** `/bookings`
- **Operation ID:** `list-all-bookings-draft`

List all the bookings in the account

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Query parameters

- **`booking_page`**: `string`

  Only return bookings from the given booking page.
- **`status`**: `string`

  Only return orders that have the given status.

#### Header parameters

- **`API-Key`**: `string`

  An api key from your OnceHub account

#### Responses

##### 200 200

**Content type:** `application/json`

**Example: Result**

```json
"{\n  \"object\": \"list\",\n  \"data\": [\n    {\n      \"object\": \"booking\",\n      \"tracking_id\": \"D36E0002\",\n      \"subject\": \"Budget management\",\n      \"status\": \"Scheduled\",\n      \"creation_time\": \"2018-03-22T09:48:48Z\",\n      \"starting_time\": \"2018-03-22T04:30:00Z\",\n      \"owner\": \"Andrea Hartie\",\n      \"package_id\": null,\n      \"duration_minutes\": 60,\n      \"virtual_or_physical_location\": \"1600 Pennsylvania Avenue\",\n      \"customer_time_zone_description\": \"(GMT-5) United States; Eastern time\",\n      \"cancel_reschedule_link\": \"https://go.oncehub.com/financefirm?Params=IPLa6BkbZ-QjWTEeZH3cb7afCgcinMNuLvaH-7mTZO4\",\n      \"canceled_booking_tracking_id\": null,\n      \"cancel_reschedule_reason\": null,\n      \"name_of_user_who_canceled_rescheduled\": null,\n      \"name_of_customer_who_canceled_rescheduled\": null,\n      \"form_submission\": {\n        \"name\": \"Carrie Customer\",\n        \"email\": \"so.carrie.customer@gmail.com\",\n        \"phone\": \"\",\n        \"mobile_phone\": \"1-2025550195\",\n        \"note\": \"I want to discuss how to save more money each month.\",\n        \"company\": null,\n        \"guests\": [\"\"],\n        \"custom_fields\": [\n          { \"name\": \"Profession\", \"value\": \"Executive assistant\" },\n          { \"name\": \"Earned income\", \"value\": \"35,000 USD\" },\n          { \"name\": \"Passive income\", \"value\": \"None\" }\n        ]\n      },\n      \"booking_page\": {\n        \"public_name\": \"Andrea Hartie\",\n        \"internal_label\": \"AndreaHartie\",\n        \"link\": \"https://go.oncehub.com/andreahartie\",\n        \"category\": \"Financial planning firm\",\n        \"time_zone_description\": \"(GMT-5) United States; Eastern time\"\n      },\n      \"master_page\": {\n        \"name\": \"Financial Services Inc.\",\n        \"label\": \"financefirm\",\n        \"link\": \"https://go.oncehub.com/financefirm\"\n      },\n      \"event_type\": {\n        \"name\": \"Budget management\",\n        \"description\": \"We analyze your current income, expenses and debt. From this we work with you to create a sound financial plan that will allow you to enjoy life and meet your financial obligations simultaneously.\",\n        \"category\": \"Budgeting & Saving\"\n      },\n      \"external_calendar\": {\n        \"type\": \"Google\",\n        \"name\": \"andrea.hartie@example.com\",\n        \"id\": \"andrea.hartie@example.com\",\n        \"event_id\": \"8kvu74dda8kcv0gmmlm3folrhc\"\n      }\n    },\n    {...},\n    {...}\n  ]\n}\n"
```

##### 404 404

**Content type:** `application/json`

- **`message`**: `string`
- **`type`**: `string`

**Example: Result**

```json
"{\n  \"type\": \"invalid_request_error\",\n  \"message\": \"No existing booking with this ID can be found.\"\n}"
```

<a id="scalar-operation-get-bookingsid"></a>

### Get a single booking

- **Method:** `GET`
- **Path:** `/bookings/{id}`
- **Operation ID:** `get-a-single-booking-draft`

Returns a single booking by ID

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the booking

#### Header parameters

- **`API-Key`**: `string`

  An api key from your OnceHub account

#### Responses

##### 200 200

**Content type:** `application/json`

- **`booking_page`**: `object`
  - **`category`**: `string`
  - **`internal_label`**: `string`
  - **`link`**: `string`
  - **`public_name`**: `string`
  - **`time_zone_description`**: `string`
- **`cancel_reschedule_link`**: `string`
- **`cancel_reschedule_reason`**: `any`
- **`canceled_booking_tracking_id`**: `any`
- **`creation_time`**: `string`
- **`customer_time_zone_description`**: `string`
- **`duration_minutes`**: `integer`, default: `0`
- **`event_type`**: `object`
  - **`category`**: `string`
  - **`description`**: `string`
  - **`name`**: `string`
- **`external_calendar`**: `object`
  - **`event_id`**: `string`
  - **`id`**: `string`
  - **`name`**: `string`
  - **`type`**: `string`
- **`form_submission`**: `object`
  - **`company`**: `any`
  - **`custom_fields`**: `array`

    **Items:**
    - **`name`**: `string`
    - **`value`**: `string`
  - **`email`**: `string`
  - **`guests`**: `array of string`
  - **`mobile_phone`**: `string`
  - **`name`**: `string`
  - **`note`**: `string`
  - **`phone`**: `string`
- **`master_page`**: `object`
  - **`label`**: `string`
  - **`link`**: `string`
  - **`name`**: `string`
- **`name_of_customer_who_canceled_rescheduled`**: `any`
- **`name_of_user_who_canceled_rescheduled`**: `any`
- **`object`**: `string`
- **`owner`**: `string`
- **`package_id`**: `any`
- **`starting_time`**: `string`
- **`status`**: `string`
- **`subject`**: `string`
- **`tracking_id`**: `string`
- **`virtual_or_physical_location`**: `string`

**Example: Result**

```json
"{\n  \"object\": \"booking\",\n  \"tracking_id\": \"D36E0002\",\n  \"subject\": \"Budget management\",\n  \"status\": \"Scheduled\",\n  \"creation_time\": \"2018-03-22T09:48:48Z\",\n  \"starting_time\": \"2018-03-22T04:30:00Z\",\n  \"owner\": \"Andrea Hartie\",\n  \"package_id\": null,\n  \"duration_minutes\": 60,\n  \"virtual_or_physical_location\": \"1600 Pennsylvania Avenue\",\n  \"customer_time_zone_description\": \"(GMT-5) United States; Eastern time\",\n  \"cancel_reschedule_link\": \"https://go.oncehub.com/financefirm?Params=IPLa6BkbZ-QjWTEeZH3cb7afCgcinMNuLvaH-7mTZO4\",\n  \"canceled_booking_tracking_id\": null,\n  \"cancel_reschedule_reason\": null,\n  \"name_of_user_who_canceled_rescheduled\": null,\n  \"name_of_customer_who_canceled_rescheduled\": null,\n  \"form_submission\": {\n    \"name\": \"Carrie Customer\",\n    \"email\": \"so.carrie.customer@gmail.com\",\n    \"phone\": \"\",\n    \"mobile_phone\": \"1-2025550195\",\n    \"note\": \"I want to discuss how to save more money each month.\",\n    \"company\": null,\n    \"guests\": [\"\"],\n    \"custom_fields\": [\n      { \"name\": \"Profession\", \"value\": \"Executive assistant\" },\n      { \"name\": \"Earned income\", \"value\": \"35,000 USD\" },\n      { \"name\": \"Passive income\", \"value\": \"None\" }\n    ]\n  },\n  \"booking_page\": {\n    \"public_name\": \"Andrea Hartie\",\n    \"internal_label\": \"AndreaHartie\",\n    \"link\": \"https://go.oncehub.com/andreahartie\",\n    \"category\": \"Financial planning firm\",\n    \"time_zone_description\": \"(GMT-5) United States; Eastern time\"\n  },\n  \"master_page\": {\n    \"name\": \"Financial Services Inc.\",\n    \"label\": \"financefirm\",\n    \"link\": \"https://go.oncehub.com/financefirm\"\n  },\n  \"event_type\": {\n    \"name\": \"Budget management\",\n    \"description\": \"We analyze your current income, expenses and debt. From this we work with you to create a sound financial plan that will allow you to enjoy life and meet your financial obligations simultaneously.\",\n    \"category\": \"Budgeting & Saving\"\n  },\n  \"external_calendar\": {\n    \"type\": \"Google\",\n    \"name\": \"andrea.hartie@example.com\",\n    \"id\": \"andrea.hartie@example.com\",\n    \"event_id\": \"8kvu74dda8kcv0gmmlm3folrhc\"\n  }\n}"
```

##### 404 404

**Content type:** `application/json`

- **`message`**: `string`
- **`type`**: `string`

**Example: Result**

```json
"{\n  \"type\": \"invalid_request_error\",\n  \"message\": \"No existing booking with this ID can be found.\"\n}"
```

<a id="scalar-operation-get-booking-pages"></a>

### List all booking pages

- **Method:** `GET`
- **Path:** `/booking-pages`
- **Operation ID:** `list-all-booking-pages-draft`

List all the booking pages in the account

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Header parameters

- **`API-Key`**: `string`

  An api key from your OnceHub account

#### Responses

##### 200 200

**Content type:** `application/json`

**Example: Result**

```json
"{\n  \"object\": \"list\",\n  \"data\": [\n    {\n      \"id\": \"BP-3F7JAWT4UA\",\n      \"object\": \"booking_page\",\n      \"public_name\": \"Andrea Hartie\",\n      \"internal_label\": \"AndreaHartie\",\n      \"link\": \"https://go.oncehub.com/andreahartie\",\n      \"category\": \"Financial planning firm\",\n      \"time_zone_description\": \"(GMT-5) United States; Eastern time\"\n    },\n    {...},\n    {...}\n  ]\n}\n"
```

##### 400 400

**Content type:** `application/json`

`object`

**Example: Result**

```json
"{}"
```

<a id="scalar-operation-get-booking-pagesid"></a>

### Get a single booking page

- **Method:** `GET`
- **Path:** `/booking-pages/{id}`
- **Operation ID:** `retrieve-a-booking-page-draft`

Returns a single booking page by ID.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the booking page

#### Header parameters

- **`API-Key`**: `string`

  An api key from your OnceHub account

#### Responses

##### 200 200

**Content type:** `application/json`

- **`category`**: `string`
- **`id`**: `string`
- **`internal_label`**: `string`
- **`link`**: `string`
- **`object`**: `string`
- **`public_name`**: `string`
- **`time_zone_description`**: `string`

**Example: Result**

```json
"{\n  \"id\": \"BP-3F7JAWT4UA\",\n  \"object\": \"booking_page\",\n  \"public_name\": \"Andrea Hartie\",\n  \"internal_label\": \"AndreaHartie\",\n  \"link\": \"https://go.oncehub.com/andreahartie\",\n  \"category\": \"Financial planning firm\",\n  \"time_zone_description\": \"(GMT-5) United States; Eastern time\"\n}"
```

##### 400 400

**Content type:** `application/json`

`object`

**Example: Result**

```json
"{}"
```
