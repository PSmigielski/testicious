import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import CutleryLine from "../../atoms/CutleryLine";
import Logo from "../../atoms/Logo";
import MenuLinks from "../../molecules/MenuLinks";
import "./index.css";

const Navbar = () => {
    const auth = useContext(AuthContext);
    let links = [
      {
          name: "Menu",
          to: "/menu"
      },
      {
          name: "Restauracje",
          to: "/restaurants"
      },
      {
          name: "Pizza dnia",
          to: '/pizza-of-the-day'
      },
      {
          name: "Koszyk",
          to: "/cart"
      },
      {
          name: "Kontakt",
          to: "/contact"
      }
    ]
    if(auth.user.role === "ADMIN"){
      links = [
        {
          name: "Produkty",
          to: "/admin/products"
        },
        {
          name: "Zniżki",
          to: "/admin/discounts"
        },
        {
            name: "Dodatki",
            to: "/admin/toppings"
        },
        {
            name: "Kategorie",
            to: "/admin/categories"
        }
      ]
    }
    return (
        <nav className="menuWrapper">
          <Logo />
          <CutleryLine />
          <MenuLinks links={links}/>
        </nav>
    )
}

export default Navbar;