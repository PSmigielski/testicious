import React, { useContext } from "react";
// import { AuthContext } from "../../../contexts/AuthContext";
import NavigationLinks from "../../molecules/NavigationLinks";
import "./index.scss";

const Navigation = () => {
    // const auth = useContext(AuthContext);
    let userRole = "ADMIN"
    let links = []
    if(userRole === "ADMIN"){
      links = [
        {
          name: "Admin tool",
          to: "/admin"
        },
        {
          name: "Contact",
          to: "/"
        },
        {
            name: "Menu",
            to: "/menu"
        },
        {
            name: "Settings",
            to: "/settings"
        }
      ]
    }
    return (
        <nav className="">
          <NavigationLinks links={links}/>
        </nav>
    )
}

export default Navigation;