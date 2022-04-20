import React from "react";
import NavigationLink from "../../atoms/NavigationLink";
import "./index.scss";

const NavigationLinks = ({links}) => {

    return (<ul className="navigation__links">{links.map((el, idx) => (<NavigationLink name={el.name} to={el.to} key={idx} />))}</ul>)
}

export default NavigationLinks