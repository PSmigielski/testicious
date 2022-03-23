import React from "react";
import "./index.css";

const Item = ({id ,price, pizzaPic, name, toppings}) => {
    const buy = (id) => {
        console.log(id)
    }
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
        <button className="itemButton" onClick={() => buy(id)}>Dodaj</button>
    </div>)
}

export default Item;