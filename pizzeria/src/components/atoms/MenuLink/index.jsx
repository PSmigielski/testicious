import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

const MenuLink = ({name, to}) => {
    return (<li><NavLink to={to}>{name}</NavLink></li>);
}

export default MenuLink;