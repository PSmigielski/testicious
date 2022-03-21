import React from "react";
import CutleryLine from "../../atoms/CutleryLine";
import Logo from "../../atoms/Logo";
import MenuLinks from "../../molecules/MenuLinks";
import "./index.css";

const Navbar = () => {
    return (
        <nav className="menuWrapper">
          <Logo />
          <CutleryLine />
          <MenuLinks />
        </nav>
    )
}

export default Navbar;