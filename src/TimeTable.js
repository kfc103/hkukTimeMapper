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
import TimezoneSelector from "./TimezoneSelector";

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

export default function TimeTable() {
  const [now, setNow] = React.useState(moment());
  const { height } = useWindowDimensions();
  const rows = [];
  const tempNow = moment().startOf("hour");
  const [thHeight, setThHeight] = React.useState(0);
  const ref = React.useRef(null);
  const [tz1, setTz1] = React.useState("Asia/Hong_Kong");
  const [tz2, setTz2] = React.useState("Europe/London");

  tempNow.add(1, "hours");
  for (let i = 1; i <= 24; i++) {
    rows[i] = {
      id: i,
      delayedHour: i,
      hkTime: tempNow.tz(tz1).format("HH:mm"),
      hkNextDay: daySame(tempNow.tz(tz1), now.tz(tz1)),
      ukTime: tempNow.tz(tz2).format("HH:mm"),
      ukNextDay: daySame(tempNow.tz(tz2), now.tz(tz2))
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

  const onTimezoneChange = (e) => {
    if (e.target.id === "tz1-select") setTz1(e.target.value);
    else if (e.target.id === "tz2-select") setTz2(e.target.value);
  };

  return (
    <div>
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
                <TimezoneSelector
                  id="tz1-select"
                  value={tz1}
                  onChange={onTimezoneChange}
                />
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: thBackgroundColor, width: "35vw" }}
              >
                <TimezoneSelector
                  id="tz2-select"
                  value={tz2}
                  onChange={onTimezoneChange}
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
                {now.tz(tz1).format("D MMM (ddd)")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: thBackgroundColor }}
              >
                {now.tz(tz2).format("D MMM (ddd)")}
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
                {now.tz(tz1).format("HH:mm:ss")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: thBackgroundColor }}
              >
                {now.tz(tz2).format("HH:mm:ss")}
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
                    backgroundColor: getCellStyle(row.hkTime),
                    width: "35vw"
                  }}
                >
                  {row.hkTime + " "}
                  <Typography variant="caption">{row.hkNextDay}</Typography>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: getCellStyle(row.ukTime),
                    width: "35vw"
                  }}
                >
                  {row.ukTime + " "}
                  <Typography variant="caption">{row.ukNextDay}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
