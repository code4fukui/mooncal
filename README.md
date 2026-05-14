# mooncal

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A web component that displays a full-year calendar with a visual representation of the moon's phase for each day.

## Demo

https://code4fukui.github.io/mooncal/

The demo page displays a full-year calendar. Each day cell shows the date number overlaid on a visual representation of the moon's phase for that day. A dropdown menu at the top allows you to switch to different years.

## Features

- Displays a full-year calendar grid.
- Shows the moon phase visually for each day.
- Allows users to select and switch between different years.
- Built with modern JavaScript modules and web components.

## Usage

To use `mooncal`, you need an HTML container and a script to instantiate the calendar and populate it with moon phases.

**HTML:**

```html
<!-- Add a container for the calendar -->
<main id="main"></main>
```

**JavaScript:**

```javascript
import { Day } from "https://code4fukui.github.io/day-es/Day.js";
import { CalendarView } from "https://code4fukui.github.io/calendar-view/calendar-view.js";
import { MoonAge } from "https://code4fukui.github.io/moon-age/moon-age.js";

// 1. Set the target year
const year = new Date().getFullYear();

// 2. Create and append the calendar view
const cal = new CalendarView(year);
document.getElementById("main").appendChild(cal);

// 3. Iterate through each day of the year to add the moon phase
for (let day = new Day(`${year}-01-01`); day.year == year; day = day.dayAfter(1)) {
  // Find the cell for the current day
  const div = cal.querySelector(".c" + day.toStringYMD());
  if (div) {
    // Create a MoonAge component
    const moonage = new MoonAge();
    moonage.setDate(day.toString()); // Set the date for the component

    // Style and append the moon phase as a background element
    div.style.position = "relative";
    moonage.style.position = "absolute";
    moonage.style.top = "0px";
    moonage.style.left = "0px";
    moonage.style.zIndex = -1; // Place it behind the date number
    div.appendChild(moonage);
  }
}
```

## Dependencies

- [moon-age](https://github.com/code4fukui/moon-age/): A web component for displaying the moon phase.
- [day-es](https://github.com/code4fukui/day-es/): A lightweight date utility library.
- [calendar-view](https://github.com/code4fukui/calendar-view/): A web component for rendering a yearly calendar grid.

## Attribution

The `moon-age.js` library is based on the work by akebi_mh.
- **Original Article:** [月齢と月の満ち欠けを表示 #JavaScript - Qiita](https://qiita.com/akebi_mh/items/b6a9c056d9198552e7b4)

## License

[MIT](LICENSE)