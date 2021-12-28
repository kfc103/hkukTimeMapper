import * as React from "react";
import NativeSelect from "@mui/material/NativeSelect";

export default function TimezoneSelector(props) {
  return (
    <NativeSelect
      inputProps={{
        id: props.id,
        value: props.value,
        onChange: props.onChange
      }}
    >
      {countries.map((country) => (
        <optgroup label={country.country}>
          {country.timezones.map((timezone) => (
            <option value={timezone.id}>{timezone.label}</option>
          ))}
        </optgroup>
      ))}
    </NativeSelect>
  );
}

const countries = [
  {
    country: "Hong Kong",
    timezones: [{ id: "Asia/Hong_Kong", label: "Hong Kong" }]
  },
  {
    country: "United Kingdom",
    timezones: [{ id: "Europe/London", label: "London" }]
  },
  {
    country: "Canada",
    timezones: [
      { id: "Canada/Atlantic", label: "CA - Atlantic" },
      { id: "Canada/Central", label: "CA - Central" },
      { id: "Canada/Eastern", label: "CA - Eastern" },
      { id: "Canada/Mountain", label: "CA - Mountain" },
      { id: "Canada/Newfoundland", label: "CA - Newfoundland" },
      { id: "Canada/Pacific", label: "CA - Pacific" },
      { id: "Canada/Saskatchewan", label: "CA - Saskatchewan" },
      { id: "Canada/Yukon", label: "CA - Yukon" }
    ]
  }
];
