import React, { useContext, useState } from "react";
import { CartContext } from "../../../contexts/CartContext";
import QuantityInput from "../QuantityInput";
import "./index.css";
import bin from "../../../assets/bin.svg";
import { useEffect } from "react";

const CartItem = ({data}) => {
    const [quantity, setQuantity] = useState(data.quantity);
    useEffect(()=>{
        cartContext.handleUpdate(data.id, quantity);
    },[quantity]);
    const cartContext = useContext(CartContext);
    return (
        <div className="cartItemWrapper" key={data.id}>
            <img src={data.pizzaPic} className="cartItemImg" alt="cart item" />
            <p>{data.name}</p>
            <p>Cena(szt){new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(data.price)}</p>
            <div className="cartItemQuantity"><QuantityInput quantity={quantity} setQuantity={setQuantity} /></div>
            <p className="cartItemPrice">Suma: {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(data.price*quantity)}</p>
            <button className="cartItemButton" onClick={() => cartContext.handleDelete(data.id)}><img src={bin} alt="remove btn"/></button>
        </div>
    )
}

export default CartItem;