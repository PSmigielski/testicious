import React from "react";
import { Link } from "react-router-dom";
import LogoIcons from "../../../assets/LogoIcons.svg";
import "./index.scss"

const Logo = () => {

    return (
        <Link className="logo" to="/" >
            <p className="logo__paragraph">Testicious</p>
            <img className="logo__img" src={LogoIcons} alt="logo" />
        </Link>
    );
}
export default Logo;
