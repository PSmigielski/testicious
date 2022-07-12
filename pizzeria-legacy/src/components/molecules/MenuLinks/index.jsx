import React from "react";
import MenuLink from "../../atoms/MenuLink";
import "./index.css";

const MenuLinks = ({links}) => {

    return (<ul className="navigation__links">{links.map((el, idx) => (<MenuLink name={el.name} to={el.to} key={idx} />))}</ul>)
}

export default MenuLinks