import React from "react";
import pic from "../../../assets/CutleryIcon.png";
import './index.css';
const CutleryLine = () => {
    return (
        <div className="Wraper">
            <hr className="CutleryLine"/>
            <img src={pic} alt="Cutlery Icon" className="CutleryIcon"/>
            <hr className="CutleryLine"/>
        </div>
    )
    
}
export default CutleryLine;
