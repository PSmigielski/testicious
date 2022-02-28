import React from "react";
import MenuLink from "../../atoms/MenuLink";
import "./index.css";

const MenuLinks = () => {
    const links = [
        {
            name:"Menu",
            to:"/menu"
        },
        {
            name: "Restauracje",
            to:"/restaurants"
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
    return (<ul className="menuLinksWrapper">{links.map((el, idx) => (<MenuLink name={el.name} to={el.to} key={idx} />))}</ul>)
}

export default MenuLinks