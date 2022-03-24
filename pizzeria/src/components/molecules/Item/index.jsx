import React, { useState } from "react";
import QuantityInput from "../../atoms/QuantityInput";
import Notification from "../Notification";
import "./index.css";

const Item = ({id ,price, pizzaPic, name, toppings}) => {
    const [open, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const buy = (quantity) => {
        setMessage(`Kupiłeś: ${name} za ${new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(price*quantity)} w ilości ${quantity} sztuk`)
        setQuantity(1)
        setIsOpen(true);
    }
    const [quantity, setQuantity] = useState(1);
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
        <p className="price">{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(price)}</p>
        <div className="buttons">
            <button className="itemButton" onClick={() => buy(quantity)}>Dodaj</button>
            <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
        </div>
        <Notification open={open} setIsOpen={setIsOpen} message={message}/>
    </div>)
}

export default Item;