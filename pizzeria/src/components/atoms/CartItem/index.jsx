import React, { useContext, useState } from "react";
import { CartContext } from "../../../contexts/CartContext";
import QuantityInput from "../QuantityInput";
import "./index.css";

const CartItem = ({data}) => {
    const [quantity, setQuantity] = useState(data.quantity)
    const cartContext = useContext(CartContext);
    //delete do naprawu
    return (
        <div className="cartItemWrapper" key={data.id}>
            <img src={data.pizzaPic} className="cartItemImg" alt="cart item" />
            <p>{data.name}</p>
            <p>Cena(szt){new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(data.price)}</p>
            <div className="cartItemQuantity"><QuantityInput quantity={quantity} setQuantity={setQuantity} /></div>
            <p className="cartItemPrice">Suma: {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(data.price*quantity)}</p>
            <button onClick={() => cartContext.handleDeleteProp(data.id)}>delete</button>
        </div>
    )
}

export default CartItem;