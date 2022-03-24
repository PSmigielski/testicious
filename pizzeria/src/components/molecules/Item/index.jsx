import React, { useState } from "react";
import QuantityInput from "../../atoms/QuantityInput";
import "./index.css";

const Item = ({id ,price, pizzaPic, name, toppings}) => {
    const buy = (id, quantity) => {
        console.log(id,quantity)
        setQuantity(0)
    }
    const [quantity, setQuantity] = useState(0);
    return (
    <div className="option">
        <img src={pizzaPic} className="itemImg" alt="pizzaPic"/>
        <h3>{name}</h3>
        {
            toppings ? (
            <p className="compsList">{toppings.map((topping)=>(`${topping} `))}</p>
            )
            : ""
        }
        <p className="price">{price}</p>
        <div className="buttons">
            <button className="itemButton" onClick={() => buy(id, quantity)}>Dodaj</button>
            <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
        </div>
    </div>)
}

export default Item;