import React, { useState } from "react";
import MenuElement from "../../atoms/MenuElement";

const MenuList = () => {
    const [data, setData] = useState([]);
    return (
        <section className="MenuList">
            {data.map(el => <MenuElement data={el}/>)}
        </section>
    );
}

export default MenuList;