import * as React from "react";
import "./styles.css";
import Home from "./components/Home";
import MoreMenu from "./components/MoreMenu";
import Copyright from "./components/Copyright";
import TimezoneFinder from "./components/TimezoneFinder";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

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
            <MoreMenu />
          </Toolbar>
        </AppBar>
      </Box>
      <CssBaseline />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="about" element={<Copyright />} />
      </Routes>
    </div>
  );
}
