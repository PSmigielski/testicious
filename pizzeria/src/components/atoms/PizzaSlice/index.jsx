import React, { useEffect, useState } from "react";
import "./index.css";
import img1 from "../../../assets/pizza_slice_1.svg"
import img2 from "../../../assets/pizza_slice_2.svg"
import img3 from "../../../assets/pizza_slice_3.svg"


const PizzaSlice = ({imageType}) => {
    const [imagePath, setImagePath] = useState(""); 
    useEffect(()=>{
        switch(imageType){
            case 1:
                setImagePath(img1);
                break;
            case 2:
                setImagePath(img2);
                break;
            case 3:
                setImagePath(img3);
                break;
            default:
                setImagePath(img1);
                break;
        }
    },[])
    return (
        <img src={imagePath} alt="Pizza Slice" className="pizzaSlice"/>
    );
}

export default PizzaSlice;