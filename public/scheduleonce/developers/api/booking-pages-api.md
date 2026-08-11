# OnceHub Booking Pages API

- **OpenAPI Version:** `3.1.0`
- **API Version:** `2.0.0`

The OnceHub Booking Pages API allows you to manage bookings, booking pages, master pages, and scheduling resources programmatically.

**Note:** This documentation is for the Booking Pages product (legacy). While still supported, we recommend using Booking Calendars for new implementations.

## Servers

- **URL:** `https://api.oncehub.com/v2`

## Operations

### Validate API key

- **Method:** `GET`
- **Path:** `/test`
- **Tags:** Authentication

Enter your API key in the headers section below and click on "Try it" to test it.

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

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 403 403 - Forbidden

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### List all bookings

- **Method:** `GET`
- **Path:** `/bookings`
- **Tags:** Bookings

Returns a list of all bookings in the account

#### Parameters

##### `status`

- **In:** `query`

Only return bookings that have the given status.

`string`

##### `owner`

- **In:** `query`

Only return booking owned by a user with a specific user ID.

`string`

##### `contact`

- **In:** `query`

Only return bookings that were scheduled with the contact with the provided ID.

`string`

##### `booking_page`

- **In:** `query`

Only return bookings that were created from the booking page with the provided ID.

`string`

##### `master_page`

- **In:** `query`

Only return bookings that were created from the master page with the provided ID.

`string`

##### `event_type`

- **In:** `query`

Only return bookings that were created using the event type with the provided ID.

`string`

##### `creation_time.gt`

- **In:** `query`

Return bookings with creation time greater than the given date.

`string`, format: `date`

##### `creation_time.lt`

- **In:** `query`

Return bookings with creation time less than the given date.

`string`, format: `date`

##### `starting_time.gt`

- **In:** `query`

Return bookings with starting time greater than the given date.

`string`, format: `date`

##### `starting_time.lt`

- **In:** `query`

Return bookings with starting time less than the given date.

`string`, format: `date`

##### `last_updated_time.gt`

- **In:** `query`

Return bookings with last updated time greater than the given date.

`string`, format: `date`

##### `last_updated_time.lt`

- **In:** `query`

Return bookings with last updated time less than the given date.

`string`, format: `date`

##### `expand`

- **In:** `query`

A comma separated list of fields that you want to [expand](/docs/overview/expanding-responses). Possible values are `owner`, `contact`, `conversation`.

`string`

##### `before`

- **In:** `query`

A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, starting with `OBJ-XXXX`, your subsequent call can include `before=OBJ-XXXX` in order to fetch the previous page of the list.

`string`

##### `after`

- **In:** `query`

A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, ending with `OBJ-XXXX`, your subsequent call can include `after=OBJ-XXXX` in order to fetch the next page of the list.

`string`

##### `limit`

- **In:** `query`

Determines the number of objects that will be returned on each page. Defaults to 10 if not specified and has a maximum limit of 100 objects per page.

`integer`, default: `10`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`data`**

  `array`

  **Items:**

  **All of:**

  - **`attendees`**

    `array` — List of all meeting attendees (emails).

    **Items:**

    `string`

  - **`booking_page`**

    `object` — The ID of the booking page used to make the booking. \*\*Expandable\*\*: Use \`expand=booking\_page\` to include the full BookingPage object.

  - **`cancel_reschedule_information`**

    `object | null` — An object containing information about the cancel / reschedule event. This field is \`null\` if the booking has not been cancelled or rescheduled.

  - **`creation_time`**

    `string`, format: `date-time` — The date and time when the booking was created.

  - **`custom_fields`**

    `array` — Any custom fields that have been added to the field library for the meeting object type on your account will be listed in the array of custom fields.

    **Items:**

    - **`name`**

      `string` — Name of the custom field.

    - **`value`**

      `object` — Value of the custom field.

  - **`customer_timezone`**

    `string` — The timezone selected by the customer when making the booking. Displayed in IANA timezone format.

  - **`duration_minutes`**

    `integer` — The length of the meeting, in minutes.

  - **`event_type`**

    `object` — The ID of the service selected by customer. \*\*Expandable\*\*: Use \`expand=event\_type\` to include the full EventType object.

  - **`external_calendar`**

    `object` — Object containing information about the calendar used in the booking.

    - **`event_id`**

      `string` — The id of the booking event that was created in the external calendar.

    - **`id`**

      `string` — The ID of the external calendar to which the booking was added.

    - **`name`**

      `string` — The name of the external calendar to which the booking was added.

    - **`type`**

      `string`, possible values: `"google", "exchange", "office_365", "icloud"` — Type of calendar

  - **`form_submission`**

    `object` — The object containing information entered by the customer into the booking form. This will include any system fields and custom fields defined in your booking form.

    - **`company`**

      `string | null` — The company provided by your customer in the booking form.

    - **`custom_fields`**

      `array` — The array containing custom Booking form fields.

      **Items:**

      - **`name`**

        `string`

      - **`value`**

        `object` — Value of the custom field.

    - **`email`**

      `string` — The email provided by the customer in the booking form.

    - **`guests`**

      `array` — List of additional attendees (emails) invited by the customer.

      **Items:**

      `string`

    - **`mobile_phone`**

      `string` — The mobile phone number provided by the customer in the booking form.

    - **`name`**

      `string` — The name provided by the customer in the booking form.

    - **`note`**

      `string` — The note provided by the customer in the booking form.

    - **`phone`**

      `string | null` — The phone number provided by the customer in the booking form.

  - **`id`**

    `string` — Unique identifier for the object.

  - **`in_trash`**

    `boolean` — The booking was moved to trash in the activity stream. While this value is true, the activity can still be found in the trash and has not been hard deleted yet.

  - **`last_updated_time`**

    `string`, format: `date-time` — The date and time the booking was last updated.

  - **`location_description`**

    `string` — Information about the physical location in case of physical meeting.

  - **`master_page`**

    `object` — The ID of the master booking page used to make the booking. \*\*Expandable\*\*: Use \`expand=master\_page\` to include the full MasterPage object.

  - **`object`**

    `string` — String representing the object's type. Objects of the same type share the same value.

  - **`rescheduled_booking_id`**

    `string` — The ID of the booking that was rescheduled.

  - **`starting_time`**

    `string`, format: `date-time` — The date and time when the meeting is scheduled to start.

  - **`status`**

    `string`, possible values: `"requested", "scheduled", "rescheduled", "completed", "canceled", "no_show"` — The status of the booking event. Can be: requested, scheduled, rescheduled, completed, canceled, or no\_show

  - **`subject`**

    `string` — The name of the service or subject as defined in the booking form.

  - **`tracking_id`**

    `string` — A unique ID automatically assigned to every booking.

  - **`virtual_conferencing`**

    `object` — The object containing information about the video conference in case of virtual meeting.

    - **`join_url`**

      `string` — The URL to join the video conference meeting.

  * **`contact`**

    `object` — The ID of the contact the booking was scheduled with. \*\*Expandable\*\*: Use \`expand=contact\` to include the full Contact object.

  * **`conversation`**

    `object` — The ID of the conversation that this booking was scheduled from, null if the booking did not come from a conversation. \*\*Expandable\*\*: Use \`expand=conversation\` to include the full Conversation object.

  * **`owner`**

    `object` — The ID of the owner of the booking. This is the User who originally accepted the booking, and remains unchanged even if the booking was reassigned to a new booking page. \*\*Expandable\*\*: Use \`expand=owner\` to include the full User object.

  * **`utm_params`**

    `object` — If no UTM params exist on the booking, object will return null.

- **`has_more`**

  `boolean` — Whether there are more items available

- **`object`**

  `string`

**Example:**

```json
{
  "object": "list",
  "data": [
    {
      "object": "booking",
      "id": "BKNG-J4FR05BKEWEX",
      "tracking_id": "D36E0002",
      "subject": "Live demo",
      "status": "scheduled",
      "in_trash": false,
      "creation_time": "2020-03-22T09:48:48Z",
      "starting_time": "2020-03-22T04:30:00Z",
      "customer_timezone": "America/New_York",
      "last_updated_time": "2020-03-22T09:48:48Z",
      "duration_minutes": 60,
      "virtual_conferencing": {
        "join_url": "https://meet.google.com/izv-daci-fyi"
      },
      "location_description": "123 Office Street",
      "rescheduled_booking_id": "BKNG-J4FR05BKEWEX",
      "cancel_reschedule_information": null,
      "attendees": [
        "andrea.hartie@example.com"
      ],
      "form_submission": {
        "name": "Carrie Customer",
        "email": "carrie.customer@gmail.com",
        "phone": null,
        "mobile_phone": "1-2025550195",
        "note": "I want to discuss whether your product can work for our office.",
        "company": null,
        "guests": [
          ""
        ],
        "custom_fields": [
          {
            "name": "Title",
            "value": "Executive Assistant"
          }
        ]
      },
      "booking_page": "BP-X0LCRU5LES",
      "master_page": "MP-ZID28U5946",
      "event_type": "ET-7NC41GHIDZ",
      "external_calendar": {
        "type": "google",
        "name": "andrea.hartie@example.com",
        "id": "andrea.hartie@example.com",
        "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
      },
      "custom_fields": [
        {
          "name": "discussion_points",
          "value": "Need support on new product"
        }
      ],
      "owner": "USR-FSD423423",
      "conversation": "CVR-ZLS0AG3YXZTH",
      "utm_params": {
        "source": "facebook",
        "medium": "social",
        "campaign": "webinar_signup",
        "term": "online+meeting+scheduler",
        "content": "logolink"
      },
      "contact": "CTC-262WER5NR9CG38"
    }
  ],
  "has_more": false
}
```

##### Status: 400 400

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Get a single booking

- **Method:** `GET`
- **Path:** `/bookings/{id}`
- **Tags:** Bookings

Returns a single booking by ID

#### Parameters

##### `id` required

- **In:** `path`

ID of the booking

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

**All of:**

- **`attendees`**

  `array` — List of all meeting attendees (emails).

  **Items:**

  `string`

- **`booking_page`**

  `object` — The ID of the booking page used to make the booking. \*\*Expandable\*\*: Use \`expand=booking\_page\` to include the full BookingPage object.

- **`cancel_reschedule_information`**

  `object | null` — An object containing information about the cancel / reschedule event. This field is \`null\` if the booking has not been cancelled or rescheduled.

- **`creation_time`**

  `string`, format: `date-time` — The date and time when the booking was created.

- **`custom_fields`**

  `array` — Any custom fields that have been added to the field library for the meeting object type on your account will be listed in the array of custom fields.

  **Items:**

  - **`name`**

    `string` — Name of the custom field.

  - **`value`**

    `object` — Value of the custom field.

- **`customer_timezone`**

  `string` — The timezone selected by the customer when making the booking. Displayed in IANA timezone format.

- **`duration_minutes`**

  `integer` — The length of the meeting, in minutes.

- **`event_type`**

  `object` — The ID of the service selected by customer. \*\*Expandable\*\*: Use \`expand=event\_type\` to include the full EventType object.

- **`external_calendar`**

  `object` — Object containing information about the calendar used in the booking.

  - **`event_id`**

    `string` — The id of the booking event that was created in the external calendar.

  - **`id`**

    `string` — The ID of the external calendar to which the booking was added.

  - **`name`**

    `string` — The name of the external calendar to which the booking was added.

  - **`type`**

    `string`, possible values: `"google", "exchange", "office_365", "icloud"` — Type of calendar

- **`form_submission`**

  `object` — The object containing information entered by the customer into the booking form. This will include any system fields and custom fields defined in your booking form.

  - **`company`**

    `string | null` — The company provided by your customer in the booking form.

  - **`custom_fields`**

    `array` — The array containing custom Booking form fields.

    **Items:**

    - **`name`**

      `string`

    - **`value`**

      `object` — Value of the custom field.

  - **`email`**

    `string` — The email provided by the customer in the booking form.

  - **`guests`**

    `array` — List of additional attendees (emails) invited by the customer.

    **Items:**

    `string`

  - **`mobile_phone`**

    `string` — The mobile phone number provided by the customer in the booking form.

  - **`name`**

    `string` — The name provided by the customer in the booking form.

  - **`note`**

    `string` — The note provided by the customer in the booking form.

  - **`phone`**

    `string | null` — The phone number provided by the customer in the booking form.

- **`id`**

  `string` — Unique identifier for the object.

- **`in_trash`**

  `boolean` — The booking was moved to trash in the activity stream. While this value is true, the activity can still be found in the trash and has not been hard deleted yet.

- **`last_updated_time`**

  `string`, format: `date-time` — The date and time the booking was last updated.

- **`location_description`**

  `string` — Information about the physical location in case of physical meeting.

- **`master_page`**

  `object` — The ID of the master booking page used to make the booking. \*\*Expandable\*\*: Use \`expand=master\_page\` to include the full MasterPage object.

- **`object`**

  `string` — String representing the object's type. Objects of the same type share the same value.

- **`rescheduled_booking_id`**

  `string` — The ID of the booking that was rescheduled.

- **`starting_time`**

  `string`, format: `date-time` — The date and time when the meeting is scheduled to start.

- **`status`**

  `string`, possible values: `"requested", "scheduled", "rescheduled", "completed", "canceled", "no_show"` — The status of the booking event. Can be: requested, scheduled, rescheduled, completed, canceled, or no\_show

- **`subject`**

  `string` — The name of the service or subject as defined in the booking form.

- **`tracking_id`**

  `string` — A unique ID automatically assigned to every booking.

- **`virtual_conferencing`**

  `object` — The object containing information about the video conference in case of virtual meeting.

  - **`join_url`**

    `string` — The URL to join the video conference meeting.

* **`contact`**

  `object` — The ID of the contact the booking was scheduled with. \*\*Expandable\*\*: Use \`expand=contact\` to include the full Contact object.

* **`conversation`**

  `object` — The ID of the conversation that this booking was scheduled from, null if the booking did not come from a conversation. \*\*Expandable\*\*: Use \`expand=conversation\` to include the full Conversation object.

* **`owner`**

  `object` — The ID of the owner of the booking. This is the User who originally accepted the booking, and remains unchanged even if the booking was reassigned to a new booking page. \*\*Expandable\*\*: Use \`expand=owner\` to include the full User object.

* **`utm_params`**

  `object` — If no UTM params exist on the booking, object will return null.

**Example:**

```json
{
  "object": "booking",
  "id": "BKNG-J4FR05BKEWEX",
  "tracking_id": "D36E0002",
  "subject": "Live demo",
  "status": "scheduled",
  "in_trash": false,
  "creation_time": "2020-03-22T09:48:48Z",
  "starting_time": "2020-03-22T04:30:00Z",
  "customer_timezone": "America/New_York",
  "last_updated_time": "2020-03-22T09:48:48Z",
  "duration_minutes": 60,
  "virtual_conferencing": {
    "join_url": "https://meet.google.com/izv-daci-fyi"
  },
  "location_description": "123 Office Street",
  "rescheduled_booking_id": "BKNG-J4FR05BKEWEX",
  "cancel_reschedule_information": null,
  "attendees": [
    "andrea.hartie@example.com"
  ],
  "form_submission": {
    "name": "Carrie Customer",
    "email": "carrie.customer@gmail.com",
    "phone": null,
    "mobile_phone": "1-2025550195",
    "note": "I want to discuss whether your product can work for our office.",
    "company": null,
    "guests": [
      ""
    ],
    "custom_fields": [
      {
        "name": "Title",
        "value": "Executive Assistant"
      }
    ]
  },
  "booking_page": "BP-X0LCRU5LES",
  "master_page": "MP-ZID28U5946",
  "event_type": "ET-7NC41GHIDZ",
  "external_calendar": {
    "type": "google",
    "name": "andrea.hartie@example.com",
    "id": "andrea.hartie@example.com",
    "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
  },
  "custom_fields": [
    {
      "name": "discussion_points",
      "value": "Need support on new product"
    }
  ],
  "owner": "USR-FSD423423",
  "conversation": "CVR-ZLS0AG3YXZTH",
  "utm_params": {
    "source": "facebook",
    "medium": "social",
    "campaign": "webinar_signup",
    "term": "online+meeting+scheduler",
    "content": "logolink"
  },
  "contact": "CTC-262WER5NR9CG38"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Cancel a booking

- **Method:** `POST`
- **Path:** `/bookings/{id}/cancel`
- **Tags:** Bookings

Cancel a booking by ID

#### Parameters

##### `id` required

- **In:** `path`

ID of the booking

`string`

#### Request Body

##### Content-Type: application/json

- **`cancellation_reason`**

  `string` — Reason for cancelling the meeting (optional)

- **`send_cancellation_email`**

  `boolean`, default: `true` — Whether a cancellation email should be sent

**Example:**

```json
{
  "cancellation_reason": "",
  "send_cancellation_email": true
}
```

#### Responses

##### Status: 200 200

###### Content-Type: application/json

**All of:**

- **`attendees`**

  `array` — List of all meeting attendees (emails).

  **Items:**

  `string`

- **`booking_page`**

  `object` — The ID of the booking page used to make the booking. \*\*Expandable\*\*: Use \`expand=booking\_page\` to include the full BookingPage object.

- **`cancel_reschedule_information`**

  `object | null` — An object containing information about the cancel / reschedule event. This field is \`null\` if the booking has not been cancelled or rescheduled.

- **`creation_time`**

  `string`, format: `date-time` — The date and time when the booking was created.

- **`custom_fields`**

  `array` — Any custom fields that have been added to the field library for the meeting object type on your account will be listed in the array of custom fields.

  **Items:**

  - **`name`**

    `string` — Name of the custom field.

  - **`value`**

    `object` — Value of the custom field.

- **`customer_timezone`**

  `string` — The timezone selected by the customer when making the booking. Displayed in IANA timezone format.

- **`duration_minutes`**

  `integer` — The length of the meeting, in minutes.

- **`event_type`**

  `object` — The ID of the service selected by customer. \*\*Expandable\*\*: Use \`expand=event\_type\` to include the full EventType object.

- **`external_calendar`**

  `object` — Object containing information about the calendar used in the booking.

  - **`event_id`**

    `string` — The id of the booking event that was created in the external calendar.

  - **`id`**

    `string` — The ID of the external calendar to which the booking was added.

  - **`name`**

    `string` — The name of the external calendar to which the booking was added.

  - **`type`**

    `string`, possible values: `"google", "exchange", "office_365", "icloud"` — Type of calendar

- **`form_submission`**

  `object` — The object containing information entered by the customer into the booking form. This will include any system fields and custom fields defined in your booking form.

  - **`company`**

    `string | null` — The company provided by your customer in the booking form.

  - **`custom_fields`**

    `array` — The array containing custom Booking form fields.

    **Items:**

    - **`name`**

      `string`

    - **`value`**

      `object` — Value of the custom field.

  - **`email`**

    `string` — The email provided by the customer in the booking form.

  - **`guests`**

    `array` — List of additional attendees (emails) invited by the customer.

    **Items:**

    `string`

  - **`mobile_phone`**

    `string` — The mobile phone number provided by the customer in the booking form.

  - **`name`**

    `string` — The name provided by the customer in the booking form.

  - **`note`**

    `string` — The note provided by the customer in the booking form.

  - **`phone`**

    `string | null` — The phone number provided by the customer in the booking form.

- **`id`**

  `string` — Unique identifier for the object.

- **`in_trash`**

  `boolean` — The booking was moved to trash in the activity stream. While this value is true, the activity can still be found in the trash and has not been hard deleted yet.

- **`last_updated_time`**

  `string`, format: `date-time` — The date and time the booking was last updated.

- **`location_description`**

  `string` — Information about the physical location in case of physical meeting.

- **`master_page`**

  `object` — The ID of the master booking page used to make the booking. \*\*Expandable\*\*: Use \`expand=master\_page\` to include the full MasterPage object.

- **`object`**

  `string` — String representing the object's type. Objects of the same type share the same value.

- **`rescheduled_booking_id`**

  `string` — The ID of the booking that was rescheduled.

- **`starting_time`**

  `string`, format: `date-time` — The date and time when the meeting is scheduled to start.

- **`status`**

  `string`, possible values: `"requested", "scheduled", "rescheduled", "completed", "canceled", "no_show"` — The status of the booking event. Can be: requested, scheduled, rescheduled, completed, canceled, or no\_show

- **`subject`**

  `string` — The name of the service or subject as defined in the booking form.

- **`tracking_id`**

  `string` — A unique ID automatically assigned to every booking.

- **`virtual_conferencing`**

  `object` — The object containing information about the video conference in case of virtual meeting.

  - **`join_url`**

    `string` — The URL to join the video conference meeting.

* **`cancel_reschedule_information`**

  `object` — An object containing information about the cancel / reschedule event.

  - **`actioned_by`**

    `string`, possible values: `"user", "customer"` — Indicates the entity that performed the action. Valid options are user (person in your team) and customer (person who made the booking).

  - **`reason`**

    `string` — The reason given for canceling or rescheduling a meeting.

  - **`user_id`**

    `string` — If the cancel reschedule was done by the user, this field will contain their user id. Note: When a meeting is cancelled via the API, the \`user\_id\` depends on the booking source: - \*\*Booking Calendars:\*\* The \`user\_id\` is booking host's user ID. - \*\*Booking Pages:\*\* The \`user\_id\` is the account owner's user ID.

**Example:**

```json
{
  "object": "booking",
  "id": "BKNG-J4FR05BKEWEX",
  "tracking_id": "D36E0002",
  "subject": "Live demo",
  "status": "scheduled",
  "in_trash": false,
  "creation_time": "2020-03-22T09:48:48Z",
  "starting_time": "2020-03-22T04:30:00Z",
  "customer_timezone": "America/New_York",
  "last_updated_time": "2020-03-22T09:48:48Z",
  "duration_minutes": 60,
  "virtual_conferencing": {
    "join_url": "https://meet.google.com/izv-daci-fyi"
  },
  "location_description": "123 Office Street",
  "rescheduled_booking_id": "BKNG-J4FR05BKEWEX",
  "cancel_reschedule_information": {
    "reason": "Change in schedule",
    "actioned_by": "user",
    "user_id": "USR-FSD423423"
  },
  "attendees": [
    "andrea.hartie@example.com"
  ],
  "form_submission": {
    "name": "Carrie Customer",
    "email": "carrie.customer@gmail.com",
    "phone": null,
    "mobile_phone": "1-2025550195",
    "note": "I want to discuss whether your product can work for our office.",
    "company": null,
    "guests": [
      ""
    ],
    "custom_fields": [
      {
        "name": "Title",
        "value": "Executive Assistant"
      }
    ]
  },
  "booking_page": "BP-X0LCRU5LES",
  "master_page": "MP-ZID28U5946",
  "event_type": "ET-7NC41GHIDZ",
  "external_calendar": {
    "type": "google",
    "name": "andrea.hartie@example.com",
    "id": "andrea.hartie@example.com",
    "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
  },
  "custom_fields": [
    {
      "name": "discussion_points",
      "value": "Need support on new product"
    }
  ]
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 409 409

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 422 422

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Request a reschedule

- **Method:** `POST`
- **Path:** `/bookings/{id}/request-reschedule`
- **Tags:** Bookings

Request to reschedule a booking by ID

#### Parameters

##### `id` required

- **In:** `path`

ID of the booking

`string`

#### Request Body

##### Content-Type: application/json

- **`reschedule_reason`**

  `string` — Reason for requesting the customer to reschedule the meeting (optional)

**Example:**

```json
{
  "reschedule_reason": ""
}
```

#### Responses

##### Status: 200 200

###### Content-Type: application/json

**All of:**

- **`attendees`**

  `array` — List of all meeting attendees (emails).

  **Items:**

  `string`

- **`booking_page`**

  `object` — The ID of the booking page used to make the booking. \*\*Expandable\*\*: Use \`expand=booking\_page\` to include the full BookingPage object.

- **`cancel_reschedule_information`**

  `object | null` — An object containing information about the cancel / reschedule event. This field is \`null\` if the booking has not been cancelled or rescheduled.

- **`creation_time`**

  `string`, format: `date-time` — The date and time when the booking was created.

- **`custom_fields`**

  `array` — Any custom fields that have been added to the field library for the meeting object type on your account will be listed in the array of custom fields.

  **Items:**

  - **`name`**

    `string` — Name of the custom field.

  - **`value`**

    `object` — Value of the custom field.

- **`customer_timezone`**

  `string` — The timezone selected by the customer when making the booking. Displayed in IANA timezone format.

- **`duration_minutes`**

  `integer` — The length of the meeting, in minutes.

- **`event_type`**

  `object` — The ID of the service selected by customer. \*\*Expandable\*\*: Use \`expand=event\_type\` to include the full EventType object.

- **`external_calendar`**

  `object` — Object containing information about the calendar used in the booking.

  - **`event_id`**

    `string` — The id of the booking event that was created in the external calendar.

  - **`id`**

    `string` — The ID of the external calendar to which the booking was added.

  - **`name`**

    `string` — The name of the external calendar to which the booking was added.

  - **`type`**

    `string`, possible values: `"google", "exchange", "office_365", "icloud"` — Type of calendar

- **`form_submission`**

  `object` — The object containing information entered by the customer into the booking form. This will include any system fields and custom fields defined in your booking form.

  - **`company`**

    `string | null` — The company provided by your customer in the booking form.

  - **`custom_fields`**

    `array` — The array containing custom Booking form fields.

    **Items:**

    - **`name`**

      `string`

    - **`value`**

      `object` — Value of the custom field.

  - **`email`**

    `string` — The email provided by the customer in the booking form.

  - **`guests`**

    `array` — List of additional attendees (emails) invited by the customer.

    **Items:**

    `string`

  - **`mobile_phone`**

    `string` — The mobile phone number provided by the customer in the booking form.

  - **`name`**

    `string` — The name provided by the customer in the booking form.

  - **`note`**

    `string` — The note provided by the customer in the booking form.

  - **`phone`**

    `string | null` — The phone number provided by the customer in the booking form.

- **`id`**

  `string` — Unique identifier for the object.

- **`in_trash`**

  `boolean` — The booking was moved to trash in the activity stream. While this value is true, the activity can still be found in the trash and has not been hard deleted yet.

- **`last_updated_time`**

  `string`, format: `date-time` — The date and time the booking was last updated.

- **`location_description`**

  `string` — Information about the physical location in case of physical meeting.

- **`master_page`**

  `object` — The ID of the master booking page used to make the booking. \*\*Expandable\*\*: Use \`expand=master\_page\` to include the full MasterPage object.

- **`object`**

  `string` — String representing the object's type. Objects of the same type share the same value.

- **`rescheduled_booking_id`**

  `string` — The ID of the booking that was rescheduled.

- **`starting_time`**

  `string`, format: `date-time` — The date and time when the meeting is scheduled to start.

- **`status`**

  `string`, possible values: `"requested", "scheduled", "rescheduled", "completed", "canceled", "no_show"` — The status of the booking event. Can be: requested, scheduled, rescheduled, completed, canceled, or no\_show

- **`subject`**

  `string` — The name of the service or subject as defined in the booking form.

- **`tracking_id`**

  `string` — A unique ID automatically assigned to every booking.

- **`virtual_conferencing`**

  `object` — The object containing information about the video conference in case of virtual meeting.

  - **`join_url`**

    `string` — The URL to join the video conference meeting.

* **`cancel_reschedule_information`**

  `object` — An object containing information about the cancel / reschedule event.

  - **`actioned_by`**

    `string`, possible values: `"user", "customer"` — Indicates the entity that performed the action. Valid options are user (person in your team) and customer (person who made the booking).

  - **`reason`**

    `string` — The reason given for canceling or rescheduling a meeting.

  - **`user_id`**

    `string` — If the cancel reschedule was done by the user, this field will contain their user id. Note: When a meeting is cancelled via the API, the \`user\_id\` depends on the booking source: - \*\*Booking Calendars:\*\* The \`user\_id\` is booking host's user ID. - \*\*Booking Pages:\*\* The \`user\_id\` is the account owner's user ID.

**Example:**

```json
{
  "object": "booking",
  "id": "BKNG-J4FR05BKEWEX",
  "tracking_id": "D36E0002",
  "subject": "Live demo",
  "status": "scheduled",
  "in_trash": false,
  "creation_time": "2020-03-22T09:48:48Z",
  "starting_time": "2020-03-22T04:30:00Z",
  "customer_timezone": "America/New_York",
  "last_updated_time": "2020-03-22T09:48:48Z",
  "duration_minutes": 60,
  "virtual_conferencing": {
    "join_url": "https://meet.google.com/izv-daci-fyi"
  },
  "location_description": "123 Office Street",
  "rescheduled_booking_id": "BKNG-J4FR05BKEWEX",
  "cancel_reschedule_information": {
    "reason": "Change in schedule",
    "actioned_by": "user",
    "user_id": "USR-FSD423423"
  },
  "attendees": [
    "andrea.hartie@example.com"
  ],
  "form_submission": {
    "name": "Carrie Customer",
    "email": "carrie.customer@gmail.com",
    "phone": null,
    "mobile_phone": "1-2025550195",
    "note": "I want to discuss whether your product can work for our office.",
    "company": null,
    "guests": [
      ""
    ],
    "custom_fields": [
      {
        "name": "Title",
        "value": "Executive Assistant"
      }
    ]
  },
  "booking_page": "BP-X0LCRU5LES",
  "master_page": "MP-ZID28U5946",
  "event_type": "ET-7NC41GHIDZ",
  "external_calendar": {
    "type": "google",
    "name": "andrea.hartie@example.com",
    "id": "andrea.hartie@example.com",
    "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
  },
  "custom_fields": [
    {
      "name": "discussion_points",
      "value": "Need support on new product"
    }
  ]
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 409 409

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 422 422

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Reassign a booking

- **Method:** `POST`
- **Path:** `/bookings/{id}/reassign`
- **Tags:** Bookings

Reassign an existing booking to a new host by ID.

Effects of reassignment:

- The original calendar event is deleted, and a new event is created in the new host's integrated calendar.
- Reassignment notifications are sent to guests and hosts.

#### Parameters

##### `id` required

- **In:** `path`

The unique ID of the booking.

`string`

#### Request Body

##### Content-Type: application/json

- **`new_host` (required)**

  `string` — The OnceHub user ID for the new host. The user must belong to the same account, hold an active seat license, and cannot be the current host of the booking.

- **`location`**

  `object` — Optional. Determines how the location is handled when a meeting is reassigned to a new host. \*\*Case 1: When \`location\` object is omitted:\*\* The system applies the following logic based on the original booking's location type: - \*Online Meetings:\* The system first tries to use the same Video Conference Service provider as the original host. If that specific Video Conference Service provider is not connected to the new host, it automatically selects the best available integration based on this priority: 1. Google Meet 2. Microsoft Teams 3. Zoom 4. Webex Meetings 5. GoTo Meeting - \*In-person/ Phone Meetings:\* The location remains unchanged for the new host. >\[!NOTE] Missing Integration: If the original meeting was virtual but the new host has no Video Conference Service integrations connected, the booking will be reassigned successfully but will proceed without a virtual link. To avoid meetings without links, it is recommended to verify host integrations before reassignment. \*\*Case 2: When \`location\` object is included:\*\* The system applies the specific \`type\` and \`value\` for the new host. Currently, this object only supports virtual updates and cannot be used to switch a virtual meeting to an In-person location. The selected Video Conference Service must be connected and active in the new host's OnceHub account. >\[!IMPORTANT] Reassignment Failure: If the specified Video Conference Service is not connected for the new host, the reassignment request will fail. In this case, the API will return an error along with a list of connected Video Conference Service options available for that host.

  - **`type` (required)**

    `string`, possible values: `"virtual"` — Fixed Value: virtual. The required location type for virtual conferencing. Note: virtual is currently the only supported override type. In-person and Phone locations can only be maintained by omitting the location object.

  - **`value` (required)**

    `string`, possible values: `"google_meet", "microsoft_teams", "webex", "gotomeeting", "zoom"` — Supported Values: The specific service to be used.

**Example:**

```json
{
  "new_host": "",
  "location": {
    "type": "virtual",
    "value": "google_meet"
  }
}
```

#### Responses

##### Status: 200 200

###### Content-Type: application/json

**All of:**

- **`attendees`**

  `array` — List of all meeting attendees (emails).

  **Items:**

  `string`

- **`booking_page`**

  `object` — The ID of the booking page used to make the booking. \*\*Expandable\*\*: Use \`expand=booking\_page\` to include the full BookingPage object.

- **`cancel_reschedule_information`**

  `object | null` — An object containing information about the cancel / reschedule event. This field is \`null\` if the booking has not been cancelled or rescheduled.

- **`creation_time`**

  `string`, format: `date-time` — The date and time when the booking was created.

- **`custom_fields`**

  `array` — Any custom fields that have been added to the field library for the meeting object type on your account will be listed in the array of custom fields.

  **Items:**

  - **`name`**

    `string` — Name of the custom field.

  - **`value`**

    `object` — Value of the custom field.

- **`customer_timezone`**

  `string` — The timezone selected by the customer when making the booking. Displayed in IANA timezone format.

- **`duration_minutes`**

  `integer` — The length of the meeting, in minutes.

- **`event_type`**

  `object` — The ID of the service selected by customer. \*\*Expandable\*\*: Use \`expand=event\_type\` to include the full EventType object.

- **`external_calendar`**

  `object` — Object containing information about the calendar used in the booking.

  - **`event_id`**

    `string` — The id of the booking event that was created in the external calendar.

  - **`id`**

    `string` — The ID of the external calendar to which the booking was added.

  - **`name`**

    `string` — The name of the external calendar to which the booking was added.

  - **`type`**

    `string`, possible values: `"google", "exchange", "office_365", "icloud"` — Type of calendar

- **`form_submission`**

  `object` — The object containing information entered by the customer into the booking form. This will include any system fields and custom fields defined in your booking form.

  - **`company`**

    `string | null` — The company provided by your customer in the booking form.

  - **`custom_fields`**

    `array` — The array containing custom Booking form fields.

    **Items:**

    - **`name`**

      `string`

    - **`value`**

      `object` — Value of the custom field.

  - **`email`**

    `string` — The email provided by the customer in the booking form.

  - **`guests`**

    `array` — List of additional attendees (emails) invited by the customer.

    **Items:**

    `string`

  - **`mobile_phone`**

    `string` — The mobile phone number provided by the customer in the booking form.

  - **`name`**

    `string` — The name provided by the customer in the booking form.

  - **`note`**

    `string` — The note provided by the customer in the booking form.

  - **`phone`**

    `string | null` — The phone number provided by the customer in the booking form.

- **`id`**

  `string` — Unique identifier for the object.

- **`in_trash`**

  `boolean` — The booking was moved to trash in the activity stream. While this value is true, the activity can still be found in the trash and has not been hard deleted yet.

- **`last_updated_time`**

  `string`, format: `date-time` — The date and time the booking was last updated.

- **`location_description`**

  `string` — Information about the physical location in case of physical meeting.

- **`master_page`**

  `object` — The ID of the master booking page used to make the booking. \*\*Expandable\*\*: Use \`expand=master\_page\` to include the full MasterPage object.

- **`object`**

  `string` — String representing the object's type. Objects of the same type share the same value.

- **`rescheduled_booking_id`**

  `string` — The ID of the booking that was rescheduled.

- **`starting_time`**

  `string`, format: `date-time` — The date and time when the meeting is scheduled to start.

- **`status`**

  `string`, possible values: `"requested", "scheduled", "rescheduled", "completed", "canceled", "no_show"` — The status of the booking event. Can be: requested, scheduled, rescheduled, completed, canceled, or no\_show

- **`subject`**

  `string` — The name of the service or subject as defined in the booking form.

- **`tracking_id`**

  `string` — A unique ID automatically assigned to every booking.

- **`virtual_conferencing`**

  `object` — The object containing information about the video conference in case of virtual meeting.

  - **`join_url`**

    `string` — The URL to join the video conference meeting.

* **`contact`**

  `object` — The ID of the contact the booking was scheduled with. \*\*Expandable\*\*: Use \`expand=contact\` to include the full Contact object.

* **`conversation`**

  `object` — The ID of the conversation that this booking was scheduled from, null if the booking did not come from a conversation. \*\*Expandable\*\*: Use \`expand=conversation\` to include the full Conversation object.

* **`owner`**

  `object` — The ID of the owner of the booking. This is the User who originally accepted the booking, and remains unchanged even if the booking was reassigned to a new booking page. \*\*Expandable\*\*: Use \`expand=owner\` to include the full User object.

* **`utm_params`**

  `object` — If no UTM params exist on the booking, object will return null.

**Example:**

```json
{
  "object": "booking",
  "id": "BKNG-J4FR05BKEWEX",
  "tracking_id": "D36E0002",
  "subject": "Live demo",
  "status": "scheduled",
  "in_trash": false,
  "creation_time": "2020-03-22T09:48:48Z",
  "starting_time": "2020-03-22T04:30:00Z",
  "customer_timezone": "America/New_York",
  "last_updated_time": "2020-03-22T09:48:48Z",
  "duration_minutes": 60,
  "virtual_conferencing": {
    "join_url": "https://meet.google.com/izv-daci-fyi"
  },
  "location_description": "123 Office Street",
  "rescheduled_booking_id": "BKNG-J4FR05BKEWEX",
  "cancel_reschedule_information": null,
  "attendees": [
    "andrea.hartie@example.com"
  ],
  "form_submission": {
    "name": "Carrie Customer",
    "email": "carrie.customer@gmail.com",
    "phone": null,
    "mobile_phone": "1-2025550195",
    "note": "I want to discuss whether your product can work for our office.",
    "company": null,
    "guests": [
      ""
    ],
    "custom_fields": [
      {
        "name": "Title",
        "value": "Executive Assistant"
      }
    ]
  },
  "booking_page": "BP-X0LCRU5LES",
  "master_page": "MP-ZID28U5946",
  "event_type": "ET-7NC41GHIDZ",
  "external_calendar": {
    "type": "google",
    "name": "andrea.hartie@example.com",
    "id": "andrea.hartie@example.com",
    "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
  },
  "custom_fields": [
    {
      "name": "discussion_points",
      "value": "Need support on new product"
    }
  ],
  "owner": "USR-FSD423423",
  "conversation": "CVR-ZLS0AG3YXZTH",
  "utm_params": {
    "source": "facebook",
    "medium": "social",
    "campaign": "webinar_signup",
    "term": "online+meeting+scheduler",
    "content": "logolink"
  },
  "contact": "CTC-262WER5NR9CG38"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 409 409

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Set a booking as no-show

- **Method:** `POST`
- **Path:** `/bookings/{id}/no-show`
- **Tags:** Bookings

Update the booking status to no-show by ID

#### Parameters

##### `id` required

- **In:** `path`

ID of the booking

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

**All of:**

- **`attendees`**

  `array` — List of all meeting attendees (emails).

  **Items:**

  `string`

- **`booking_page`**

  `object` — The ID of the booking page used to make the booking. \*\*Expandable\*\*: Use \`expand=booking\_page\` to include the full BookingPage object.

- **`cancel_reschedule_information`**

  `object | null` — An object containing information about the cancel / reschedule event. This field is \`null\` if the booking has not been cancelled or rescheduled.

- **`creation_time`**

  `string`, format: `date-time` — The date and time when the booking was created.

- **`custom_fields`**

  `array` — Any custom fields that have been added to the field library for the meeting object type on your account will be listed in the array of custom fields.

  **Items:**

  - **`name`**

    `string` — Name of the custom field.

  - **`value`**

    `object` — Value of the custom field.

- **`customer_timezone`**

  `string` — The timezone selected by the customer when making the booking. Displayed in IANA timezone format.

- **`duration_minutes`**

  `integer` — The length of the meeting, in minutes.

- **`event_type`**

  `object` — The ID of the service selected by customer. \*\*Expandable\*\*: Use \`expand=event\_type\` to include the full EventType object.

- **`external_calendar`**

  `object` — Object containing information about the calendar used in the booking.

  - **`event_id`**

    `string` — The id of the booking event that was created in the external calendar.

  - **`id`**

    `string` — The ID of the external calendar to which the booking was added.

  - **`name`**

    `string` — The name of the external calendar to which the booking was added.

  - **`type`**

    `string`, possible values: `"google", "exchange", "office_365", "icloud"` — Type of calendar

- **`form_submission`**

  `object` — The object containing information entered by the customer into the booking form. This will include any system fields and custom fields defined in your booking form.

  - **`company`**

    `string | null` — The company provided by your customer in the booking form.

  - **`custom_fields`**

    `array` — The array containing custom Booking form fields.

    **Items:**

    - **`name`**

      `string`

    - **`value`**

      `object` — Value of the custom field.

  - **`email`**

    `string` — The email provided by the customer in the booking form.

  - **`guests`**

    `array` — List of additional attendees (emails) invited by the customer.

    **Items:**

    `string`

  - **`mobile_phone`**

    `string` — The mobile phone number provided by the customer in the booking form.

  - **`name`**

    `string` — The name provided by the customer in the booking form.

  - **`note`**

    `string` — The note provided by the customer in the booking form.

  - **`phone`**

    `string | null` — The phone number provided by the customer in the booking form.

- **`id`**

  `string` — Unique identifier for the object.

- **`in_trash`**

  `boolean` — The booking was moved to trash in the activity stream. While this value is true, the activity can still be found in the trash and has not been hard deleted yet.

- **`last_updated_time`**

  `string`, format: `date-time` — The date and time the booking was last updated.

- **`location_description`**

  `string` — Information about the physical location in case of physical meeting.

- **`master_page`**

  `object` — The ID of the master booking page used to make the booking. \*\*Expandable\*\*: Use \`expand=master\_page\` to include the full MasterPage object.

- **`object`**

  `string` — String representing the object's type. Objects of the same type share the same value.

- **`rescheduled_booking_id`**

  `string` — The ID of the booking that was rescheduled.

- **`starting_time`**

  `string`, format: `date-time` — The date and time when the meeting is scheduled to start.

- **`status`**

  `string`, possible values: `"requested", "scheduled", "rescheduled", "completed", "canceled", "no_show"` — The status of the booking event. Can be: requested, scheduled, rescheduled, completed, canceled, or no\_show

- **`subject`**

  `string` — The name of the service or subject as defined in the booking form.

- **`tracking_id`**

  `string` — A unique ID automatically assigned to every booking.

- **`virtual_conferencing`**

  `object` — The object containing information about the video conference in case of virtual meeting.

  - **`join_url`**

    `string` — The URL to join the video conference meeting.

* **`contact`**

  `object` — The ID of the contact the booking was scheduled with. \*\*Expandable\*\*: Use \`expand=contact\` to include the full Contact object.

* **`conversation`**

  `object` — The ID of the conversation that this booking was scheduled from, null if the booking did not come from a conversation. \*\*Expandable\*\*: Use \`expand=conversation\` to include the full Conversation object.

* **`owner`**

  `object` — The ID of the owner of the booking. This is the User who originally accepted the booking, and remains unchanged even if the booking was reassigned to a new booking page. \*\*Expandable\*\*: Use \`expand=owner\` to include the full User object.

* **`utm_params`**

  `object` — If no UTM params exist on the booking, object will return null.

**Example:**

```json
{
  "object": "booking",
  "id": "BKNG-J4FR05BKEWEX",
  "tracking_id": "D36E0002",
  "subject": "Live demo",
  "status": "scheduled",
  "in_trash": false,
  "creation_time": "2020-03-22T09:48:48Z",
  "starting_time": "2020-03-22T04:30:00Z",
  "customer_timezone": "America/New_York",
  "last_updated_time": "2020-03-22T09:48:48Z",
  "duration_minutes": 60,
  "virtual_conferencing": {
    "join_url": "https://meet.google.com/izv-daci-fyi"
  },
  "location_description": "123 Office Street",
  "rescheduled_booking_id": "BKNG-J4FR05BKEWEX",
  "cancel_reschedule_information": null,
  "attendees": [
    "andrea.hartie@example.com"
  ],
  "form_submission": {
    "name": "Carrie Customer",
    "email": "carrie.customer@gmail.com",
    "phone": null,
    "mobile_phone": "1-2025550195",
    "note": "I want to discuss whether your product can work for our office.",
    "company": null,
    "guests": [
      ""
    ],
    "custom_fields": [
      {
        "name": "Title",
        "value": "Executive Assistant"
      }
    ]
  },
  "booking_page": "BP-X0LCRU5LES",
  "master_page": "MP-ZID28U5946",
  "event_type": "ET-7NC41GHIDZ",
  "external_calendar": {
    "type": "google",
    "name": "andrea.hartie@example.com",
    "id": "andrea.hartie@example.com",
    "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
  },
  "custom_fields": [
    {
      "name": "discussion_points",
      "value": "Need support on new product"
    }
  ],
  "owner": "USR-FSD423423",
  "conversation": "CVR-ZLS0AG3YXZTH",
  "utm_params": {
    "source": "facebook",
    "medium": "social",
    "campaign": "webinar_signup",
    "term": "online+meeting+scheduler",
    "content": "logolink"
  },
  "contact": "CTC-262WER5NR9CG38"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 409 409

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### List all booking pages

- **Method:** `GET`
- **Path:** `/booking-pages`
- **Tags:** Booking Pages

Returns a list of all booking pages in your account

#### Parameters

##### `master_page`

- **In:** `query`

Filter booking pages that are associated with this master page ID

`string`

##### `event_type`

- **In:** `query`

Filter booking pages that are associated with this event type ID

`string`

##### `user`

- **In:** `query`

Filter booking pages owned by this user ID

`string`

##### `before`

- **In:** `query`

A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, starting with `OBJ-XXXX`, your subsequent call can include `before=OBJ-XXXX` in order to fetch the previous page of the list.

`string`

##### `after`

- **In:** `query`

A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, ending with `OBJ-XXXX`, your subsequent call can include `after=OBJ-XXXX` in order to fetch the next page of the list.

`string`

##### `limit`

- **In:** `query`

Determines the number of objects that will be returned on each page. Defaults to 10 if not specified and has a maximum limit of 100 objects per page.

`integer`, default: `10`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`data`**

  `array`

  **Items:**

  - **`active`**

    `boolean` — True if this booking page is enabled and accepts bookings

  - **`id`**

    `string` — Unique identifier for the object

  - **`label`**

    `string` — The internal label of the booking page

  - **`name`**

    `string` — The customer-facing name of the booking page

  - **`object`**

    `string` — String representing the object's type

  - **`timezone`**

    `string` — The Booking page timezone. Displayed in IANA timezone format.

  - **`url`**

    `string`, format: `uri` — The URL of the booking page

- **`has_more`**

  `boolean` — Whether there are more items available

- **`object`**

  `string`

**Example:**

```json
{
  "object": "list",
  "data": [
    {
      "object": "booking_page",
      "id": "BP-3F7JAWT4UA",
      "name": "Andrea Hartie",
      "label": "AndreaHartie",
      "url": "https://go.oncehub.com/andreahartie",
      "active": true,
      "timezone": "America/Chicago"
    }
  ],
  "has_more": false
}
```

##### Status: 400 400

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Get a single booking page

- **Method:** `GET`
- **Path:** `/booking-pages/{id}`
- **Tags:** Booking Pages

Returns a single booking page by ID

#### Parameters

##### `id` required

- **In:** `path`

ID of the booking page

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`active`**

  `boolean` — True if this booking page is enabled and accepts bookings

- **`id`**

  `string` — Unique identifier for the object

- **`label`**

  `string` — The internal label of the booking page

- **`name`**

  `string` — The customer-facing name of the booking page

- **`object`**

  `string` — String representing the object's type

- **`timezone`**

  `string` — The Booking page timezone. Displayed in IANA timezone format.

- **`url`**

  `string`, format: `uri` — The URL of the booking page

**Example:**

```json
{
  "object": "booking_page",
  "id": "BP-3F7JAWT4UA",
  "name": "Andrea Hartie",
  "label": "AndreaHartie",
  "url": "https://go.oncehub.com/andreahartie",
  "active": true,
  "timezone": "America/Chicago"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### List all event types

- **Method:** `GET`
- **Path:** `/event-types`
- **Tags:** Event Types

Returns a list of all event types in your account

#### Parameters

##### `before`

- **In:** `query`

A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, starting with `OBJ-XXXX`, your subsequent call can include `before=OBJ-XXXX` in order to fetch the previous page of the list.

`string`

##### `after`

- **In:** `query`

A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, ending with `OBJ-XXXX`, your subsequent call can include `after=OBJ-XXXX` in order to fetch the next page of the list.

`string`

##### `limit`

- **In:** `query`

Determines the number of objects that will be returned on each page. Defaults to 10 if not specified and has a maximum limit of 100 objects per page.

`integer`, default: `10`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`data`**

  `array`

  **Items:**

  - **`description`**

    `string` — The description of the event type

  - **`id`**

    `string` — Unique identifier for the event type

  - **`name`**

    `string` — The name of the event type

  - **`object`**

    `string` — String representing the object's type

- **`has_more`**

  `boolean` — Whether there are more items available

- **`object`**

  `string`

**Example:**

```json
{
  "object": "list",
  "data": [
    {
      "object": "event_type",
      "id": "ET-7I7PKDTFJS",
      "name": "Live demo",
      "description": "Schedule a live demo with us for an in-depth look at our enterprise solutions."
    }
  ],
  "has_more": false
}
```

##### Status: 400 400

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Get a single event type

- **Method:** `GET`
- **Path:** `/event-types/{id}`
- **Tags:** Event Types

Returns a single event type by ID

#### Parameters

##### `id` required

- **In:** `path`

ID of the event type

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`description`**

  `string` — The description of the event type

- **`id`**

  `string` — Unique identifier for the event type

- **`name`**

  `string` — The name of the event type

- **`object`**

  `string` — String representing the object's type

**Example:**

```json
{
  "object": "event_type",
  "id": "ET-7I7PKDTFJS",
  "name": "Live demo",
  "description": "Schedule a live demo with us for an in-depth look at our enterprise solutions."
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### List all master pages

- **Method:** `GET`
- **Path:** `/master-pages`
- **Tags:** Master Pages

Returns a list of all master pages in your account

#### Parameters

##### `before`

- **In:** `query`

A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, starting with `OBJ-XXXX`, your subsequent call can include `before=OBJ-XXXX` in order to fetch the previous page of the list.

`string`

##### `after`

- **In:** `query`

A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, ending with `OBJ-XXXX`, your subsequent call can include `after=OBJ-XXXX` in order to fetch the next page of the list.

`string`

##### `limit`

- **In:** `query`

Determines the number of objects that will be returned on each page. Defaults to 10 if not specified and has a maximum limit of 100 objects per page.

`string`, default: `"10"`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Get a single master page

- **Method:** `GET`
- **Path:** `/master-pages/{id}`
- **Tags:** Master Pages

Returns a single master page by ID

#### Parameters

##### `id` required

- **In:** `path`

ID of the master page

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`active`**

  `boolean`, default: `true`

- **`id`**

  `string`

- **`label`**

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
  "id": "MP-73E6RHFU77",
  "object": "master_page",
  "name": "Star Software LLC",
  "label": "Dana",
  "url": "https://go.oncehub.com/dana",
  "active": true
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Create a one-time booking link

- **Method:** `POST`
- **Path:** `/master-pages/{id}/one-time-links`
- **Tags:** Master Pages

Creates a one time link for a master page

One-time links that haven't been consumed will be automatically deleted after 90 days.

#### Parameters

##### `id` required

- **In:** `path`

ID of the master page

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`creation_time`**

  `string`

- **`id`**

  `string`

- **`url`**

  `string`

**Example:**

```json
{
  "id": "S617NW9C",
  "url": "https://go.oncehub.com/.S617NW9C",
  "creation_time": "2023-12-08T10:21:01Z"
}
```

##### Status: 400 400

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### List all SMS notifications

- **Method:** `GET`
- **Path:** `/notifications/sms`
- **Tags:** Notifications

Returns a list of SMS notifications sent from your account, sorted by creation date. You can filter by recipient, recipient type, and creation time.

The `recipient` field can be expanded to include full contact or user details.

#### Parameters

##### `creation_time.gt`

- **In:** `query`

Return SMS notifications created after this date

`string`, format: `date-time`

##### `creation_time.lt`

- **In:** `query`

Return SMS notifications created before this date

`string`, format: `date-time`

##### `recipient`

- **In:** `query`

Filter by specific recipient ID (contact or user ID).

`string`

##### `recipient_type`

- **In:** `query`

Filter by recipient type. Valid values are `contact` or `user`.

`string`, possible values: `"contact", "user"`

##### `before`

- **In:** `query`

A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, starting with `OBJ-XXXX`, your subsequent call can include `before=OBJ-XXXX` in order to fetch the previous page of the list.

`string`

##### `after`

- **In:** `query`

A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, ending with `OBJ-XXXX`, your subsequent call can include `after=OBJ-XXXX` in order to fetch the next page of the list.

`string`

##### `limit`

- **In:** `query`

Determines the number of objects that will be returned on each page. Defaults to 10 if not specified and has a maximum limit of 100 objects per page.

`integer`, default: `10`

##### `expand`

- **In:** `query`

A comma-separated list of fields to expand. Currently supports: `recipient`.

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`data` (required)**

  `array` — Array of SMS notification objects.

  **Items:**

  - **`creation_time` (required)**

    `string`, format: `date-time` — The date and time when the SMS notification was created.

  - **`details` (required)**

    `object` — SMS-specific delivery details.

    - **`delivered_to` (required)**

      `string` — The phone number where the SMS was delivered.

    - **`message_body` (required)**

      `string` — The content of the SMS message that was sent.

    - **`segment_count` (required)**

      `integer` — The number of segments the SMS was split into. SMS messages are charged per segment.

  - **`id` (required)**

    `string` — Unique identifier for the object.

  - **`object` (required)**

    `string` — String representing the object's type. Objects of the same type share the same value.

  - **`recipient` (required)**

    `object` — The ID of the recipient who received the SMS. Can be either a contact ID or a user ID. When expanded, this will include the full contact or user object.

  - **`recipient_type` (required)**

    `string`, possible values: `"contact", "user"` — Indicates whether the recipient is a contact or a user.

  - **`status` (required)**

    `string`, possible values: `"sent", "failed", "delivered", "rejected"` — The delivery status of the SMS notification.

  - **`type` (required)**

    `string` — The type of notification. For SMS notifications, this is always "sms".

- **`object` (required)**

  `string` — String representing the object's type. Always "list" for list responses.

**Example:**

```json
{
  "object": "list",
  "data": [
    {
      "object": "notification",
      "id": "SMS-8X92M293",
      "type": "sms",
      "status": "delivered",
      "creation_time": "2025-11-25T14:30:00Z",
      "recipient": "CTC-555444333",
      "recipient_type": "contact",
      "details": {
        "delivered_to": "+12025550195",
        "message_body": "Hi Carrie, see you at 3PM!",
        "segment_count": 1
      }
    }
  ]
}
```

##### Status: 400 400

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 403 403 - Forbidden

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### List all users

- **Method:** `GET`
- **Path:** `/users`
- **Tags:** Users

Returns a list of all users in your account

#### Parameters

##### `email`

- **In:** `query`

Filter by email address

`string`, format: `email`

##### `before`

- **In:** `query`

A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, starting with `OBJ-XXXX`, your subsequent call can include `before=OBJ-XXXX` in order to fetch the previous page of the list.

`string`

##### `after`

- **In:** `query`

A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, ending with `OBJ-XXXX`, your subsequent call can include `after=OBJ-XXXX` in order to fetch the next page of the list.

`string`

##### `limit`

- **In:** `query`

Determines the number of objects that will be returned on each page. Defaults to 10 if not specified and has a maximum limit of 100 objects per page.

`integer`, default: `10`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`data`**

  `array`

  **Items:**

  - **`email`**

    `string`, format: `email` — User's email.

  - **`first_name`**

    `string` — User's first name.

  - **`id`**

    `string` — Unique identifier for the object.

  - **`last_name`**

    `string` — User's last name.

  - **`object`**

    `string` — String representing the object's type. Objects of the same type share the same value. The type here is user.

  - **`role_name`**

    `string`, possible values: `"Account Owner", "Administrator", "Member", "Team Manager"` — The name of the role associated with the user, for example - Administrator, Member, Team Manager, or Account Owner.

  - **`status`**

    `string`, possible values: `"active", "invited"` — The status of the user. The user can have one of the following statuses - active or invited.

  - **`teams`**

    `array` — The teams the user belongs to.

    **Items:**

    `string`

  - **`timezone`**

    `string` — User's timezone. Displayed in IANA timezone format

- **`has_more`**

  `boolean` — Whether there are more items available

- **`object`**

  `string`

**Example:**

```json
{
  "object": "list",
  "data": [
    {
      "object": "user",
      "id": "USR-FSD423423",
      "first_name": "Andrea",
      "last_name": "Hartie",
      "email": "AndreaHartie@example.com",
      "status": "active",
      "role_name": "Member",
      "timezone": "America/Chicago",
      "teams": [
        "TM-GCJU8DLBTPY1"
      ]
    }
  ],
  "has_more": false
}
```

##### Status: 400 400

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Add a new user

- **Method:** `POST`
- **Path:** `/users`
- **Tags:** Users

Add or invite a new user to your OnceHub account

Notes On Using This Endpoint

- The user will be added with Member role by default if no role is specified
- An invitation email will be sent to the user
- User limits apply based on your account plan (500 for purchased accounts, 30 for trial accounts)
- The Account Owner role cannot be assigned through the API

#### Request Body

##### Content-Type: application/json

- **`email` (required)**

  `string`, format: `email` — Email address of the new user

- **`first_name` (required)**

  `string` — First name of the new user

- **`last_name` (required)**

  `string` — Last name of the new user

- **`role_name`**

  `string`, possible values: `"Administrator", "Member", "Team Manager"` — The role to assign to the user. Valid values are \`Administrator\`, \`Member\`, or \`Team Manager\`. Defaults to \`Member\` if not specified.

- **`teams`**

  `array` — Array of team external IDs to add the user to. Each team ID must exist in the account.

  **Items:**

  `string`

**Example:**

```json
{
  "email": "carrie.customer@gmail.com",
  "first_name": "Carrie",
  "last_name": "Customer",
  "role_name": "Administrator",
  "teams": [
    "TM-GCJU8DLBTPY1",
    "TM-ABC123DEF456"
  ]
}
```

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`email`**

  `string`, format: `email` — User's email.

- **`first_name`**

  `string` — User's first name.

- **`id`**

  `string` — Unique identifier for the object.

- **`last_name`**

  `string` — User's last name.

- **`object`**

  `string` — String representing the object's type. Objects of the same type share the same value. The type here is user.

- **`role_name`**

  `string`, possible values: `"Account Owner", "Administrator", "Member", "Team Manager"` — The name of the role associated with the user, for example - Administrator, Member, Team Manager, or Account Owner.

- **`status`**

  `string`, possible values: `"active", "invited"` — The status of the user. The user can have one of the following statuses - active or invited.

- **`teams`**

  `array` — The teams the user belongs to.

  **Items:**

  `string`

- **`timezone`**

  `string` — User's timezone. Displayed in IANA timezone format

**Example:**

```json
{
  "object": "user",
  "id": "USR-FSD423423",
  "first_name": "Andrea",
  "last_name": "Hartie",
  "email": "AndreaHartie@example.com",
  "status": "active",
  "role_name": "Member",
  "timezone": "America/Chicago",
  "teams": [
    "TM-GCJU8DLBTPY1"
  ]
}
```

##### Status: 400 400

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 422 422

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 500 500

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Get a single user

- **Method:** `GET`
- **Path:** `/users/{id}`
- **Tags:** Users

Returns a single user by ID

#### Parameters

##### `id` required

- **In:** `path`

ID of the user

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`email`**

  `string`, format: `email` — User's email.

- **`first_name`**

  `string` — User's first name.

- **`id`**

  `string` — Unique identifier for the object.

- **`last_name`**

  `string` — User's last name.

- **`object`**

  `string` — String representing the object's type. Objects of the same type share the same value. The type here is user.

- **`role_name`**

  `string`, possible values: `"Account Owner", "Administrator", "Member", "Team Manager"` — The name of the role associated with the user, for example - Administrator, Member, Team Manager, or Account Owner.

- **`status`**

  `string`, possible values: `"active", "invited"` — The status of the user. The user can have one of the following statuses - active or invited.

- **`teams`**

  `array` — The teams the user belongs to.

  **Items:**

  `string`

- **`timezone`**

  `string` — User's timezone. Displayed in IANA timezone format

**Example:**

```json
{
  "object": "user",
  "id": "USR-FSD423423",
  "first_name": "Andrea",
  "last_name": "Hartie",
  "email": "AndreaHartie@example.com",
  "status": "active",
  "role_name": "Member",
  "timezone": "America/Chicago",
  "teams": [
    "TM-GCJU8DLBTPY1"
  ]
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Update a user

- **Method:** `PATCH`
- **Path:** `/users/{id}`
- **Tags:** Users

Update an existing user's information in your OnceHub account

Notes On Using This Endpoint

- At least one field must be provided to update
- The Account Owner role cannot be assigned or updated through the APIs

#### Parameters

##### `id` required

- **In:** `path`

ID of the user to update

`string`

#### Request Body

##### Content-Type: application/json

- **`first_name`**

  `string` — User's first name

- **`last_name`**

  `string` — User's last name

- **`role_name`**

  `string`, possible values: `"Administrator", "Member", "Team Manager"` — The role to assign to the user. Valid values are \`Administrator\`, \`Member\`, or \`Team Manager\`.

- **`teams`**

  `array` — Array of team external IDs to assign the user to. This will replace existing team assignments.

  **Items:**

  `string`

**Example:**

```json
{
  "first_name": "Andrea",
  "last_name": "Hartie",
  "role_name": "Administrator",
  "teams": [
    "TM-GCJU8DLBTPY1",
    "TM-ABC123DEF456"
  ]
}
```

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`email`**

  `string`, format: `email` — User's email.

- **`first_name`**

  `string` — User's first name.

- **`id`**

  `string` — Unique identifier for the object.

- **`last_name`**

  `string` — User's last name.

- **`object`**

  `string` — String representing the object's type. Objects of the same type share the same value. The type here is user.

- **`role_name`**

  `string`, possible values: `"Account Owner", "Administrator", "Member", "Team Manager"` — The name of the role associated with the user, for example - Administrator, Member, Team Manager, or Account Owner.

- **`status`**

  `string`, possible values: `"active", "invited"` — The status of the user. The user can have one of the following statuses - active or invited.

- **`teams`**

  `array` — The teams the user belongs to.

  **Items:**

  `string`

- **`timezone`**

  `string` — User's timezone. Displayed in IANA timezone format

**Example:**

```json
{
  "object": "user",
  "id": "USR-FSD423423",
  "first_name": "Andrea",
  "last_name": "Hartie",
  "email": "AndreaHartie@example.com",
  "status": "active",
  "role_name": "Member",
  "timezone": "America/Chicago",
  "teams": [
    "TM-GCJU8DLBTPY1"
  ]
}
```

##### Status: 400 400

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 403 403

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 410 410

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Delete a user

- **Method:** `DELETE`
- **Path:** `/users/{id}`
- **Tags:** Users

Deletes a single user by ID.

#### Parameters

##### `id` required

- **In:** `path`

ID of the user

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`deleted` (required)**

  `boolean` — Whether the object was deleted

- **`id` (required)**

  `string` — ID of the deleted object

**Example:**

```json
{
  "id": "OBJ-123ABC",
  "deleted": true
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Get scheduling availability

- **Method:** `GET`
- **Path:** `/users/{id}/scheduling-availability`
- **Tags:** Users

Returns the scheduling availability for a user

#### Parameters

##### `id` required

- **In:** `path`

ID of the user

`string`

#### Responses

##### Status: 200

###### Content-Type: application/json

##### Status: 400 Bad Request

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Update scheduling availability

- **Method:** `PATCH`
- **Path:** `/users/{id}/scheduling-availability`
- **Tags:** Users

Updates the scheduling availability for a user

#### Parameters

##### `id` required

- **In:** `path`

`string`

#### Request Body

##### Content-Type: application/json

- **`overrides`**

  `array` — An array of objects, each defining an exception for a specific date. Any date provided will have its override schedule completely overwritten.

  **Items:**

  - **`working_hours` (required)**

    `array` — An array of time slot objects for the specific date. To make a user unavailable for the entire date, provide an empty array (\`\[]\`). To \*\*delete\*\* an existing override for a date, set this value to \`null\`.

    **Items:**

    - **`end_time` (required)**

      `string` — The end time of an availability slot for the override date in \`HH:MM\` format. Must be a multiple of 15 minutes and occur after the \`start\_time\`.

    - **`locations` (required)**

      `array` — An array of location objects available for the time slot on the override date. Can be empty.

      **Items:**

      - **`type` (required)**

        `string` — The type of location for the override slot. Valid options are: \`in\_person\_by\_host\`, \`in\_person\_by\_guest\`, \`online\_dynamic\_link\`, \`online\_static\_link\`, \`phone\_by\_guest\`.

      - **`id`**

        `string` — The unique identifier for a physical address. This field is required and only used when the type is \`in\_person\_by\_host\`.

      - **`value`**

        `string` — The value depends on the location type. For \`online\_static\_link\`, this is the static meeting URL. For \`in\_person\_by\_guest\`, this is the guest-provided meeting location. This field is required only when the type is \`online\_static\_link\` or \`in\_person\_by\_host\`.

    - **`start_time` (required)**

      `string` — The start time of an availability slot for the override date in \`HH:MM\` format. The time must be a multiple of 15 minutes.

  - **`date`**

    `string` — The specific date for the override in \`YYYY-MM-DD\` format. The date cannot be in the past. Duplicate dates are not allowed.

- **`weekly`**

  `array` — An array of objects, each defining the full availability for a specific day of the week. Any day provided will have its schedule completely overwritten.

  **Items:**

  - **`day` (required)**

    `string` — The day of the week (e.g., "Monday", "Tuesday"). Must be a valid, case-sensitive day name. Duplicate days are not allowed.

  - **`working_hours` (required)**

    `array` — An array of time slot objects for the day. To clear all availability for a day, provide an empty array (\`\[]\`). This field cannot be \`null\`. Time slots for a single day cannot overlap.

    **Items:**

    - **`end_time` (required)**

      `string` — The end time of an availability slot in \`HH:MM\` format. Must be a multiple of 15 minutes and occur after the start\_time.

    - **`locations` (required)**

      `array` — An array of location objects available for the time slot. Can be empty. You cannot mix \`online\_dynamic\_link\` and \`online\_static\_link\` types in the same slot.

      **Items:**

      - **`type` (required)**

        `string` — The type of location. Valid options are: \`in\_person\_by\_host\`, \`in\_person\_by\_guest\`, \`online\_dynamic\_link\`, \`online\_static\_link\`, \`phone\_by\_guest\`. Duplicate types are not allowed within the same slot.

      - **`id`**

        `string` — The unique identifier for a physical address. This field is required and only used when the type is \`in\_person\_by\_host\`.

      - **`value`**

        `string` — The value depends on the location type. For \`online\_static\_link\`, this is the static meeting URL. For \`in\_person\_by\_guest\`, this is the guest-provided meeting location. This field is required only when the type is \`online\_static\_link\` or \`in\_person\_by\_host\`.

    - **`start_time` (required)**

      `string` — The start time of an availability slot in \`HH:MM\` format. The time must be a multiple of 15 minutes.

**Example:**

```json
{
  "weekly": [
    {
      "day": "",
      "working_hours": [
        {
          "start_time": "",
          "end_time": "",
          "locations": [
            {
              "type": "",
              "id": "",
              "value": ""
            }
          ]
        }
      ]
    }
  ],
  "overrides": [
    {
      "date": "",
      "working_hours": [
        {
          "start_time": "",
          "end_time": "",
          "locations": [
            {
              "type": "",
              "id": "",
              "value": ""
            }
          ]
        }
      ]
    }
  ]
}
```

#### Responses

##### Status: 200

###### Content-Type: application/json

##### Status: 400 Bad Request

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 422 Unprocessable Entity

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### List all teams

- **Method:** `GET`
- **Path:** `/teams`
- **Tags:** Teams

Returns a list of all teams in your account

#### Parameters

##### `user`

- **In:** `query`

Return all teams that the provided user is a member of.

`string`

##### `before`

- **In:** `query`

A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, starting with `OBJ-XXXX`, your subsequent call can include `before=OBJ-XXXX` in order to fetch the previous page of the list.

`string`

##### `after`

- **In:** `query`

A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, ending with `OBJ-XXXX`, your subsequent call can include `after=OBJ-XXXX` in order to fetch the next page of the list.

`string`

##### `limit`

- **In:** `query`

Determines the number of objects that will be returned on each page. Defaults to 10 if not specified and has a maximum limit of 100 objects per page.

`integer`, default: `10`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`data`**

  `array`

  **Items:**

  - **`id`**

    `string` — Unique identifier for the team

  - **`name`**

    `string` — The name of the team

  - **`object`**

    `string` — String representing the object's type

- **`has_more`**

  `boolean` — Whether there are more items available

- **`object`**

  `string`

**Example:**

```json
{
  "object": "list",
  "data": [
    {
      "object": "team",
      "id": "TM-GCJU8DLBTPY1",
      "name": "Sales"
    }
  ],
  "has_more": false
}
```

##### Status: 400 400

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Get a single team

- **Method:** `GET`
- **Path:** `/teams/{id}`
- **Tags:** Teams

Returns a single team by ID

#### Parameters

##### `id` required

- **In:** `path`

ID of the team.

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`id`**

  `string` — Unique identifier for the team

- **`name`**

  `string` — The name of the team

- **`object`**

  `string` — String representing the object's type

**Example:**

```json
{
  "object": "team",
  "id": "TM-GCJU8DLBTPY1",
  "name": "Sales"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### List all contacts

- **Method:** `GET`
- **Path:** `/contacts`
- **Tags:** Contacts

List all contacts in your account

#### Parameters

##### `email`

- **In:** `query`

Filter by the contact's email address

`string`

##### `creation_time.lt`

- **In:** `query`

Return contacts with creation time less than the given date.

`string`, format: `date`

##### `last_updated_time.gt`

- **In:** `query`

Return contacts with last updated time greater than the given date.

`string`, format: `date`

##### `last_updated_time.lt`

- **In:** `query`

Return contacts with last updated time less than the given date.

`string`, format: `date`

##### `creation_time.gt`

- **In:** `query`

Return contacts with creation time greater than the given date.

`string`, format: `date`

##### `before`

- **In:** `query`

A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, starting with `OBJ-XXXX`, your subsequent call can include `before=OBJ-XXXX` in order to fetch the previous page of the list.

`string`

##### `after`

- **In:** `query`

A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, ending with `OBJ-XXXX`, your subsequent call can include `after=OBJ-XXXX` in order to fetch the next page of the list.

`string`

##### `limit`

- **In:** `query`

Determines the number of objects that will be returned on each page. Defaults to 10 if not specified and has a maximum limit of 100 objects per page.

`integer`, default: `10`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`data`**

  `array`

  **Items:**

  - **`city`**

    `string | null` — City of the contact

  - **`company`**

    `string | null` — Company name

  - **`company_size`**

    `string | null` — Size of the contact's company

  - **`country`**

    `string | null` — Country of the contact

  - **`creation_time`**

    `string`, format: `date-time` — The date and time when the contact was created

  - **`custom_fields`**

    `array` — Custom fields associated with the contact

    **Items:**

    - **`name`**

      `string`

    - **`value`**

      `string | number | boolean | array | object | null` — Value of the custom field

  - **`email`**

    `string` — Email address of the contact

  - **`employees`**

    `integer` — Number of employees

  - **`first_name`**

    `string | null` — First name of the contact

  - **`has_consent`**

    `boolean` — Whether the contact has given consent

  - **`id`**

    `string` — Unique identifier for the contact

  - **`job_title`**

    `string | null` — Job title of the contact

  - **`last_interacted_time`**

    `string | null`, format: `date-time` — The date and time of the last interaction with the contact

  - **`last_name`**

    `string | null` — Last name of the contact

  - **`last_updated_time`**

    `string`, format: `date-time` — The date and time the contact was last updated

  - **`mobile_phone`**

    `string | null` — Mobile phone number in \[E.164]\(https\://en.wikipedia.org/wiki/E.164) format

  - **`object`**

    `string` — String representing the object's type

  - **`owner`**

    `string` — The ID of the owner of the contact

  - **`phone`**

    `string | null` — Phone number in \[E.164]\(https\://en.wikipedia.org/wiki/E.164) format

  - **`post_code`**

    `string | null` — Postal code

  - **`salutation`**

    `string | null` — Salutation

  - **`state`**

    `string | null` — State or province

  - **`status`**

    `string | null`, possible values: `"Qualified", "Sales qualified", "Marketing qualified", "Disqualified", null` — The status of the contact. Accepted values are \`Qualified\`, \`Sales qualified\`, \`Marketing qualified\`, or \`Disqualified\`. If any other value is provided or no value is provided, the status will be set to null.

  - **`street_address`**

    `string | null` — Street address

  - **`terms_of_sevice`**

    `boolean` — Whether terms of service were accepted

  - **`timezone`**

    `string` — Timezone of the contact

- **`has_more`**

  `boolean` — Whether there are more items available

- **`object`**

  `string`

**Example:**

```json
{
  "object": "list",
  "data": [
    {
      "object": "contact",
      "id": "CTC-J4FR05BKEW",
      "creation_time": "2020-03-22T09:48:48Z",
      "last_updated_time": "2020-03-22T09:48:48Z",
      "last_interacted_time": null,
      "owner": "USR-FSD423423",
      "status": "Qualified",
      "city": "New York",
      "company_size": "50-100",
      "company": "Acme Inc",
      "country": "United States",
      "email": "carrie.customer@gmail.com",
      "employees": 1,
      "first_name": "Carrie",
      "has_consent": false,
      "job_title": "Executive Assistant",
      "last_name": "Customer",
      "mobile_phone": "+12025550195",
      "phone": "+12025550100",
      "post_code": "10001",
      "salutation": "Ms.",
      "state": "New York",
      "street_address": "123 Main Street",
      "terms_of_sevice": false,
      "timezone": "America/New_York",
      "custom_fields": []
    }
  ],
  "has_more": false
}
```

##### Status: 400 400

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Add a new contact

- **Method:** `POST`
- **Path:** `/contacts`
- **Tags:** Contacts

Create a new contact in your OnceHub account

Either `email` or `mobile_phone` is required - at least one must be provided

#### Request Body

##### Content-Type: application/json

**All of:**

- **`city`**

  `string | null` — City of the contact

- **`company`**

  `string | null` — Company name

- **`company_size`**

  `string | null` — Size of the contact's company

- **`country`**

  `string | null` — Country of the contact

- **`creation_time`**

  `string`, format: `date-time` — The date and time when the contact was created

- **`custom_fields`**

  `array` — Custom fields associated with the contact

  **Items:**

  - **`name`**

    `string`

  - **`value`**

    `string | number | boolean | array | object | null` — Value of the custom field

- **`email`**

  `string` — Email address of the contact

- **`employees`**

  `integer` — Number of employees

- **`first_name`**

  `string | null` — First name of the contact

- **`has_consent`**

  `boolean` — Whether the contact has given consent

- **`id`**

  `string` — Unique identifier for the contact

- **`job_title`**

  `string | null` — Job title of the contact

- **`last_interacted_time`**

  `string | null`, format: `date-time` — The date and time of the last interaction with the contact

- **`last_name`**

  `string | null` — Last name of the contact

- **`last_updated_time`**

  `string`, format: `date-time` — The date and time the contact was last updated

- **`mobile_phone`**

  `string | null` — Mobile phone number in \[E.164]\(https\://en.wikipedia.org/wiki/E.164) format

- **`object`**

  `string` — String representing the object's type

- **`owner`**

  `string` — The ID of the owner of the contact

- **`phone`**

  `string | null` — Phone number in \[E.164]\(https\://en.wikipedia.org/wiki/E.164) format

- **`post_code`**

  `string | null` — Postal code

- **`salutation`**

  `string | null` — Salutation

- **`state`**

  `string | null` — State or province

- **`status`**

  `string | null`, possible values: `"Qualified", "Sales qualified", "Marketing qualified", "Disqualified", null` — The status of the contact. Accepted values are \`Qualified\`, \`Sales qualified\`, \`Marketing qualified\`, or \`Disqualified\`. If any other value is provided or no value is provided, the status will be set to null.

- **`street_address`**

  `string | null` — Street address

- **`terms_of_sevice`**

  `boolean` — Whether terms of service were accepted

- **`timezone`**

  `string` — Timezone of the contact

**Example:**

```json
{
  "object": "contact",
  "id": "CTC-J4FR05BKEW",
  "creation_time": "2020-03-22T09:48:48Z",
  "last_updated_time": "2020-03-22T09:48:48Z",
  "last_interacted_time": null,
  "owner": "USR-FSD423423",
  "status": "Qualified",
  "city": "New York",
  "company_size": "50-100",
  "company": "Acme Inc",
  "country": "United States",
  "email": "carrie.customer@gmail.com",
  "employees": 1,
  "first_name": "Carrie",
  "has_consent": false,
  "job_title": "Executive Assistant",
  "last_name": "Customer",
  "mobile_phone": "+12025550195",
  "phone": "+12025550100",
  "post_code": "10001",
  "salutation": "Ms.",
  "state": "New York",
  "street_address": "123 Main Street",
  "terms_of_sevice": false,
  "timezone": "America/New_York",
  "custom_fields": []
}
```

#### Responses

##### Status: 201 201

###### Content-Type: application/json

- **`city`**

  `string | null` — City of the contact

- **`company`**

  `string | null` — Company name

- **`company_size`**

  `string | null` — Size of the contact's company

- **`country`**

  `string | null` — Country of the contact

- **`creation_time`**

  `string`, format: `date-time` — The date and time when the contact was created

- **`custom_fields`**

  `array` — Custom fields associated with the contact

  **Items:**

  - **`name`**

    `string`

  - **`value`**

    `string | number | boolean | array | object | null` — Value of the custom field

- **`email`**

  `string` — Email address of the contact

- **`employees`**

  `integer` — Number of employees

- **`first_name`**

  `string | null` — First name of the contact

- **`has_consent`**

  `boolean` — Whether the contact has given consent

- **`id`**

  `string` — Unique identifier for the contact

- **`job_title`**

  `string | null` — Job title of the contact

- **`last_interacted_time`**

  `string | null`, format: `date-time` — The date and time of the last interaction with the contact

- **`last_name`**

  `string | null` — Last name of the contact

- **`last_updated_time`**

  `string`, format: `date-time` — The date and time the contact was last updated

- **`mobile_phone`**

  `string | null` — Mobile phone number in \[E.164]\(https\://en.wikipedia.org/wiki/E.164) format

- **`object`**

  `string` — String representing the object's type

- **`owner`**

  `string` — The ID of the owner of the contact

- **`phone`**

  `string | null` — Phone number in \[E.164]\(https\://en.wikipedia.org/wiki/E.164) format

- **`post_code`**

  `string | null` — Postal code

- **`salutation`**

  `string | null` — Salutation

- **`state`**

  `string | null` — State or province

- **`status`**

  `string | null`, possible values: `"Qualified", "Sales qualified", "Marketing qualified", "Disqualified", null` — The status of the contact. Accepted values are \`Qualified\`, \`Sales qualified\`, \`Marketing qualified\`, or \`Disqualified\`. If any other value is provided or no value is provided, the status will be set to null.

- **`street_address`**

  `string | null` — Street address

- **`terms_of_sevice`**

  `boolean` — Whether terms of service were accepted

- **`timezone`**

  `string` — Timezone of the contact

**Example:**

```json
{
  "object": "contact",
  "id": "CTC-J4FR05BKEW",
  "creation_time": "2020-03-22T09:48:48Z",
  "last_updated_time": "2020-03-22T09:48:48Z",
  "last_interacted_time": null,
  "owner": "USR-FSD423423",
  "status": "Qualified",
  "city": "New York",
  "company_size": "50-100",
  "company": "Acme Inc",
  "country": "United States",
  "email": "carrie.customer@gmail.com",
  "employees": 1,
  "first_name": "Carrie",
  "has_consent": false,
  "job_title": "Executive Assistant",
  "last_name": "Customer",
  "mobile_phone": "+12025550195",
  "phone": "+12025550100",
  "post_code": "10001",
  "salutation": "Ms.",
  "state": "New York",
  "street_address": "123 Main Street",
  "terms_of_sevice": false,
  "timezone": "America/New_York",
  "custom_fields": []
}
```

##### Status: 400 400

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 409 409

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Get a single contact

- **Method:** `GET`
- **Path:** `/contacts/{id}`
- **Tags:** Contacts

Get a single contact

#### Parameters

##### `id` required

- **In:** `path`

ID of the contact

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`city`**

  `string | null` — City of the contact

- **`company`**

  `string | null` — Company name

- **`company_size`**

  `string | null` — Size of the contact's company

- **`country`**

  `string | null` — Country of the contact

- **`creation_time`**

  `string`, format: `date-time` — The date and time when the contact was created

- **`custom_fields`**

  `array` — Custom fields associated with the contact

  **Items:**

  - **`name`**

    `string`

  - **`value`**

    `string | number | boolean | array | object | null` — Value of the custom field

- **`email`**

  `string` — Email address of the contact

- **`employees`**

  `integer` — Number of employees

- **`first_name`**

  `string | null` — First name of the contact

- **`has_consent`**

  `boolean` — Whether the contact has given consent

- **`id`**

  `string` — Unique identifier for the contact

- **`job_title`**

  `string | null` — Job title of the contact

- **`last_interacted_time`**

  `string | null`, format: `date-time` — The date and time of the last interaction with the contact

- **`last_name`**

  `string | null` — Last name of the contact

- **`last_updated_time`**

  `string`, format: `date-time` — The date and time the contact was last updated

- **`mobile_phone`**

  `string | null` — Mobile phone number in \[E.164]\(https\://en.wikipedia.org/wiki/E.164) format

- **`object`**

  `string` — String representing the object's type

- **`owner`**

  `string` — The ID of the owner of the contact

- **`phone`**

  `string | null` — Phone number in \[E.164]\(https\://en.wikipedia.org/wiki/E.164) format

- **`post_code`**

  `string | null` — Postal code

- **`salutation`**

  `string | null` — Salutation

- **`state`**

  `string | null` — State or province

- **`status`**

  `string | null`, possible values: `"Qualified", "Sales qualified", "Marketing qualified", "Disqualified", null` — The status of the contact. Accepted values are \`Qualified\`, \`Sales qualified\`, \`Marketing qualified\`, or \`Disqualified\`. If any other value is provided or no value is provided, the status will be set to null.

- **`street_address`**

  `string | null` — Street address

- **`terms_of_sevice`**

  `boolean` — Whether terms of service were accepted

- **`timezone`**

  `string` — Timezone of the contact

**Example:**

```json
{
  "object": "contact",
  "id": "CTC-J4FR05BKEW",
  "creation_time": "2020-03-22T09:48:48Z",
  "last_updated_time": "2020-03-22T09:48:48Z",
  "last_interacted_time": null,
  "owner": "USR-FSD423423",
  "status": "Qualified",
  "city": "New York",
  "company_size": "50-100",
  "company": "Acme Inc",
  "country": "United States",
  "email": "carrie.customer@gmail.com",
  "employees": 1,
  "first_name": "Carrie",
  "has_consent": false,
  "job_title": "Executive Assistant",
  "last_name": "Customer",
  "mobile_phone": "+12025550195",
  "phone": "+12025550100",
  "post_code": "10001",
  "salutation": "Ms.",
  "state": "New York",
  "street_address": "123 Main Street",
  "terms_of_sevice": false,
  "timezone": "America/New_York",
  "custom_fields": []
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Update a contact

- **Method:** `PATCH`
- **Path:** `/contacts/{id}`
- **Tags:** Contacts

Update an existing contact in your OnceHub account

Notes On Using This Endpoint

- At least one field must be provided to update
- Identifier fields (email, mobile\_phone) cannot be updated via this endpoint
- Only the custom fields provided will be updated - partial updates are supported

#### Parameters

##### `id` required

- **In:** `path`

ID of the contact to update

`string`

#### Request Body

##### Content-Type: application/json

- **`city`**

  `string` — City of the contact

- **`company`**

  `string` — Company name

- **`company_size`**

  `string` — Size of the contact's company

- **`country`**

  `string` — Country of the contact

- **`custom_fields`**

  `array` — Custom fields to update. Only the custom fields provided will be updated.

  **Items:**

  - **`name`**

    `string`

  - **`value`**

    `string | number | boolean | array | object | null` — Value of the custom field

- **`employees`**

  `integer` — Number of employees

- **`first_name`**

  `string` — First name of the contact

- **`has_consent`**

  `boolean` — Whether the contact has given consent

- **`job_title`**

  `string` — Job title of the contact

- **`last_name`**

  `string` — Last name of the contact

- **`owner`**

  `string` — The ID of the owner of the contact

- **`phone`**

  `string` — Phone number in \[E.164]\(https\://en.wikipedia.org/wiki/E.164) format

- **`post_code`**

  `string` — Postal code

- **`salutation`**

  `string` — Salutation

- **`state`**

  `string` — State or province

- **`status`**

  `string`, possible values: `"Qualified", "Sales qualified", "Marketing qualified", "Disqualified"` — The status of the contact. Accepted values are \`Qualified\`, \`Sales qualified\`, \`Marketing qualified\`, or \`Disqualified\`. If any other value is provided or no value is provided, the status will be set to null.

- **`street_address`**

  `string` — Street address

- **`terms_of_sevice`**

  `boolean` — Whether terms of service were accepted

- **`timezone`**

  `string` — Timezone of the contact

**Example:**

```json
{
  "first_name": "Carrie",
  "last_name": "Customer",
  "owner": "USR-FSD423423",
  "status": "Qualified",
  "city": "New York",
  "company_size": "50-100",
  "company": "Acme Inc",
  "country": "United States",
  "employees": 1,
  "has_consent": false,
  "job_title": "Senior Executive Assistant",
  "phone": "+12025550100",
  "post_code": "10001",
  "salutation": "Ms.",
  "state": "New York",
  "street_address": "123 Main Street",
  "terms_of_sevice": false,
  "timezone": "America/New_York",
  "custom_fields": [
    {
      "name": "resume",
      "value": "https://example.com/resume.pdf"
    }
  ]
}
```

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`city`**

  `string | null` — City of the contact

- **`company`**

  `string | null` — Company name

- **`company_size`**

  `string | null` — Size of the contact's company

- **`country`**

  `string | null` — Country of the contact

- **`creation_time`**

  `string`, format: `date-time` — The date and time when the contact was created

- **`custom_fields`**

  `array` — Custom fields associated with the contact

  **Items:**

  - **`name`**

    `string`

  - **`value`**

    `string | number | boolean | array | object | null` — Value of the custom field

- **`email`**

  `string` — Email address of the contact

- **`employees`**

  `integer` — Number of employees

- **`first_name`**

  `string | null` — First name of the contact

- **`has_consent`**

  `boolean` — Whether the contact has given consent

- **`id`**

  `string` — Unique identifier for the contact

- **`job_title`**

  `string | null` — Job title of the contact

- **`last_interacted_time`**

  `string | null`, format: `date-time` — The date and time of the last interaction with the contact

- **`last_name`**

  `string | null` — Last name of the contact

- **`last_updated_time`**

  `string`, format: `date-time` — The date and time the contact was last updated

- **`mobile_phone`**

  `string | null` — Mobile phone number in \[E.164]\(https\://en.wikipedia.org/wiki/E.164) format

- **`object`**

  `string` — String representing the object's type

- **`owner`**

  `string` — The ID of the owner of the contact

- **`phone`**

  `string | null` — Phone number in \[E.164]\(https\://en.wikipedia.org/wiki/E.164) format

- **`post_code`**

  `string | null` — Postal code

- **`salutation`**

  `string | null` — Salutation

- **`state`**

  `string | null` — State or province

- **`status`**

  `string | null`, possible values: `"Qualified", "Sales qualified", "Marketing qualified", "Disqualified", null` — The status of the contact. Accepted values are \`Qualified\`, \`Sales qualified\`, \`Marketing qualified\`, or \`Disqualified\`. If any other value is provided or no value is provided, the status will be set to null.

- **`street_address`**

  `string | null` — Street address

- **`terms_of_sevice`**

  `boolean` — Whether terms of service were accepted

- **`timezone`**

  `string` — Timezone of the contact

**Example:**

```json
{
  "object": "contact",
  "id": "CTC-J4FR05BKEW",
  "creation_time": "2020-03-22T09:48:48Z",
  "last_updated_time": "2020-03-22T09:48:48Z",
  "last_interacted_time": null,
  "owner": "USR-FSD423423",
  "status": "Qualified",
  "city": "New York",
  "company_size": "50-100",
  "company": "Acme Inc",
  "country": "United States",
  "email": "carrie.customer@gmail.com",
  "employees": 1,
  "first_name": "Carrie",
  "has_consent": false,
  "job_title": "Executive Assistant",
  "last_name": "Customer",
  "mobile_phone": "+12025550195",
  "phone": "+12025550100",
  "post_code": "10001",
  "salutation": "Ms.",
  "state": "New York",
  "street_address": "123 Main Street",
  "terms_of_sevice": false,
  "timezone": "America/New_York",
  "custom_fields": []
}
```

##### Status: 400 400

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 500 500

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Delete a contact

- **Method:** `DELETE`
- **Path:** `/contacts/{id}`
- **Tags:** Contacts

Delete a contact

#### Parameters

##### `id` required

- **In:** `path`

ID of the contact

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`deleted` (required)**

  `boolean` — Whether the object was deleted

- **`id` (required)**

  `string` — ID of the deleted object

**Example:**

```json
{
  "id": "OBJ-123ABC",
  "deleted": true
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Create a webhook

- **Method:** `POST`
- **Path:** `/webhooks`
- **Tags:** Webhooks

Creates a webhook subscription.

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

- **`api_version`**

  `string` — The API version used for the webhook

- **`creation_time`**

  `string` — The time when the webhook was created

- **`events`**

  `array` — Booking lifecycle events that trigger the webhook

  **Items:**

  `string`

- **`id`**

  `string` — Unique identifier for the webhook

- **`name`**

  `string` — Unique name for your webhook subscription

- **`object`**

  `string` — String representing the object's type

- **`secret`**

  `string` — Secret key for webhook signature verification

- **`url`**

  `string` — URL for receiving POST messages from OnceHub

**Example:**

```json
{
  "object": "webhook",
  "id": "WHK-7JD9LBVZTQ",
  "api_version": "v2",
  "name": "New booking webhook",
  "url": "https://mywebsite.com/webhooks/booking",
  "events": [
    "booking.completed",
    "booking.rescheduled"
  ],
  "creation_time": "2020-09-06T20:57:17.467Z",
  "secret": "d7686b8c83f04913929079aeae40189e"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 409 409

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### List all webhooks

- **Method:** `GET`
- **Path:** `/webhooks`
- **Tags:** Webhooks

Returns a list of your webhook subscriptions, sorted by creation date.

#### Parameters

##### `before`

- **In:** `query`

A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, starting with `OBJ-XXXX`, your subsequent call can include `before=OBJ-XXXX` in order to fetch the previous page of the list.

`string`

##### `after`

- **In:** `query`

A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 30 objects, ending with `OBJ-XXXX`, your subsequent call can include `after=OBJ-XXXX` in order to fetch the next page of the list.

`string`

##### `limit`

- **In:** `query`

Determines the number of objects that will be returned on each page. Defaults to 10 if not specified and has a maximum limit of 100 objects per page.

`integer`, default: `10`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`data`**

  `array`

  **Items:**

  - **`api_version`**

    `string` — The API version used for the webhook

  - **`creation_time`**

    `string` — The time when the webhook was created

  - **`events`**

    `array` — Booking lifecycle events that trigger the webhook

    **Items:**

    `string`

  - **`id`**

    `string` — Unique identifier for the webhook

  - **`name`**

    `string` — Unique name for your webhook subscription

  - **`object`**

    `string` — String representing the object's type

  - **`secret`**

    `string` — Secret key for webhook signature verification

  - **`url`**

    `string` — URL for receiving POST messages from OnceHub

- **`has_more`**

  `boolean` — Whether there are more items available

- **`object`**

  `string`

**Example:**

```json
{
  "object": "list",
  "data": [
    {
      "object": "webhook",
      "id": "WHK-7JD9LBVZTQ",
      "api_version": "v2",
      "name": "New booking webhook",
      "url": "https://mywebsite.com/webhooks/booking",
      "events": [
        "booking.completed",
        "booking.rescheduled"
      ],
      "creation_time": "2020-09-06T20:57:17.467Z",
      "secret": "d7686b8c83f04913929079aeae40189e"
    }
  ],
  "has_more": false
}
```

##### Status: 400 400

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Get a single webhook

- **Method:** `GET`
- **Path:** `/webhooks/{id}`
- **Tags:** Webhooks

Returns a single webhook subscription by ID.

#### Parameters

##### `id` required

- **In:** `path`

ID of the webhook

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`api_version`**

  `string` — The API version used for the webhook

- **`creation_time`**

  `string` — The time when the webhook was created

- **`events`**

  `array` — Booking lifecycle events that trigger the webhook

  **Items:**

  `string`

- **`id`**

  `string` — Unique identifier for the webhook

- **`name`**

  `string` — Unique name for your webhook subscription

- **`object`**

  `string` — String representing the object's type

- **`secret`**

  `string` — Secret key for webhook signature verification

- **`url`**

  `string` — URL for receiving POST messages from OnceHub

**Example:**

```json
{
  "object": "webhook",
  "id": "WHK-7JD9LBVZTQ",
  "api_version": "v2",
  "name": "New booking webhook",
  "url": "https://mywebsite.com/webhooks/booking",
  "events": [
    "booking.completed",
    "booking.rescheduled"
  ],
  "creation_time": "2020-09-06T20:57:17.467Z",
  "secret": "d7686b8c83f04913929079aeae40189e"
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### Delete a webhook

- **Method:** `DELETE`
- **Path:** `/webhooks/{id}`
- **Tags:** Webhooks

Deletes a single webhook subscription by ID.

#### Parameters

##### `id` required

- **In:** `path`

ID of the webhook

`string`

#### Responses

##### Status: 200 200

###### Content-Type: application/json

- **`deleted` (required)**

  `boolean` — Whether the object was deleted

- **`id` (required)**

  `string` — ID of the deleted object

**Example:**

```json
{
  "id": "OBJ-123ABC",
  "deleted": true
}
```

##### Status: 401 401 - Unauthorized

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 404 404

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### Status: 429 429 - Too Many Requests

###### Content-Type: application/json

- **`message` (required)**

  `string` — A human-readable message providing more details about the error

- **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

- **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

## Webhooks

### Booking Scheduled Event

- **Method:**`POST`
- **Path:**`/webhooks/booking.scheduled`
- **Tags:** Webhook Events

Triggered when:

- Customer schedules a booking
- User approves a booking requested by a Customer

### Booking Rescheduled Event

- **Method:**`POST`
- **Path:**`/webhooks/booking.rescheduled`
- **Tags:** Webhook Events

Triggered when:

- Customer reschedules a booking on the same booking page
- Customer reschedules a booking following a request from the User to reschedule

### Booking Canceled Then Rescheduled Event

- **Method:**`POST`
- **Path:**`/webhooks/booking.canceled_then_rescheduled`
- **Tags:** Webhook Events

Triggered when Customer cancels a booking and then reschedules on a different booking page.

### Booking Canceled Reschedule Requested Event

- **Method:**`POST`
- **Path:**`/webhooks/booking.canceled_reschedule_requested`
- **Tags:** Webhook Events

Triggered when User cancels and sends a request to the Customer to reschedule.

### Booking Canceled Event

- **Method:**`POST`
- **Path:**`/webhooks/booking.canceled`
- **Tags:** Webhook Events

Triggered when User or Customer cancels a booking.

### Booking Completed Event

- **Method:**`POST`
- **Path:**`/webhooks/booking.completed`
- **Tags:** Webhook Events

Triggered when booking end time has passed.

### Booking No-Show Event

- **Method:**`POST`
- **Path:**`/webhooks/booking.no_show`
- **Tags:** Webhook Events

Triggered when User sets the completed booking to No-show.

### Conversation Started Event

- **Method:**`POST`
- **Path:**`/webhooks/conversation.started`
- **Tags:** Webhook Events

Triggered when website visitor starts interacting with a chatbot.

### Conversation Closed Event

- **Method:**`POST`
- **Path:**`/webhooks/conversation.closed`
- **Tags:** Webhook Events

Triggered when:

- Website visitor reaches the end of the conversation flow
- Website visitor starts a new conversation with a different chatbot

### Conversation Abandoned Event

- **Method:**`POST`
- **Path:**`/webhooks/conversation.abandoned`
- **Tags:** Webhook Events

Triggered when website visitor stops interacting with a bot for more than 10 minutes.

## Schemas

### Booking

- **Type:**

**Example:**

### BookingList

- **Type:**`object`

* **`data`**

  `array`

  **Items:**

  **All of:**

  - **`attendees`**

    `array` — List of all meeting attendees (emails).

    **Items:**

    `string`

  - **`booking_page`**

    `object` — The ID of the booking page used to make the booking. \*\*Expandable\*\*: Use \`expand=booking\_page\` to include the full BookingPage object.

  - **`cancel_reschedule_information`**

    `object | null` — An object containing information about the cancel / reschedule event. This field is \`null\` if the booking has not been cancelled or rescheduled.

  - **`creation_time`**

    `string`, format: `date-time` — The date and time when the booking was created.

  - **`custom_fields`**

    `array` — Any custom fields that have been added to the field library for the meeting object type on your account will be listed in the array of custom fields.

    **Items:**

    - **`name`**

      `string` — Name of the custom field.

    - **`value`**

      `object` — Value of the custom field.

  - **`customer_timezone`**

    `string` — The timezone selected by the customer when making the booking. Displayed in IANA timezone format.

  - **`duration_minutes`**

    `integer` — The length of the meeting, in minutes.

  - **`event_type`**

    `object` — The ID of the service selected by customer. \*\*Expandable\*\*: Use \`expand=event\_type\` to include the full EventType object.

  - **`external_calendar`**

    `object` — Object containing information about the calendar used in the booking.

    - **`event_id`**

      `string` — The id of the booking event that was created in the external calendar.

    - **`id`**

      `string` — The ID of the external calendar to which the booking was added.

    - **`name`**

      `string` — The name of the external calendar to which the booking was added.

    - **`type`**

      `string`, possible values: `"google", "exchange", "office_365", "icloud"` — Type of calendar

  - **`form_submission`**

    `object` — The object containing information entered by the customer into the booking form. This will include any system fields and custom fields defined in your booking form.

    - **`company`**

      `string | null` — The company provided by your customer in the booking form.

    - **`custom_fields`**

      `array` — The array containing custom Booking form fields.

      **Items:**

      - **`name`**

        `string`

      - **`value`**

        `object` — Value of the custom field.

    - **`email`**

      `string` — The email provided by the customer in the booking form.

    - **`guests`**

      `array` — List of additional attendees (emails) invited by the customer.

      **Items:**

      `string`

    - **`mobile_phone`**

      `string` — The mobile phone number provided by the customer in the booking form.

    - **`name`**

      `string` — The name provided by the customer in the booking form.

    - **`note`**

      `string` — The note provided by the customer in the booking form.

    - **`phone`**

      `string | null` — The phone number provided by the customer in the booking form.

  - **`id`**

    `string` — Unique identifier for the object.

  - **`in_trash`**

    `boolean` — The booking was moved to trash in the activity stream. While this value is true, the activity can still be found in the trash and has not been hard deleted yet.

  - **`last_updated_time`**

    `string`, format: `date-time` — The date and time the booking was last updated.

  - **`location_description`**

    `string` — Information about the physical location in case of physical meeting.

  - **`master_page`**

    `object` — The ID of the master booking page used to make the booking. \*\*Expandable\*\*: Use \`expand=master\_page\` to include the full MasterPage object.

  - **`object`**

    `string` — String representing the object's type. Objects of the same type share the same value.

  - **`rescheduled_booking_id`**

    `string` — The ID of the booking that was rescheduled.

  - **`starting_time`**

    `string`, format: `date-time` — The date and time when the meeting is scheduled to start.

  - **`status`**

    `string`, possible values: `"requested", "scheduled", "rescheduled", "completed", "canceled", "no_show"` — The status of the booking event. Can be: requested, scheduled, rescheduled, completed, canceled, or no\_show

  - **`subject`**

    `string` — The name of the service or subject as defined in the booking form.

  - **`tracking_id`**

    `string` — A unique ID automatically assigned to every booking.

  - **`virtual_conferencing`**

    `object` — The object containing information about the video conference in case of virtual meeting.

    - **`join_url`**

      `string` — The URL to join the video conference meeting.

  * **`contact`**

    `object` — The ID of the contact the booking was scheduled with. \*\*Expandable\*\*: Use \`expand=contact\` to include the full Contact object.

  * **`conversation`**

    `object` — The ID of the conversation that this booking was scheduled from, null if the booking did not come from a conversation. \*\*Expandable\*\*: Use \`expand=conversation\` to include the full Conversation object.

  * **`owner`**

    `object` — The ID of the owner of the booking. This is the User who originally accepted the booking, and remains unchanged even if the booking was reassigned to a new booking page. \*\*Expandable\*\*: Use \`expand=owner\` to include the full User object.

  * **`utm_params`**

    `object` — If no UTM params exist on the booking, object will return null.

* **`has_more`**

  `boolean` — Whether there are more items available

* **`object`**

  `string`

**Example:**

```json
{
  "object": "list",
  "data": [
    {
      "object": "booking",
      "id": "BKNG-J4FR05BKEWEX",
      "tracking_id": "D36E0002",
      "subject": "Live demo",
      "status": "scheduled",
      "in_trash": false,
      "creation_time": "2020-03-22T09:48:48Z",
      "starting_time": "2020-03-22T04:30:00Z",
      "customer_timezone": "America/New_York",
      "last_updated_time": "2020-03-22T09:48:48Z",
      "duration_minutes": 60,
      "virtual_conferencing": {
        "join_url": "https://meet.google.com/izv-daci-fyi"
      },
      "location_description": "123 Office Street",
      "rescheduled_booking_id": "BKNG-J4FR05BKEWEX",
      "cancel_reschedule_information": null,
      "attendees": [
        "andrea.hartie@example.com"
      ],
      "form_submission": {
        "name": "Carrie Customer",
        "email": "carrie.customer@gmail.com",
        "phone": null,
        "mobile_phone": "1-2025550195",
        "note": "I want to discuss whether your product can work for our office.",
        "company": null,
        "guests": [
          ""
        ],
        "custom_fields": [
          {
            "name": "Title",
            "value": "Executive Assistant"
          }
        ]
      },
      "booking_page": "BP-X0LCRU5LES",
      "master_page": "MP-ZID28U5946",
      "event_type": "ET-7NC41GHIDZ",
      "external_calendar": {
        "type": "google",
        "name": "andrea.hartie@example.com",
        "id": "andrea.hartie@example.com",
        "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
      },
      "custom_fields": [
        {
          "name": "discussion_points",
          "value": "Need support on new product"
        }
      ],
      "owner": "USR-FSD423423",
      "conversation": "CVR-ZLS0AG3YXZTH",
      "utm_params": {
        "source": "facebook",
        "medium": "social",
        "campaign": "webinar_signup",
        "term": "online+meeting+scheduler",
        "content": "logolink"
      },
      "contact": "CTC-262WER5NR9CG38"
    }
  ],
  "has_more": false
}
```

### Contact

- **Type:**`object`

* **`city`**

  `string | null` — City of the contact

* **`company`**

  `string | null` — Company name

* **`company_size`**

  `string | null` — Size of the contact's company

* **`country`**

  `string | null` — Country of the contact

* **`creation_time`**

  `string`, format: `date-time` — The date and time when the contact was created

* **`custom_fields`**

  `array` — Custom fields associated with the contact

  **Items:**

  - **`name`**

    `string`

  - **`value`**

    `string | number | boolean | array | object | null` — Value of the custom field

* **`email`**

  `string` — Email address of the contact

* **`employees`**

  `integer` — Number of employees

* **`first_name`**

  `string | null` — First name of the contact

* **`has_consent`**

  `boolean` — Whether the contact has given consent

* **`id`**

  `string` — Unique identifier for the contact

* **`job_title`**

  `string | null` — Job title of the contact

* **`last_interacted_time`**

  `string | null`, format: `date-time` — The date and time of the last interaction with the contact

* **`last_name`**

  `string | null` — Last name of the contact

* **`last_updated_time`**

  `string`, format: `date-time` — The date and time the contact was last updated

* **`mobile_phone`**

  `string | null` — Mobile phone number in \[E.164]\(https\://en.wikipedia.org/wiki/E.164) format

* **`object`**

  `string` — String representing the object's type

* **`owner`**

  `string` — The ID of the owner of the contact

* **`phone`**

  `string | null` — Phone number in \[E.164]\(https\://en.wikipedia.org/wiki/E.164) format

* **`post_code`**

  `string | null` — Postal code

* **`salutation`**

  `string | null` — Salutation

* **`state`**

  `string | null` — State or province

* **`status`**

  `string | null`, possible values: `"Qualified", "Sales qualified", "Marketing qualified", "Disqualified", null` — The status of the contact. Accepted values are \`Qualified\`, \`Sales qualified\`, \`Marketing qualified\`, or \`Disqualified\`. If any other value is provided or no value is provided, the status will be set to null.

* **`street_address`**

  `string | null` — Street address

* **`terms_of_sevice`**

  `boolean` — Whether terms of service were accepted

* **`timezone`**

  `string` — Timezone of the contact

**Example:**

```json
{
  "object": "contact",
  "id": "CTC-J4FR05BKEW",
  "creation_time": "2020-03-22T09:48:48Z",
  "last_updated_time": "2020-03-22T09:48:48Z",
  "last_interacted_time": null,
  "owner": "USR-FSD423423",
  "status": "Qualified",
  "city": "New York",
  "company_size": "50-100",
  "company": "Acme Inc",
  "country": "United States",
  "email": "carrie.customer@gmail.com",
  "employees": 1,
  "first_name": "Carrie",
  "has_consent": false,
  "job_title": "Executive Assistant",
  "last_name": "Customer",
  "mobile_phone": "+12025550195",
  "phone": "+12025550100",
  "post_code": "10001",
  "salutation": "Ms.",
  "state": "New York",
  "street_address": "123 Main Street",
  "terms_of_sevice": false,
  "timezone": "America/New_York",
  "custom_fields": []
}
```

### ContactList

- **Type:**`object`

* **`data`**

  `array`

  **Items:**

  - **`city`**

    `string | null` — City of the contact

  - **`company`**

    `string | null` — Company name

  - **`company_size`**

    `string | null` — Size of the contact's company

  - **`country`**

    `string | null` — Country of the contact

  - **`creation_time`**

    `string`, format: `date-time` — The date and time when the contact was created

  - **`custom_fields`**

    `array` — Custom fields associated with the contact

    **Items:**

    - **`name`**

      `string`

    - **`value`**

      `string | number | boolean | array | object | null` — Value of the custom field

  - **`email`**

    `string` — Email address of the contact

  - **`employees`**

    `integer` — Number of employees

  - **`first_name`**

    `string | null` — First name of the contact

  - **`has_consent`**

    `boolean` — Whether the contact has given consent

  - **`id`**

    `string` — Unique identifier for the contact

  - **`job_title`**

    `string | null` — Job title of the contact

  - **`last_interacted_time`**

    `string | null`, format: `date-time` — The date and time of the last interaction with the contact

  - **`last_name`**

    `string | null` — Last name of the contact

  - **`last_updated_time`**

    `string`, format: `date-time` — The date and time the contact was last updated

  - **`mobile_phone`**

    `string | null` — Mobile phone number in \[E.164]\(https\://en.wikipedia.org/wiki/E.164) format

  - **`object`**

    `string` — String representing the object's type

  - **`owner`**

    `string` — The ID of the owner of the contact

  - **`phone`**

    `string | null` — Phone number in \[E.164]\(https\://en.wikipedia.org/wiki/E.164) format

  - **`post_code`**

    `string | null` — Postal code

  - **`salutation`**

    `string | null` — Salutation

  - **`state`**

    `string | null` — State or province

  - **`status`**

    `string | null`, possible values: `"Qualified", "Sales qualified", "Marketing qualified", "Disqualified", null` — The status of the contact. Accepted values are \`Qualified\`, \`Sales qualified\`, \`Marketing qualified\`, or \`Disqualified\`. If any other value is provided or no value is provided, the status will be set to null.

  - **`street_address`**

    `string | null` — Street address

  - **`terms_of_sevice`**

    `boolean` — Whether terms of service were accepted

  - **`timezone`**

    `string` — Timezone of the contact

* **`has_more`**

  `boolean` — Whether there are more items available

* **`object`**

  `string`

**Example:**

```json
{
  "object": "list",
  "data": [
    {
      "object": "contact",
      "id": "CTC-J4FR05BKEW",
      "creation_time": "2020-03-22T09:48:48Z",
      "last_updated_time": "2020-03-22T09:48:48Z",
      "last_interacted_time": null,
      "owner": "USR-FSD423423",
      "status": "Qualified",
      "city": "New York",
      "company_size": "50-100",
      "company": "Acme Inc",
      "country": "United States",
      "email": "carrie.customer@gmail.com",
      "employees": 1,
      "first_name": "Carrie",
      "has_consent": false,
      "job_title": "Executive Assistant",
      "last_name": "Customer",
      "mobile_phone": "+12025550195",
      "phone": "+12025550100",
      "post_code": "10001",
      "salutation": "Ms.",
      "state": "New York",
      "street_address": "123 Main Street",
      "terms_of_sevice": false,
      "timezone": "America/New_York",
      "custom_fields": []
    }
  ],
  "has_more": false
}
```

### BookingPage

- **Type:**`object`

* **`active`**

  `boolean` — True if this booking page is enabled and accepts bookings

* **`id`**

  `string` — Unique identifier for the object

* **`label`**

  `string` — The internal label of the booking page

* **`name`**

  `string` — The customer-facing name of the booking page

* **`object`**

  `string` — String representing the object's type

* **`timezone`**

  `string` — The Booking page timezone. Displayed in IANA timezone format.

* **`url`**

  `string`, format: `uri` — The URL of the booking page

**Example:**

```json
{
  "object": "booking_page",
  "id": "BP-3F7JAWT4UA",
  "name": "Andrea Hartie",
  "label": "AndreaHartie",
  "url": "https://go.oncehub.com/andreahartie",
  "active": true,
  "timezone": "America/Chicago"
}
```

### BookingPageList

- **Type:**`object`

* **`data`**

  `array`

  **Items:**

  - **`active`**

    `boolean` — True if this booking page is enabled and accepts bookings

  - **`id`**

    `string` — Unique identifier for the object

  - **`label`**

    `string` — The internal label of the booking page

  - **`name`**

    `string` — The customer-facing name of the booking page

  - **`object`**

    `string` — String representing the object's type

  - **`timezone`**

    `string` — The Booking page timezone. Displayed in IANA timezone format.

  - **`url`**

    `string`, format: `uri` — The URL of the booking page

* **`has_more`**

  `boolean` — Whether there are more items available

* **`object`**

  `string`

**Example:**

```json
{
  "object": "list",
  "data": [
    {
      "object": "booking_page",
      "id": "BP-3F7JAWT4UA",
      "name": "Andrea Hartie",
      "label": "AndreaHartie",
      "url": "https://go.oncehub.com/andreahartie",
      "active": true,
      "timezone": "America/Chicago"
    }
  ],
  "has_more": false
}
```

### Team

- **Type:**`object`

* **`id`**

  `string` — Unique identifier for the team

* **`name`**

  `string` — The name of the team

* **`object`**

  `string` — String representing the object's type

**Example:**

```json
{
  "object": "team",
  "id": "TM-GCJU8DLBTPY1",
  "name": "Sales"
}
```

### TeamList

- **Type:**`object`

* **`data`**

  `array`

  **Items:**

  - **`id`**

    `string` — Unique identifier for the team

  - **`name`**

    `string` — The name of the team

  - **`object`**

    `string` — String representing the object's type

* **`has_more`**

  `boolean` — Whether there are more items available

* **`object`**

  `string`

**Example:**

```json
{
  "object": "list",
  "data": [
    {
      "object": "team",
      "id": "TM-GCJU8DLBTPY1",
      "name": "Sales"
    }
  ],
  "has_more": false
}
```

### EventType

- **Type:**`object`

* **`description`**

  `string` — The description of the event type

* **`id`**

  `string` — Unique identifier for the event type

* **`name`**

  `string` — The name of the event type

* **`object`**

  `string` — String representing the object's type

**Example:**

```json
{
  "object": "event_type",
  "id": "ET-7I7PKDTFJS",
  "name": "Live demo",
  "description": "Schedule a live demo with us for an in-depth look at our enterprise solutions."
}
```

### EventTypeList

- **Type:**`object`

* **`data`**

  `array`

  **Items:**

  - **`description`**

    `string` — The description of the event type

  - **`id`**

    `string` — Unique identifier for the event type

  - **`name`**

    `string` — The name of the event type

  - **`object`**

    `string` — String representing the object's type

* **`has_more`**

  `boolean` — Whether there are more items available

* **`object`**

  `string`

**Example:**

```json
{
  "object": "list",
  "data": [
    {
      "object": "event_type",
      "id": "ET-7I7PKDTFJS",
      "name": "Live demo",
      "description": "Schedule a live demo with us for an in-depth look at our enterprise solutions."
    }
  ],
  "has_more": false
}
```

### Webhook

- **Type:**`object`

* **`api_version`**

  `string` — The API version used for the webhook

* **`creation_time`**

  `string` — The time when the webhook was created

* **`events`**

  `array` — Booking lifecycle events that trigger the webhook

  **Items:**

  `string`

* **`id`**

  `string` — Unique identifier for the webhook

* **`name`**

  `string` — Unique name for your webhook subscription

* **`object`**

  `string` — String representing the object's type

* **`secret`**

  `string` — Secret key for webhook signature verification

* **`url`**

  `string` — URL for receiving POST messages from OnceHub

**Example:**

```json
{
  "object": "webhook",
  "id": "WHK-7JD9LBVZTQ",
  "api_version": "v2",
  "name": "New booking webhook",
  "url": "https://mywebsite.com/webhooks/booking",
  "events": [
    "booking.completed",
    "booking.rescheduled"
  ],
  "creation_time": "2020-09-06T20:57:17.467Z",
  "secret": "d7686b8c83f04913929079aeae40189e"
}
```

### WebhookList

- **Type:**`object`

* **`data`**

  `array`

  **Items:**

  - **`api_version`**

    `string` — The API version used for the webhook

  - **`creation_time`**

    `string` — The time when the webhook was created

  - **`events`**

    `array` — Booking lifecycle events that trigger the webhook

    **Items:**

    `string`

  - **`id`**

    `string` — Unique identifier for the webhook

  - **`name`**

    `string` — Unique name for your webhook subscription

  - **`object`**

    `string` — String representing the object's type

  - **`secret`**

    `string` — Secret key for webhook signature verification

  - **`url`**

    `string` — URL for receiving POST messages from OnceHub

* **`has_more`**

  `boolean` — Whether there are more items available

* **`object`**

  `string`

**Example:**

```json
{
  "object": "list",
  "data": [
    {
      "object": "webhook",
      "id": "WHK-7JD9LBVZTQ",
      "api_version": "v2",
      "name": "New booking webhook",
      "url": "https://mywebsite.com/webhooks/booking",
      "events": [
        "booking.completed",
        "booking.rescheduled"
      ],
      "creation_time": "2020-09-06T20:57:17.467Z",
      "secret": "d7686b8c83f04913929079aeae40189e"
    }
  ],
  "has_more": false
}
```

### WebhookEvent

- **Type:**`object`

Base webhook event structure sent to your webhook URL

- **`api_version` (required)**

  `string` — The OnceHub API version used to render the data object

- **`creation_time` (required)**

  `string`, format: `date-time` — The time the event object was created

- **`id` (required)**

  `string` — Unique alphanumeric identifier for the event object

- **`object` (required)**

  `string` — String representing the object's type

- **`type` (required)**

  `string` — The type of the event (e.g., booking.scheduled, conversation.started)

**Example:**

```json
{
  "id": "EVNT-KN56U3YL7C",
  "object": "event",
  "creation_time": "2020-03-22T09:49:12Z",
  "type": "booking.scheduled",
  "api_version": "v2"
}
```

### BookingWebhookData

- **Type:**

**Example:**

### BookingWebhookCancelData

- **Type:**

**Example:**

### BookingWithCancelInfo

- **Type:**

**Example:**

### ConversationWebhookData

- **Type:**

**Example:**

### BookingCalendar

- **Type:**`object`

* **`duration_minutes`**

  `number` — Meeting duration in minutes.

* **`host`**

  `string` — The user id / team id of the booking calendar meeting host. Additional attendees are not included.

* **`id`**

  `string` — Unique identifier for the object.

* **`name`**

  `string` — The internal label / name of the booking calendar.

* **`object`**

  `string` — String representing the object's type. Objects of the same type share the same value. The type here is booking\_calendar.

* **`published`**

  `boolean` — True if this booking calendar is enabled and accepts bookings.

* **`subject`**

  `string` — The customer-facing subject of the booking calendar.

* **`url`**

  `string`, format: `uri` — The URL of the booking calendar.

**Example:**

```json
{
  "object": "booking_calendar",
  "id": "BKC-LDJ878496X",
  "host": "USR-HYPGJXN3A8",
  "name": "Andrea Hartie booking calendar",
  "subject": "Meeting with Andrea Hartie",
  "url": "https://oncehub.com/andreahartie",
  "published": true,
  "duration_minutes": 30
}
```

### BookingCalendarList

- **Type:**`object`

* **`data`**

  `array`

  **Items:**

  - **`duration_minutes`**

    `number` — Meeting duration in minutes.

  - **`host`**

    `string` — The user id / team id of the booking calendar meeting host. Additional attendees are not included.

  - **`id`**

    `string` — Unique identifier for the object.

  - **`name`**

    `string` — The internal label / name of the booking calendar.

  - **`object`**

    `string` — String representing the object's type. Objects of the same type share the same value. The type here is booking\_calendar.

  - **`published`**

    `boolean` — True if this booking calendar is enabled and accepts bookings.

  - **`subject`**

    `string` — The customer-facing subject of the booking calendar.

  - **`url`**

    `string`, format: `uri` — The URL of the booking calendar.

* **`has_more`**

  `boolean` — Whether there are more items available

* **`object`**

  `string`

**Example:**

```json
{
  "object": "list",
  "data": [
    {
      "object": "booking_calendar",
      "id": "BKC-LDJ878496X",
      "host": "USR-HYPGJXN3A8",
      "name": "Andrea Hartie booking calendar",
      "subject": "Meeting with Andrea Hartie",
      "url": "https://oncehub.com/andreahartie",
      "published": true,
      "duration_minutes": 30
    }
  ],
  "has_more": false
}
```

### User

- **Type:**`object`

* **`email`**

  `string`, format: `email` — User's email.

* **`first_name`**

  `string` — User's first name.

* **`id`**

  `string` — Unique identifier for the object.

* **`last_name`**

  `string` — User's last name.

* **`object`**

  `string` — String representing the object's type. Objects of the same type share the same value. The type here is user.

* **`role_name`**

  `string`, possible values: `"Account Owner", "Administrator", "Member", "Team Manager"` — The name of the role associated with the user, for example - Administrator, Member, Team Manager, or Account Owner.

* **`status`**

  `string`, possible values: `"active", "invited"` — The status of the user. The user can have one of the following statuses - active or invited.

* **`teams`**

  `array` — The teams the user belongs to.

  **Items:**

  `string`

* **`timezone`**

  `string` — User's timezone. Displayed in IANA timezone format

**Example:**

```json
{
  "object": "user",
  "id": "USR-FSD423423",
  "first_name": "Andrea",
  "last_name": "Hartie",
  "email": "AndreaHartie@example.com",
  "status": "active",
  "role_name": "Member",
  "timezone": "America/Chicago",
  "teams": [
    "TM-GCJU8DLBTPY1"
  ]
}
```

### UserList

- **Type:**`object`

* **`data`**

  `array`

  **Items:**

  - **`email`**

    `string`, format: `email` — User's email.

  - **`first_name`**

    `string` — User's first name.

  - **`id`**

    `string` — Unique identifier for the object.

  - **`last_name`**

    `string` — User's last name.

  - **`object`**

    `string` — String representing the object's type. Objects of the same type share the same value. The type here is user.

  - **`role_name`**

    `string`, possible values: `"Account Owner", "Administrator", "Member", "Team Manager"` — The name of the role associated with the user, for example - Administrator, Member, Team Manager, or Account Owner.

  - **`status`**

    `string`, possible values: `"active", "invited"` — The status of the user. The user can have one of the following statuses - active or invited.

  - **`teams`**

    `array` — The teams the user belongs to.

    **Items:**

    `string`

  - **`timezone`**

    `string` — User's timezone. Displayed in IANA timezone format

* **`has_more`**

  `boolean` — Whether there are more items available

* **`object`**

  `string`

**Example:**

```json
{
  "object": "list",
  "data": [
    {
      "object": "user",
      "id": "USR-FSD423423",
      "first_name": "Andrea",
      "last_name": "Hartie",
      "email": "AndreaHartie@example.com",
      "status": "active",
      "role_name": "Member",
      "timezone": "America/Chicago",
      "teams": [
        "TM-GCJU8DLBTPY1"
      ]
    }
  ],
  "has_more": false
}
```

### SmsNotification

- **Type:**`object`

* **`creation_time` (required)**

  `string`, format: `date-time` — The date and time when the SMS notification was created.

* **`details` (required)**

  `object` — SMS-specific delivery details.

  - **`delivered_to` (required)**

    `string` — The phone number where the SMS was delivered.

  - **`message_body` (required)**

    `string` — The content of the SMS message that was sent.

  - **`segment_count` (required)**

    `integer` — The number of segments the SMS was split into. SMS messages are charged per segment.

* **`id` (required)**

  `string` — Unique identifier for the object.

* **`object` (required)**

  `string` — String representing the object's type. Objects of the same type share the same value.

* **`recipient` (required)**

  `object` — The ID of the recipient who received the SMS. Can be either a contact ID or a user ID. When expanded, this will include the full contact or user object.

* **`recipient_type` (required)**

  `string`, possible values: `"contact", "user"` — Indicates whether the recipient is a contact or a user.

* **`status` (required)**

  `string`, possible values: `"sent", "failed", "delivered", "rejected"` — The delivery status of the SMS notification.

* **`type` (required)**

  `string` — The type of notification. For SMS notifications, this is always "sms".

**Example:**

```json
{
  "object": "notification",
  "id": "SMS-8X92M293",
  "type": "sms",
  "status": "delivered",
  "creation_time": "2025-11-25T14:30:00Z",
  "recipient": "CTC-555444333",
  "recipient_type": "contact",
  "details": {
    "delivered_to": "+12025550195",
    "message_body": "Hi Carrie, see you at 3PM!",
    "segment_count": 1
  }
}
```

### SmsNotificationList

- **Type:**`object`

* **`data` (required)**

  `array` — Array of SMS notification objects.

  **Items:**

  - **`creation_time` (required)**

    `string`, format: `date-time` — The date and time when the SMS notification was created.

  - **`details` (required)**

    `object` — SMS-specific delivery details.

    - **`delivered_to` (required)**

      `string` — The phone number where the SMS was delivered.

    - **`message_body` (required)**

      `string` — The content of the SMS message that was sent.

    - **`segment_count` (required)**

      `integer` — The number of segments the SMS was split into. SMS messages are charged per segment.

  - **`id` (required)**

    `string` — Unique identifier for the object.

  - **`object` (required)**

    `string` — String representing the object's type. Objects of the same type share the same value.

  - **`recipient` (required)**

    `object` — The ID of the recipient who received the SMS. Can be either a contact ID or a user ID. When expanded, this will include the full contact or user object.

  - **`recipient_type` (required)**

    `string`, possible values: `"contact", "user"` — Indicates whether the recipient is a contact or a user.

  - **`status` (required)**

    `string`, possible values: `"sent", "failed", "delivered", "rejected"` — The delivery status of the SMS notification.

  - **`type` (required)**

    `string` — The type of notification. For SMS notifications, this is always "sms".

* **`object` (required)**

  `string` — String representing the object's type. Always "list" for list responses.

**Example:**

```json
{
  "object": "list",
  "data": [
    {
      "object": "notification",
      "id": "SMS-8X92M293",
      "type": "sms",
      "status": "delivered",
      "creation_time": "2025-11-25T14:30:00Z",
      "recipient": "CTC-555444333",
      "recipient_type": "contact",
      "details": {
        "delivered_to": "+12025550195",
        "message_body": "Hi Carrie, see you at 3PM!",
        "segment_count": 1
      }
    }
  ]
}
```

### Error

- **Type:**`object`

* **`message` (required)**

  `string` — A human-readable message providing more details about the error

* **`type` (required)**

  `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"` — The type of error returned

* **`param`**

  `string` — If the error is parameter-specific, the parameter related to the error

**Example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

### MasterPage

- **Type:**`object`

The master page object contains the name, label and URL for master pages on your account and indicates whether the master page is enabled to receive bookings.

- **`active`**

  `boolean`, default: `true` — True if this master page is enabled and accepts bookings.

- **`id`**

  `string` — Unique identifier for the object.

- **`label`**

  `string` — The internal label of the master page.

- **`name`**

  `string` — The customer facing name of the master page.

- **`object`**

  `string` — String representing the object's type. Objects of the same type share the same value. The type here is master\_page.

- **`url`**

  `string`, format: `uri` — The URL of the master page.

**Example:**

```json
{
  "object": "master_page",
  "id": "MP-73E6RHFU77",
  "name": "Star Software LLC",
  "label": "Dana",
  "url": "https://go.oncehub.com/dana",
  "active": true
}
```

### BookingBase

- **Type:**`object`

* **`attendees`**

  `array` — List of all meeting attendees (emails).

  **Items:**

  `string`

* **`booking_page`**

  `object` — The ID of the booking page used to make the booking. \*\*Expandable\*\*: Use \`expand=booking\_page\` to include the full BookingPage object.

* **`cancel_reschedule_information`**

  `object | null` — An object containing information about the cancel / reschedule event. This field is \`null\` if the booking has not been cancelled or rescheduled.

* **`creation_time`**

  `string`, format: `date-time` — The date and time when the booking was created.

* **`custom_fields`**

  `array` — Any custom fields that have been added to the field library for the meeting object type on your account will be listed in the array of custom fields.

  **Items:**

  - **`name`**

    `string` — Name of the custom field.

  - **`value`**

    `object` — Value of the custom field.

* **`customer_timezone`**

  `string` — The timezone selected by the customer when making the booking. Displayed in IANA timezone format.

* **`duration_minutes`**

  `integer` — The length of the meeting, in minutes.

* **`event_type`**

  `object` — The ID of the service selected by customer. \*\*Expandable\*\*: Use \`expand=event\_type\` to include the full EventType object.

* **`external_calendar`**

  `object` — Object containing information about the calendar used in the booking.

  - **`event_id`**

    `string` — The id of the booking event that was created in the external calendar.

  - **`id`**

    `string` — The ID of the external calendar to which the booking was added.

  - **`name`**

    `string` — The name of the external calendar to which the booking was added.

  - **`type`**

    `string`, possible values: `"google", "exchange", "office_365", "icloud"` — Type of calendar

* **`form_submission`**

  `object` — The object containing information entered by the customer into the booking form. This will include any system fields and custom fields defined in your booking form.

  - **`company`**

    `string | null` — The company provided by your customer in the booking form.

  - **`custom_fields`**

    `array` — The array containing custom Booking form fields.

    **Items:**

    - **`name`**

      `string`

    - **`value`**

      `object` — Value of the custom field.

  - **`email`**

    `string` — The email provided by the customer in the booking form.

  - **`guests`**

    `array` — List of additional attendees (emails) invited by the customer.

    **Items:**

    `string`

  - **`mobile_phone`**

    `string` — The mobile phone number provided by the customer in the booking form.

  - **`name`**

    `string` — The name provided by the customer in the booking form.

  - **`note`**

    `string` — The note provided by the customer in the booking form.

  - **`phone`**

    `string | null` — The phone number provided by the customer in the booking form.

* **`id`**

  `string` — Unique identifier for the object.

* **`in_trash`**

  `boolean` — The booking was moved to trash in the activity stream. While this value is true, the activity can still be found in the trash and has not been hard deleted yet.

* **`last_updated_time`**

  `string`, format: `date-time` — The date and time the booking was last updated.

* **`location_description`**

  `string` — Information about the physical location in case of physical meeting.

* **`master_page`**

  `object` — The ID of the master booking page used to make the booking. \*\*Expandable\*\*: Use \`expand=master\_page\` to include the full MasterPage object.

* **`object`**

  `string` — String representing the object's type. Objects of the same type share the same value.

* **`rescheduled_booking_id`**

  `string` — The ID of the booking that was rescheduled.

* **`starting_time`**

  `string`, format: `date-time` — The date and time when the meeting is scheduled to start.

* **`status`**

  `string`, possible values: `"requested", "scheduled", "rescheduled", "completed", "canceled", "no_show"` — The status of the booking event. Can be: requested, scheduled, rescheduled, completed, canceled, or no\_show

* **`subject`**

  `string` — The name of the service or subject as defined in the booking form.

* **`tracking_id`**

  `string` — A unique ID automatically assigned to every booking.

* **`virtual_conferencing`**

  `object` — The object containing information about the video conference in case of virtual meeting.

  - **`join_url`**

    `string` — The URL to join the video conference meeting.

**Example:**

```json
{
  "object": "booking",
  "id": "BKNG-J4FR05BKEWEX",
  "tracking_id": "D36E0002",
  "subject": "Live demo",
  "status": "scheduled",
  "in_trash": false,
  "creation_time": "2020-03-22T09:48:48Z",
  "starting_time": "2020-03-22T04:30:00Z",
  "customer_timezone": "America/New_York",
  "last_updated_time": "2020-03-22T09:48:48Z",
  "duration_minutes": 60,
  "virtual_conferencing": {
    "join_url": "https://meet.google.com/izv-daci-fyi"
  },
  "location_description": "123 Office Street",
  "rescheduled_booking_id": "BKNG-J4FR05BKEWEX",
  "cancel_reschedule_information": null,
  "attendees": [
    "andrea.hartie@example.com"
  ],
  "form_submission": {
    "name": "Carrie Customer",
    "email": "carrie.customer@gmail.com",
    "phone": null,
    "mobile_phone": "1-2025550195",
    "note": "I want to discuss whether your product can work for our office.",
    "company": null,
    "guests": [
      ""
    ],
    "custom_fields": [
      {
        "name": "Title",
        "value": "Executive Assistant"
      }
    ]
  },
  "booking_page": "BP-X0LCRU5LES",
  "master_page": "MP-ZID28U5946",
  "event_type": "ET-7NC41GHIDZ",
  "external_calendar": {
    "type": "google",
    "name": "andrea.hartie@example.com",
    "id": "andrea.hartie@example.com",
    "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
  },
  "custom_fields": [
    {
      "name": "discussion_points",
      "value": "Need support on new product"
    }
  ]
}
```

### Bot

- **Type:**`object`

* **`id`**

  `string` — Unique alphanumeric identifier for the object. The prefix of the Bot ID is BOT-.

* **`name`**

  `string` — The name of the bot.

* **`object`**

  `string` — String representing the object's type. Objects of the same type share the same value. The value here is bot.

**Example:**

```json
{
  "id": "BOT-62774A40FB",
  "object": "bot",
  "name": "Sales Assistant Bot"
}
```

### Website

- **Type:**`object`

* **`id`**

  `string` — Unique alphanumeric identifier for the object. The prefix of the Website ID is WEB-.

* **`name`**

  `string` — The name of the website.

* **`object`**

  `string` — String representing the object's type. Objects of the same type share the same value. The value here is website.

* **`url`**

  `string`, format: `uri` — The URL of the website.

**Example:**

```json
{
  "id": "WEB-B1D45D12BB",
  "object": "website",
  "name": "Company Website",
  "url": "https://www.example.com"
}
```

### Audience

- **Type:**`object`

* **`id`**

  `string` — Unique alphanumeric identifier for the object. The prefix of the Audience ID is AUD-.

* **`name`**

  `string` — The name of the audience.

* **`object`**

  `string` — String representing the object's type. Objects of the same type share the same value. The value here is audience.

**Example:**

```json
{
  "id": "AUD-123ABC456",
  "object": "audience",
  "name": "Enterprise Customers"
}
```

### Conversation

- **Type:**`object`

* **`answers`**

  `array` — Answers to the questions asked during the conversation.

  **Items:**

  - **`id`**

    `string` — Unique identifier for the interaction.

  - **`internal_label`**

    `string | null` — Internal label for the question.

  - **`question`**

    `string` — The question asked during the conversation.

  - **`value`**

    `string` — The answer provided by the contact.

* **`audience`**

  `object` — The audience associated with this conversation. \*\*Expandable\*\*: Use \`expand=audience\` to include the full Audience object.

* **`bookings`**

  `array` — Bookings that are associated to the conversation.

  **Items:**

  `string`

* **`bot`**

  `object` — The bot that facilitated the conversation. \*\*Expandable\*\*: Use \`expand=bot\` to include the full Bot object.

* **`contact`**

  `object` — The contact / customer involved in this conversation. \*\*Expandable\*\*: Use \`expand=contact\` to include the full Contact object.

* **`creation_time`**

  `string`, format: `date-time` — The date and time the conversation was created.

* **`id`**

  `string` — Unique alphanumeric identifier for the object. The prefix of the Conversation ID is CVR-.

* **`initiated_by`**

  `string`, possible values: `"bot", "contact"` — Either bot (auto reach out) or contact (website visitor clicked on a CTA).

* **`last_interacted_time`**

  `string`, format: `date-time` — The date and time of the last conversation interaction.

* **`last_updated_time`**

  `string`, format: `date-time` — The date and time the conversation was last updated.

* **`object`**

  `string` — String representing the object's type. Objects of the same type share the same value. The value here is conversation.

* **`owner`**

  `object` — The owner (user object) of the conversation. \*\*Expandable\*\*: Use \`expand=owner\` to include the full User object.

* **`status`**

  `string`, possible values: `"started", "closed", "abandoned"` — The status of the conversation. Can be one of the following: - \`started\` - The website visitor has responded with a first message and the conversation is active from this point. - \`closed\` - The conversation has been closed, this can be done by the conversation ending with a last message, or the visitor starting a different conversation. - \`abandoned\` - If there is no response from the visitor for more than 10 minutes the conversation is ended in an abandoned state.

* **`website`**

  `object` — The website this conversation was triggered on. \*\*Expandable\*\*: Use \`expand=website\` to include the full Website object.

**Example:**

```json
{
  "id": "CVR-022EAEA41C",
  "object": "conversation",
  "creation_time": "2021-07-13T12:28:24Z",
  "initiated_by": "contact",
  "last_updated_time": "2021-07-13T12:33:54Z",
  "last_interacted_time": "2021-07-13T12:33:54Z",
  "contact": "CTC-9QEG09XXYN",
  "owner": "USR-GNSBE50D6A",
  "status": "closed",
  "bot": "BOT-62774A40FB",
  "website": "WEB-B1D45D12BB",
  "audience": "AUD-123ABC456",
  "answers": [
    {
      "id": "INT-5D22DCBE36",
      "internal_label": "",
      "question": "Full name",
      "value": "Carrie Customer"
    }
  ],
  "bookings": [
    "BKNG-3KM0HY2BF9SL"
  ]
}
```

### UtmParams

- **Type:**`object`

Object containing captured values for the 5 standard [UTM parameters](https://en.wikipedia.org/wiki/UTM_parameters).

- **`campaign`**

  `string` — Identifies a specific product promotion or strategic campaign

- **`content`**

  `string` — Identifies what specifically was clicked to bring the user to the site

- **`medium`**

  `string` — Identifies what type of link was used

- **`source`**

  `string` — Identifies which site sent the traffic

- **`term`**

  `string` — Identifies search terms

**Example:**

```json
{
  "source": "facebook",
  "medium": "social",
  "campaign": "webinar_signup",
  "term": "online+meeting+scheduler",
  "content": "logolink"
}
```

### BookingForm

- **Type:**`object`

An object containing information about the guest

- **`array_custom_field`**

  `array` — A placeholder for a custom field that accepts multiple values. Replace \`array\_custom\_field\` with the mapped\_field\_name of your Multi-Select Picklist question. The value must be an array of strings.

  **Items:**

  `string`

- **`email`**

  `string` — Email of the guest

- **`name`**

  `string` — Name of the guest

- **`phone`**

  `string` — Phone of the guest

- **`string_custom_field`**

  `string` — A placeholder for a custom field that accepts a single text value. Replace \`string\_custom\_field\` with the \`mapped\_field\_name\` of your Text or Single-Select Picklist question.

**Example:**

```json
{
  "name": "Carrie Customer",
  "email": "carrie.customer@gmail.com",
  "phone": "+12025550195",
  "string_custom_field": "Executive Assistant",
  "array_custom_field": [
    "Marketing",
    "Sales"
  ]
}
```

### DeletedObject

- **Type:**`object`

* **`deleted` (required)**

  `boolean` — Whether the object was deleted

* **`id` (required)**

  `string` — ID of the deleted object

**Example:**

```json
{
  "id": "OBJ-123ABC",
  "deleted": true
}
```
