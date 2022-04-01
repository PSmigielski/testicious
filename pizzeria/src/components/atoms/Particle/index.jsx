import React, { useState } from "react";
import "./index.css";

const Particle = React.forwardRef(({image }, ref) => {
    return (<img src={image} alt="particle"  className="particle" ref={ref}/>)
});

export default Particle;