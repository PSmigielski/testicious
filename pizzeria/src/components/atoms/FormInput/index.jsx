import React, { useState } from "react";
import "./index.css";

const FromInput = ({type, value, setValue, placeholder, regExp, externalError}) => {
    const [error, setError] = useState("");
    const handleChange = (e) => {
        setValue(e.target.value);
    } 
    const validate = (regExp, e) => {
        const res = regExp.test(value)
        if(!res){
            setError("jebać disa");
        }else{
            setError("")
        }
    }
    return (<div className="formInputWrapper">
        <input 
            type={type} 
            className="formInput" 
            value={value}
            placeholder={placeholder}
            onChange={(e)=>handleChange(e)}
            onBlur={regExp ? ()=>validate(regExp) : () => null}
            required={false}
        />
        <p className="formInputError">{externalError ? externalError : error}</p>
    </div>)
}

export default FromInput;