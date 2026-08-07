---
title: Dynamic Co-Host Selection
description: Add checkboxes that update an embedded OnceHub calendar to include co-hosts.
products:
  - oncehub
---

This recipe shows how to dynamically update the OnceHub Booking Calendar to show availability for specific team members based on user-selected checkboxes at runtime. It’s useful when you want guests to pick one or more team members and only show availability for the chosen co‑hosts.

## Prerequisites

- A primary OnceHub Booking Calendar, which determines the meeting's base configuration, defining the duration, location, and meeting type. Additional team members are appended as co-hosts via the `co_hosts` parameter.
- Each team member must have an active seat and configured availability within OnceHub.
- A list of team member email addresses (exactly as configured in OnceHub) to map to your HTML checkbox values.
- The standard OnceHub embed script integrated into your host page.

## Example HTML

This implementation uses a list of checkboxes to dynamically update the Booking Calendar by appending the `co_hosts` parameter to the iframe URL. The JavaScript listens for selection changes and refreshes the iframe content in real-time.

```html
<div
  class="booking-controls"
  style="margin-bottom: 20px; font-family: sans-serif;"
>
  <h3>Select Team Members</h3>
  <p style="font-size: 14px; color: #666;">
    Choose who you would like to meet with:
  </p>

  <div
    id="team-selector-container"
    style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;"
  >
    <label
      style="display: flex; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer;"
    >
      <input
        type="checkbox"
        class="oncehub-cohost-checkbox"
        value="team.member1@example.com"
        style="margin-right: 10px;"
      />
      <span>Team Member A</span>
    </label>

    <label
      style="display: flex; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer;"
    >
      <input
        type="checkbox"
        class="oncehub-cohost-checkbox"
        value="team.member2@example.com"
        style="margin-right: 10px;"
      />
      <span>Team Member B</span>
    </label>
  </div>
</div>

<div
  id="oncehub-embed-wrapper"
  style="border: 1px solid #eee; border-radius: 12px; overflow: hidden;"
>
  <div
    id="oncehub-target-div"
    data-oh-booking-calendar-id="YOUR-BOOKING-CALENDAR-ID"
    style="min-width:320px; height:700px;"
  ></div>

  <script
    type="text/javascript"
    src="https://cdn.oncehub.com/cal/embed.js"
    async
  ></script>
</div>

<script>
  (function () {
    const wrapper = document.getElementById("oncehub-embed-wrapper");
    const checkboxes = document.querySelectorAll(".oncehub-cohost-checkbox");
    let baseIframeSrc = null;

    /**
     * Helper to find the iframe injected by OnceHub
     */
    function findOnceHubIframe() {
      return wrapper.querySelector("iframe");
    }

    /**
     * Updates the Calendar URL with selected co-hosts
     */
    function refreshCalendar() {
      const iframe = findOnceHubIframe();
      if (!iframe) return;

      // Store the original source on first run to preserve default parameters
      if (!baseIframeSrc) {
        baseIframeSrc = iframe.src;
      }

      // Gather all checked emails
      const selectedEmails = Array.from(checkboxes)
        .filter((cb) => cb.checked)
        .map((cb) => cb.value);

      // Construct new URL using the URL API
      const url = new URL(baseIframeSrc);

      if (selectedEmails.length > 0) {
        // Append co_hosts as a comma-separated list
        url.searchParams.set("co_hosts", selectedEmails.join(","));
      } else {
        // Remove parameter to show default availability
        url.searchParams.delete("co_hosts");
      }

      // Setting the src triggers the iframe to reload with new availability
      iframe.src = url.toString();
    }

    // Attach event listeners to all checkboxes
    checkboxes.forEach((cb) => {
      cb.addEventListener("change", refreshCalendar);
    });

    /**
     * WATCHDOG: OnceHub loads its iframe asynchronously.
     * We observe the wrapper to detect when the iframe is injected.
     */
    const observer = new MutationObserver((mutations, obs) => {
      const iframe = findOnceHubIframe();
      if (iframe) {
        baseIframeSrc = iframe.src;
        console.log("OnceHub Widget initialized.");
        obs.disconnect(); // Stop observing once the reference is captured
      }
    });

    observer.observe(wrapper, { childList: true, subtree: true });
  })();
</script>
```

:::info
The code below uses a placeholder. Replace YOUR-BOOKING-CALENDAR-ID with your actual booking calendar ID to initialize the embed correctly. Ensure the custom script is placed after the OnceHub embed script so the target container is available in the DOM.
:::

## How It Works

1. **Capture Base State:** The script identifies the OnceHub iframe and saves its initial URL.
2. **Filter Logic:** When a user toggles a checkbox, the script aggregates the selected email addresses.
3. **URL Update:** The `co_hosts` query parameter is appended to the iframe URL, triggering an automatic refresh of the calendar with filtered availability.

## Tips

- **Case Sensitivity:** While the email address itself is not case-sensitive, the `co_hosts` parameter and checkbox `value` attributes are. Ensure these exactly match the OnceHub user's email; if the case or spelling is incorrect, the parameter will be ignored.
- **Asynchronous Loading:** Because the OnceHub script injects the iframe asynchronously, the script includes a safety check (if (!iframe)) to ensure the calendar is present before attempting an update.
- **URL Integrity:** The script uses a `baseIframeSrc` variable to store the original URL. This prevents query parameters from "stacking" or duplicating during multiple selections.
- **Availability Logic:** Selecting multiple `co_hosts` will only display time slots where all chosen team members are simultaneously free.

---

See also:

- [Embedding a calendar](../client-side-api/embedded-booking-calendar-events.md)
