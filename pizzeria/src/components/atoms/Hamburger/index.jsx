import React, { useState } from "react";
import "./index.css";

const Hamburger = ({isOpen, setIsOpen}) => {
    
    return (
        <div className="hamburger" onClick={()=>setIsOpen(!isOpen)}>
            <div className={isOpen ? "hamburger_line_active" : "hamburger_line"}></div>
        </div> 
    );
}

export default Hamburger;