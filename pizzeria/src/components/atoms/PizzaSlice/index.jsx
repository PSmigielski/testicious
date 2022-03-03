import React from "react";
import "./index.css";

const PizzaSlice = ({imagePath}) => {
    return (
        <img src={imagePath} alt="Pizza Slice" />
    );
}

export default PizzaSlice;