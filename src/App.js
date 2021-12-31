import * as React from "react";
import { Suspense, lazy } from "react";
import "./styles.css";
import MoreMenu from "./components/MoreMenu";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { prepareDb, readAll, update } from "./Storage";
import cityTimezones from "city-timezones";

const Home = lazy(() => import("./components/Home"));
const Copyright = lazy(() => import("./components/Copyright"));
//import Home from "./components/Home";
//import Copyright from "./components/Copyright";

export function getDefaultData() {
  return [
    cityTimezones.findFromCityStateProvince("Hong Kong")[0],
    cityTimezones.findFromCityStateProvince(
      "United Kingdom Westminster London"
    )[0]
  ];
}

export default function App(props) {
  const [timezone1, setTimezone1] = React.useState();
  const [timezone2, setTimezone2] = React.useState();
  const [db, setDb] = React.useState();

  React.useEffect(() => {
    const { appServiceWorker } = props;
    appServiceWorker.onInstalled(() =>
      console.log("appServiceWorker.onInstalled")
    );
    appServiceWorker.onUpdateFound(() =>
      console.log("appServiceWorker.onUpdateFound")
    );
  }, [props]);

  React.useEffect(() => {
    async function func() {
      try {
        const db = await prepareDb();
        //console.log("db:" + db);
        setDb(db);

        const results = await readAll(db);
        //console.log(results[0]);
        //console.log(results[1]);
        setTimezone1(results[0]);
        setTimezone2(results[1]);

        //update(db, results[1], 1);
      } catch (e) {
        console.log("Cannot retrieve local record: set default value");
        const DEFAULT_DATA = getDefaultData();
        setTimezone1(DEFAULT_DATA[0]);
        setTimezone2(DEFAULT_DATA[1]);
      }
    }
    func();
  }, []);

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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="*"
            element={
              <Home db={db} timezone1={timezone1} timezone2={timezone2} />
            }
          />
          <Route path="about" element={<Copyright />} />
        </Routes>
      </Suspense>
    </div>
  );
}
