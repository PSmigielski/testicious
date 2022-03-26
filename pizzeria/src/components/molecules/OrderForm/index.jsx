import React, { useState } from "react";
import ReactDOM from "react-dom";
import closeBtn from "../../../assets/closeBnt.svg";
import FromInput from "../../atoms/FormInput";
import "./index.css";

const OrderForm = ({isOpen, setIsOpen}) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [homeNumber, setHomeNumber] = useState("");
    const [step, setStep] = useState(1);
    const handleClose = () => {
        setPhoneNumber("");
        setSurname("");
        setName("");
        setIsOpen(false)
    }
    if (!isOpen) return null;
    return ReactDOM.createPortal(
    <div className="orderFormWrapper">
        <div className="orderFormBody">
            <div className="orderFormHeader">
                <div className="twoCol">
                    Złóż zamówienie
                </div>
                <div className="thrCol">
                    <img src={closeBtn} alt="closeBtn" className="img1" onClick={() => handleClose()}/>
                </div>
            </div>
            <div className="orderFormSteps">
                <div className="orderFormStep" style={step>=1? {color: "red"}:{color: "white"}}>Dane</div>
                <div className="orderFormStep" style={step>=2? {color: "red"}:{color: "white"}}>Adres</div>
                <div className="orderFormStep" style={step==3? {color: "red"}:{color: "white"}}>Płatność</div>
            </div>
            <div className="orderForm"> 
                {step === 1 && <div className="bottomCol1">
                    <FromInput 
                        type={"text"} 
                        placeholder={"Imię"} 
                        value={name} 
                        setValue={setName} 
                        errorMsg={"Imię jest niepoprawne"}
                        regExp={/^[A-ZŚĄĘĆŻŹÓŁŃ]{1}[a-ząęółśżźćń]{1,100}$/} 
                        required={true}/>
                    <FromInput 
                        type={"text"} 
                        placeholder={"Nazwisko"} 
                        value={surname} 
                        setValue={setSurname} 
                        errorMsg={"Imię jest niepoprawne"}
                        regExp={/^[A-ZŚĄĘĆŻŹÓŁŃ]{1}[a-ząęółśżźćń]{1,100}$/} 
                        required={true}/>
                    <FromInput 
                        type={"text"} 
                        placeholder={"Numer telefonu"}
                        value={phoneNumber} 
                        setValue={setPhoneNumber} 
                        errorMsg={"Numer telefon jest niepoprawny"}
                        regExp={/^[0-9]{9}$/} 
                        required={true}
                    />                  
                </div>}
                {step === 2 && <div className="bottomCol1">
                    <FromInput 
                        type={"text"} 
                        placeholder={"Miasto"} 
                        value={city} 
                        setValue={setCity} 
                        min={1}
                        max={100}
                        errorMsg={"Miasto jest niepoprawne"}
                        required={true}/>
                    <FromInput 
                        type={"text"} 
                        placeholder={"Ulica"} 
                        value={street} 
                        setValue={setStreet} 
                        min={1}
                        max={100}
                        errorMsg={"Ulica jest niepoprawna"}
                        required={true}/>
                    <FromInput 
                        type={"text"} 
                        placeholder={"Numer domu"}
                        value={homeNumber} 
                        setValue={setHomeNumber} 
                        errorMsg={"Numer domu jest niepoprawny"}
                        regExp={/^[0-9]{1,10}$/} 
                        required={true}
                    />                   
                </div>}
                {step === 3 && <div className="bottomCol1">
                    <button>Opłać</button>
                </div>}
                <div className="bottomCol2">
                    <button 
                        className="orderFormButton" 
                        onClick={() => setStep(step-1)} 
                        style={step === 1 ? {visibility: "hidden", pointerEvents: "none"}: {visibility: "visible", pointerEvents: "all"}}>Wróć</button>
                    <button 
                        className="orderFormButton" 
                        onClick={() => setStep(step+1)} 
                        style={step === 3 ? {visibility: "hidden", pointerEvents: "none"}: {visibility: "visible", pointerEvents: "all"}}>Dalej</button>
                </div>
            </div>
        </div>
    </div>, document.body)
}

export default OrderForm;