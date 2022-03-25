import React, { useContext } from "react";
import CartItem from "../../components/atoms/CartItem";
import { CartContext } from "../../contexts/CartContext";
import "./index.css"

const Cart = () => {
    const {items} = useContext(CartContext);
    return (
    <div className="cartWrapper"> 
        <div className="cartItems">
            {items.map(el => (<CartItem key={el.id} data={el}/>))}
        </div>
    </div>)
}

export default Cart;