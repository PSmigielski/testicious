import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "../../components/organisms/Menu";
import "./index.css";

const AppShell = () => {
    return (
        <div className="appWrapper">
            <Menu />
            <div className="appContent">
                <Outlet />
            </div>
        </div>
    )
}

export default AppShell;