import React from "react";
import NavigationLink from "../../atoms/NavigationLink";
import "./index.css";

const NavigationLinks = ({links}) => {

    return (<ul className="">{links.map((el, idx) => (<NavigationLink name={el.name} to={el.to} key={idx} />))}</ul>)
}

export default NavigationLinks