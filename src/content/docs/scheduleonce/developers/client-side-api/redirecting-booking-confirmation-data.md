---
title: Redirecting booking confirmation data (Classic)
oldUrl: "https://developers.oncehub.com/docs/client-side-api/redirecting-booking-confirmation-data/"
description: Send booking confirmation data from Booking Pages (Classic) to custom redirect pages via URL parameters after successful booking completion.
products:
  - scheduleonce
---

ScheduleOnce allows you to send booking confirmation data to the redirect page via URL parameters. Every time a booking is successfully scheduled, the booking form submission data and information about the booking that was scheduled will be converted into key-value pairs (KVPs) and appended to the redirect URL.

This feature can be used to create a custom confirmation page, enable client-side integrations, or enrich customer data profiles, among other applications.

## Set up Automatic redirect with booking confirmation data

In order to send booking confirmation data to your redirect page, you must enable the [Automatic redirect](/scheduleonce/event-types-booking-pages/booking-forms-redirect/automatic-redirect/) feature from the Booking form and redirect section of your Event type or Booking page:

1. Turn Automatic redirect to **ON**.
2. Enter the URL of your redirect page.
3. Click the checkbox to **Send booking confirmation data to redirect page**.
4. Click **Save** to apply these settings to your Booking page.

That's it! You have enabled redirecting booking confirmation data to your specified page via URL parameters.

## Example URL with booking confirmation data

The following is an example of a URL containing booking confirmation data that is sent to the redirect page:

```text
http://www.example.com/?Name=John%20Smith&Email=johnsmith@example.com&subject=Example%20Subject&company=Example%20Company&phone=1-2025550195&note=I%20look%20forward%20to%20the%20meeting.&bookingPage=financial&creationTime=2018-04-25T05:08:18.843Z&meetingTime=2018-04-25T10:45:00.000Z&timeZone=Eastern%20time&utcOffset=-5
```

## Booking confirmation data sent via URL parameters

Two types of booking confirmation data will be sent to your redirect page via URL parameters:

1. **Booking form submission data** - Customer information submitted to the booking form
2. **Booking data created when scheduling** - System-generated data about the booking

### Booking form submission data

Customer information submitted to the booking form will be added as URL parameters and sent to the custom confirmation page URL upon redirect. Any booking form field (including custom fields) for which the customer has submitted data will be added to the redirect URL. Empty booking form fields will not be added to the redirect URL.

The following table contains the parameter name and description of the fields sent:

| Parameter name        | Description                                                           |
| :-------------------- | :-------------------------------------------------------------------- |
| `Name`                | The name provided by the customer in the booking form.                |
| `Email`               | The email provided by the customer in the booking form.               |
| `company`             | The company provided by the customer in the booking form.             |
| `mobile`              | The mobile phone number provided by the customer in the booking form. |
| `phone`               | The phone number provided by the customer in the booking form.        |
| `note`                | The note provided by the customer in the booking form.                |
| `customerGuests`      | List of additional attendees (emails) invited by the customer.        |
| `location`            | The location of the meeting.                                          |
| `<custom field name>` | The name of the user-defined custom field.                            |

#### How are custom fields handled?

Custom fields for which the customer enters booking submission data will be added to the URL when booking confirmation data is sent to the redirect page.

The custom field parameter name is the **Field name** as defined by the user (with spaces removed).

### Booking data created when scheduling

Booking data that is created when a new booking is scheduled will be added as URL parameters and sent to the redirect page.

The following table contains the parameter name and description of the fields sent:

| Parameter name | Description                                                               |
| :------------- | :------------------------------------------------------------------------ |
| `bookingPage`  | The customer-facing name of the booking page used to make the booking.    |
| `subject`      | The name of the service or subject as defined in the booking form.        |
| `creationTime` | The date and time when the booking was created, in UTC.                   |
| `meetingTime`  | The starting date and time, in the booking page time zone.                |
| `timeZone`     | The time zone of the booking page as defined in the Availability section. |
| `utcOffset`    | The UTC offset of the booking page time zone, in integer.                 |

## Constraints

The following constraints are important to keep in mind when redirecting booking confirmation data:

- Booking confirmation data will only be sent to the redirect page when a booking is scheduled (not canceled, rescheduled, or reassigned).
- OnceHub does not impose length limits for fields passed in the redirect URL. If the length of the query string exceeds the URL character limit, the URL will be truncated and some data may not be sent.
- Booking confirmation data will not be sent to the redirect page if you are using a CRM record ID to [skip or prepopulate the booking form](/scheduleonce/sharing-publishing/personalized-links/personalizing-with-dynamic-crm-record-ids/), because this data is encrypted.
