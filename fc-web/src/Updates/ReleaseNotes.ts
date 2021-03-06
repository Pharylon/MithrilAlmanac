export interface Release{
  version: string;
  items: string[];
}

const ReleaseNotes: Release[] = [
  {
    version: "0.4",
    items: [
      "Leap Year Customization",
    ],
  },
  {
    version: "0.5",
    items: [
      "A new look. We hope you like it!",
      "A better color picker for moon colors!",
      "Set the current date, not just the year! It will appear on the calendar as a light green color",
      "Set day of the week that 1/1/0001 started on (date offset)",
    ],
  },
  {
    version: "0.6",
    items: [
      "Improved Timeline view",
    ],
  },
  {
    version: "0.7",
    items: [
      "Try out the new \"Condensed View\" to still see the calendar, but remove unnecessary months",
      "Set your calendar's default view type in the Calendar Edit screen!",
    ],
  },
  {
    version: "1.0",
    items: [
      "When creating a new event, check \"Current Date\" to make that event the current day for the calendar without having to go into the Calendar settings.",
    ],
  },
];

export default ReleaseNotes;
