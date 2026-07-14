---
title: Collecting data from an embedded Booking page
description: Collect booking confirmation data from embedded Booking Pages using the SOAfterConfirmationFunction JavaScript callback.
products:
  - oncehub
  - scheduleonce
---

# Collecting data from an embedded Booking page

:::info[Booking Pages (Classic) Only]
This documentation applies to **Booking Pages (Classic)** only. For the modern Booking Calendars implementation, see [Embedded booking events](/scheduleonce/developers/client-side-api/embedded-booking-calendar-events).
:::

## Collect data from an embedded Booking page with JavaScript

OnceHub allows you to collect booking confirmation data from an embedded Booking page by adding a JavaScript function alongside the embed code in your website. The JavaScript function is executed every time a booking is successfully scheduled in your embedded Booking page. When the function executes, a JSON data payload object containing booking confirmation data is sent to the parent page (the page in which the scheduling pane is embedded).

This feature can be used to create a custom confirmation page, enable client-side integrations, or enrich customer data profiles.

## Set up data collection from an embedded Booking page

In order to start collecting data from an embedded Booking page, you must first publish your Booking page using [Website embed](https://help.oncehub.com/help/website-embed). You can do this from the **ScheduleOnce > Share & Publish** section of your account. Simply copy the embed code generated for your selected Booking page, and paste it into your web page.

To implement the JavaScript data collection function, follow these steps:

1. Implement the `SOAfterConfirmationFunction()` function by pasting the code into the page in which your scheduling pane is embedded (the parent page). It is recommended to paste this function before the Booking page embed code, because the interpreters of some browsers do not support calling undefined functions.
2. Define the parameter name you wish the function to call (this will be the name of the JSON object returned when the function executes, containing customer booking data). The function takes one parameter.
3. Implement the logic you wish to apply to the returned JSON object.

The following is an example code snippet showing the implementation of the `SOAfterConfirmationFunction()` function and an embedded Booking page:

```html
<script>
  function SOAfterConfirmationFunction(data) {
    // logic using the data object passed to the function
  }
</script>

<!-- ScheduleOnce embed START -->
<div
  id="SOIDIV_dana"
  data-so-page="dana"
  data-height="550"
  data-style="border: 1px solid #d8d8d8; min-width: 290px; max-width: 900px;"
  data-psz="00"
></div>
<script
  type="text/javascript"
  src="https://cdn.oncehub.com/mergedjs/so.js"
></script>
<!-- ScheduleOnce embed END -->
```

Now your embedded Booking page will send customer data to the parent page every time a booking is scheduled.

## Booking confirmation data payload

The following is an example of the booking confirmation data object returned when the `SOAfterConfirmationFunction()` is executed. The function is executed when a booking is successfully made in an embedded scheduling pane, and the object containing booking data is sent to the parent page (the page in which the scheduling pane is embedded).

The JSON object contains the following booking information represented by key-value pairs:

- Customer name
- Customer phone number
- Customer email
- Event type name
- Meeting times - UTC, customer time zone, and booking page time zone
- Cancel/Reschedule link
- Customer note
- Calendar event files - ICS and VCS
- Error status and error codes (if relevant)

### Sample payload

```json
{
  "errorStatus": 0,
  "bookingInfo": {
    "Version": "7.35",
    "MeetingTimes": [
      {
        "UTCTime": "2018-04-25T06:45:00",
        "CustomerTime": "2018-04-25T07:45:00",
        "SOTime": "2018-04-25T09:45:00"
      }
    ],
    "CancelRescheduleLink": "https://go.oncehub.com/dana?Params=IPLa6BkbZ-TXI0R*B2fXy8foErRlIIiq*-zghumtdE2JkL5lnKoWCA!!",
    "Note": "I look forward to the meeting.",
    "CalendarEvent": {
      "ICS": "https://app.oncehub.com/scheduleonce/download.aspx?mid=%2fHCb2uQ9jCMYtd1a%2fd9B1Q%3d%3d&type=1",
      "VCS": "https://app.oncehub.com/scheduleonce/download.aspx?mid=%2fHCb2uQ9jCMYtd1a%2fd9B1Q%3d%3d&type=3"
    },
    "statusCode": "1",
    "Message": null,
    "CustomerName": "John Smith",
    "CustomerEmail": "johnsmith@example.com",
    "CustomerPhone": "1-2025550195",
    "EventTypeName": "Automatic booking - 15-minute meeting"
  }
}
```

### Payload fields

The JSON object returned to the parent page upon execution of the `SOAfterConfirmationFunction()` function contains an error status (0 = function executed successfully; 1 = function did not execute successfully) and booking information. The following table describes the fields included in the `bookingInfo` payload:

| Field                       | Type       | Description                                                                                                                        |
| :-------------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `Version`                   | _string_   | Payload version                                                                                                                    |
| `MeetingTimes.UTCTime`      | _datetime_ | The starting date and time, in UTC.                                                                                                |
| `MeetingTimes.CustomerTime` | _datetime_ | The starting date and time, in the customer time zone.                                                                             |
| `MeetingTimes.SOTime`       | _datetime_ | The starting date and time, in the booking page time zone.                                                                         |
| `CancelRescheduleLink`      | _url_      | The cancel/reschedule link sent to the customer.                                                                                   |
| `Note`                      | _string_   | The note provided by the customer in the booking form.                                                                             |
| `CalendarEvent.ICS`         | _url_      | Files that can be downloaded and added to a calendar event.                                                                        |
| `CalendarEvent.VCS`         | _url_      | Files that can be downloaded and added to a calendar event.                                                                        |
| `statusCode`                | _string_   | Error status: "1" = success; "0" = invalid request. Data can be accessed for a particular meeting only once from this API request. |
| `Message`                   | _string_   | Error message. For a server error: "Something went wrong on server". All other cases return "null".                                |
| `CustomerName`              | _string_   | The name provided by the customer in the booking form.                                                                             |
| `CustomerEmail`             | _string_   | The email provided by the customer in the booking form.                                                                            |
| `CustomerPhone`             | _string_   | The phone number provided by the customer in the booking form.                                                                     |
| `EventTypeName`             | _string_   | The name of the service selected by the customer.                                                                                  |

## Constraints

The following constraints are important to keep in mind when implementing the data collection JavaScript function in your embedded Booking page:

- The function will only execute when a booking is scheduled (not canceled, rescheduled, or reassigned).
- The function is available for use with Booking pages published via Website embed only (not for Website button, Website widget, or stand-alone Booking pages).
- For security and privacy reasons, this function does not execute when your OnceHub account is integrated with a CRM and you are using the CRM record ID to [skip or pre-populate the Booking form](https://help.oncehub.com/help/prepopulated-booking-forms).
