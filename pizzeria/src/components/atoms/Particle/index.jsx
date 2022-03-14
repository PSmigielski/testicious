import React, {useState} from "react";
import "./index.css";

const Particle = ({image, top = undefined, left = undefined, right = undefined, bottom = undefined}) => {
    const [style, setStyle] = useState({ top, left, right, bottom});
    return (<img src={image} alt="particle" style={style} className="particle"/>)
};

export default Particle;