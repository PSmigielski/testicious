import React, { useState } from "react";
import "./index.css";

const Particle = React.forwardRef(({image, top = undefined, right = undefined}, ref) => {

    const [style, setStyle] = useState({top, right});

    return (<img src={image} alt="particle" style={style} className="particle" ref={ref}/>)
});

export default Particle;