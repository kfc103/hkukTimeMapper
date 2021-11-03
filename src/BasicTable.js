import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";

export default function BasicTable() {
  const hkTime = (time) => {
    const now = time ? time : new Date();
    return now.toLocaleString("en-GB", {
      timeZone: "Asia/Hong_Kong"
    });
  };
  const ukTime = (time) => {
    const now = time ? time : new Date();
    return now.toLocaleString("en-GB", {
      timeZone: "Europe/London"
    });
  };

  const [now, setNow] = React.useState(new Date());
  const [value, setValue] = React.useState(0);

  const rows = [];
  const dt = new Date();
  dt.setMinutes(0);
  dt.setSeconds(0);
  dt.setHours(dt.getHours() + value);
  for (let i = 0; i < 12; i++) {
    rows[i] = { hkTime: hkTime(dt), ukTime: ukTime(dt) };
    dt.setHours(dt.getHours() + 1);
  }
  //console.log(rows);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [now]);

  function valuetext(value) {
    return `${value}°C`;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>HK Time</TableCell>
            <TableCell align="right">UK Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>Current Time</TableCell>
            <TableCell component="th" scope="row">
              {hkTime(now)}
            </TableCell>
            <TableCell align="right">{ukTime(now)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Offset Hour(s)</TableCell>
            <TableCell colSpan={2}>
              <Slider
                aria-label="time-offset"
                defaultValue={0}
                value={value}
                onChange={handleChange}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={12}
              />
            </TableCell>
          </TableRow>
          {rows.map((row, i) => (
            <TableRow>
              <TableCell>{i + ` hour later`}</TableCell>
              <TableCell>{row.hkTime}</TableCell>
              <TableCell align="right">{row.ukTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
