---
sidebar:
  order: 3
title: Error Handling
description: Handle API errors effectively with standard HTTP status codes, error types, and detailed error messages for troubleshooting.
products:
  - scheduleonce
---

# Errors

## Overview of error responses

ScheduleOnce uses conventional [HTTP response codes](https://httpstatuses.com/) to indicate the success or failure of an API request.

Successful requests are given status codes in the `2xx` range, while unsuccessful requests have status codes in the `4xx` or `5xx` range.

`4xx` codes indicate an error that failed given the information provided (e.g., an invalid parameter, object not found, etc.); `5xx` codes indicate an error with ScheduleOnce servers.

## Error structure

| Field     | Type     | Description                                                                      |
| :-------- | :------- | :------------------------------------------------------------------------------- |
| `type`    | _string_ | The type of error returned. See the list below for the possible types of errors. |
| `message` | _string_ | A human-readable message providing more details about the error.                 |
| `param`   | _string_ | If the error is parameter-specific, the parameter related to the error.          |

The API returns error responses in JSON format, with the following structure:

```json
{
  "type": "error_type",
  "message": "Human-readable error description",
  "param": "parameter_name"
}
```

## Error types

Error responses are categorized into four different types, corresponding to the following situations:

| Type                    | Description                                                                                                                                                                                          |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authentication_error`  | The server could not authenticate your request. Check to make sure you have entered a valid API key in the correct format, in the `API-Key` header.                                                  |
| `invalid_request_error` | One or more of the input parameters is not valid. Check that you have entered the correct values for all required parameters. URLs must be entered in full, and they must use the `https://` prefix. |
| `rate_limit_error`      | The amount of API requests per second has exceeded the allowed amount.                                                                                                                               |
| `api_error`             | There was an error on the OnceHub servers.                                                                                                                                                           |

## Error messages

In addition to the standard HTTP codes and error type specified in the table above, each error response includes a human-readable message that provides additional details that can help you troubleshoot why the request failed.

Here are a few examples:

```json title="404 Not Found"
{
  "type": "invalid_request_error",
  "message": "No such booking: '123'",
  "param": "id"
}
```

```json title="409 Conflict"
{
  "type": "invalid_request_error",
  "message": "A webhook subscription with this name already exists: 'New Bookings'",
  "param": "name"
}
```

```json title="429 Too Many Requests"
{
  "type": "rate_limit_error",
  "message": "Request rate limit exceeded"
}
```
