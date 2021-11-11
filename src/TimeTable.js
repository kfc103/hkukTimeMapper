import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Emoji from "a11y-react-emoji";
import moment from "moment-timezone";
import pluralize from "pluralize";
import { blue, green, grey } from "@mui/material/colors";
import { useWindowDimensions } from "./WindowDimensions";

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

  tempNow.add(1, "hours");
  for (let i = 1; i <= 24; i++) {
    rows[i] = {
      id: i,
      delayedHour: i,
      hkTime: tempNow.tz("Asia/Hong_Kong").format("HH:mm"),
      hkNextDay: daySame(
        tempNow.tz("Asia/Hong_Kong"),
        now.tz("Asia/Hong_Kong")
      ),
      ukTime: tempNow.tz("Europe/London").format("HH:mm"),
      ukNextDay: daySame(tempNow.tz("Europe/London"), now.tz("Europe/London"))
    };
    tempNow.add(1, "hours");
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, [now]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          sx={{ minWidth: 300 }}
          aria-label="simple table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: thBackgroundColor }} />
              <TableCell
                align="center"
                sx={{ backgroundColor: thBackgroundColor, width: "35vw" }}
              >
                <Emoji symbol="🇭🇰" label="hk-flag" /> HK
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: thBackgroundColor, width: "35vw" }}
              >
                <Emoji symbol="🇬🇧" label="uk-flag" /> UK
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{ backgroundColor: thBackgroundColor }}
              >
                Current Date
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: thBackgroundColor }}
              >
                {now.tz("Asia/Hong_Kong").format("D MMM (ddd)")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: thBackgroundColor }}
              >
                {now.tz("Europe/London").format("D MMM (ddd)")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{ backgroundColor: thBackgroundColor }}
              >
                Current Time
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: thBackgroundColor }}
              >
                {now.tz("Asia/Hong_Kong").format("HH:mm:ss")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: thBackgroundColor }}
              >
                {now.tz("Europe/London").format("HH:mm:ss")}
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: height - 100 - 37 * 3 }}
      >
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
