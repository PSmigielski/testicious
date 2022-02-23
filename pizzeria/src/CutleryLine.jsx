import React from "react";
import pic from "./png/CutleryIcon.png"
const Cutlery = () => {

    const icon = <img src={pic} alt="Cutlery Icon" className="CutleryIcon"/>
    return (
        <div className="Wraper">
            <hr className="CutleryLine"/>
            {icon}
            <hr className="CutleryLine"/>
        </div>
    )
    
}
export default Cutlery;
