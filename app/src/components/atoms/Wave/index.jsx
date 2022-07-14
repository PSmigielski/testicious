import React from "react";
import WaveImage from "../../assets/WaveImage.svg";
import "./index.scss";

const Wave = () => {
    return (

        <img className="wave__img" src={WaveImage} alt="wave" />
        
    );
};
export default Wave;