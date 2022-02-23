import React from "react";

const Menu = () => {

    const menu_arr = ["Menu", "Restauracje", "Pizza dnia", "Koszyk", "Kontakt"];
    const menuFields = menu_arr.map((field_name) => <li>{field_name}</li> )
    return(
        <ul>{menuFields}</ul>
    )
}
export default Menu;



