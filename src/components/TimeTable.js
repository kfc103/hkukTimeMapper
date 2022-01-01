import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import moment from "moment-timezone";
import pluralize from "pluralize";
import { blue, green, grey } from "@mui/material/colors";
import { useWindowDimensions } from "./WindowDimensions";
import TimezoneFinder from "./TimezoneFinder";

const thBackgroundColor = blue[50];
const daySame = (t1, t2) => {
  return t1.format("YYYYMMDD") === t2.format("YYYYMMDD") ? "" : "+1";
};

const getCellStyle = (t) => {
  if (isWorkingHour(t)) return green[100];
  else if (isSleepingHour(t)) return grey[200];
};

const isSleepingHour = (t) => {
  if (t <= "0700" || t >= "2300") return true;
  else return false;
};

const isWorkingHour = (t) => {
  if (t >= "0900" && t <= "1800") return true;
  else return false;
};

export default function TimeTable(props) {
  const [now, setNow] = React.useState(moment());
  const { height } = useWindowDimensions();
  const rows = [];
  const tempNow = moment().startOf("hour");
  const [thHeight, setThHeight] = React.useState(0);
  const ref = React.useRef(null);
  const [timezone1, setTimezone1] = React.useState(props.timezone1);
  const [timezone2, setTimezone2] = React.useState(props.timezone2);

  tempNow.add(1, "hours");
  for (let i = 1; i <= 24; i++) {
    rows[i] = {
      id: i,
      delayedHour: i,
      tz1Time: timezone1 ? tempNow.tz(timezone1.timezone).format("HH:mm") : "",
      tz1NextDay: timezone1
        ? daySame(tempNow.tz(timezone1.timezone), now.tz(timezone1.timezone))
        : "",
      tz2Time: timezone2 ? tempNow.tz(timezone2.timezone).format("HH:mm") : "",
      tz2NextDay: timezone2
        ? daySame(tempNow.tz(timezone2.timezone), now.tz(timezone2.timezone))
        : ""
    };
    tempNow.add(1, "hours");
  }

  React.useEffect(() => {
    setThHeight(ref.current.clientHeight);

    const interval = setInterval(() => {
      setNow(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, [now]);

  React.useEffect(() => {
    console.log("TimeTable useEffect");
    setTimezone1(props.timezone1);
    setTimezone2(props.timezone2);
  }, [props]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          sx={{ minWidth: 300 }}
          aria-label="simple table"
          size="small"
        >
          <TableHead ref={ref}>
            <TableRow>
              <TableCell sx={{ backgroundColor: thBackgroundColor }} />
              <TableCell
                align="center"
                sx={{ backgroundColor: thBackgroundColor, width: "35vw" }}
              >
                <TimezoneFinder
                  db={props.db}
                  timezone={1}
                  name={timezone1 ? timezone1.city : "Select a city"}
                  code={timezone1 ? timezone1.iso2 : ""}
                  setTimezone={setTimezone1}
                />
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: thBackgroundColor, width: "35vw" }}
              >
                <TimezoneFinder
                  db={props.db}
                  timezone={2}
                  name={timezone2 ? timezone2.city : "Select a city"}
                  code={timezone2 ? timezone2.iso2 : ""}
                  setTimezone={setTimezone2}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{ backgroundColor: thBackgroundColor }}
              >
                Date
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: thBackgroundColor }}
              >
                {timezone1
                  ? now.tz(timezone1.timezone).format("D MMM (ddd)")
                  : ""}
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: thBackgroundColor }}
              >
                {timezone2
                  ? now.tz(timezone2.timezone).format("D MMM (ddd)")
                  : ""}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{ backgroundColor: thBackgroundColor }}
              >
                Time
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: thBackgroundColor }}
              >
                {timezone1 ? now.tz(timezone1.timezone).format("HH:mm:ss") : ""}
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: thBackgroundColor }}
              >
                {timezone2 ? now.tz(timezone2.timezone).format("HH:mm:ss") : ""}
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} sx={{ maxHeight: height - thHeight }}>
        <Table
          stickyHeader
          sx={{ minWidth: 300 }}
          aria-label="simple table"
          size="small"
        >
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">
                  {pluralize("hour", row.delayedHour, true) + ` later`}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: getCellStyle(row.tz1Time),
                    width: "35vw"
                  }}
                >
                  {row.tz1Time + " "}
                  <Typography variant="caption">{row.tz1NextDay}</Typography>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: getCellStyle(row.tz2Time),
                    width: "35vw"
                  }}
                >
                  {row.tz2Time + " "}
                  <Typography variant="caption">{row.tz2NextDay}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
