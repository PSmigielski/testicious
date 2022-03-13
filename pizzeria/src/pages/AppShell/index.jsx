import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "../../components/organisms/Menu";
import "./index.css";
import icon1 from "../../assets/mini_icon_1.svg"
import icon2 from "../../assets/mini_icon_2.svg"
import icon3 from "../../assets/mini_icon_3.svg"
import icon4 from "../../assets/mini_icon_4.svg"
import icon5 from "../../assets/mini_icon_5.svg"
import icon6 from "../../assets/mini_icon_6.svg"
import icon7 from "../../assets/mini_icon_7.svg"

const AppShell = () => {
    return (
        <div className="appWrapper">
            <Menu />
            <div className="appContent">
                <Outlet />
                <img src={icon1} alt="icon1" className="icon1"/>
                <img src={icon2} alt="icon2" className="icon2"/>
                <img src={icon3} alt="icon3" className="icon3"/>
                <img src={icon4} alt="icon4" className="icon4"/>
                <img src={icon5} alt="icon5" className="icon5"/>
                <img src={icon6} alt="icon6" className="icon6"/>
                <img src={icon7} alt="icon7" className="icon7"/>
            </div>
        </div>
    )
}

export default AppShell;