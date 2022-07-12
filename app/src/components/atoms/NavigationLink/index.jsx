import React from "react";
import { NavLink } from "react-router-dom";
import "./index.scss"

const NavigationLink = ({name, to}) => {

    return (
        <li><NavLink className="navigation__link" to={to}>{name}</NavLink></li>);
}
export default NavigationLink;
