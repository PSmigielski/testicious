import React from "react";
import createRoot from "react-dom";
import "./styles/index.scss";
import Router from "./Router";

createRoot.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>,
    document.getElementById("root"),
);
