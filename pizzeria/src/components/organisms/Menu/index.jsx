import React from "react";
import CutleryLine from "../../atoms/CutleryLine";
import Logo from "../../atoms/Logo";
import MenuLinks from "../../molecules/MenuLinks";
import "./index.css";

const Menu = () => {
    return (
        <nav className="MenuWrapper">
          <Logo />
          <CutleryLine />
          <MenuLinks />
        </nav>
    )
}

export default Menu;