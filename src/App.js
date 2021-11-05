import * as React from "react";
import "./styles.css";
import TimeTable from "./TimeTable";
import Typography from "@mui/material//Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/kfc103/hkukTimezoner">
        Timezoner
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function App(props) {
  React.useEffect(() => {
    const { appServiceWorker } = props;
    appServiceWorker.onInstalled(() =>
      console.log("appServiceWorker.onInstalled")
    );
    appServiceWorker.onUpdateFound(() =>
      console.log("appServiceWorker.onUpdateFound")
    );
  }, []);

  return (
    <div className="App">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh"
        }}
      >
        <CssBaseline />
        <TimeTable />
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            height: 100,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800]
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">HK-UK Timezoner by Aidan C</Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </div>
  );
}
