import React from "react";
import ReactDOM from "react-dom";

import "./styles/index.css";
import App from "./App";

ReactDOM.render(<App title="ChatApp Skeleton" />, document.getElementById("chatRootElem"));

if (process.env.NODE_ENV === "development") module.hot.accept();
