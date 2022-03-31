import React, { useState } from "react";
import "./index.css";

const FormRadio = ({type, value, setValue, placeholder,min,max,errorMsg,required=false, regExp, isSimilarTo,externalError, name}) => {
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
        } else if(min){
            if(min>value.length){
                setError(errorMsg);
            }else{
                setError("");
            }
        } else if(max){
            if(max<value.length){
                setError(errorMsg);
            }else{
                setError("");
            }
        } else if(isSimilarTo){
            if(isSimilarTo !== value){
                setError(errorMsg);
            }else{
                setError("");
            }
        }
    }
    return (<div className="formRadioWrapper">
        <input 
            type={type} 
            className="formRadio" 
            value={value}
            placeholder={placeholder}
            onChange={(e)=>handleChange(e)}
            onBlur={regExp || min || max|| isSimilarTo ? ()=>validate(regExp, min, max, isSimilarTo) : () => null}
            required={required}
            name={name}
        />
        <label className="radioLabel">{value}</label>
        <p className="formInputError">{externalError ? externalError : error}</p>
    </div>)
}

export default FormRadio;