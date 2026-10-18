# OnceHub Booking Calendars API

- **OpenAPI Version:** `3.2.0`
- **API Version:** `2.0.0`
- **License:** [Proprietary](https://www.oncehub.com/trustcenter/legal/api-terms-of-use)

The OnceHub Booking Calendars API allows you to manage bookings, calendars, event types, and scheduling resources programmatically.

**Note:** This documentation is for the Booking Calendars product. Booking Calendars is our current and recommended scheduling solution.

## Contents

**Operations**

- [GET /test](#scalar-operation-get-test)
- [GET /bookings](#scalar-operation-get-bookings)
- [GET /bookings/{id}](#scalar-operation-get-bookingsid)
- [POST /bookings/{id}/cancel](#scalar-operation-post-bookingsidcancel)
- [POST /bookings/{id}/request-reschedule](#scalar-operation-post-bookingsidrequest-reschedule)
- [POST /bookings/{id}/reassign](#scalar-operation-post-bookingsidreassign)
- [POST /bookings/{id}/no-show](#scalar-operation-post-bookingsidno-show)
- [GET /booking-calendars](#scalar-operation-get-booking-calendars)
- [GET /booking-calendars/{id}](#scalar-operation-get-booking-calendarsid)
- [GET /booking-calendars/{id}/time-slots](#scalar-operation-get-booking-calendarsidtime-slots)
- [POST /booking-calendars/{id}/schedule](#scalar-operation-post-booking-calendarsidschedule)
- [POST /booking-calendars/{id}/one-time-links](#scalar-operation-post-booking-calendarsidone-time-links)
- [GET /notifications/sms](#scalar-operation-get-notificationssms)
- [GET /users](#scalar-operation-get-users)
- [POST /users](#scalar-operation-post-users)
- [GET /users/{id}](#scalar-operation-get-usersid)
- [PATCH /users/{id}](#scalar-operation-patch-usersid)
- [DELETE /users/{id}](#scalar-operation-delete-usersid)
- [GET /users/{id}/scheduling-availability](#scalar-operation-get-usersidscheduling-availability)
- [PATCH /users/{id}/scheduling-availability](#scalar-operation-patch-usersidscheduling-availability)
- [GET /teams](#scalar-operation-get-teams)
- [GET /teams/{id}](#scalar-operation-get-teamsid)
- [GET /contacts](#scalar-operation-get-contacts)
- [POST /contacts](#scalar-operation-post-contacts)
- [GET /contacts/{id}](#scalar-operation-get-contactsid)
- [PATCH /contacts/{id}](#scalar-operation-patch-contactsid)
- [DELETE /contacts/{id}](#scalar-operation-delete-contactsid)
- [POST /webhooks](#scalar-operation-post-webhooks)
- [GET /webhooks](#scalar-operation-get-webhooks)
- [GET /webhooks/{id}](#scalar-operation-get-webhooksid)
- [DELETE /webhooks/{id}](#scalar-operation-delete-webhooksid)

**Webhooks**

- [POST booking.scheduled](#scalar-webhook-post-bookingscheduled)
- [POST booking.rescheduled](#scalar-webhook-post-bookingrescheduled)
- [POST booking.reassigned](#scalar-webhook-post-bookingreassigned)
- [POST booking.canceled\_then\_rescheduled](#scalar-webhook-post-bookingcanceled-then-rescheduled)
- [POST booking.canceled\_reschedule\_requested](#scalar-webhook-post-bookingcanceled-reschedule-requested)
- [POST booking.canceled](#scalar-webhook-post-bookingcanceled)
- [POST booking.completed](#scalar-webhook-post-bookingcompleted)
- [POST booking.no\_show](#scalar-webhook-post-bookingno-show)
- [POST conversation.started](#scalar-webhook-post-conversationstarted)
- [POST conversation.closed](#scalar-webhook-post-conversationclosed)
- [POST conversation.abandoned](#scalar-webhook-post-conversationabandoned)

**Schemas**

- [Booking](#scalar-schema-booking)
- [BookingList](#scalar-schema-bookinglist)
- [Contact](#scalar-schema-contact)
- [ContactList](#scalar-schema-contactlist)
- [BookingPage](#scalar-schema-bookingpage)
- [BookingPageList](#scalar-schema-bookingpagelist)
- [Team](#scalar-schema-team)
- [TeamList](#scalar-schema-teamlist)
- [EventType](#scalar-schema-eventtype)
- [EventTypeList](#scalar-schema-eventtypelist)
- [Webhook](#scalar-schema-webhook)
- [WebhookList](#scalar-schema-webhooklist)
- [WebhookEvent](#scalar-schema-webhookevent)
- [BookingWebhookData](#scalar-schema-bookingwebhookdata)
- [BookingWebhookCancelData](#scalar-schema-bookingwebhookcanceldata)
- [BookingWithCancelInfo](#scalar-schema-bookingwithcancelinfo)
- [ConversationWebhookData](#scalar-schema-conversationwebhookdata)
- [BookingCalendar](#scalar-schema-bookingcalendar)
- [BookingCalendarList](#scalar-schema-bookingcalendarlist)
- [User](#scalar-schema-user)
- [UserList](#scalar-schema-userlist)
- [SmsNotification](#scalar-schema-smsnotification)
- [SmsNotificationList](#scalar-schema-smsnotificationlist)
- [Error](#scalar-schema-error)
- [MasterPage](#scalar-schema-masterpage)
- [BookingBase](#scalar-schema-bookingbase)
- [Bot](#scalar-schema-bot)
- [Website](#scalar-schema-website)
- [Audience](#scalar-schema-audience)
- [Conversation](#scalar-schema-conversation)
- [UtmParams](#scalar-schema-utmparams)
- [BookingForm](#scalar-schema-bookingform)
- [DeletedObject](#scalar-schema-deletedobject)

<a id="scalar-context-global-servers"></a>

## Servers

- **URL:** `https://api.oncehub.com/v2`

<a id="scalar-context-global-authentication"></a>

## Authentication

- **ApiKey**: API key in header `API-Key`

## Tags

### Authentication

Validate API credentials and manage authentication for OnceHub API access. All API requests require an API key to be passed in the `API-Key` header.

### Bookings

Manage booking appointments and their lifecycle. Bookings represent scheduled meetings
between contacts and users. Use these endpoints to list, retrieve, and perform actions
on bookings such as canceling, requesting reschedules, or marking as no-show.

### Booking Calendars

Manage booking calendars and their availability. Booking calendars define available
time slots for appointments and can be used to schedule meetings. Use these endpoints
to list calendars, retrieve availability, schedule appointments, and create one-time
booking links.

### Contacts

Manage contact information and relationships. Contacts represent people who have
scheduled or may schedule appointments through your booking pages. Use these endpoints
to list contacts, retrieve contact details, and manage contact records.

### Notifications

Notifications are messages sent by OnceHub to contacts and users through various channels such as SMS, email, or push notifications.
The notifications API allows you to retrieve and monitor notification delivery status and details.

### Teams

Manage teams and team memberships. Teams allow you to organize users into groups
for shared calendars, permissions, and resource management. Use these endpoints to
retrieve team information and manage team-related operations.

### Users

Manage user accounts and their properties. Users represent team members who can
schedule appointments, manage calendars, and access the OnceHub platform. Use these
endpoints to list users, retrieve user details, manage user accounts, and check
scheduling availability.

### Webhooks

Manage webhook subscriptions to receive real-time notifications for booking lifecycle events.

### Webhook Events

Event payloads sent to your webhook endpoints when booking and conversation lifecycle events occur.

These schemas define the structure of the HTTP POST requests that OnceHub sends to your configured webhook URLs. Each event includes metadata about when it occurred and a data object containing the relevant booking or conversation information.

To start receiving webhook events, [create a webhook subscription](#tag/webhooks/post/webhooks) with your desired event triggers.

## Operations

<a id="scalar-operation-get-test"></a>

### Validate API key

- **Method:** `GET`
- **Path:** `/test`
- **Operation ID:** `validate-api-key`
- **Tags:** Authentication

Enter your API key in the headers section below and click on "Try it" to test it.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Responses

##### 200 200

**Content type:** `application/json`

- **`message`**: `string`

**Example: Result**

```json
{
  "message": "The API key is valid for account: admin@example.com"
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 403 403 - Forbidden

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Your account plan does not support API access. To use the OnceHub API, you must upgrade to the Enterprise plan."
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-get-bookings"></a>

### List all bookings

- **Method:** `GET`
- **Path:** `/bookings`
- **Operation ID:** `list-all-bookings`
- **Tags:** Bookings

Returns a list of all bookings in the account

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Query parameters

- **`status`**: `string`

  Only return bookings that have the given status.
- **`owner`**: `string`

  Only return booking owned by a user with a specific user ID.
- **`contact`**: `string`

  Only return bookings that were scheduled with the contact with the provided ID.
- **`creation_time.gt`**: `string`, format: `date`

  Return bookings with creation time greater than the given date.
- **`creation_time.lt`**: `string`, format: `date`

  Return bookings with creation time less than the given date.
- **`starting_time.gt`**: `string`, format: `date`

  Return bookings with starting time greater than the given date.
- **`starting_time.lt`**: `string`, format: `date`

  Return bookings with starting time less than the given date.
- **`last_updated_time.gt`**: `string`, format: `date`

  Return bookings with last updated time greater than the given date.
- **`last_updated_time.lt`**: `string`, format: `date`

  Return bookings with last updated time less than the given date.
- **`expand`**: `string`

  A comma separated list of fields that you want to [expand](/docs/overview/expanding-responses). Possible values are `owner`, `contact`, `conversation`.
- **`before`**: `string`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list.
  For instance, if you make a list request and receive 30 objects, starting with `OBJ-XXXX`,
  your subsequent call can include `before=OBJ-XXXX` in order to fetch the previous page of the list.

  **Example:**

  ```json
  "OBJ-PREV123"
  ```
- **`after`**: `string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list.
  For instance, if you make a list request and receive 30 objects, ending with `OBJ-XXXX`,
  your subsequent call can include `after=OBJ-XXXX` in order to fetch the next page of the list.

  **Example:**

  ```json
  "OBJ-NEXT456"
  ```
- **`limit`**: `integer`, default: `10`, minimum: `1`, maximum: `100`

  Determines the number of objects that will be returned on each page.
  Defaults to 10 if not specified and has a maximum limit of 100 objects per page.

  **Example:**

  ```json
  25
  ```
- **`booking_calendar`**: `string`, default: `""`

  Only return bookings that were created from the booking calendar with the provided ID.
- **`host`**: `string`, default: `""`

  Only return bookings hosted or co-hosted by a user with a specific user ID.

#### Responses

##### 200 200

**Content type:** `application/json`

[BookingList](#scalar-schema-bookinglist)

<a id="scalar-example-1"></a>

**Generated example:**

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
      "external_calendar": {
        "type": "google",
        "name": "andrea.hartie@example.com",
        "id": "andrea.hartie@example.com",
        "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
      },
      "ics_url": "https://oncehub.com/api/bookings/ics/62ad3bdd-a09f-dfbdffbef389-axs01j",
      "booking_calendar": "BKC-03WJV0R52Z",
      "cancel_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL/cancel",
      "reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL",
      "payment_information": {
        "amount_charged": 5000,
        "currency": "USD",
        "transaction_id": "ch_1234567890ABCDEFGHIJ"
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

##### 400 400

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: invalid\_date\_range**

Invalid last\_updated\_time date range

```json
{
  "type": "invalid_request_error",
  "message": "last_updated_time.gt cannot be later than last_updated_time.lt",
  "param": "last_updated_time.gt"
}
```

**Example: out\_of\_range\_limit**

Out of range limit

```json
{
  "type": "invalid_request_error",
  "message": "Out of range value: 500. Please provide a number between 1 and 100.",
  "param": "limit"
}
```

**Example: both\_before\_and\_after**

Both before and after provided

```json
{
  "type": "invalid_request_error",
  "message": "Received both before and after parameters. Please provide only one."
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-get-bookingsid"></a>

### Get a single booking

- **Method:** `GET`
- **Path:** `/bookings/{id}`
- **Operation ID:** `get-a-single-booking`
- **Tags:** Bookings

Returns a single booking by ID

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the booking

#### Responses

##### 200 200

**Content type:** `application/json`

[Booking](#scalar-schema-booking)

<a id="scalar-example-2"></a>

**Generated example:**

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
  "external_calendar": {
    "type": "google",
    "name": "andrea.hartie@example.com",
    "id": "andrea.hartie@example.com",
    "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
  },
  "ics_url": "https://oncehub.com/api/bookings/ics/62ad3bdd-a09f-dfbdffbef389-axs01j",
  "booking_calendar": "BKC-03WJV0R52Z",
  "cancel_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL/cancel",
  "reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL",
  "payment_information": {
    "amount_charged": 5000,
    "currency": "USD",
    "transaction_id": "ch_1234567890ABCDEFGHIJ"
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

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 404 404

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-post-bookingsidcancel"></a>

### Cancel a booking

- **Method:** `POST`
- **Path:** `/bookings/{id}/cancel`
- **Operation ID:** `cancel-booking`
- **Tags:** Bookings

Cancel a booking by ID

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the booking

#### Request body

**Content type:** `application/json`

- **`cancellation_reason`**: `string`

  Reason for cancelling the meeting (optional)
- **`send_cancellation_email`**: `boolean`, default: `true`

  Whether a cancellation email should be sent

<a id="scalar-example-3"></a>

**Generated example:**

```json
{
  "cancellation_reason": "",
  "send_cancellation_email": true
}
```

#### Responses

##### 200 200

**Content type:** `application/json`

[BookingWithCancelInfo](#scalar-schema-bookingwithcancelinfo)

<a id="scalar-example-4"></a>

**Generated example:**

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
  "external_calendar": {
    "type": "google",
    "name": "andrea.hartie@example.com",
    "id": "andrea.hartie@example.com",
    "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
  },
  "ics_url": "https://oncehub.com/api/bookings/ics/62ad3bdd-a09f-dfbdffbef389-axs01j",
  "booking_calendar": "BKC-03WJV0R52Z",
  "cancel_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL/cancel",
  "reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL",
  "payment_information": {
    "amount_charged": 5000,
    "currency": "USD",
    "transaction_id": "ch_1234567890ABCDEFGHIJ"
  },
  "custom_fields": [
    {
      "name": "discussion_points",
      "value": "Need support on new product"
    }
  ]
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 404 404

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### 409 409

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "Booking cannot be cancelled: '123'",
  "param": "id"
}
```

##### 422 422

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "Paid bookings cannot be canceled through this endpoint. Please login to OnceHub and use the Activity Stream to cancel paid bookings."
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-post-bookingsidrequest-reschedule"></a>

### Request a reschedule

- **Method:** `POST`
- **Path:** `/bookings/{id}/request-reschedule`
- **Operation ID:** `request-reschedule`
- **Tags:** Bookings

Request to reschedule a booking by ID

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the booking

#### Request body

**Content type:** `application/json`

- **`reschedule_reason`**: `string`

  Reason for requesting the customer to reschedule the meeting (optional)

<a id="scalar-example-5"></a>

**Generated example:**

```json
{
  "reschedule_reason": ""
}
```

#### Responses

##### 200 200

**Content type:** `application/json`

[BookingWithCancelInfo](#scalar-schema-bookingwithcancelinfo)

[Generated example](#scalar-example-4)

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 404 404

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### 409 409

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "Booking cannot be cancelled: '123'",
  "param": "id"
}
```

##### 422 422

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "Paid bookings can only be requested for reschedule in your OnceHub account. Log in and use the activity stream to submit a reschedule request for this booking."
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-post-bookingsidreassign"></a>

### Reassign a booking

- **Method:** `POST`
- **Path:** `/bookings/{id}/reassign`
- **Operation ID:** `reassign-booking`
- **Tags:** Bookings

Reassign an existing booking to a new host by ID.

Effects of reassignment:

- The original calendar event is deleted, and a new event is created in the new host's integrated calendar.
- Reassignment notifications are sent to guests and hosts.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  The unique ID of the booking.

#### Request body

**Required:** `true`

**Content type:** `application/json`

- **`new_host` (required)**: `string`

  The OnceHub user ID for the new host. The user must belong to the same account, hold an active seat license, and cannot be the current host of the booking.
- **`location`**: `object`

  Optional. Determines how the location is handled when a meeting is reassigned to a new host.

  **Case 1: When `location` object is omitted:** The system applies the following logic based on the original booking's location type:
  - *Online Meetings:* The system first tries to use the same Video Conference Service provider as the original host. If that specific Video Conference Service provider is not connected to the new host, it automatically selects the best available integration based on this priority:

    1. Google Meet
    2. Microsoft Teams
    3. Zoom
    4. Webex Meetings
    5. GoTo Meeting

  - *In-person/ Phone Meetings:* The location remains unchanged for the new host.

  Missing Integration: If the original meeting was virtual but the new host has no Video Conference Service integrations connected, the booking will be reassigned successfully but will proceed without a virtual link. To avoid meetings without links, it is recommended to verify host integrations before reassignment.

  **Case 2: When `location` object is included:** The system applies the specific `type` and `value` for the new host. Currently, this object only supports virtual updates and cannot be used to switch a virtual meeting to an In-person location. The selected Video Conference Service must be connected and active in the new host's OnceHub account.

  Reassignment Failure: If the specified Video Conference Service is not connected for the new host, the reassignment request will fail. In this case, the API will return an error along with a list of connected Video Conference Service options available for that host.
  - **`type` (required)**: `string`, possible values: `"virtual"`

    Fixed Value: virtual.

    The required location type for virtual conferencing.

    Note: virtual is currently the only supported override type. In-person and Phone locations can only be maintained by omitting the location object.
  - **`value` (required)**: `string`, possible values: `"google_meet", "microsoft_teams", "webex", "gotomeeting", "zoom"`

    Supported Values: The specific service to be used.

<a id="scalar-example-6"></a>

**Generated example:**

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

##### 200 200

**Content type:** `application/json`

[Booking](#scalar-schema-booking)

[Generated example](#scalar-example-2)

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 404 404

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: BookingNotFound**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

**Example: UserNotFound**

```json
{
  "type": "invalid_request_error",
  "message": "No such user: 'USR-XXXXXXXXXX'",
  "param": "new_host"
}
```

##### 409 409

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: UserInactive**

```json
{
  "type": "invalid_request_error",
  "message": "User is inactive.",
  "param": "new_host"
}
```

**Example: PlanRestriction**

```json
{
  "type": "invalid_request_error",
  "message": "Reassign is available on the Route plan and above."
}
```

**Example: SameHost**

```json
{
  "type": "invalid_request_error",
  "message": "Booking cannot be reassigned to the same host.",
  "param": "new_host"
}
```

**Example: BookingsStatus**

```json
{
  "type": "invalid_request_error",
  "message": "Booking cannot be reassigned in its current status.",
  "param": "id"
}
```

**Example: InvalidLocation**

```json
{
  "type": "invalid_request_error",
  "message": "Invalid location: 'Webex' is not connected for this user. Connected Video Conference Service options: google_meet, microsoft_teams.",
  "param": "location.value"
}
```

**Example: HostSeat**

```json
{
  "type": "invalid_request_error",
  "message": "Cannot reassign booking: The new host requires an assigned seat."
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-post-bookingsidno-show"></a>

### Set a booking as no-show

- **Method:** `POST`
- **Path:** `/bookings/{id}/no-show`
- **Operation ID:** `no-show`
- **Tags:** Bookings

Update the booking status to no-show by ID

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the booking

#### Responses

##### 200 200

**Content type:** `application/json`

[Booking](#scalar-schema-booking)

[Generated example](#scalar-example-2)

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 404 404

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

##### 409 409

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "Cannot update booking status to no_show: '123'",
  "param": "id"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-get-booking-calendars"></a>

### List all booking calendars

- **Method:** `GET`
- **Path:** `/booking-calendars`
- **Operation ID:** `list-all-booking-calendars`
- **Tags:** Booking Calendars

Returns a list of all booking calendars in your account

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Query parameters

- **`host`**: `string`

  Filter booking calendars hosted by this user ID or team ID
- **`before`**: `string`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list.
  For instance, if you make a list request and receive 30 objects, starting with `OBJ-XXXX`,
  your subsequent call can include `before=OBJ-XXXX` in order to fetch the previous page of the list.

  **Example:**

  ```json
  "OBJ-PREV123"
  ```
- **`after`**: `string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list.
  For instance, if you make a list request and receive 30 objects, ending with `OBJ-XXXX`,
  your subsequent call can include `after=OBJ-XXXX` in order to fetch the next page of the list.

  **Example:**

  ```json
  "OBJ-NEXT456"
  ```
- **`limit`**: `integer`, default: `10`, minimum: `1`, maximum: `100`

  Determines the number of objects that will be returned on each page.
  Defaults to 10 if not specified and has a maximum limit of 100 objects per page.

  **Example:**

  ```json
  25
  ```

#### Responses

##### 200 200

**Content type:** `application/json`

[BookingCalendarList](#scalar-schema-bookingcalendarlist)

<a id="scalar-example-7"></a>

**Generated example:**

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

##### 400 400

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: out\_of\_range\_limit**

Out of range limit

```json
{
  "type": "invalid_request_error",
  "message": "Out of range value: 500. Please provide a number between 1 and 100.",
  "param": "limit"
}
```

**Example: both\_before\_and\_after**

Both before and after provided

```json
{
  "type": "invalid_request_error",
  "message": "Received both before and after parameters. Please provide only one."
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-get-booking-calendarsid"></a>

### Get a single booking calendar

- **Method:** `GET`
- **Path:** `/booking-calendars/{id}`
- **Operation ID:** `get-a-single-booking-calendar`
- **Tags:** Booking Calendars

Returns a single booking calendar by ID

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the booking calendar

#### Responses

##### 200 200

**Content type:** `application/json`

[BookingCalendar](#scalar-schema-bookingcalendar)

<a id="scalar-example-8"></a>

**Generated example:**

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

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 404 404

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking calendar: '123'",
  "param": "id"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-get-booking-calendarsidtime-slots"></a>

### Get available time slots for a booking calendar

- **Method:** `GET`
- **Path:** `/booking-calendars/{id}/time-slots`
- **Operation ID:** `get-available-time-slots-for-booking-calendar`
- **Tags:** Booking Calendars

Returns a list of available time slots for a booking calendar

Notes On Using This Endpoint

- All datetime strings are [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) in full form. For example, `2024-11-29T09:30:00.000Z`.
- All datetime strings are in UTC.
- The difference between `start_time` and `end_time` must be less than or equal to 30 days.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the booking calendar

#### Query parameters

- **`start_time`**: `string`, format: `date-time`, default: `""`

  The date and time from which to begin checking for available slots. If not provided, the system defaults to current time.
- **`end_time`**: `string`, format: `date-time`, default: `""`

  The date and time up to which to check for available slots. If not provided, the system defaults to one week from `start_time`.

#### Responses

##### 200 200

**Content type:** `application/json`

**Array of:**

- **`locations` (required)**: `array`

  Available location options for this time slot

  **Items:**
  - **`id` (required)**: `string | null`

    The location ID:
    - `physical`: The address ID (e.g., `ADD-1234`).
    - `virtual`, `virtual_static`, `guest_phone`, `in_person_by_guest`: `null`.
  - **`type` (required)**: `string`, possible values: `"virtual", "virtual_static", "physical", "guest_phone", "in_person_by_guest"`

    The type of location:
    - `virtual`: Online meetings with dynamic links.
    - `virtual_static`: Online meetings with static links.
    - `physical`: In-person meetings.
    - `guest_phone`: Phone calls.
    - `in_person_by_guest`: Guest provides the meeting location.
  - **`value` (required)**: `string | null`

    The value returned depends on the location `type`:
    - `virtual`: Video conferencing platform (e.g., `google_meet`, `microsoft_teams`, `zoom`, `webex`, `gotomeeting`).
    - `virtual_static`: `null` (the actual custom link is not known in advance).
    - `physical`: Actual address string (e.g., "123 Business Lane").
    - `guest_phone`: `null` (the actual phone number is not known in advance).
    - `in_person_by_guest`: `null` (the actual address is not known in advance).
- **`start_time` (required)**: `string`, format: `date-time`

  The start time of the available slot in ISO 8601 format

**Example: Result**

```json
[
  {
    "start_time": "2024-12-02T06:30:00.000Z",
    "locations": [
      {
        "type": "virtual",
        "value": "google_meet",
        "id": null
      },
      {
        "type": "virtual_static",
        "value": null,
        "id": null
      },
      {
        "type": "guest_phone",
        "value": null,
        "id": null
      }
    ]
  },
  {
    "start_time": "2024-12-05T14:30:00.000Z",
    "locations": [
      {
        "type": "physical",
        "value": "123 Business Lane, Suite 400, New York, NY",
        "id": "ADD-17SE9FWWOC"
      },
      {
        "type": "in_person_by_guest",
        "value": null,
        "id": null
      }
    ]
  }
]
```

##### 400 400

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "End time must be after the start time.",
  "param": "end_time"
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 402 402

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "Time slots cannot be retrieved when the host doesn't have a seat assigned."
}
```

##### 422 422

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "Time slots cannot be retrieved from an unpublished booking calendar.",
  "param": "id"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-post-booking-calendarsidschedule"></a>

### Book a time slot

- **Method:** `POST`
- **Path:** `/booking-calendars/{id}/schedule`
- **Operation ID:** `book-a-time-slot-for-a-booking-calendar`
- **Tags:** Booking Calendars

Book a time from the available time slots

Notes On Using This Endpoint

- This endpoint is designed to be used with the "Get available time slots" endpoint. First, retrieve available time slots for a specific time range, and then use this endpoint to book one of those slots.
- You can only select a location from those offered within the available time slots.
- All datetime strings are [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) in full form. For example, `2024-11-29T09:30:00.000Z`.

Using Custom Fields\
In addition to the standard fields, you can pass your own data by including custom key-value pairs within the `booking_form` object in the request body.

- **Field Name (Key)**: The key for each custom field must exactly match the mapped field name of the corresponding question configured in your Booking page's form settings.

- **Field Value**: The data type of the value must match the question's type:

  - For Text and Picklist (single-select) questions, provide a string.
  - For Picklist (multi-select) questions, provide an array of strings.

Please note that for picklist fields, any values that do not match a pre-configured option will be ignored by the system during booking.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the booking calendar

#### Request body

**Content type:** `application/json`

- **`booking_form` (required)**

  **All of:**
  - [BookingForm](#scalar-schema-bookingform)

    An object containing information about the guest
  - `object`
    - **`email` (required)**: `string`
    - **`name` (required)**: `string`
- **`guest_time_zone` (required)**: `string`

  The guest's timezone in [IANA timezone format](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
- **`start_time` (required)**: `string`, format: `date-time`

  The date and time of the time slot
- **`location`**: `object`

  The location object is optional. If omitted, the system automatically selects an available host's pre-set location (such as `virtual`, `virtual_static` or `physical`), prioritizing `virtual` whenever it is an available option. **Note:** If only a single location is available for the slot, that location will be automatically selected. To use a guest-driven location type like `in_person_by_guest` or `guest_phone`, the value must be explicitly provided.
  - **`type`**: `string`, possible values: `"physical", "virtual", "virtual_static", "guest_phone", "in_person_by_guest"`

    The type of location:
    - `physical`: In-person meetings.
    - `virtual`: Online meetings with dynamic links.
    - `virtual_static`: Online meetings with static links.
    - `guest_phone`: Phone calls.
    - `in_person_by_guest`: Guest provides the meeting location.
  - **`value`**: `string | null`

    The value to provide depends on the location `type`:
    - `physical`: The location's address ID (e.g., `ADD-1234`).
    - `virtual`: One of the following: `google_meet`, `microsoft_teams`, `gotomeeting`, `webex`, or `zoom`.
    - `virtual_static`: Use `null`.
    - `guest_phone`: The guest's phone number in E164 format.
    - `in_person_by_guest`: The address provided by the guest.

<a id="scalar-example-9"></a>

**Generated example:**

```json
{
  "start_time": "",
  "guest_time_zone": "",
  "booking_form": {
    "name": "",
    "email": "",
    "phone": "+12025550195",
    "string_custom_field": "Executive Assistant",
    "array_custom_field": [
      "Marketing",
      "Sales"
    ]
  },
  "location": {
    "type": "physical",
    "value": null
  }
}
```

#### Responses

##### 200 200

**Content type:** `application/json`

- **`id`**: `string`

**Example: Result**

```json
{
  "id": "BKNG-J4FR05BKEWEX"
}
```

##### 400 400

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Required fields missing**

```json
{
  "type": "invalid_request_error",
  "message": "Required fields are missing.",
  "param": "booking_form"
}
```

**Example: Time slot unavailable**

```json
{
  "type": "invalid_request_error",
  "message": "The selected start time is not available.",
  "param": "start_time"
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 402 402

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "Meeting cannot be scheduled when the host doesn't have a seat assigned."
}
```

##### 422 422

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "Meeting cannot be scheduled on an unpublished booking calendar.",
  "param": "id"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-post-booking-calendarsidone-time-links"></a>

### Create a one-time link

- **Method:** `POST`
- **Path:** `/booking-calendars/{id}/one-time-links`
- **Operation ID:** `booking-calendars-create-a-one-time-link`
- **Tags:** Booking Calendars

Creates a one time link for a Booking Calendar.

One-time links are only available for published booking calendars.

One-time links that haven't been consumed will be automatically deleted after 90 days.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the booking calendar

#### Request body

**Content type:** `application/json`

- **`booking_form`**: [BookingForm](#scalar-schema-bookingform)

  An object containing information about the guest
- **`booking_settings`**: `object`

  Settings for the booking calendar when the one-time link is used.
  - **`co_hosts`**: `string`

    A comma-separated list of email addresses for co-hosts to be added to the booking. All co-hosts must share the same OnceHub account, possess an active license, and must not be deleted. Multiple email addresses should be separated strictly by commas (e.g., `cohost1@example.com,cohost2@example.com`).
  - **`duration_minutes`**: `integer`

    The meeting duration in minutes. Must be one of the durations configured in the booking calendar settings. When set, the guest cannot change the duration.
  - **`host`**: `string`

    The email of the team member who should host the booking. Only supported on team booking calendars. If the host is not a part of the team or doesn't have a license, the host is ignored and the distribution method continues as configured.
  - **`skip`**: `array of string`

    List of booking flow steps to skip (e.g., contact\_info, questions, co\_hosts).
- **`hide_url_params`**: `boolean`, default: `true`

  When set to `true`, the API generates a short one-time-use link with no visible query parameters.
- **`utm_params`**: [UtmParams](#scalar-schema-utmparams)

  Object containing captured values for the 5 standard [UTM parameters](https://en.wikipedia.org/wiki/UTM_parameters).

**Example:**

```json
{
  "booking_form": {
    "name": "Carrie Customer",
    "email": "carrie.customer@example.com"
  },
  "utm_params": {
    "source": "facebook",
    "medium": "social",
    "campaign": "webinar_signup",
    "term": "onlinemeeting+scheduler",
    "content": "logolink"
  },
  "booking_settings": {
    "host": "teamlead@example.com",
    "co_hosts": "cohost3@example.com,cohost4@example.com",
    "duration_minutes": 30,
    "skip": [
      "contact_info"
    ]
  }
}
```

#### Responses

##### 200 200

**Content type:** `application/json`

- **`creation_time`**: `string`
- **`id`**: `string`
- **`url`**: `string`

**Example: Result**

```json
{
  "id": "QUHVEKLPD93M",
  "url": "https://oncehub.com/.QUHVEKLPD93M",
  "creation_time": "2024-06-18T14:28:19Z"
}
```

##### 400 400

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "This booking calendar does not allow creation of one time links: 'BKC-1234'",
  "param": "id"
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 404 404

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking calendar: '123'",
  "param": "id"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-get-notificationssms"></a>

### List all SMS notifications

- **Method:** `GET`
- **Path:** `/notifications/sms`
- **Operation ID:** `list-all-sms-notifications`
- **Tags:** Notifications

Returns a list of SMS notifications sent from your account, sorted by creation date.
You can filter by recipient, recipient type, and creation time.

The `recipient` field can be expanded to include full contact or user details.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Query parameters

- **`creation_time.gt`**: `string`, format: `date-time`

  Return SMS notifications created after this date

  **Example:**

  ```json
  "2025-11-01T00:00:00Z"
  ```
- **`creation_time.lt`**: `string`, format: `date-time`

  Return SMS notifications created before this date

  **Example:**

  ```json
  "2025-12-01T00:00:00Z"
  ```
- **`recipient`**: `string`

  Filter by specific recipient ID (contact or user ID).

  **Example:**

  ```json
  "CTC-555444333"
  ```
- **`recipient_type`**: `string`, possible values: `"contact", "user"`

  Filter by recipient type. Valid values are `contact` or `user`.

  **Example:**

  ```json
  "contact"
  ```
- **`before`**: `string`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list.
  For instance, if you make a list request and receive 30 objects, starting with `OBJ-XXXX`,
  your subsequent call can include `before=OBJ-XXXX` in order to fetch the previous page of the list.

  **Example:**

  ```json
  "OBJ-PREV123"
  ```
- **`after`**: `string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list.
  For instance, if you make a list request and receive 30 objects, ending with `OBJ-XXXX`,
  your subsequent call can include `after=OBJ-XXXX` in order to fetch the next page of the list.

  **Example:**

  ```json
  "OBJ-NEXT456"
  ```
- **`limit`**: `integer`, default: `10`, minimum: `1`, maximum: `100`

  Determines the number of objects that will be returned on each page.
  Defaults to 10 if not specified and has a maximum limit of 100 objects per page.

  **Example:**

  ```json
  25
  ```
- **`expand`**: `string`

  A comma-separated list of fields to expand.
  Currently supports: `recipient`.

  **Example:**

  ```json
  "recipient"
  ```

#### Responses

##### 200 200

**Content type:** `application/json`

[SmsNotificationList](#scalar-schema-smsnotificationlist)

<a id="scalar-example-10"></a>

**Generated example:**

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

##### 400 400

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: invalid\_recipient\_type**

Invalid recipient type

```json
{
  "type": "invalid_request_error",
  "message": "Invalid string: customer",
  "param": "recipient_type"
}
```

**Example: invalid\_date\_range**

Invalid creation\_time date range

```json
{
  "type": "invalid_request_error",
  "message": "creation_time.gt cannot be later than creation_time.lt",
  "param": "creation_time.gt"
}
```

**Example: invalid\_expansion**

Invalid expansion property

```json
{
  "type": "invalid_request_error",
  "message": "This property cannot be expanded: invalid_property",
  "param": "expand"
}
```

**Example: out\_of\_range\_limit**

Out of range limit

```json
{
  "type": "invalid_request_error",
  "message": "Out of range value: 500. Please provide a number between 1 and 100.",
  "param": "limit"
}
```

**Example: both\_before\_and\_after**

Both before and after provided

```json
{
  "type": "invalid_request_error",
  "message": "Received both before and after parameters. Please provide only one."
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 403 403 - Forbidden

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Your account plan does not support API access. To use the OnceHub API, you must upgrade to the Enterprise plan."
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-get-users"></a>

### List all users

- **Method:** `GET`
- **Path:** `/users`
- **Operation ID:** `list-all-users`
- **Tags:** Users

Returns a list of all users in your account

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Query parameters

- **`email`**: `string`, format: `email`

  Filter by email address

  **Example:**

  ```json
  "user@example.com"
  ```
- **`before`**: `string`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list.
  For instance, if you make a list request and receive 30 objects, starting with `OBJ-XXXX`,
  your subsequent call can include `before=OBJ-XXXX` in order to fetch the previous page of the list.

  **Example:**

  ```json
  "OBJ-PREV123"
  ```
- **`after`**: `string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list.
  For instance, if you make a list request and receive 30 objects, ending with `OBJ-XXXX`,
  your subsequent call can include `after=OBJ-XXXX` in order to fetch the next page of the list.

  **Example:**

  ```json
  "OBJ-NEXT456"
  ```
- **`limit`**: `integer`, default: `10`, minimum: `1`, maximum: `100`

  Determines the number of objects that will be returned on each page.
  Defaults to 10 if not specified and has a maximum limit of 100 objects per page.

  **Example:**

  ```json
  25
  ```

#### Responses

##### 200 200

**Content type:** `application/json`

[UserList](#scalar-schema-userlist)

<a id="scalar-example-11"></a>

**Generated example:**

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

##### 400 400

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: out\_of\_range\_limit**

Out of range limit

```json
{
  "type": "invalid_request_error",
  "message": "Out of range value: 500. Please provide a number between 1 and 100.",
  "param": "limit"
}
```

**Example: both\_before\_and\_after**

Both before and after provided

```json
{
  "type": "invalid_request_error",
  "message": "Received both before and after parameters. Please provide only one."
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-post-users"></a>

### Add a new user

- **Method:** `POST`
- **Path:** `/users`
- **Operation ID:** `add-a-new-user`
- **Tags:** Users

Add or invite a new user to your OnceHub account

Notes On Using This Endpoint

- The user will be added with Member role by default if no role is specified
- An invitation email will be sent to the user
- User limits apply based on your account plan (500 for purchased accounts, 30 for trial accounts)
- The Account Owner role cannot be assigned through the API

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Request body

**Required:** `true`

**Content type:** `application/json`

- **`email` (required)**: `string`, format: `email`

  Email address of the new user
- **`first_name` (required)**: `string`

  First name of the new user
- **`last_name` (required)**: `string`

  Last name of the new user
- **`role_name`**: `string`, possible values: `"Administrator", "Member", "Team Manager"`

  The role to assign to the user. Valid values are `Administrator`, `Member`, or `Team Manager`. Defaults to `Member` if not specified.
- **`teams`**: `array of string`

  Array of team external IDs to add the user to. Each team ID must exist in the account.

<a id="scalar-example-12"></a>

**Generated example:**

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

##### 200 200

**Content type:** `application/json`

[User](#scalar-schema-user)

**Example: Result**

```json
{
  "id": "USR-FSD423423",
  "object": "user",
  "first_name": "Carrie",
  "last_name": "Customer",
  "email": "carrie.customer@gmail.com",
  "status": "active",
  "role_name": "Administrator",
  "timezone": "America/Chicago",
  "teams": [
    "TM-GCJU8DLBTPY1"
  ]
}
```

##### 400 400

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Required fields missing**

```json
{
  "type": "invalid_request_error",
  "message": "Required fields are missing.",
  "param": "email"
}
```

**Example: Invalid first name**

```json
{
  "type": "invalid_request_error",
  "message": "Invalid first_name: 'fir[/*st_na*/]?me'",
  "param": "first_name"
}
```

**Example: Invalid last name**

```json
{
  "type": "invalid_request_error",
  "message": "Invalid last_name: 'la[/*st_na*/]?me'",
  "param": "last_name"
}
```

**Example: Unsupported fields**

```json
{
  "type": "invalid_request_error",
  "message": "Unsupported fields",
  "param": "{param_name}"
}
```

**Example: Email already exists**

```json
{
  "type": "invalid_request_error",
  "message": "Email already exists: 'carrie.customer@gmail.com'",
  "param": "email"
}
```

**Example: Invalid role name**

```json
{
  "type": "invalid_request_error",
  "message": "Invalid role name: 'Super Admin'",
  "param": "role_name"
}
```

**Example: Invalid teams**

```json
{
  "type": "invalid_request_error",
  "message": "Invalid team(s): 'TM-INVALID1', 'TM-INVALID2'",
  "param": "teams"
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 422 422

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: User limit exceeded**

```json
{
  "type": "invalid_request_error",
  "message": "You have reached the user limit for your current plan. To add more users, please upgrade your account."
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

##### 500 500

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Internal server error**

```json
{
  "type": "api_error",
  "message": "An unexpected error occurred. Please try again later."
}
```

<a id="scalar-operation-get-usersid"></a>

### Get a single user

- **Method:** `GET`
- **Path:** `/users/{id}`
- **Operation ID:** `get-a-single-user`
- **Tags:** Users

Returns a single user by ID

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the user

#### Responses

##### 200 200

**Content type:** `application/json`

[User](#scalar-schema-user)

<a id="scalar-example-13"></a>

**Generated example:**

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

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 404 404

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "No such user: '123'",
  "param": "id"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-patch-usersid"></a>

### Update a user

- **Method:** `PATCH`
- **Path:** `/users/{id}`
- **Operation ID:** `update-a-user`
- **Tags:** Users

Update an existing user's information in your OnceHub account

Notes On Using This Endpoint

- At least one field must be provided to update
- The Account Owner role cannot be assigned or updated through the APIs

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the user to update

#### Request body

**Required:** `true`

**Content type:** `application/json`

- **`first_name`**: `string`

  User's first name
- **`last_name`**: `string`

  User's last name
- **`role_name`**: `string`, possible values: `"Administrator", "Member", "Team Manager"`

  The role to assign to the user. Valid values are `Administrator`, `Member`, or `Team Manager`.
- **`teams`**: `array of string`

  Array of team external IDs to assign the user to. This will replace existing team assignments.

**Example: Update name and role**

```json
{
  "first_name": "Andrea",
  "last_name": "Hartie",
  "role_name": "Administrator"
}
```

**Example: Update teams only**

```json
{
  "teams": [
    "TM-GCJU8DLBTPY1"
  ]
}
```

#### Responses

##### 200 200

**Content type:** `application/json`

[User](#scalar-schema-user)

**Example: Result**

```json
{
  "id": "USR-FSD423423",
  "object": "user",
  "first_name": "Andrea",
  "last_name": "Hartie",
  "email": "AndreaHartie@example.com",
  "status": "active",
  "role_name": "Administrator",
  "timezone": "America/Chicago",
  "teams": [
    "TM-GCJU8DLBTPY1"
  ]
}
```

##### 400 400

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: No fields provided**

```json
{
  "type": "invalid_request_error",
  "message": "At least one field must be provided to update.",
  "param": "body"
}
```

**Example: Invalid first name**

```json
{
  "type": "invalid_request_error",
  "message": "Invalid first name: ''",
  "param": "first_name"
}
```

**Example: Invalid role name**

```json
{
  "type": "invalid_request_error",
  "message": "Invalid role name: 'InvalidRole'",
  "param": "role_name"
}
```

**Example: Account Owner role not allowed**

```json
{
  "type": "invalid_request_error",
  "message": "The 'Account Owner' role cannot be assigned directly via the API.",
  "param": "role_name"
}
```

**Example: Invalid teams format**

```json
{
  "type": "invalid_request_error",
  "message": "Must be an array of strings.",
  "param": "teams"
}
```

**Example: Invalid team IDs**

```json
{
  "type": "invalid_request_error",
  "message": "Invalid team(s): 'TM-INVALID1', 'TM-INVALID2'",
  "param": "teams"
}
```

**Example: Unsupported field**

```json
{
  "type": "invalid_request_error",
  "message": "Unsupported field",
  "param": "{param_name}"
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 403 403

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Cannot update Account Owner**

```json
{
  "type": "invalid_request_error",
  "message": "Cannot update 'Account Owner' user."
}
```

##### 404 404

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: User not found**

```json
{
  "type": "invalid_request_error",
  "message": "No such user: 'USR-NOTFOUND'",
  "param": "id"
}
```

##### 410 410

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: User deleted**

```json
{
  "type": "invalid_request_error",
  "message": "User cannot be modified as they have been deleted: 'USR-A1B2C3'",
  "param": "id"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-delete-usersid"></a>

### Delete a user

- **Method:** `DELETE`
- **Path:** `/users/{id}`
- **Operation ID:** `delete-a-user`
- **Tags:** Users

Deletes a single user by ID.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the user

#### Responses

##### 200 200

**Content type:** `application/json`

[DeletedObject](#scalar-schema-deletedobject)

<a id="scalar-example-14"></a>

**Generated example:**

```json
{
  "id": "OBJ-123ABC",
  "deleted": true
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 404 404

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "No such user: '123'",
  "param": "id"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-get-usersidscheduling-availability"></a>

### Get scheduling availability

- **Method:** `GET`
- **Path:** `/users/{id}/scheduling-availability`
- **Operation ID:** `get_user_scheduling_availability`
- **Tags:** Users

Returns the scheduling availability for a user

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the user

#### Responses

##### 200

**Content type:** `application/json`

**Example: Result**

Result

```json
{
  "object": "schedule",
  "timezone": "America/Chicago",
  "weekly": [
    {
      "day": "Monday",
      "working_hours": [
        {
          "start_time": "09:00",
          "end_time": "12:00",
          "locations": [
            {
              "type": "online_dynamic_link",
              "value": "google_meet",
              "id": null
            }
          ]
        },
        {
          "start_time": "13:00",
          "end_time": "17:00",
          "locations": [
            {
              "type": "online_dynamic_link",
              "value": "zoom",
              "id": null
            },
            {
              "type": "in_person_by_host",
              "value": "123 Office Street, New York, NY",
              "id": "ADD-K8E9X"
            },
            {
              "type": "in_person_by_guest",
              "value": null,
              "id": null
            }
          ]
        }
      ]
    },
    {
      "day": "Wednesday",
      "working_hours": [
        {
          "start_time": "10:00",
          "end_time": "15:00",
          "locations": [
            {
              "type": "online_static_link",
              "value": "https://meet.example.com/team-meeting",
              "id": null
            }
          ]
        }
      ]
    }
  ],
  "overrides": [
    {
      "date": "2025-11-27",
      "day": "Thursday",
      "working_hours": []
    },
    {
      "date": "2025-12-24",
      "day": "Wednesday",
      "working_hours": [
        {
          "start_time": "09:00",
          "end_time": "12:00",
          "locations": [
            {
              "type": "online_dynamic_link",
              "value": "google_meet",
              "id": null
            }
          ]
        }
      ]
    }
  ]
}
```

##### 400 Bad Request

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: New Example 1**

```json
{
  "type": "invalid_request_error",
  "message": "Received unknown parameter: start_date",
  "param": "start_date"
}
```

**Example: Result 1**

Result 1

```json
{
  "type": "invalid_request_error",
  "message": "Invalid date format for overrides_start_time. Expected format: YYYY-MM-DD",
  "param": "overrides_start_time"
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-patch-usersidscheduling-availability"></a>

### Update scheduling availability

- **Method:** `PATCH`
- **Path:** `/users/{id}/scheduling-availability`
- **Operation ID:** `patch_user_scheduling_availability`
- **Tags:** Users

Updates the scheduling availability for a user

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

#### Request body

**Content type:** `application/json`

- **`overrides`**: `array`

  An array of objects, each defining an exception for a specific date. Any date provided will have its override schedule completely overwritten.

  **Items:**
  - **`working_hours` (required)**: `array`

    An array of time slot objects for the specific date. To make a user unavailable for the entire date, provide an empty array (`[]`). To **delete** an existing override for a date, set this value to `null`.

    **Items:**
    - **`end_time` (required)**: `string`

      The end time of an availability slot for the override date in `HH:MM` format. Must be a multiple of 15 minutes and occur after the `start_time`.
    - **`locations` (required)**: `array`

      An array of location objects available for the time slot on the override date. Can be empty.

      **Items:**
      - **`type` (required)**: `string`

        The type of location for the override slot. Valid options are: `in_person_by_host`, `in_person_by_guest`, `online_dynamic_link`, `online_static_link`, `phone_by_guest`.
      - **`id`**: `string`

        The unique identifier for a physical address. This field is required and only used when the type is `in_person_by_host`.
      - **`value`**: `string`

        The value depends on the location type. For `online_static_link`, this is the static meeting URL. For `in_person_by_guest`, this is the guest-provided meeting location. This field is required only when the type is `online_static_link` or `in_person_by_host`.
    - **`start_time` (required)**: `string`

      The start time of an availability slot for the override date in `HH:MM` format. The time must be a multiple of 15 minutes.
  - **`date`**: `string`

    The specific date for the override in `YYYY-MM-DD` format. The date cannot be in the past. Duplicate dates are not allowed.
- **`weekly`**: `array`

  An array of objects, each defining the full availability for a specific day of the week. Any day provided will have its schedule completely overwritten.

  **Items:**
  - **`day` (required)**: `string`

    The day of the week (e.g., "Monday", "Tuesday"). Must be a valid, case-sensitive day name. Duplicate days are not allowed.
  - **`working_hours` (required)**: `array`

    An array of time slot objects for the day. To clear all availability for a day, provide an empty array (`[]`). This field cannot be `null`. Time slots for a single day cannot overlap.

    **Items:**
    - **`end_time` (required)**: `string`

      The end time of an availability slot in `HH:MM` format. Must be a multiple of 15 minutes and occur after the start\_time.
    - **`locations` (required)**: `array`

      An array of location objects available for the time slot. Can be empty. You cannot mix `online_dynamic_link` and `online_static_link` types in the same slot.

      **Items:**
      - **`type` (required)**: `string`

        The type of location. Valid options are: `in_person_by_host`, `in_person_by_guest`, `online_dynamic_link`, `online_static_link`, `phone_by_guest`. Duplicate types are not allowed within the same slot.
      - **`id`**: `string`

        The unique identifier for a physical address. This field is required and only used when the type is `in_person_by_host`.
      - **`value`**: `string`

        The value depends on the location type. For `online_static_link`, this is the static meeting URL. For `in_person_by_guest`, this is the guest-provided meeting location. This field is required only when the type is `online_static_link` or `in_person_by_host`.
    - **`start_time` (required)**: `string`

      The start time of an availability slot in `HH:MM` format. The time must be a multiple of 15 minutes.

<a id="scalar-example-15"></a>

**Generated example:**

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

##### 200

**Content type:** `application/json`

**Example: Example**

Example

```json
{
  "object": "schedule",
  "timezone": "America/Chicago",
  "weekly": [
    {
      "day": "Monday",
      "working_hours": [
        {
          "start_time": "10:00",
          "end_time": "16:00",
          "locations": [
            {
              "type": "online_dynamic_link",
              "value": "zoom",
              "id": null
            }
          ]
        }
      ]
    },
    {
      "day": "Wednesday",
      "working_hours": [
        {
          "start_time": "10:00",
          "end_time": "15:00",
          "locations": [
            {
              "type": "online_static_link",
              "value": "https://meet.example.com/team-meeting",
              "id": null
            }
          ]
        }
      ]
    },
    {
      "day": "Saturday",
      "working_hours": []
    }
  ],
  "overrides": [
    {
      "date": "2025-12-25",
      "day": "Thursday",
      "working_hours": [
        {
          "start_time": "10:00",
          "end_time": "12:00",
          "locations": [
            {
              "type": "online_dynamic_link",
              "value": "google_meet",
              "id": null
            },
            {
              "type": "in_person_by_guest",
              "value": null,
              "id": null
            }
          ]
        }
      ]
    }
  ]
}
```

##### 400 Bad Request

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Response**

Response

```json
{
  "type": "invalid_request_error",
  "message": "availability range is overlapping: '09:00-11:00'",
  "param": "weekly.working_hours"
}
```

**Example: Response 1**

Response 1

```json
{
  "type": "invalid_request_error",
  "message": "start time should be multiple of 15: '09:05'",
  "param": "weekly.working_hours.start_time"
}
```

**Example: Response 2**

Response 2

```json
{
  "type": "invalid_request_error",
  "message": "Date cannot be in the past: '2024-01-01'",
  "param": "overrides.date"
}
```

**Example: New Example**

```json
{
  "type": "invalid_request_error",
  "message": "Duplicate entry for day or date: 'Monday'",
  "param": "weekly"
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 422 Unprocessable Entity

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: New Example**

```json
{
  "type": "invalid_request_error",
  "message": "You can set either online_dynamic_link or online_static_link",
  "param": "weekly.working_hours.locations"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-get-teams"></a>

### List all teams

- **Method:** `GET`
- **Path:** `/teams`
- **Operation ID:** `list-all-teams`
- **Tags:** Teams

Returns a list of all teams in your account

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Query parameters

- **`user`**: `string`

  Return all teams that the provided user is a member of.
- **`before`**: `string`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list.
  For instance, if you make a list request and receive 30 objects, starting with `OBJ-XXXX`,
  your subsequent call can include `before=OBJ-XXXX` in order to fetch the previous page of the list.

  **Example:**

  ```json
  "OBJ-PREV123"
  ```
- **`after`**: `string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list.
  For instance, if you make a list request and receive 30 objects, ending with `OBJ-XXXX`,
  your subsequent call can include `after=OBJ-XXXX` in order to fetch the next page of the list.

  **Example:**

  ```json
  "OBJ-NEXT456"
  ```
- **`limit`**: `integer`, default: `10`, minimum: `1`, maximum: `100`

  Determines the number of objects that will be returned on each page.
  Defaults to 10 if not specified and has a maximum limit of 100 objects per page.

  **Example:**

  ```json
  25
  ```

#### Responses

##### 200 200

**Content type:** `application/json`

[TeamList](#scalar-schema-teamlist)

<a id="scalar-example-16"></a>

**Generated example:**

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

##### 400 400

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: out\_of\_range\_limit**

Out of range limit

```json
{
  "type": "invalid_request_error",
  "message": "Out of range value: 500. Please provide a number between 1 and 100.",
  "param": "limit"
}
```

**Example: both\_before\_and\_after**

Both before and after provided

```json
{
  "type": "invalid_request_error",
  "message": "Received both before and after parameters. Please provide only one."
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-get-teamsid"></a>

### Get a single team

- **Method:** `GET`
- **Path:** `/teams/{id}`
- **Operation ID:** `get-a-single-team`
- **Tags:** Teams

Returns a single team by ID

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the team.

#### Responses

##### 200 200

**Content type:** `application/json`

[Team](#scalar-schema-team)

<a id="scalar-example-17"></a>

**Generated example:**

```json
{
  "object": "team",
  "id": "TM-GCJU8DLBTPY1",
  "name": "Sales"
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 404 404

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "No such team: '123'",
  "param": "id"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-get-contacts"></a>

### List all contacts

- **Method:** `GET`
- **Path:** `/contacts`
- **Operation ID:** `list-all-contacts`
- **Tags:** Contacts

List all contacts in your account

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Query parameters

- **`email`**: `string`

  Filter by the contact's email address
- **`creation_time.lt`**: `string`, format: `date`

  Return contacts with creation time less than the given date.
- **`last_updated_time.gt`**: `string`, format: `date`

  Return contacts with last updated time greater than the given date.
- **`last_updated_time.lt`**: `string`, format: `date`

  Return contacts with last updated time less than the given date.
- **`creation_time.gt`**: `string`, format: `date`

  Return contacts with creation time greater than the given date.
- **`before`**: `string`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list.
  For instance, if you make a list request and receive 30 objects, starting with `OBJ-XXXX`,
  your subsequent call can include `before=OBJ-XXXX` in order to fetch the previous page of the list.

  **Example:**

  ```json
  "OBJ-PREV123"
  ```
- **`after`**: `string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list.
  For instance, if you make a list request and receive 30 objects, ending with `OBJ-XXXX`,
  your subsequent call can include `after=OBJ-XXXX` in order to fetch the next page of the list.

  **Example:**

  ```json
  "OBJ-NEXT456"
  ```
- **`limit`**: `integer`, default: `10`, minimum: `1`, maximum: `100`

  Determines the number of objects that will be returned on each page.
  Defaults to 10 if not specified and has a maximum limit of 100 objects per page.

  **Example:**

  ```json
  25
  ```

#### Responses

##### 200 200

**Content type:** `application/json`

[ContactList](#scalar-schema-contactlist)

<a id="scalar-example-18"></a>

**Generated example:**

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

##### 400 400

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: invalid\_date\_range**

Invalid last\_updated\_time date range

```json
{
  "type": "invalid_request_error",
  "message": "last_updated_time.gt cannot be later than last_updated_time.lt",
  "param": "last_updated_time.gt"
}
```

**Example: out\_of\_range\_limit**

Out of range limit

```json
{
  "type": "invalid_request_error",
  "message": "Out of range value: 500. Please provide a number between 1 and 100.",
  "param": "limit"
}
```

**Example: both\_before\_and\_after**

Both before and after provided

```json
{
  "type": "invalid_request_error",
  "message": "Received both before and after parameters. Please provide only one."
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-post-contacts"></a>

### Add a new contact

- **Method:** `POST`
- **Path:** `/contacts`
- **Operation ID:** `add-a-new-contact`
- **Tags:** Contacts

Create a new contact in your OnceHub account

Either `email` or `mobile_phone` is required - at least one must be provided

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Request body

**Required:** `true`

**Content type:** `application/json`

**All of:**

- [Contact](#scalar-schema-contact)
- `object`

  **Required fields:** `first_name, last_name`

**Example: Minimal required fields**

```json
{
  "email": "carrie.customer@gmail.com",
  "first_name": "Carrie",
  "last_name": "Customer"
}
```

**Example: With additional fields**

```json
{
  "email": "carrie.customer@gmail.com",
  "mobile_phone": "+12025550195",
  "first_name": "Carrie",
  "last_name": "Customer",
  "company": "Acme Inc",
  "job_title": "Executive Assistant",
  "status": "Qualified",
  "city": "New York",
  "state": "New York",
  "country": "United States",
  "timezone": "America/New_York"
}
```

#### Responses

##### 201 201

**Content type:** `application/json`

[Contact](#scalar-schema-contact)

**Example: Result**

```json
{
  "object": "contact",
  "id": "CTC-J4FR05BKEW",
  "creation_time": "2025-09-24T04:29:41.270Z",
  "last_updated_time": "2025-09-24T04:29:41.270Z",
  "last_interacted_time": null,
  "owner": "USR-FSD423423",
  "status": "Qualified",
  "city": null,
  "company_size": null,
  "company": null,
  "country": null,
  "email": "carrie.customer@gmail.com",
  "employees": 1,
  "first_name": "Carrie",
  "has_consent": false,
  "job_title": null,
  "last_name": "Customer",
  "mobile_phone": "+12025550195",
  "phone": null,
  "post_code": null,
  "salutation": null,
  "state": null,
  "street_address": null,
  "terms_of_sevice": false,
  "timezone": "America/New_York",
  "custom_fields": []
}
```

##### 400 400

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Required fields missing**

```json
{
  "type": "invalid_request_error",
  "message": "At least one of 'email' or 'mobile_phone' is required.",
  "param": "email"
}
```

**Example: First name required**

```json
{
  "type": "invalid_request_error",
  "message": "first_name is required",
  "param": "first_name"
}
```

**Example: Last name required**

```json
{
  "type": "invalid_request_error",
  "message": "last_name is required",
  "param": "last_name"
}
```

**Example: Invalid email format**

```json
{
  "type": "invalid_request_error",
  "message": "Invalid email format: 'john.doe@invalid'",
  "param": "email"
}
```

**Example: Invalid mobile phone**

```json
{
  "type": "invalid_request_error",
  "message": "Invalid phone format: '+91999999'",
  "param": "mobile_phone"
}
```

**Example: Unsupported fields**

```json
{
  "type": "invalid_request_error",
  "message": "Unsupported fields",
  "param": "{param_name}"
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 409 409

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Contact already exists with email**

```json
{
  "type": "invalid_request_error",
  "message": "Contact already exists: 'carrie.customer@gmail.com'",
  "param": "email"
}
```

**Example: Contact already exists with phone**

```json
{
  "type": "invalid_request_error",
  "message": "Contact already exists: '+12025550195'",
  "param": "mobile_phone"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-get-contactsid"></a>

### Get a single contact

- **Method:** `GET`
- **Path:** `/contacts/{id}`
- **Operation ID:** `get-a-single-contact`
- **Tags:** Contacts

Get a single contact

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the contact

#### Responses

##### 200 200

**Content type:** `application/json`

[Contact](#scalar-schema-contact)

<a id="scalar-example-19"></a>

**Generated example:**

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

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 404 404

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "No such contact: '123'",
  "param": "id"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-patch-contactsid"></a>

### Update a contact

- **Method:** `PATCH`
- **Path:** `/contacts/{id}`
- **Operation ID:** `update-a-contact`
- **Tags:** Contacts

Update an existing contact in your OnceHub account

Notes On Using This Endpoint

- At least one field must be provided to update
- Identifier fields (email, mobile\_phone) cannot be updated via this endpoint
- Only the custom fields provided will be updated - partial updates are supported

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the contact to update

#### Request body

**Required:** `true`

**Content type:** `application/json`

- **`city`**: `string`

  City of the contact
- **`company`**: `string`

  Company name
- **`company_size`**: `string`

  Size of the contact's company
- **`country`**: `string`

  Country of the contact
- **`custom_fields`**: `array`

  Custom fields to update. Only the custom fields provided will be updated.

  **Items:**
  - **`name`**: `string`
  - **`value`**: `string | number | boolean | array | object | null`

    Value of the custom field
- **`employees`**: `integer`

  Number of employees
- **`first_name`**: `string`

  First name of the contact
- **`has_consent`**: `boolean`

  Whether the contact has given consent
- **`job_title`**: `string`

  Job title of the contact
- **`last_name`**: `string`

  Last name of the contact
- **`owner`**: `string`

  The ID of the owner of the contact
- **`phone`**: `string`

  Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format
- **`post_code`**: `string`

  Postal code
- **`salutation`**: `string`

  Salutation
- **`state`**: `string`

  State or province
- **`status`**: `string`, possible values: `"Qualified", "Sales qualified", "Marketing qualified", "Disqualified"`

  The status of the contact. Accepted values are `Qualified`, `Sales qualified`, `Marketing qualified`, or `Disqualified`. If any other value is provided or no value is provided, the status will be set to null.
- **`street_address`**: `string`

  Street address
- **`terms_of_sevice`**: `boolean`

  Whether terms of service were accepted
- **`timezone`**: `string`

  Timezone of the contact

**Example: Update basic fields**

```json
{
  "first_name": "Carrie",
  "last_name": "Customer",
  "company": "Acme Inc",
  "job_title": "Senior Executive Assistant",
  "timezone": "America/New_York"
}
```

**Example: Update with custom fields**

```json
{
  "first_name": "Carrie",
  "company": "Acme Inc",
  "custom_fields": [
    {
      "name": "resume",
      "value": "https://example.com/updated-resume.pdf"
    }
  ]
}
```

#### Responses

##### 200 200

**Content type:** `application/json`

[Contact](#scalar-schema-contact)

**Example: Result**

```json
{
  "object": "contact",
  "id": "CTC-J4FR05BKEW",
  "creation_time": "2025-09-24T04:29:41.270Z",
  "last_updated_time": "2025-09-24T10:15:30.500Z",
  "last_interacted_time": null,
  "owner": "USR-FSD423423",
  "status": "Qualified",
  "city": "New York",
  "company_size": null,
  "company": "Acme Inc",
  "country": "United States",
  "email": "carrie.customer@gmail.com",
  "employees": 1,
  "first_name": "Carrie",
  "has_consent": false,
  "job_title": "Senior Executive Assistant",
  "last_name": "Customer",
  "mobile_phone": "+12025550195",
  "phone": null,
  "post_code": "10001",
  "salutation": null,
  "state": "New York",
  "street_address": null,
  "terms_of_sevice": false,
  "timezone": "America/New_York",
  "custom_fields": [
    {
      "name": "resume",
      "value": "https://example.com/updated-resume.pdf"
    }
  ]
}
```

##### 400 400

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: No fields provided**

```json
{
  "type": "invalid_request_error",
  "message": "At least one field must be provided to update.",
  "param": "body"
}
```

**Example: Identifier field error (email)**

```json
{
  "type": "invalid_request_error",
  "message": "Identifier fields (email, mobile_phone) cannot be updated via this endpoint",
  "param": "email"
}
```

**Example: Identifier field error (mobile\_phone)**

```json
{
  "type": "invalid_request_error",
  "message": "Identifier fields (email, mobile_phone) cannot be updated via this endpoint",
  "param": "mobile_phone"
}
```

**Example: Invalid phone format**

```json
{
  "type": "invalid_request_error",
  "message": "Invalid phone format: '+91999999'",
  "param": "phone"
}
```

**Example: Invalid timezone**

```json
{
  "type": "invalid_request_error",
  "message": "Invalid timezone: 'Invalid/Timezone'",
  "param": "timezone"
}
```

**Example: Invalid email format**

```json
{
  "type": "invalid_request_error",
  "message": "Invalid email format: 'invalid-email'",
  "param": "email"
}
```

**Example: Custom field not in field library**

```json
{
  "type": "invalid_request_error",
  "message": "Custom field 'unknown_field' does not exist in field library",
  "param": "custom_fields"
}
```

**Example: Unsupported field**

```json
{
  "type": "invalid_request_error",
  "message": "Unsupported field",
  "param": "{param_name}"
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 404 404

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Contact not found**

```json
{
  "type": "invalid_request_error",
  "message": "No such contact: 'CTC-NOTFOUND'",
  "param": "id"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

##### 500 500

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Internal server error**

```json
{
  "type": "api_error",
  "message": "An internal error occurred while processing your request"
}
```

<a id="scalar-operation-delete-contactsid"></a>

### Delete a contact

- **Method:** `DELETE`
- **Path:** `/contacts/{id}`
- **Operation ID:** `delete-a-contact`
- **Tags:** Contacts

Delete a contact

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the contact

#### Responses

##### 200 200

**Content type:** `application/json`

[DeletedObject](#scalar-schema-deletedobject)

[Generated example](#scalar-example-14)

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 404 404

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "No such contact: '123'",
  "param": "id"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-post-webhooks"></a>

### Create a webhook

- **Method:** `POST`
- **Path:** `/webhooks`
- **Operation ID:** `create-a-webhook`
- **Tags:** Webhooks

Creates a webhook subscription.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Request body

**Content type:** `application/json`

- **`events`**: `array of string`

  An array of Booking lifecycle events that will trigger the Webhook.
- **`name`**: `string`

  Unique name for your Webhook subscription. This name is only used by you for reference.
- **`url`**: `string`

  URL for receiving POST messages from OnceHub

<a id="scalar-example-20"></a>

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

[Webhook](#scalar-schema-webhook)

<a id="scalar-example-21"></a>

**Generated example:**

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

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 409 409

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "A webhook subscription with this name already exists: 'New Bookings'",
  "param": "name"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-get-webhooks"></a>

### List all webhooks

- **Method:** `GET`
- **Path:** `/webhooks`
- **Operation ID:** `list-all-webhooks`
- **Tags:** Webhooks

Returns a list of your webhook subscriptions, sorted by creation date.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Query parameters

- **`before`**: `string`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list.
  For instance, if you make a list request and receive 30 objects, starting with `OBJ-XXXX`,
  your subsequent call can include `before=OBJ-XXXX` in order to fetch the previous page of the list.

  **Example:**

  ```json
  "OBJ-PREV123"
  ```
- **`after`**: `string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list.
  For instance, if you make a list request and receive 30 objects, ending with `OBJ-XXXX`,
  your subsequent call can include `after=OBJ-XXXX` in order to fetch the next page of the list.

  **Example:**

  ```json
  "OBJ-NEXT456"
  ```
- **`limit`**: `integer`, default: `10`, minimum: `1`, maximum: `100`

  Determines the number of objects that will be returned on each page.
  Defaults to 10 if not specified and has a maximum limit of 100 objects per page.

  **Example:**

  ```json
  25
  ```

#### Responses

##### 200 200

**Content type:** `application/json`

[WebhookList](#scalar-schema-webhooklist)

<a id="scalar-example-22"></a>

**Generated example:**

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

##### 400 400

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: out\_of\_range\_limit**

Out of range limit

```json
{
  "type": "invalid_request_error",
  "message": "Out of range value: 500. Please provide a number between 1 and 100.",
  "param": "limit"
}
```

**Example: both\_before\_and\_after**

Both before and after provided

```json
{
  "type": "invalid_request_error",
  "message": "Received both before and after parameters. Please provide only one."
}
```

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-get-webhooksid"></a>

### Get a single webhook

- **Method:** `GET`
- **Path:** `/webhooks/{id}`
- **Operation ID:** `get-a-single-webhook`
- **Tags:** Webhooks

Returns a single webhook subscription by ID.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the webhook

#### Responses

##### 200 200

**Content type:** `application/json`

[Webhook](#scalar-schema-webhook)

[Generated example](#scalar-example-21)

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 404 404

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "No such webhook: '123'",
  "param": "id"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

<a id="scalar-operation-delete-webhooksid"></a>

### Delete a webhook

- **Method:** `DELETE`
- **Path:** `/webhooks/{id}`
- **Operation ID:** `delete-a-webhook`
- **Tags:** Webhooks

Deletes a single webhook subscription by ID.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Path parameters

- **`id` (required)**: `string`

  ID of the webhook

#### Responses

##### 200 200

**Content type:** `application/json`

[DeletedObject](#scalar-schema-deletedobject)

[Generated example](#scalar-example-14)

##### 401 401 - Unauthorized

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "authentication_error",
  "message": "Invalid API key."
}
```

##### 404 404

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "invalid_request_error",
  "message": "No such webhook: '123'",
  "param": "id"
}
```

##### 429 429 - Too Many Requests

**Content type:** `application/json`

[Error](#scalar-schema-error)

**Example: Result**

```json
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```

## Webhooks

<a id="scalar-webhook-post-bookingscheduled"></a>

### Booking Scheduled Event

- **Method:** `POST`
- **Webhook:** `booking.scheduled`
- **Operation ID:** `webhook-booking-scheduled`
- **Tags:** Webhook Events

Triggered when:

- Customer schedules a booking
- User approves a booking requested by a Customer

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Request body

**Content type:** `application/json`

**All of:**

- [WebhookEvent](#scalar-schema-webhookevent)

  Base webhook event structure sent to your webhook URL
- `object`
  - **`data`**: [BookingWebhookData](#scalar-schema-bookingwebhookdata)

    The booking object containing relevant data associated with the event
  - **`type`**: `string`, possible values: `"booking.scheduled"`

<a id="scalar-example-23"></a>

**Generated example:**

```json
{
  "id": "EVNT-KN56U3YL7C",
  "object": "event",
  "creation_time": "2020-03-22T09:49:12Z",
  "type": "booking.scheduled",
  "api_version": "v2",
  "data": {
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
    "external_calendar": {
      "type": "google",
      "name": "andrea.hartie@example.com",
      "id": "andrea.hartie@example.com",
      "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
    },
    "ics_url": "https://oncehub.com/api/bookings/ics/62ad3bdd-a09f-dfbdffbef389-axs01j",
    "booking_calendar": "BKC-03WJV0R52Z",
    "cancel_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL/cancel",
    "reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL",
    "payment_information": {
      "amount_charged": 5000,
      "currency": "USD",
      "transaction_id": "ch_1234567890ABCDEFGHIJ"
    },
    "custom_fields": [
      {
        "name": "discussion_points",
        "value": "Need support on new product"
      }
    ],
    "owner": "USR-FSD423423",
    "conversation": {
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
    },
    "cancel_reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL"
  }
}
```

#### Responses

##### 200 Webhook received successfully

<a id="scalar-webhook-post-bookingrescheduled"></a>

### Booking Rescheduled Event

- **Method:** `POST`
- **Webhook:** `booking.rescheduled`
- **Operation ID:** `webhook-booking-rescheduled`
- **Tags:** Webhook Events

Triggered when:

- Customer reschedules a booking on the same booking calendar
- Customer reschedules a booking following a request from the User to reschedule

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Request body

**Content type:** `application/json`

**All of:**

- [WebhookEvent](#scalar-schema-webhookevent)

  Base webhook event structure sent to your webhook URL
- `object`
  - **`data`**: [BookingWebhookCancelData](#scalar-schema-bookingwebhookcanceldata)

    The booking object containing relevant data associated with the event
  - **`type`**: `string`, possible values: `"booking.rescheduled"`

<a id="scalar-example-24"></a>

**Generated example:**

```json
{
  "id": "EVNT-KN56U3YL7C",
  "object": "event",
  "creation_time": "2020-03-22T09:49:12Z",
  "type": "booking.rescheduled",
  "api_version": "v2",
  "data": {
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
    "external_calendar": {
      "type": "google",
      "name": "andrea.hartie@example.com",
      "id": "andrea.hartie@example.com",
      "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
    },
    "ics_url": "https://oncehub.com/api/bookings/ics/62ad3bdd-a09f-dfbdffbef389-axs01j",
    "booking_calendar": "BKC-03WJV0R52Z",
    "cancel_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL/cancel",
    "reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL",
    "payment_information": {
      "amount_charged": 5000,
      "currency": "USD",
      "transaction_id": "ch_1234567890ABCDEFGHIJ"
    },
    "custom_fields": [
      {
        "name": "discussion_points",
        "value": "Need support on new product"
      }
    ],
    "owner": "USR-FSD423423",
    "conversation": {
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
    },
    "cancel_reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL"
  }
}
```

#### Responses

##### 200 Webhook received successfully

<a id="scalar-webhook-post-bookingreassigned"></a>

### Booking Reassigned Event

- **Method:** `POST`
- **Webhook:** `booking.reassigned`
- **Operation ID:** `webhook-booking-reassigned`
- **Tags:** Webhook Events

Triggered when a booking is reassigned to a different user.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Request body

**Content type:** `application/json`

**All of:**

- [WebhookEvent](#scalar-schema-webhookevent)

  Base webhook event structure sent to your webhook URL
- `object`
  - **`data`**: [BookingWebhookData](#scalar-schema-bookingwebhookdata)

    The booking object containing relevant data associated with the event
  - **`type`**: `string`, possible values: `"booking.reassigned"`

<a id="scalar-example-25"></a>

**Generated example:**

```json
{
  "id": "EVNT-KN56U3YL7C",
  "object": "event",
  "creation_time": "2020-03-22T09:49:12Z",
  "type": "booking.reassigned",
  "api_version": "v2",
  "data": {
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
    "external_calendar": {
      "type": "google",
      "name": "andrea.hartie@example.com",
      "id": "andrea.hartie@example.com",
      "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
    },
    "ics_url": "https://oncehub.com/api/bookings/ics/62ad3bdd-a09f-dfbdffbef389-axs01j",
    "booking_calendar": "BKC-03WJV0R52Z",
    "cancel_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL/cancel",
    "reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL",
    "payment_information": {
      "amount_charged": 5000,
      "currency": "USD",
      "transaction_id": "ch_1234567890ABCDEFGHIJ"
    },
    "custom_fields": [
      {
        "name": "discussion_points",
        "value": "Need support on new product"
      }
    ],
    "owner": "USR-FSD423423",
    "conversation": {
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
    },
    "cancel_reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL"
  }
}
```

#### Responses

##### 200 Webhook received successfully

<a id="scalar-webhook-post-bookingcanceled-then-rescheduled"></a>

### Booking Canceled Then Rescheduled Event

- **Method:** `POST`
- **Webhook:** `booking.canceled_then_rescheduled`
- **Operation ID:** `webhook-booking-canceled-then-rescheduled`
- **Tags:** Webhook Events

Triggered when Customer cancels a booking and then reschedules on a different booking page.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Request body

**Content type:** `application/json`

**All of:**

- [WebhookEvent](#scalar-schema-webhookevent)

  Base webhook event structure sent to your webhook URL
- `object`
  - **`data`**: [BookingWebhookData](#scalar-schema-bookingwebhookdata)

    The booking object containing relevant data associated with the event
  - **`type`**: `string`, possible values: `"booking.canceled_then_rescheduled"`

<a id="scalar-example-26"></a>

**Generated example:**

```json
{
  "id": "EVNT-KN56U3YL7C",
  "object": "event",
  "creation_time": "2020-03-22T09:49:12Z",
  "type": "booking.canceled_then_rescheduled",
  "api_version": "v2",
  "data": {
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
    "external_calendar": {
      "type": "google",
      "name": "andrea.hartie@example.com",
      "id": "andrea.hartie@example.com",
      "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
    },
    "ics_url": "https://oncehub.com/api/bookings/ics/62ad3bdd-a09f-dfbdffbef389-axs01j",
    "booking_calendar": "BKC-03WJV0R52Z",
    "cancel_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL/cancel",
    "reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL",
    "payment_information": {
      "amount_charged": 5000,
      "currency": "USD",
      "transaction_id": "ch_1234567890ABCDEFGHIJ"
    },
    "custom_fields": [
      {
        "name": "discussion_points",
        "value": "Need support on new product"
      }
    ],
    "owner": "USR-FSD423423",
    "conversation": {
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
    },
    "cancel_reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL"
  }
}
```

#### Responses

##### 200 Webhook received successfully

<a id="scalar-webhook-post-bookingcanceled-reschedule-requested"></a>

### Booking Canceled Reschedule Requested Event

- **Method:** `POST`
- **Webhook:** `booking.canceled_reschedule_requested`
- **Operation ID:** `webhook-booking-canceled-reschedule-requested`
- **Tags:** Webhook Events

Triggered when User cancels and sends a request to the Customer to reschedule.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Request body

**Content type:** `application/json`

**All of:**

- [WebhookEvent](#scalar-schema-webhookevent)

  Base webhook event structure sent to your webhook URL
- `object`
  - **`data`**: [BookingWebhookData](#scalar-schema-bookingwebhookdata)

    The booking object containing relevant data associated with the event
  - **`type`**: `string`, possible values: `"booking.canceled_reschedule_requested"`

<a id="scalar-example-27"></a>

**Generated example:**

```json
{
  "id": "EVNT-KN56U3YL7C",
  "object": "event",
  "creation_time": "2020-03-22T09:49:12Z",
  "type": "booking.canceled_reschedule_requested",
  "api_version": "v2",
  "data": {
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
    "external_calendar": {
      "type": "google",
      "name": "andrea.hartie@example.com",
      "id": "andrea.hartie@example.com",
      "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
    },
    "ics_url": "https://oncehub.com/api/bookings/ics/62ad3bdd-a09f-dfbdffbef389-axs01j",
    "booking_calendar": "BKC-03WJV0R52Z",
    "cancel_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL/cancel",
    "reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL",
    "payment_information": {
      "amount_charged": 5000,
      "currency": "USD",
      "transaction_id": "ch_1234567890ABCDEFGHIJ"
    },
    "custom_fields": [
      {
        "name": "discussion_points",
        "value": "Need support on new product"
      }
    ],
    "owner": "USR-FSD423423",
    "conversation": {
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
    },
    "cancel_reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL"
  }
}
```

#### Responses

##### 200 Webhook received successfully

<a id="scalar-webhook-post-bookingcanceled"></a>

### Booking Canceled Event

- **Method:** `POST`
- **Webhook:** `booking.canceled`
- **Operation ID:** `webhook-booking-canceled`
- **Tags:** Webhook Events

Triggered when User or Customer cancels a booking.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Request body

**Content type:** `application/json`

**All of:**

- [WebhookEvent](#scalar-schema-webhookevent)

  Base webhook event structure sent to your webhook URL
- `object`
  - **`data`**: [BookingWebhookCancelData](#scalar-schema-bookingwebhookcanceldata)

    The booking object containing relevant data associated with the event.
  - **`type`**: `string`, possible values: `"booking.canceled"`

<a id="scalar-example-28"></a>

**Generated example:**

```json
{
  "id": "EVNT-KN56U3YL7C",
  "object": "event",
  "creation_time": "2020-03-22T09:49:12Z",
  "type": "booking.canceled",
  "api_version": "v2",
  "data": {
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
    "external_calendar": {
      "type": "google",
      "name": "andrea.hartie@example.com",
      "id": "andrea.hartie@example.com",
      "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
    },
    "ics_url": "https://oncehub.com/api/bookings/ics/62ad3bdd-a09f-dfbdffbef389-axs01j",
    "booking_calendar": "BKC-03WJV0R52Z",
    "cancel_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL/cancel",
    "reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL",
    "payment_information": {
      "amount_charged": 5000,
      "currency": "USD",
      "transaction_id": "ch_1234567890ABCDEFGHIJ"
    },
    "custom_fields": [
      {
        "name": "discussion_points",
        "value": "Need support on new product"
      }
    ],
    "owner": "USR-FSD423423",
    "conversation": {
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
    },
    "cancel_reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL"
  }
}
```

#### Responses

##### 200 Webhook received successfully

<a id="scalar-webhook-post-bookingcompleted"></a>

### Booking Completed Event

- **Method:** `POST`
- **Webhook:** `booking.completed`
- **Operation ID:** `webhook-booking-completed`
- **Tags:** Webhook Events

Triggered when booking end time has passed.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Request body

**Content type:** `application/json`

**All of:**

- [WebhookEvent](#scalar-schema-webhookevent)

  Base webhook event structure sent to your webhook URL
- `object`
  - **`data`**: [BookingWebhookData](#scalar-schema-bookingwebhookdata)

    The booking object containing relevant data associated with the event
  - **`type`**: `string`, possible values: `"booking.completed"`

<a id="scalar-example-29"></a>

**Generated example:**

```json
{
  "id": "EVNT-KN56U3YL7C",
  "object": "event",
  "creation_time": "2020-03-22T09:49:12Z",
  "type": "booking.completed",
  "api_version": "v2",
  "data": {
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
    "external_calendar": {
      "type": "google",
      "name": "andrea.hartie@example.com",
      "id": "andrea.hartie@example.com",
      "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
    },
    "ics_url": "https://oncehub.com/api/bookings/ics/62ad3bdd-a09f-dfbdffbef389-axs01j",
    "booking_calendar": "BKC-03WJV0R52Z",
    "cancel_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL/cancel",
    "reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL",
    "payment_information": {
      "amount_charged": 5000,
      "currency": "USD",
      "transaction_id": "ch_1234567890ABCDEFGHIJ"
    },
    "custom_fields": [
      {
        "name": "discussion_points",
        "value": "Need support on new product"
      }
    ],
    "owner": "USR-FSD423423",
    "conversation": {
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
    },
    "cancel_reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL"
  }
}
```

#### Responses

##### 200 Webhook received successfully

<a id="scalar-webhook-post-bookingno-show"></a>

### Booking No-Show Event

- **Method:** `POST`
- **Webhook:** `booking.no_show`
- **Operation ID:** `webhook-booking-no-show`
- **Tags:** Webhook Events

Triggered when User sets the completed booking to No-show.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Request body

**Content type:** `application/json`

**All of:**

- [WebhookEvent](#scalar-schema-webhookevent)

  Base webhook event structure sent to your webhook URL
- `object`
  - **`data`**: [BookingWebhookData](#scalar-schema-bookingwebhookdata)

    The booking object containing relevant data associated with the event
  - **`type`**: `string`, possible values: `"booking.no_show"`

<a id="scalar-example-30"></a>

**Generated example:**

```json
{
  "id": "EVNT-KN56U3YL7C",
  "object": "event",
  "creation_time": "2020-03-22T09:49:12Z",
  "type": "booking.no_show",
  "api_version": "v2",
  "data": {
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
    "external_calendar": {
      "type": "google",
      "name": "andrea.hartie@example.com",
      "id": "andrea.hartie@example.com",
      "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
    },
    "ics_url": "https://oncehub.com/api/bookings/ics/62ad3bdd-a09f-dfbdffbef389-axs01j",
    "booking_calendar": "BKC-03WJV0R52Z",
    "cancel_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL/cancel",
    "reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL",
    "payment_information": {
      "amount_charged": 5000,
      "currency": "USD",
      "transaction_id": "ch_1234567890ABCDEFGHIJ"
    },
    "custom_fields": [
      {
        "name": "discussion_points",
        "value": "Need support on new product"
      }
    ],
    "owner": "USR-FSD423423",
    "conversation": {
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
    },
    "cancel_reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL"
  }
}
```

#### Responses

##### 200 Webhook received successfully

<a id="scalar-webhook-post-conversationstarted"></a>

### Conversation Started Event

- **Method:** `POST`
- **Webhook:** `conversation.started`
- **Operation ID:** `webhook-conversation-started`
- **Tags:** Webhook Events

Triggered when website visitor starts interacting with a chatbot.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Request body

**Content type:** `application/json`

**All of:**

- [WebhookEvent](#scalar-schema-webhookevent)

  Base webhook event structure sent to your webhook URL
- `object`
  - **`data`**: [ConversationWebhookData](#scalar-schema-conversationwebhookdata)

    The conversation object containing relevant data associated with the event
  - **`type`**: `string`, possible values: `"conversation.started"`

<a id="scalar-example-31"></a>

**Generated example:**

```json
{
  "id": "EVNT-KN56U3YL7C",
  "object": "event",
  "creation_time": "2020-03-22T09:49:12Z",
  "type": "conversation.started",
  "api_version": "v2",
  "data": {
    "id": "CVR-022EAEA41C",
    "object": "conversation",
    "creation_time": "2021-07-13T12:28:24Z",
    "initiated_by": "contact",
    "last_updated_time": "2021-07-13T12:33:54Z",
    "last_interacted_time": "2021-07-13T12:33:54Z",
    "contact": {
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
    },
    "owner": {
      "first_name": "Andrea",
      "last_name": "Hartie",
      "email": "AndreaHartie@example.com",
      "role_name": "Member",
      "timezone": "America/Chicago",
      "teams": [
        "TM-GCJU8DLBTPY1"
      ]
    },
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
}
```

#### Responses

##### 200 Webhook received successfully

<a id="scalar-webhook-post-conversationclosed"></a>

### Conversation Closed Event

- **Method:** `POST`
- **Webhook:** `conversation.closed`
- **Operation ID:** `webhook-conversation-closed`
- **Tags:** Webhook Events

Triggered when:

- Website visitor reaches the end of the conversation flow
- Website visitor starts a new conversation with a different chatbot

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Request body

**Content type:** `application/json`

**All of:**

- [WebhookEvent](#scalar-schema-webhookevent)

  Base webhook event structure sent to your webhook URL
- `object`
  - **`data`**: [ConversationWebhookData](#scalar-schema-conversationwebhookdata)

    The conversation object containing relevant data associated with the event
  - **`type`**: `string`, possible values: `"conversation.closed"`

<a id="scalar-example-32"></a>

**Generated example:**

```json
{
  "id": "EVNT-KN56U3YL7C",
  "object": "event",
  "creation_time": "2020-03-22T09:49:12Z",
  "type": "conversation.closed",
  "api_version": "v2",
  "data": {
    "id": "CVR-022EAEA41C",
    "object": "conversation",
    "creation_time": "2021-07-13T12:28:24Z",
    "initiated_by": "contact",
    "last_updated_time": "2021-07-13T12:33:54Z",
    "last_interacted_time": "2021-07-13T12:33:54Z",
    "contact": {
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
    },
    "owner": {
      "first_name": "Andrea",
      "last_name": "Hartie",
      "email": "AndreaHartie@example.com",
      "role_name": "Member",
      "timezone": "America/Chicago",
      "teams": [
        "TM-GCJU8DLBTPY1"
      ]
    },
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
}
```

#### Responses

##### 200 Webhook received successfully

<a id="scalar-webhook-post-conversationabandoned"></a>

### Conversation Abandoned Event

- **Method:** `POST`
- **Webhook:** `conversation.abandoned`
- **Operation ID:** `webhook-conversation-abandoned`
- **Tags:** Webhook Events

Triggered when website visitor stops interacting with a bot for more than 10 minutes.

**Servers:** [Inherited servers](#scalar-context-global-servers)

**Authentication:** [Global authentication](#scalar-context-global-authentication)

#### Request body

**Content type:** `application/json`

**All of:**

- [WebhookEvent](#scalar-schema-webhookevent)

  Base webhook event structure sent to your webhook URL
- `object`
  - **`data`**: [ConversationWebhookData](#scalar-schema-conversationwebhookdata)

    The conversation object containing relevant data associated with the event
  - **`type`**: `string`, possible values: `"conversation.abandoned"`

<a id="scalar-example-33"></a>

**Generated example:**

```json
{
  "id": "EVNT-KN56U3YL7C",
  "object": "event",
  "creation_time": "2020-03-22T09:49:12Z",
  "type": "conversation.abandoned",
  "api_version": "v2",
  "data": {
    "id": "CVR-022EAEA41C",
    "object": "conversation",
    "creation_time": "2021-07-13T12:28:24Z",
    "initiated_by": "contact",
    "last_updated_time": "2021-07-13T12:33:54Z",
    "last_interacted_time": "2021-07-13T12:33:54Z",
    "contact": {
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
    },
    "owner": {
      "first_name": "Andrea",
      "last_name": "Hartie",
      "email": "AndreaHartie@example.com",
      "role_name": "Member",
      "timezone": "America/Chicago",
      "teams": [
        "TM-GCJU8DLBTPY1"
      ]
    },
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
}
```

#### Responses

##### 200 Webhook received successfully

## Schemas

<a id="scalar-schema-booking"></a>

### Booking

**All of:**

- [BookingBase](#scalar-schema-bookingbase)
- `object`
  - **`contact`**

    The ID of the contact the booking was scheduled with.

    **Expandable**: Use `expand=contact` to include the full Contact object.

    **One of:**
    - `string`

      Contact ID (when not expanded)
    - [Contact](#scalar-schema-contact)
  - **`conversation`**

    The ID of the conversation that this booking was scheduled from, null if the booking did not come from a conversation.

    **Expandable**: Use `expand=conversation` to include the full Conversation object.

    **One of:**
    - `string`

      Conversation ID (when not expanded)
    - [Conversation](#scalar-schema-conversation)
    - `null`

      No conversation associated
  - **`owner`**

    The ID of the owner of the booking. This is the User who originally accepted the booking, and remains unchanged even if the booking was reassigned to a new booking page.

    **Expandable**: Use `expand=owner` to include the full User object.

    **One of:**
    - `string`

      User ID (when not expanded)
    - [User](#scalar-schema-user)
  - **`utm_params`**: [UtmParams](#scalar-schema-utmparams) | `null`

    If no UTM params exist on the booking, object will return null.

<a id="scalar-schema-bookinglist"></a>

### BookingList

**Type:** `object`

- **`data`**: array of [Booking](#scalar-schema-booking), minItems: `0`
- **`has_more`**: `boolean`

  Whether there are more items available
- **`object`**: `string`

<a id="scalar-example-34"></a>

**Generated example:**

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
      "external_calendar": {
        "type": "google",
        "name": "andrea.hartie@example.com",
        "id": "andrea.hartie@example.com",
        "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
      },
      "ics_url": "https://oncehub.com/api/bookings/ics/62ad3bdd-a09f-dfbdffbef389-axs01j",
      "booking_calendar": "BKC-03WJV0R52Z",
      "cancel_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL/cancel",
      "reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL",
      "payment_information": {
        "amount_charged": 5000,
        "currency": "USD",
        "transaction_id": "ch_1234567890ABCDEFGHIJ"
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

<a id="scalar-schema-contact"></a>

### Contact

**Type:** `object`

- **`city`**: `string | null`

  City of the contact
- **`company`**: `string | null`

  Company name
- **`company_size`**: `string | null`

  Size of the contact's company
- **`country`**: `string | null`

  Country of the contact
- **`creation_time`**: `string`, format: `date-time`, readOnly

  The date and time when the contact was created
- **`custom_fields`**: `array`

  Custom fields associated with the contact

  **Items:**
  - **`name`**: `string`
  - **`value`**: `string | number | boolean | array | object | null`

    Value of the custom field
- **`email`**: `string`

  Email address of the contact
- **`employees`**: `integer`

  Number of employees
- **`first_name`**: `string | null`

  First name of the contact
- **`has_consent`**: `boolean`

  Whether the contact has given consent
- **`id`**: `string`, readOnly

  Unique identifier for the contact
- **`job_title`**: `string | null`

  Job title of the contact
- **`last_interacted_time`**: `string | null`, format: `date-time`, readOnly

  The date and time of the last interaction with the contact
- **`last_name`**: `string | null`

  Last name of the contact
- **`last_updated_time`**: `string`, format: `date-time`, readOnly

  The date and time the contact was last updated
- **`mobile_phone`**: `string | null`

  Mobile phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format
- **`object`**: `string`, readOnly

  String representing the object's type
- **`owner`**: `string`

  The ID of the owner of the contact
- **`phone`**: `string | null`

  Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format
- **`post_code`**: `string | null`

  Postal code
- **`salutation`**: `string | null`

  Salutation
- **`state`**: `string | null`

  State or province
- **`status`**: `string | null`, possible values: `"Qualified", "Sales qualified", "Marketing qualified", "Disqualified", null`

  The status of the contact. Accepted values are `Qualified`, `Sales qualified`, `Marketing qualified`, or `Disqualified`. If any other value is provided or no value is provided, the status will be set to null.
- **`street_address`**: `string | null`

  Street address
- **`terms_of_sevice`**: `boolean`

  Whether terms of service were accepted
- **`timezone`**: `string`

  Timezone of the contact

<a id="scalar-example-35"></a>

**Generated example:**

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

<a id="scalar-schema-contactlist"></a>

### ContactList

**Type:** `object`

- **`data`**: array of [Contact](#scalar-schema-contact), minItems: `0`
- **`has_more`**: `boolean`

  Whether there are more items available
- **`object`**: `string`

<a id="scalar-example-36"></a>

**Generated example:**

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

<a id="scalar-schema-bookingpage"></a>

### BookingPage

**Type:** `object`

- **`active`**: `boolean`

  True if this booking page is enabled and accepts bookings
- **`id`**: `string`

  Unique identifier for the object
- **`label`**: `string`

  The internal label of the booking page
- **`name`**: `string`

  The customer-facing name of the booking page
- **`object`**: `string`

  String representing the object's type
- **`timezone`**: `string`

  The Booking page timezone. Displayed in IANA timezone format.
- **`url`**: `string`, format: `uri`

  The URL of the booking page

<a id="scalar-example-37"></a>

**Generated example:**

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

<a id="scalar-schema-bookingpagelist"></a>

### BookingPageList

**Type:** `object`

- **`data`**: array of [BookingPage](#scalar-schema-bookingpage), minItems: `0`
- **`has_more`**: `boolean`

  Whether there are more items available
- **`object`**: `string`

<a id="scalar-example-38"></a>

**Generated example:**

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

<a id="scalar-schema-team"></a>

### Team

**Type:** `object`

- **`id`**: `string`

  Unique identifier for the team
- **`name`**: `string`

  The name of the team
- **`object`**: `string`

  String representing the object's type

<a id="scalar-example-39"></a>

**Generated example:**

```json
{
  "object": "team",
  "id": "TM-GCJU8DLBTPY1",
  "name": "Sales"
}
```

<a id="scalar-schema-teamlist"></a>

### TeamList

**Type:** `object`

- **`data`**: array of [Team](#scalar-schema-team), minItems: `0`
- **`has_more`**: `boolean`

  Whether there are more items available
- **`object`**: `string`

<a id="scalar-example-40"></a>

**Generated example:**

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

<a id="scalar-schema-eventtype"></a>

### EventType

**Type:** `object`

- **`description`**: `string`

  The description of the event type
- **`id`**: `string`

  Unique identifier for the event type
- **`name`**: `string`

  The name of the event type
- **`object`**: `string`

  String representing the object's type

<a id="scalar-example-41"></a>

**Generated example:**

```json
{
  "object": "event_type",
  "id": "ET-7I7PKDTFJS",
  "name": "Live demo",
  "description": "Schedule a live demo with us for an in-depth look at our enterprise solutions."
}
```

<a id="scalar-schema-eventtypelist"></a>

### EventTypeList

**Type:** `object`

- **`data`**: array of [EventType](#scalar-schema-eventtype), minItems: `0`
- **`has_more`**: `boolean`

  Whether there are more items available
- **`object`**: `string`

<a id="scalar-example-42"></a>

**Generated example:**

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

<a id="scalar-schema-webhook"></a>

### Webhook

**Type:** `object`

- **`api_version`**: `string`

  The API version used for the webhook
- **`creation_time`**: `string`

  The time when the webhook was created
- **`events`**: `array of string`

  Booking lifecycle events that trigger the webhook
- **`id`**: `string`

  Unique identifier for the webhook
- **`name`**: `string`

  Unique name for your webhook subscription
- **`object`**: `string`

  String representing the object's type
- **`secret`**: `string`

  Secret key for webhook signature verification
- **`url`**: `string`

  URL for receiving POST messages from OnceHub

<a id="scalar-example-43"></a>

**Generated example:**

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

<a id="scalar-schema-webhooklist"></a>

### WebhookList

**Type:** `object`

- **`data`**: array of [Webhook](#scalar-schema-webhook), minItems: `0`
- **`has_more`**: `boolean`

  Whether there are more items available
- **`object`**: `string`

<a id="scalar-example-44"></a>

**Generated example:**

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

<a id="scalar-schema-webhookevent"></a>

### WebhookEvent

**Type:** `object`

Base webhook event structure sent to your webhook URL

- **`api_version` (required)**: `string`

  The OnceHub API version used to render the data object
- **`creation_time` (required)**: `string`, format: `date-time`

  The time the event object was created
- **`id` (required)**: `string`

  Unique alphanumeric identifier for the event object
- **`object` (required)**: `string`

  String representing the object's type
- **`type` (required)**: `string`

  The type of the event (e.g., booking.scheduled, conversation.started)

<a id="scalar-example-45"></a>

**Generated example:**

```json
{
  "id": "EVNT-KN56U3YL7C",
  "object": "event",
  "creation_time": "2020-03-22T09:49:12Z",
  "type": "booking.scheduled",
  "api_version": "v2"
}
```

<a id="scalar-schema-bookingwebhookdata"></a>

### BookingWebhookData

**All of:**

- [BookingBase](#scalar-schema-bookingbase)
- `object`

  Booking object as sent in webhook events.

  **Important differences from REST API:**
  - The `contact` field is NOT included in the webhook payload.
  - The `conversation` field is ALWAYS expanded to the full Conversation object.
  - The `cancel_reschedule_url` field is included.
  - The `utm_params` field is NOT included in webhook payloads.
  * **`cancel_reschedule_url`**: `string`

    URL for cancelling and rescheduling the booking
  * **`conversation`**: [Conversation](#scalar-schema-conversation) | `null`

    The conversation object if booking came from a conversation
  * **`owner`**: `string`

    The ID of the owner of the booking.

<a id="scalar-schema-bookingwebhookcanceldata"></a>

### BookingWebhookCancelData

**All of:**

- [BookingWebhookData](#scalar-schema-bookingwebhookdata)
- `object`
  - **`cancel_reschedule_information`**: `object`

    An object containing information about the cancel / reschedule event.
    - **`actioned_by`**: `string`, possible values: `"user", "customer"`

      Indicates the entity that performed the action. Valid options are user (person in your team) and customer (person who made the booking).
    - **`reason`**: `string`

      The reason given for canceling or rescheduling a meeting.
    - **`user_id`**: `string`

      If the cancel reschedule was done by the user, this field will contain their user id.

      Note: When a meeting is cancelled via the API, the `user_id` depends on the booking source:
      - **Booking Calendars:** The `user_id` is booking host's user ID.
      - **Booking Pages:** The `user_id` is the account owner's user ID.

<a id="scalar-schema-bookingwithcancelinfo"></a>

### BookingWithCancelInfo

**All of:**

- [BookingBase](#scalar-schema-bookingbase)
- `object`
  - **`cancel_reschedule_information`**: `object`

    An object containing information about the cancel / reschedule event.
    - **`actioned_by`**: `string`, possible values: `"user", "customer"`

      Indicates the entity that performed the action. Valid options are user (person in your team) and customer (person who made the booking).
    - **`reason`**: `string`

      The reason given for canceling or rescheduling a meeting.
    - **`user_id`**: `string`

      If the cancel reschedule was done by the user, this field will contain their user id.

      Note: When a meeting is cancelled via the API, the `user_id` depends on the booking source:
      - **Booking Calendars:** The `user_id` is booking host's user ID.
      - **Booking Pages:** The `user_id` is the account owner's user ID.

<a id="scalar-schema-conversationwebhookdata"></a>

### ConversationWebhookData

**All of:**

- [Conversation](#scalar-schema-conversation)
- `object`

  Conversation object as sent in webhook events.

  **Important differences from REST API:**
  - The `contact` field is always expanded to the full Contact object
  - The `owner` field is always expanded to the full User object
  - The `bot` field is always expanded to the full Bot object
  - The `website` field is always expanded to the full Website object
  * **`contact`**: [Contact](#scalar-schema-contact)

    The contact object (always expanded in webhooks)
  * **`owner`**: [User](#scalar-schema-user)

    The owner user object (always expanded in webhooks)

<a id="scalar-schema-bookingcalendar"></a>

### BookingCalendar

**Type:** `object`

- **`duration_minutes`**: `number`

  Meeting duration in minutes.
- **`host`**: `string`

  The user id / team id of the booking calendar meeting host. Additional attendees are not included.
- **`id`**: `string`

  Unique identifier for the object.
- **`name`**: `string`

  The internal label / name of the booking calendar.
- **`object`**: `string`

  String representing the object's type. Objects of the same type share the same value. The type here is booking\_calendar.
- **`published`**: `boolean`

  True if this booking calendar is enabled and accepts bookings.
- **`subject`**: `string`

  The customer-facing subject of the booking calendar.
- **`url`**: `string`, format: `uri`

  The URL of the booking calendar.

<a id="scalar-example-46"></a>

**Generated example:**

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

<a id="scalar-schema-bookingcalendarlist"></a>

### BookingCalendarList

**Type:** `object`

- **`data`**: array of [BookingCalendar](#scalar-schema-bookingcalendar)
- **`has_more`**: `boolean`

  Whether there are more items available
- **`object`**: `string`

<a id="scalar-example-47"></a>

**Generated example:**

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

<a id="scalar-schema-user"></a>

### User

**Type:** `object`

- **`email`**: `string`, format: `email`

  User's email.
- **`first_name`**: `string`

  User's first name.
- **`id`**: `string`, readOnly

  Unique identifier for the object.
- **`last_name`**: `string`

  User's last name.
- **`object`**: `string`, readOnly

  String representing the object's type. Objects of the same type share the same value. The type here is user.
- **`role_name`**: `string`, possible values: `"Account Owner", "Administrator", "Member", "Team Manager"`

  The name of the role associated with the user, for example - Administrator, Member, Team Manager, or Account Owner.
- **`status`**: `string`, possible values: `"active", "invited"`, readOnly

  The status of the user. The user can have one of the following statuses - active or invited.
- **`teams`**: `array of string`

  The teams the user belongs to.
- **`timezone`**: `string`

  User's timezone. Displayed in IANA timezone format

<a id="scalar-example-48"></a>

**Generated example:**

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

<a id="scalar-schema-userlist"></a>

### UserList

**Type:** `object`

- **`data`**: array of [User](#scalar-schema-user), minItems: `0`
- **`has_more`**: `boolean`

  Whether there are more items available
- **`object`**: `string`

<a id="scalar-example-49"></a>

**Generated example:**

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

<a id="scalar-schema-smsnotification"></a>

### SmsNotification

**Type:** `object`

- **`creation_time` (required)**: `string`, format: `date-time`

  The date and time when the SMS notification was created.
- **`details` (required)**: `object`

  SMS-specific delivery details.
  - **`delivered_to` (required)**: `string`

    The phone number where the SMS was delivered.
  - **`message_body` (required)**: `string`

    The content of the SMS message that was sent.
  - **`segment_count` (required)**: `integer`

    The number of segments the SMS was split into. SMS messages are charged per segment.
- **`id` (required)**: `string`

  Unique identifier for the object.
- **`object` (required)**: `string`

  String representing the object's type. Objects of the same type share the same value.
- **`recipient` (required)**: `string` | [Contact](#scalar-schema-contact) | [User](#scalar-schema-user)

  The ID of the recipient who received the SMS. Can be either a contact ID or a user ID.
  When expanded, this will include the full contact or user object.
- **`recipient_type` (required)**: `string`, possible values: `"contact", "user"`

  Indicates whether the recipient is a contact or a user.
- **`status` (required)**: `string`, possible values: `"sent", "failed", "delivered", "rejected"`

  The delivery status of the SMS notification.
- **`type` (required)**: `string`

  The type of notification. For SMS notifications, this is always "sms".

<a id="scalar-example-50"></a>

**Generated example:**

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

<a id="scalar-schema-smsnotificationlist"></a>

### SmsNotificationList

**Type:** `object`

- **`data` (required)**: array of [SmsNotification](#scalar-schema-smsnotification)

  Array of SMS notification objects.
- **`object` (required)**: `string`

  String representing the object's type. Always "list" for list responses.

<a id="scalar-example-51"></a>

**Generated example:**

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

<a id="scalar-schema-error"></a>

### Error

**Type:** `object`

- **`message` (required)**: `string`

  A human-readable message providing more details about the error
- **`type` (required)**: `string`, possible values: `"authentication_error", "invalid_request_error", "rate_limit_error", "api_error"`

  The type of error returned
- **`param`**: `string`

  If the error is parameter-specific, the parameter related to the error

<a id="scalar-example-52"></a>

**Generated example:**

```json
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

<a id="scalar-schema-masterpage"></a>

### MasterPage

**Type:** `object`

The master page object contains the name, label and URL for master pages on your account and indicates whether the master page is enabled to receive bookings.

- **`active`**: `boolean`, default: `true`

  True if this master page is enabled and accepts bookings.
- **`id`**: `string`

  Unique identifier for the object.
- **`label`**: `string`

  The internal label of the master page.
- **`name`**: `string`

  The customer facing name of the master page.
- **`object`**: `string`

  String representing the object's type. Objects of the same type share the same value. The type here is master\_page.
- **`url`**: `string`, format: `uri`

  The URL of the master page.

<a id="scalar-example-53"></a>

**Generated example:**

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

<a id="scalar-schema-bookingbase"></a>

### BookingBase

**Type:** `object`

- **`attendees`**: `array of string`

  List of all meeting attendees (emails).
- **`booking_calendar`**: `string`

  The ID of the booking calendar used to make this booking.
- **`cancel_reschedule_information`**: `object | null`

  An object containing information about the cancel / reschedule event. This field is `null` if the booking has not been cancelled or rescheduled.
- **`cancel_url`**: `string`

  URL for cancelling the booking. Only sent for bookings scheduled via booking calendars.
- **`creation_time`**: `string`, format: `date-time`

  The date and time when the booking was created.
- **`custom_fields`**: `array`

  Any custom fields that have been added to the field library for the meeting object type on your account will be listed in the array of custom fields.

  **Items:**
  - **`name`**: `string`

    Name of the custom field.
  - **`value`**: `any`

    Value of the custom field.
- **`customer_timezone`**: `string`

  The timezone selected by the customer when making the booking. Displayed in IANA timezone format.
- **`duration_minutes`**: `integer`

  The length of the meeting, in minutes.
- **`external_calendar`**: `object`

  Object containing information about the calendar used in the booking.
  - **`event_id`**: `string`

    The id of the booking event that was created in the external calendar.
  - **`id`**: `string`

    The ID of the external calendar to which the booking was added.
  - **`name`**: `string`

    The name of the external calendar to which the booking was added.
  - **`type`**: `string`, possible values: `"google", "exchange", "office_365", "icloud"`

    Type of calendar
- **`form_submission`**: `object`

  The object containing information entered by the customer into the booking form. This will include any system fields and custom fields defined in your booking form.
  - **`company`**: `string | null`

    The company provided by your customer in the booking form.
  - **`custom_fields`**: `array`

    The array containing custom Booking form fields.

    **Items:**
    - **`name`**: `string`
    - **`value`**: `any`

      Value of the custom field.
  - **`email`**: `string`

    The email provided by the customer in the booking form.
  - **`guests`**: `array of string`

    List of additional attendees (emails) invited by the customer.
  - **`mobile_phone`**: `string`

    The mobile phone number provided by the customer in the booking form.
  - **`name`**: `string`

    The name provided by the customer in the booking form.
  - **`note`**: `string`

    The note provided by the customer in the booking form.
  - **`phone`**: `string | null`

    The phone number provided by the customer in the booking form.
- **`ics_url`**: `string`

  A direct, publicly accessible URL that downloads an ICS (.ics) calendar file for the booking.
- **`id`**: `string`

  Unique identifier for the object.
- **`in_trash`**: `boolean`

  The booking was moved to trash in the activity stream. While this value is true, the activity can still be found in the trash and has not been hard deleted yet.
- **`last_updated_time`**: `string`, format: `date-time`

  The date and time the booking was last updated.
- **`location_description`**: `string`

  Information about the physical location in case of physical meeting.
- **`object`**: `string`

  String representing the object's type. Objects of the same type share the same value.
- **`payment_information`**: `object | null`

  Payment information for the booking if payment was collected via Stripe.
  - **`amount_charged`**: `integer`

    The amount charged in the smallest currency unit (e.g., cents for USD).
  - **`currency`**: `string`

    [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code for the transaction.
  - **`transaction_id`**: `string`

    [Stripe charge ID](https://docs.stripe.com/api/charges/object) associated with the transaction.
- **`reschedule_url`**: `string`

  URL for rescheduling the booking. Only sent for bookings scheduled via booking calendars.
- **`rescheduled_booking_id`**: `string`

  The ID of the booking that was rescheduled.
- **`starting_time`**: `string`, format: `date-time`

  The date and time when the meeting is scheduled to start.
- **`status`**: `string`, possible values: `"requested", "scheduled", "rescheduled", "completed", "canceled", "no_show"`

  The status of the booking event. Can be: requested, scheduled, rescheduled, completed, canceled, or no\_show
- **`subject`**: `string`

  The name of the service or subject as defined in the booking form.
- **`tracking_id`**: `string`

  A unique ID automatically assigned to every booking.
- **`virtual_conferencing`**: `object`

  The object containing information about the video conference in case of virtual meeting.
  - **`join_url`**: `string`

    The URL to join the video conference meeting.

<a id="scalar-example-54"></a>

**Generated example:**

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
  "external_calendar": {
    "type": "google",
    "name": "andrea.hartie@example.com",
    "id": "andrea.hartie@example.com",
    "event_id": "8kvu74dda8kcv0gmmlm3folrhc"
  },
  "ics_url": "https://oncehub.com/api/bookings/ics/62ad3bdd-a09f-dfbdffbef389-axs01j",
  "booking_calendar": "BKC-03WJV0R52Z",
  "cancel_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL/cancel",
  "reschedule_url": "https://oncehub.com/m/BKNG-3KM0HY2BF9SL",
  "payment_information": {
    "amount_charged": 5000,
    "currency": "USD",
    "transaction_id": "ch_1234567890ABCDEFGHIJ"
  },
  "custom_fields": [
    {
      "name": "discussion_points",
      "value": "Need support on new product"
    }
  ]
}
```

<a id="scalar-schema-bot"></a>

### Bot

**Type:** `object`

- **`id`**: `string`

  Unique alphanumeric identifier for the object. The prefix of the Bot ID is BOT-.
- **`name`**: `string`

  The name of the bot.
- **`object`**: `string`

  String representing the object's type. Objects of the same type share the same value. The value here is bot.

<a id="scalar-example-55"></a>

**Generated example:**

```json
{
  "id": "BOT-62774A40FB",
  "object": "bot",
  "name": "Sales Assistant Bot"
}
```

<a id="scalar-schema-website"></a>

### Website

**Type:** `object`

- **`id`**: `string`

  Unique alphanumeric identifier for the object. The prefix of the Website ID is WEB-.
- **`name`**: `string`

  The name of the website.
- **`object`**: `string`

  String representing the object's type. Objects of the same type share the same value. The value here is website.
- **`url`**: `string`, format: `uri`

  The URL of the website.

<a id="scalar-example-56"></a>

**Generated example:**

```json
{
  "id": "WEB-B1D45D12BB",
  "object": "website",
  "name": "Company Website",
  "url": "https://www.example.com"
}
```

<a id="scalar-schema-audience"></a>

### Audience

**Type:** `object`

- **`id`**: `string`

  Unique alphanumeric identifier for the object. The prefix of the Audience ID is AUD-.
- **`name`**: `string`

  The name of the audience.
- **`object`**: `string`

  String representing the object's type. Objects of the same type share the same value. The value here is audience.

<a id="scalar-example-57"></a>

**Generated example:**

```json
{
  "id": "AUD-123ABC456",
  "object": "audience",
  "name": "Enterprise Customers"
}
```

<a id="scalar-schema-conversation"></a>

### Conversation

**Type:** `object`

- **`answers`**: `array`

  Answers to the questions asked during the conversation.

  **Items:**
  - **`id`**: `string`

    Unique identifier for the interaction.
  - **`internal_label`**: `string | null`

    Internal label for the question.
  - **`question`**: `string`

    The question asked during the conversation.
  - **`value`**: `string`

    The answer provided by the contact.
- **`audience`**

  The audience associated with this conversation.

  **Expandable**: Use `expand=audience` to include the full Audience object.

  **One of:**
  - `string`

    Audience ID (when not expanded)
  - [Audience](#scalar-schema-audience)
  - `null`

    No audience associated
- **`bookings`**: `array of string`

  Bookings that are associated to the conversation.
- **`bot`**

  The bot that facilitated the conversation.

  **Expandable**: Use `expand=bot` to include the full Bot object.

  **One of:**
  - `string`

    Bot ID (when not expanded)
  - [Bot](#scalar-schema-bot)
- **`contact`**

  The contact / customer involved in this conversation.

  **Expandable**: Use `expand=contact` to include the full Contact object.

  **One of:**
  - `string`

    Contact ID (when not expanded)
  - [Contact](#scalar-schema-contact)
- **`creation_time`**: `string`, format: `date-time`

  The date and time the conversation was created.
- **`id`**: `string`

  Unique alphanumeric identifier for the object. The prefix of the Conversation ID is CVR-.
- **`initiated_by`**: `string`, possible values: `"bot", "contact"`

  Either bot (auto reach out) or contact (website visitor clicked on a CTA).
- **`last_interacted_time`**: `string`, format: `date-time`

  The date and time of the last conversation interaction.
- **`last_updated_time`**: `string`, format: `date-time`

  The date and time the conversation was last updated.
- **`object`**: `string`

  String representing the object's type. Objects of the same type share the same value. The value here is conversation.
- **`owner`**

  The owner (user object) of the conversation.

  **Expandable**: Use `expand=owner` to include the full User object.

  **One of:**
  - `string`

    User ID (when not expanded)
  - [User](#scalar-schema-user)
- **`status`**: `string`, possible values: `"started", "closed", "abandoned"`

  The status of the conversation. Can be one of the following:
  - `started` - The website visitor has responded with a first message and the conversation is active from this point.
  - `closed` - The conversation has been closed, this can be done by the conversation ending with a last message, or the visitor starting a different conversation.
  - `abandoned` - If there is no response from the visitor for more than 10 minutes the conversation is ended in an abandoned state.
- **`website`**

  The website this conversation was triggered on.

  **Expandable**: Use `expand=website` to include the full Website object.

  **One of:**
  - `string`

    Website ID (when not expanded)
  - [Website](#scalar-schema-website)

<a id="scalar-example-58"></a>

**Generated example:**

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

<a id="scalar-schema-utmparams"></a>

### UtmParams

**Type:** `object`

Object containing captured values for the 5 standard [UTM parameters](https://en.wikipedia.org/wiki/UTM_parameters).

- **`campaign`**: `string`

  Identifies a specific product promotion or strategic campaign
- **`content`**: `string`

  Identifies what specifically was clicked to bring the user to the site
- **`medium`**: `string`

  Identifies what type of link was used
- **`source`**: `string`

  Identifies which site sent the traffic
- **`term`**: `string`

  Identifies search terms

<a id="scalar-example-59"></a>

**Generated example:**

```json
{
  "source": "facebook",
  "medium": "social",
  "campaign": "webinar_signup",
  "term": "online+meeting+scheduler",
  "content": "logolink"
}
```

<a id="scalar-schema-bookingform"></a>

### BookingForm

**Type:** `object`

An object containing information about the guest

- **`array_custom_field`**: `array of string`

  A placeholder for a custom field that accepts multiple values. Replace `array_custom_field` with the mapped\_field\_name of your Multi-Select Picklist question. The value must be an array of strings.
- **`email`**: `string`

  Email of the guest
- **`name`**: `string`

  Name of the guest
- **`phone`**: `string`

  Phone of the guest
- **`string_custom_field`**: `string`

  A placeholder for a custom field that accepts a single text value. Replace `string_custom_field` with the `mapped_field_name` of your Text or Single-Select Picklist question.

<a id="scalar-example-60"></a>

**Generated example:**

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

<a id="scalar-schema-deletedobject"></a>

### DeletedObject

**Type:** `object`

- **`deleted` (required)**: `boolean`

  Whether the object was deleted
- **`id` (required)**: `string`

  ID of the deleted object

<a id="scalar-example-61"></a>

**Generated example:**

```json
{
  "id": "OBJ-123ABC",
  "deleted": true
}
```
