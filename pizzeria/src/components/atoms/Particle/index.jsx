import React, {useState, useEffect} from "react";
import "./index.css";

const Particle = ({image, top = undefined, right = undefined}) => {
    let ox = 40;
    let oy = 20;

   const [style, setStyle] = useState({top, right});

    const sliding = (x,y,xdif, ydif) =>{
        x+=xdif;
        y+=ydif;
        console.log(x,y)
    }
    setInterval(sliding(ox,oy,1,1),100);

    useEffect(() => {
        setInterval(() => {
          console.log(ox)
          ox++;
        }, 1000);
      }, []);

    return (<img src={image} alt="particle" style={style} className="particle"/>)
};

export default Particle;