import React from "react";
import NavigationLink from "../../atoms/NavigationLink";
import "./index.scss";

const Navigation = () => {
    let userRole = "ADMIN";
    let links = [];
    if (userRole === "ADMIN") {
        links = [
            {
                name: "Admin tool",
                to: "/admin",
            },
            {
                name: "Contact",
                to: "/",
            },
            {
                name: "Menu",
                to: "/menu",
            },
            {
                name: "Settings",
                to: "/settings",
            },
        ];
    }
    return (
        <nav className="navigation">
            <ul className="navigation__links">
                {links.map((el, idx) => (
                    <NavigationLink name={el.name} to={el.to} key={idx} />
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
