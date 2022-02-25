import React from "react";
import CutleryLine from "../../atoms/CutleryLine";
import Logo from "../../atoms/Logo";
import MenuLinks from "../../molecules/MenuLinks";
import "./index.css";

const Menu = () => {
    return (
        <div className="MenuWrapper">
        <Logo />
        <CutleryLine />
        <MenuLinks />
      </div>
       
    )
}

export default Menu;