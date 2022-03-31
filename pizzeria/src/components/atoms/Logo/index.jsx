import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import pic from "../../../assets/logo.svg";
import { AuthContext } from "../../../contexts/AuthContext";
import "./index.css"

const Logo = () => {
    const auth = useContext(AuthContext);
    const role = auth.user.role
    if(role !== "ADMIN"){
        return (<NavLink to="/">
            <img src={pic} alt="logo" className="logo"/>
        </NavLink>);
    }
    else{
        return (<img src={pic} alt="logo" className="logo"/>);
    }
}
export default Logo;
