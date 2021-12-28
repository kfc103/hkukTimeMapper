import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import registerServiceWorker from "react-service-worker";

const rootElement = document.getElementById("root");
const appSW = registerServiceWorker();

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App appServiceWorker={appSW} />
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
