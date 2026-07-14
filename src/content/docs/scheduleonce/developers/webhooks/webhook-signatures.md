---
title: Webhook Signatures
description: Verify the events that OnceHub sends to your webhook endpoints.
products:
  - oncehub
  - scheduleonce
---

OnceHub can sign all webhook events sent to your endpoints with a signature. This signature appears in each event's `Oncehub-Signature` header. It allows you to verify that the events were sent by OnceHub rather than a third party.

Before you can verify signatures, you need to retrieve your endpoint's secret from your OnceHub dashboard's webhooks settings in the [Webhook & API integration section](https://app.oncehub.com/integrations/api). Find the relevant webhook and click _View secret_.

OnceHub generates a unique secret key for each endpoint separately. If the webhook was created in v2 of the API, each event will be signed with the secret. If you don't see the _View secret_ option, this means you are using v1 of the API. Any new endpoints will be created using v2.

## Verifying Signatures

The `Oncehub-Signature` header included in each signed webhook event contains a timestamp and a signature. The timestamp is prefixed by `t=`, and the signature is prefixed `s=`:

```
t=1611144604,s=22b3f46eed16d8a41b492334b626dcf04aca47232102208e2d3424051402adcc
```

OnceHub generates signatures using a hash-based message authentication code ([HMAC](https://en.wikipedia.org/wiki/Hash-based_message_authentication_code)) with [SHA-256](https://en.wikipedia.org/wiki/SHA-2).

#### Step 1: Extract the Timestamp and Signatures from the Header

Split the header, using the `,` character as the separator, to get a list of elements. Next, split each element, using the `=` character as the separator, to get a prefix and value pair.

The value for the prefix `t` corresponds to the timestamp and `s` corresponds to the signature

#### Step 2: Prepare the `signed_payload` String

The `signed_payload` string is created by concatenating:

- The timestamp (as a string)
- The character `.`
- The actual JSON payload (i.e., the request body)

For example:

```
1611144604.{"id":"EVNT-2AB8RJY3LF","object":"event","creation_time":"2021-01-20T12:10:03.140Z","type":"booking.scheduled","api_version":"v2","data":{"object":"booking","id":"BKNG-YNMGHKQ24XV5","tracking_id":"BKNG-YNMGHKQ24XV5","subject":"15-minute meeting","status":"scheduled","in_trash":false,"creation_time":"2021-01-20T12:10:02.487Z","starting_time":"2021-01-20T16:45:00.000Z","last_updated_time":"2021-01-20T12:10:02.753Z","owner":{"id":"USR-YX0J4ANZTV","object":"user","first_name":"Michael","last_name":"","email":"michael@example.com","status":"active"},"duration_minutes":15,"virtual_conferencing":{"join_url":""},"location_description":"","rescheduled_booking_id":"","cancel_reschedule_information":{"reason":"","actioned_by":"","user_id":""},"form_submission":{"name":"Carrie","email":"carrie@customer.com","phone":"","mobile_phone":"","note":"","company":"","guests":[],"custom_fields":[]},"booking_page":{"id":"BP-L5SMQPFA1V","object":"booking_page","name":"Michael ","label":"Michael4","url":"https://go.oncehub.com/Michael4","active":true},"master_page":null,"event_type":{"id":"ET-E8DL20JT5U","object":"event_type","name":"15-minute meeting","description":""},"external_calendar":{"type":"none","name":"","id":"","event_id":""}}}
```

:::warning
Don't apply any formatting on the request body payload; take it as it is. If you apply formatting, it will add white-space characters that will result in a wrong signature construction.
:::

#### Step 3: Determine the Expected Signature

Compute an HMAC with the SHA256 hash function. Use the endpoint’s signing secret as the key, and use the `signed_payload` string as the message.

```javascript Node.js
const crypto = require("crypto");

const toBeSignedPayload = time + "." + body;
const expected = crypto
  .createHmac("sha256", secret)
  .update(toBeSignedPayload)
  .digest("hex");
```

```csharp
using System;
using System.Security.Cryptography;
using System.Text;

class MainClass {
  public static void Main (string[] args) {
    string toBeSignedPayload = timestamp + "." + body;

    Encoding encoding = new UTF8Encoding();
    byte[] secretBytes = encoding.GetBytes(secret);
    byte[] messageBytes = encoding.GetBytes(toBeSignedPayload);
    HMACSHA256 cryptographer = new HMACSHA256(secretBytes);

    byte[] expectedBytes = cryptographer.ComputeHash(messageBytes);

    string expected = BitConverter.ToString(expectedBytes).Replace("-", "").ToLower();

    Console.WriteLine(expected);

  }
}
```

#### Step 4: Compare the Signatures

Compare the signature in the header to the expected signature. For an equality match, compute the difference between the current timestamp and the received timestamp, then decide if the difference is within your tolerance.
