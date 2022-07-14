import React from "react";
import MenuListWithFilters from "../../components/organisms/MenuListWithFilters";

const Menu = () =>{
    return (
        <section className="menu">
            <h1 className="menu__header">Menu</h1>
            <MenuListWithFilters />
        </section>
    );
}

export default Menu;

