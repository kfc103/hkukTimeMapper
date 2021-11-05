import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import Emoji from "a11y-react-emoji";
import moment from "moment-timezone";
import pluralize from "pluralize";
import { green, grey } from "@mui/material/colors";

const daySame = (t1, t2) => {
  return t1.format("YYYYMMDD") === t2.format("YYYYMMDD") ? "" : "+1";
};

const getCellStyle = (t) => {
  console.log(t);
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

export default function TimeTable() {
  const [now, setNow] = React.useState(moment());
  const [value, setValue] = React.useState(1);

  const rows = [];
  const tempNow = moment().startOf("hour");

  tempNow.add(value, "hours");
  for (let i = value; i < value + 24; i++) {
    rows[i] = {
      id: i,
      delayedHour: i,
      hkTime: tempNow.tz("Asia/Hong_Kong").format("HH:mm"),
      hkDaySame: daySame(
        tempNow.tz("Asia/Hong_Kong"),
        now.tz("Asia/Hong_Kong")
      ),
      ukTime: tempNow.tz("Europe/London").format("HH:mm"),
      ukDaySame: daySame(tempNow.tz("Europe/London"), now.tz("Europe/London"))
    };
    tempNow.add(1, "hours");
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, [now]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TableContainer component={Paper}>
      <Table
        stickyHeader
        sx={{ minWidth: 300 }}
        aria-label="simple table"
        size="small"
      >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">
              <Emoji symbol="🇭🇰" label="hk-flag" /> HK
            </TableCell>
            <TableCell align="center">
              <Emoji symbol="🇬🇧" label="uk-flag" /> UK
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Current Date
            </TableCell>
            <TableCell align="right">
              {now.tz("Asia/Hong_Kong").format("Do MMM YYYY")}
            </TableCell>
            <TableCell align="right">
              {now.tz("Europe/London").format("Do MMM YYYY")}
            </TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Current Time
            </TableCell>
            <TableCell align="right">
              {now.tz("Asia/Hong_Kong").format("h:mm:ss a")}
            </TableCell>
            <TableCell align="right">
              {now.tz("Europe/London").format("h:mm:ss a")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Offset Hour(s)</TableCell>
            <TableCell colSpan={2} align="right">
              <Slider
                aria-label="time-offset"
                defaultValue={1}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={12}
              />
            </TableCell>
          </TableRow>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="right">
                {pluralize("hour", row.delayedHour, true) + ` later`}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  backgroundColor: getCellStyle(row.hkTime)
                }}
              >
                {row.hkTime + " " + row.hkDaySame}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  backgroundColor: getCellStyle(row.ukTime)
                }}
              >
                {row.ukTime + " " + row.ukDaySame}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
