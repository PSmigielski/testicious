import React from "react";
import pic from "../../../assets/CutleryIcon.png";
import './index.css';
const CutleryLine = () => {
    return (
        <div className="Wraper">
            <div className="CutleryLine"></div>
            <img src={pic} alt="Cutlery Icon" className="CutleryIcon"/>
            <div className="CutleryLine"></div>
        </div>
    )
    
}
export default CutleryLine;
