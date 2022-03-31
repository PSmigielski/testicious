import React, { useState } from "react";
import ReactDOM from "react-dom";
import closeBtn from "../../../assets/closeBnt.svg";
import FormInput from "../../atoms/FormInput";
import useInput from "../../../hooks/useInput";
import axios from "axios";
import "./index.css";

const OrderForm = ({isOpen, setIsOpen}) => {
    const [name, setName, nameError, setNameError, resetName] = useInput("", "");
    const [surname, setSurname, surnameError, setSurnameError, resetSurname] = useInput("", "");
    const [phoneNumber, setPhoneNumber, phoneNumberError, setPhoneNumberError, resetPhoneNumber] = useInput("", "");
    const [city, setCity, cityError, setCityError, resetCity] = useInput("", "");
    const [street, setStreet, streetError, setStreetError, resetStreet] = useInput("", "");
    const [homeNumber, setHomeNumber, homeNumberError, setHomeNumberError, resetHomeNumber] = useInput("", "");
    const [buildingNumber, setBuildingNumber, buildingNumberError, setBuildingNumberError, resetBuildingNumber] = useInput("", "");
    const [email, setEmail, emailError, setEmailError, resetEmail] = useInput("", "");

    const [step, setStep] = useState(1);
    const handleClose = () => {
        setPhoneNumber("");
        setSurname("");
        setName("");
        setIsOpen(false)
    }

    const [paymnet,setPayment] = useState(false);
    const handlePayment = () =>{
        setPayment(true);
        setStep(step+1);
    }
    const backgroundColor1 = "linear-gradient(223.14deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.114583) 32.29%, rgba(221, 50, 30, 0.2) 97.46%, rgba(0, 0, 0, 0) 100%), #19222B";
    const backgroundColor2 = "linear-gradient(223.14deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.114583) 32.29%, rgba(39, 153, 29, 0.2) 97.46%, rgba(0, 0, 0, 0) 100%), #19222B";
    
    if (!isOpen) return null;
    return ReactDOM.createPortal(
    <div className="orderFormWrapper">
        <div className="orderFormBody" style={step !== 4 ? {background: backgroundColor1}: {background: backgroundColor2}}>
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
                <div className="orderFormStep" style={step>=3? {color: "red"}:{color: "white"}}>Płatność</div>
            </div>
            <div className="orderForm"> 
                {step === 1 && <div className="bottomCol1">
                    <FormInput 
                        type={"text"} 
                        placeholder={"Imię"} 
                        value={name} 
                        setValue={setName} 
                        errorMsg={"Imię jest niepoprawne"}
                        externalError={nameError}
                        regExp={/^[A-ZŚĄĘĆŻŹÓŁŃ]{1}[a-ząęółśżźćń]{1,100}$/} 
                        required={true}/>
                    <FormInput 
                        type={"text"} 
                        placeholder={"Nazwisko"} 
                        value={surname} 
                        setValue={setSurname} 
                        externalError={surnameError}
                        errorMsg={"Imię jest niepoprawne"}
                        regExp={/^[A-ZŚĄĘĆŻŹÓŁŃ]{1}[a-ząęółśżźćń]{1,100}$/} 
                        required={true}/>
                    <FormInput 
                        type={"text"} 
                        placeholder={"Numer telefonu"}
                        value={phoneNumber} 
                        setValue={setPhoneNumber} 
                        externalError={phoneNumberError}
                        errorMsg={"Numer telefon jest niepoprawny"}
                        regExp={/^[0-9]{9}$/} 
                        required={true}
                    />         
                    <FormInput 
                        type={"text"} 
                        max={200} 
                        placeholder={"Email"} 
                        setValue={setEmail} 
                        value={email} 
                        externalError={emailError}
                        errorMsg={"Email jest nieprawidłowy"} 
                        required={true}
                    />         
                </div>}
                {step === 2 && <div className="bottomCol1">
                    <FormInput 
                        type={"text"} 
                        placeholder={"Miasto"} 
                        value={city} 
                        setValue={setCity} 
                        min={1}
                        max={100}
                        externalError={cityError}
                        errorMsg={"Miasto jest niepoprawne"}
                        required={true}/>
                    <FormInput 
                        type={"text"} 
                        placeholder={"Ulica"} 
                        value={street} 
                        setValue={setStreet} 
                        externalError={streetError}
                        min={1}
                        max={100}
                        errorMsg={"Ulica jest niepoprawna"}
                        required={true}/>
                    <FormInput 
                        type={"text"} 
                        placeholder={"Numer budynku"}
                        value={buildingNumber} 
                        setValue={setBuildingNumber} 
                        externalError={buildingNumberError}
                        errorMsg={"Numer budynku jest niepoprawny"}
                        regExp={/^[0-9]{1,10}$/} 
                        required={true}
                    />      
                    <FormInput 
                        type={"text"} 
                        placeholder={"Numer mieszkania (Opcjonalne)"}
                        value={homeNumber} 
                        setValue={setHomeNumber} 
                        externalError={homeNumberError}
                        errorMsg={"Numer mieszkania jest niepoprawny"}
                        regExp={/^[0-9]{1,10}$/} 
                        required={false}
                    />                 
                </div>}
                {step === 3 && <div className="bottomCol1">
                    <button className="paymentButton" onClick={()=>handlePayment()}>Opłać</button>
                </div>}

                {step === 4 && paymnet &&<div className="bottomCol1">
                    <p>Wszystko gotowe!</p>
                
                </div>}


                {step !==4 && <div className="bottomCol2">
                    <button 
                        className="orderFormButton" 
                        onClick={() => setStep(step-1)} 
                        style={step === 1 ? {visibility: "hidden", pointerEvents: "none"}: {visibility: "visible", pointerEvents: "all"}}>Wróć</button>
                    <button 
                        className="orderFormButton" 
                        onClick={() => setStep(step+1)} 
                        style={step === 3 ? {visibility: "hidden", pointerEvents: "none"}: {visibility: "visible", pointerEvents: "all"}}>Dalej</button>
                </div>}
            </div>
        </div>
    </div>, document.body)
}

export default OrderForm;