import * as React from "react";
import "../styles.css";
import TimeTable from "./TimeTable";
import Box from "@mui/material/Box";

export default function Home(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }}
    >
      <TimeTable
        db={props.db}
        timezone1={props.timezone1}
        timezone2={props.timezone2}
      />
    </Box>
  );
}
