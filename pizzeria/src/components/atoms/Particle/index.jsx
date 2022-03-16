import React, {useState} from "react";
import "./index.css";

const Particle = ({image, top = undefined, right = undefined}) => {

    const [style, setStyle] = useState({top, right});

    return (<img src={image} alt="particle" style={style} className="particle"/>)
};

export default Particle;