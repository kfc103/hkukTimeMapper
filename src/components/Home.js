import * as React from "react";
import "../styles.css";
import TimeTable from "./TimeTable";
import Box from "@mui/material/Box";
//import cityTimezones from "city-timezones";

export default function Home(props) {
  const { db, timezone1, timezone2 } = props;
  //const timezone1 = cityTimezones.findFromCityStateProvince("Hong Kong")[0];
  //const timezone2 = cityTimezones.findFromCityStateProvince(
  //  "United Kingdom Westminster London"
  //)[0];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }}
    >
      <TimeTable db={db} timezone1={timezone1} timezone2={timezone2} />
    </Box>
  );
}
