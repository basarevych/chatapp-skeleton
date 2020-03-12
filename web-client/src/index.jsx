import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

ReactDOM.render(<App title="WebApp Skeleton" />, document.getElementById("app"));

if (process.env.NODE_ENV === "development") module.hot.accept();
