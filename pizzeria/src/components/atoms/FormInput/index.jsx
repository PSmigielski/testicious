import React, { useState } from "react";
import "./index.css";

const FromInput = ({type, value, setValue, placeholder,min,max,errorMsg,required=false, regExp, externalError}) => {
    const [error, setError] = useState("");
    const handleChange = (e) => {
        setValue(e.target.value);
    } 
    const validate = (regExp, min, max) => {
        if(regExp){
            const res = regExp.test(value)
            if(!res){
                setError(errorMsg);
            }else{
                setError("")
            }
        }
        if(min){
            if(min>value.length){
                setError(errorMsg);
            }else{
                setError("");
            }
        }
        if(max){
            if(max<value.length){
                setError(errorMsg);
            }else{
                setError("");
            }
        }
    }
    return (<div className="formInputWrapper">
        <input 
            type={type} 
            className="formInput" 
            value={value}
            placeholder={placeholder}
            onChange={(e)=>handleChange(e)}
            onBlur={regExp || min || max? ()=>validate(regExp, min, max) : () => null}
            required={required}
        />
        <p className="formInputError">{externalError ? externalError : error}</p>
    </div>)
}

export default FromInput;