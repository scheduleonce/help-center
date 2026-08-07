---
title: Redirecting booking confirmation data
description: Send booking confirmation data to custom redirect pages via URL parameters after successful booking completion.
products:
  - oncehub
---

OnceHub allows you to send booking confirmation data to the redirect page via URL parameters. Every time a booking is successfully scheduled, the booking form submission data and information about the booking that was scheduled will be converted into key-value pairs (KVPs) and appended to the redirect URL.

This feature can be used to create a custom confirmation page, enable client-side integrations, or enrich customer data profiles, among other applications.

## Set up Automatic redirect with booking confirmation data

<Tabs groupId="product" queryString className="product-tabs">
  <TabItem value="booking-calendars" label="Booking Calendars [New]" default>

In order to send booking confirmation data to your redirect page, you must enable the **Automatic redirect** feature from the Redirect settings section of your Booking calendar:

1. Turn Automatic redirect to **ON**.
2. Enter the URL of your redirect page.
3. Click the checkbox to **Send booking confirmation data to redirect page**.
4. Click **Save** to apply these settings to your Booking calendar.

That's it! You have enabled redirecting booking confirmation data to your specified page via URL parameters.

  </TabItem>
  <TabItem value="booking-pages" label="Booking Pages [Classic]">

In order to send booking confirmation data to your redirect page, you must enable the [Automatic redirect](https://help.oncehub.com/help/automatic-redirect) feature from the Booking form and redirect section of your Event type or Booking page:

1. Turn Automatic redirect to **ON**.
2. Enter the URL of your redirect page.
3. Click the checkbox to **Send booking confirmation data to redirect page**.
4. Click **Save** to apply these settings to your Booking page.

That's it! You have enabled redirecting booking confirmation data to your specified page via URL parameters.

  </TabItem>
</Tabs>

## Example URL with booking confirmation data

<Tabs groupId="product" queryString className="product-tabs">
  <TabItem value="booking-calendars" label="Booking Calendars [New]" default>

The following is an example of a URL containing booking confirmation data that is sent to the redirect page:

```text
http://www.example.com/?booking_calendar=BKC-8D6NGQEM5G&subject=Meeting+with+Sales&status=scheduled&customer_timezone=Asia%2FKolkata&id=BKNG-2R5C3TQBX1PZ&creation_time=2025-07-17T10%3A17%3A10.765Z&starting_time=2025-07-18T11%3A00%3A00.000Z&name=Carrie+Customer&email=Carrie-Customer%40staticso2.com&company=Acme&meeting_reason=Product+Demo
```

  </TabItem>
  <TabItem value="booking-pages" label="Booking Pages [Classic]">

The following is an example of a URL containing booking confirmation data that is sent to the redirect page:

```text
http://www.example.com/?Name=John%20Smith&Email=johnsmith@example.com&subject=Example%20Subject&company=Example%20Company&phone=1-2025550195&note=I%20look%20forward%20to%20the%20meeting.&bookingPage=financial&creationTime=2018-04-25T05:08:18.843Z&meetingTime=2018-04-25T10:45:00.000Z&timeZone=Eastern%20time&utcOffset=-5
```

  </TabItem>
</Tabs>

## Booking confirmation data sent via URL parameters

Two types of booking confirmation data will be sent to your redirect page via URL parameters:

1. **Booking form submission data** - Customer information submitted to the booking form
2. **Booking data created when scheduling** - System-generated data about the booking

### Booking form submission data

Customer information submitted to the booking form will be added as URL parameters and sent to the custom confirmation page URL upon redirect. Any booking form field (including custom fields) for which the customer has submitted data will be added to the redirect URL. Empty booking form fields will not be added to the redirect URL.

<Tabs groupId="product" queryString className="product-tabs">
  <TabItem value="booking-calendars" label="Booking Calendars [New]" default>

The following table contains the parameter name and description of the fields sent:

| Parameter name        | Description                                                             |
| :-------------------- | :---------------------------------------------------------------------- |
| `name`                | The name provided by the customer in the booking form.                  |
| `email`               | The email provided by the customer in the booking form.                 |
| `phone`               | The phone number provided by the customer in the booking form.          |
| `<custom field name>` | The name of the user-defined custom field (uses the mapped field name). |

  </TabItem>
  <TabItem value="booking-pages" label="Booking Pages [Classic]">

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

  </TabItem>
</Tabs>

#### How are custom fields handled?

Custom fields for which the customer enters booking submission data will be added to the URL when booking confirmation data is sent to the redirect page.

<Tabs groupId="product" queryString className="product-tabs">
  <TabItem value="booking-calendars" label="Booking Calendars [New]" default>

The custom field parameter name is the **Mapped field name** as configured in your booking calendar's form settings.

  </TabItem>
  <TabItem value="booking-pages" label="Booking Pages [Classic]">

The custom field parameter name is the **Field name** as defined by the user (with spaces removed).

  </TabItem>
</Tabs>

### Booking data created when scheduling

Booking data that is created when a new booking is scheduled will be added as URL parameters and sent to the redirect page.

<Tabs groupId="product" queryString className="product-tabs">
  <TabItem value="booking-calendars" label="Booking Calendars [New]" default>

The following table contains the parameter name and description of the fields sent:

| Parameter name      | Description                                                     |
| :------------------ | :-------------------------------------------------------------- |
| `booking_calendar`  | The ID of the booking calendar used to make the booking.        |
| `id`                | The unique ID of the booking.                                   |
| `subject`           | The subject of the booking calendar.                            |
| `status`            | The status of the booking (e.g., scheduled).                    |
| `creation_time`     | The date and time when the booking was created, in UTC.         |
| `starting_time`     | The starting date and time of the booking, in UTC.              |
| `customer_timezone` | The time zone selected by the customer when making the booking. |

  </TabItem>
  <TabItem value="booking-pages" label="Booking Pages [Classic]">

The following table contains the parameter name and description of the fields sent:

| Parameter name | Description                                                               |
| :------------- | :------------------------------------------------------------------------ |
| `bookingPage`  | The customer-facing name of the booking page used to make the booking.    |
| `subject`      | The name of the service or subject as defined in the booking form.        |
| `creationTime` | The date and time when the booking was created, in UTC.                   |
| `meetingTime`  | The starting date and time, in the booking page time zone.                |
| `timeZone`     | The time zone of the booking page as defined in the Availability section. |
| `utcOffset`    | The UTC offset of the booking page time zone, in integer.                 |

  </TabItem>
</Tabs>

## Constraints

The following constraints are important to keep in mind when redirecting booking confirmation data:

- Booking confirmation data will only be sent to the redirect page when a booking is scheduled (not canceled, rescheduled, or reassigned).
- OnceHub does not impose length limits for fields passed in the redirect URL. If the length of the query string exceeds the URL character limit, the URL will be truncated and some data may not be sent.

<Tabs groupId="product" queryString className="product-tabs">
  <TabItem value="booking-calendars" label="Booking Calendars [New]" default>

All datetime values are sent in ISO 8601 format in UTC.

  </TabItem>
  <TabItem value="booking-pages" label="Booking Pages [Classic]">

Booking confirmation data will not be sent to the redirect page if you are using a CRM record ID to [skip or prepopulate the booking form](https://help.oncehub.com/help/prepopulated-booking-forms), because this data is encrypted.

  </TabItem>
</Tabs>
