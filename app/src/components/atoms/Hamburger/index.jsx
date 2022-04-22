import React, { useState } from "react";
import "./index.scss";


const Hamburger = ({isOpen, setIsOpen}) => {
    return (
        <div className="hamburger__container" onClick={()=>setIsOpen(!isOpen)}>
            <div className={isOpen ? "hamburger__line--active" : "hamburger__line"}></div>
        </div>
    );
}; 
export default Hamburger;


