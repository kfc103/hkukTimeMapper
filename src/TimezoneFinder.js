import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import cityTimezones from "city-timezones";

//const cityLookup = cityTimezones.findFromCityStateProvince(input);
//console.log(cityLookup);
//const cityMapping = cityTimezones.cityMapping;
//console.log(cityMapping);

export default function TimezoneFinder() {
  const [input, setInput] = React.useState("h");
  const [cityLookup, setCityLookup] = React.useState(
    cityTimezones.findFromCityStateProvince(input)
  );

  const handleInput = (e) => {
    setInput(e.target.value);
    setCityLookup(cityTimezones.findFromCityStateProvince(e.target.value));
    console.log(cityLookup);
  };

  return (
    <Box>
      <TextField
        label="Choose a country"
        value={input}
        onChange={handleInput}
      />
    </Box>
  );
}
