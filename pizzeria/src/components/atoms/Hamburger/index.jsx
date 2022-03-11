import React, { useState } from "react";
import "./index.css";

const Hamburger = () => {
    
    const [click,noclick] = useState(false);

    const animation = () =>{
        noclick(!click)
    }
    
    return (
        <div className="hamburger" onClick={()=>animation()}>
            <div className={click ? "hamburger_line_active" : "hamburger_line"}></div>
        </div> 
    );
}

export default Hamburger;