import * as React from "react";
import "./styles.css";
import TimeTable from "./TimeTable";
import Typography from "@mui/material//Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MoreIcon from "@mui/icons-material/MoreVert";

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
  }, [props]);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Timezoner
            </Typography>
            <IconButton
              size="large"
              aria-label="display more actions"
              edge="end"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh"
        }}
      >
        <CssBaseline />
        <TimeTable />
      </Box>
    </div>
  );
}
