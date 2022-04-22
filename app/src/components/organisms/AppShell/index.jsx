import React from "react";
import Logo from "../../atoms/Logo";
import CartButton from "../../atoms/Cart";
import Navigation from "../../molecules/Navigation";
import Hamburger from "../../atoms/Hamburger";
import "./index.scss";
import { Outlet } from "react-router-dom";

const AppShell = () => {
    return (
        <div>
            <div className="logo__container">
                <Logo />
                <CartButton />
                
            </div>
            <Navigation />
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};
export default AppShell;
