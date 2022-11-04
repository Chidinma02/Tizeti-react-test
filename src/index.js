import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { applyPolyfills, defineCustomElements } from "h8k-components/loader";
import { ResidentContextProvider } from "./context/residentcontext";

ReactDOM.render(
  <ResidentContextProvider>
    <App />
  </ResidentContextProvider>,
  document.getElementById("root")
);
registerServiceWorker();
applyPolyfills().then(() => {
  return defineCustomElements(window);
});
