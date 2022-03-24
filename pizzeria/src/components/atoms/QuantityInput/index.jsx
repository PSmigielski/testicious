import React from "react";
import "./index.css"

const QuantityInput = ({quantity, setQuantity}) => {
    const increase = () => {
        if(quantity+1 < 1000){
            setQuantity(quantity+1);
        }
    }
    const decrease = () => {
        if(quantity !== 0 ){
            setQuantity(quantity-1)
        }
    }
    const setValue = (e) =>{
        if(!isNaN(e.target.value)){
            setQuantity(e.target.value)
        }
    }
    function validate(e){
        quantity = parseInt(quantity)
        if(quantity>999){
            setQuantity(999)
        }
        if(quantity<0){
            setQuantity(0)
        }
    }
    return (
        <div className="quantityInputWrapper">
            <button className="quantityButton" onClick={()=>increase()}>+</button>
            <input 
                type="number" 
                onChange={(e)=>setValue(e)} 
                onBlur={(e)=>{validate(e)}} 
                min={0} 
                max={999} 
                value={quantity} 
                className="quantityButton" 
            />
            <button className="quantityButton" onClick={()=>decrease()}>-</button>
        </div>
    )
}

export default QuantityInput;
