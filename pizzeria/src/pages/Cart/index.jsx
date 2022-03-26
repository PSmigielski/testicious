import React, { useContext, useEffect, useState } from "react";
import CartItem from "../../components/atoms/CartItem";
import { CartContext } from "../../contexts/CartContext";
import "./index.css"

const Cart = () => {
    const {items} = useContext(CartContext);
    const [hasItems, setHasItems] = useState(false);
    useEffect(()=>{
        if(items.length === 0){
            setHasItems(false);
        }else{
            setHasItems(true);
        }
    },[items])
    return (
    <div className="cartWrapper" style={!hasItems ? {justifyContent : "center"} : {justifyContent : "flex-start"}}> 
        {hasItems ? 
        (<div className="cartItems">
            {items.map(el => (<CartItem key={el.id} data={el}/>))} 
        </div>) : 
        (<div className="emptyCart"><p>Koszyk jest pusty</p></div>)}
    </div>)
}

export default Cart;