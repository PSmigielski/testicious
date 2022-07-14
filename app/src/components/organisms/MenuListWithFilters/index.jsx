import React, { useState } from "react";
import Filters from "../../molecules/Filters";
import MenuList from "../../molecules/MenuList";
 
const MenuListWithFilters = () => {
    const [data, setData] = useState([]);
    return (
        <section className="MenuListWithFilters">
            <div>
                <Filters data={data}/>
            </div>
            <div>
                <MenuList />
            </div>
            <div></div>
        </section>
    );
}

export default MenuListWithFilters;