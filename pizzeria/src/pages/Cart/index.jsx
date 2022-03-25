import React, { useContext, useEffect, useState } from "react";
import CartItem from "../../components/atoms/CartItem";
import { CartContext } from "../../contexts/CartContext";
import "./index.css"

const Cart = () => {
    const {items} = useContext(CartContext);
    const [hasItems, setHasItems] = useState(false);
    useEffect(()=>{
        if(items){
            setHasItems(true);
        }else{
            setHasItems(false);
        }
    },[items])
    return (
    <div className="cartWrapper" style={!hasItems ? {justifyContent : "center"} : {justifyContent : "flex-start"}}> 
        <div className="cartItems">
            {hasItems ? items.map(el => (<CartItem data={el}/>)) 
            : (<div className="emptyCart"><p>Koszyk jest pusty</p></div>)}
        </div>
    </div>)
}

export default Cart;