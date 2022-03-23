import React from "react";
import { NavLink } from "react-router-dom";
import pic from "../../../assets/logo.svg";
import "./index.css"

const Logo = () => (
    <NavLink to="/">
        <img src={pic} alt="logo" className="logo"/>
    </NavLink>)
export default Logo;
