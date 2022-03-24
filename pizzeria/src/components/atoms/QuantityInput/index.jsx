import React from "react";
import "./index.css"

const QuantityInput = ({quantity, setQuantity}) => {
    const increase = () => {
        if(quantity+1 < 1000){
            setQuantity(quantity+1);
        }
    }
    const decrease = () => {
        if(quantity !== 1 ){
            setQuantity(quantity-1)
        }
    }
    const handleChange = (e) =>{
        if(!isNaN(e.target.value)){
            setQuantity(e.target.value)
        }
    }
    function validate(e){
        if(quantity===""){
            setQuantity(1);
        }
        quantity = parseInt(e.target.value)
        if(quantity>999){
            setQuantity(999)
        }
        if(quantity<1){
            setQuantity(1)
        }
    }
    return (
        <div className="quantityInputWrapper">
            <button className="quantityButton" onClick={()=>increase()}>+</button>
            <input 
                type="textf" 
                onChange={(e)=>handleChange(e)} 
                onBlur={(e)=>validate(e)} 
                maxLength={3}
                minLength={1}
                value={quantity} 
                className="quantityButton" 
            />
            <button className="quantityButton" onClick={()=>decrease()}>-</button>
        </div>
    )
}

export default QuantityInput;
