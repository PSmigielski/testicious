import React, { useContext, useEffect, useState } from "react";
import CartItem from "../../components/molecules/CartItem";
import OrderForm from "../../components/molecules/OrderForm";
import { CartContext } from "../../contexts/CartContext";
import "./index.css"

const Cart = () => {
    const {cartData, handleReset} = useContext(CartContext);
    const [hasItems, setHasItems] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    useEffect(()=>{
        if(cartData.items.length === 0){
            setHasItems(false);
        }else{
            setHasItems(true);
        }
    },[cartData])
    return (
    <div className="cartWrapper" style={!hasItems ? {justifyContent : "center"} : {justifyContent : "flex-start"}}> 
        {hasItems ? 
        (<div className="checkoutWrapper">
            <div className="cartItems">
                {cartData.items.map(el => (<CartItem key={el.id} data={el}/>))} 
            </div>
            <div className="checkout">
                <div className="checkoutButtons">
                    <button className="checkoutButton" onClick={() => setIsOpen(true)}>Do kasy</button>                    
                    <button className="checkoutButton" onClick={() => handleReset()}>Wyczyść</button>
                </div>
                <p className="checkoutOverallPrice">{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(cartData.overallPrice)}</p>
            </div>
        </div>) : 
        (<div className="emptyCart"><p>Koszyk jest pusty</p></div>)}
        <OrderForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>)
}

export default Cart;