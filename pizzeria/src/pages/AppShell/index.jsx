import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Hamburger from "../../components/atoms/Hamburger";
import AccountMenu from "../../components/molecules/AccountMenu";
import Menu from "../../components/organisms/Menu";
import "./index.css";


const AppShell = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="appWrapper">
            <Menu />
            <div className="appContent">
                <Outlet />
            </div>
            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen}/>
            <AccountMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
    )
}

export default AppShell;