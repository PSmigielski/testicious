import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import "./styles/index.scss";
import Router from "./Router";

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>
);
