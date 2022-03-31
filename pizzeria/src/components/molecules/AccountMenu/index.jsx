import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import useInput from "../../../hooks/useInput";
import FormInput from "../../atoms/FormInput";
import axios from "axios";
import "./index.css";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const AccountMenu = ({isOpen, setIsOpen}) =>{
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [email, setEmail, emailError, setEmailError, resetEmail] = useInput("", "");
    const [password, setPassword, passwordError, setPasswordError, resetPassword] = useInput("", "");
    const [repeatPassword, setRepeatPassword, repeatPasswordError, setRepeatPasswordError, resetRepeatPassword] = useInput("", "");
    const [name, setName, nameError, setNameError, resetName] = useInput("", "");
    const [surname, setSurname, surnameError, setSurnameError, resetSurname] = useInput("", "");
    const [phoneNumber, setPhoneNumber, phoneNumberError, setPhoneNumberError, resetPhoneNumber] = useInput("", "");
    const [city, setCity, cityError, setCityError, resetCity] = useInput("", "");
    const [street, setStreet, streetError, setStreetError, resetStreet] = useInput("", "");
    const [homeNumber, setHomeNumber, homeNumberError, setHomeNumberError, resetHomeNumber] = useInput("", "");
    const [step, setStep] = useState(1)
    const navigate = useNavigate();
    const handleLoginClose = () => {
        resetEmail();
        resetPassword();
        setIsLoginOpen(false);
    }
    const handleRegisterClose = () => {
        resetEmail();
        resetPassword();
        resetRepeatPassword();
        resetName();
        resetSurname();
        resetPhoneNumber();
        resetCity();
        resetStreet();
        resetHomeNumber();
        setIsRegisterOpen(false);
    }
    const authContext = useContext(AuthContext);
    const handleLogin = async () => {
        const { data } = await axios.post("/auth/login", {email, password}, {withCredentials: true}).catch(err => {
            setEmailError(err.response.data.error);
            setPasswordError(err.response.data.error)
        });
        if(data){
            authContext.dispatch({type: "LOGIN", payload: data.user});
            setIsOpen(false);
            setIsLoginOpen(false);
            resetEmail();
            resetPassword();
            navigate("/admin", {replace: true})
        }
    }
    const handleLogout = async () => {
        const data = await axios.post("/auth/logout", {withCredentials: true}).catch(err => {
            console.log(err);
        });
        console.log(data);
        if(data){
            authContext.dispatch({type: "RESET"});
        }
    }
    if(!isOpen) return null;
    return ReactDOM.createPortal(
        <div className="accountMenuWrapper">  
            <div className="accountMenu">
                { !isLoginOpen && !isRegisterOpen && authContext.user.id === null &&
                (<div className="accountMenuButtons">
                    <button className="accountMenuButton" onClick={()=>setIsLoginOpen(true)}>ZALOGUJ</button>
                    <button className="accountMenuButton" onClick={()=>setIsRegisterOpen(true)}>ZAREJESTRUJ</button>
                </div>) }
                { !isLoginOpen && !isRegisterOpen && authContext.user.id && (
                    <div className="accountMenuButtons">
                        <p className="accountMenuLoginHeader">{authContext.user.email} rola: {authContext.user.role}</p>
                        <button className="accountMenuButton" onClick={()=>handleLogout()}>Wyloguj</button>
                    </div> )}
                {isLoginOpen && 
                <div className="accountMenuLogin">
                    <div className="top">
                        <p className="accountMenuLoginHeader">Zaloguj się</p>
                    </div>
                    <div className="bottom">
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
                        <FormInput                             
                            type={"password"} 
                            max={200} 
                            placeholder={"Hasło"} 
                            setValue={setPassword} 
                            value={password}
                            externalError={passwordError}
                            errorMsg={"Hasło jest nieprawidłowe"} 
                            required={true}
                        />
                    </div>
                    <div className="accountMenuLoginButtons">
                        <button className="accountMenuLoginButton" onClick={() => handleLoginClose()}>Wróć</button>
                        <button className="accountMenuLoginButton" onClick={async () => handleLogin()}>Zaloguj</button>
                    </div>
                </div>}
                {isRegisterOpen &&        
                    <div className="orderFormBody">
                        <div className="orderFormHeader">
                            <div className="twoCol">
                                Zarejestruj się 
                            </div>
                        </div>
                        <div className="orderFormSteps">
                            <div className="orderFormStep" style={step>=1? {color: "red"}:{color: "white"}}>Dane</div>
                            <div className="orderFormStep" style={step>=2? {color: "red"}:{color: "white"}}>Adres</div>
                            <div className="orderFormStep" style={step>=3? {color: "red"}:{color: "white"}}>Email i hasło</div>
                        </div>
                        <div className="orderForm">
                        {step === 1 && 
                            <div className="bottomCol1">
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
                                    errorMsg={"Nazwisko jest niepoprawne"}
                                    regExp={/^[A-ZŚĄĘĆŻŹÓŁŃ]{1}[a-ząęółśżźćń]{1,100}$/} 
                                    required={true}/>
                                <FormInput 
                                    type={"text"} 
                                    placeholder={"Numer telefonu"}
                                    value={phoneNumber} 
                                    setValue={setPhoneNumber} 
                                    externalError={phoneNumberError}
                                    errorMsg={"Numer telefonu jest niepoprawny"}
                                    regExp={/^[0-9]{9}$/} 
                                    required={true}
                                />                  
                            </div>
                        }
                        {step === 2 && 
                            <div className="bottomCol1">
                                <FormInput 
                                    type={"text"} 
                                    placeholder={"Miasto"} 
                                    value={city} 
                                    setValue={setCity} 
                                    max={100}
                                    externalError={cityError}
                                    errorMsg={"Miasto jest niepoprawne"}
                                    required={true}/>
                                <FormInput 
                                    type={"text"} 
                                    placeholder={"Ulica"} 
                                    value={street} 
                                    setValue={setStreet} 
                                    max={100}
                                    externalError={streetError}
                                    errorMsg={"Ulica jest niepoprawna"}
                                    required={true}/>
                                <FormInput 
                                    type={"text"} 
                                    placeholder={"Numer domu"}
                                    value={homeNumber} 
                                    setValue={setHomeNumber} 
                                    externalError={homeNumberError}
                                    errorMsg={"Numer domu jest niepoprawny"}
                                    regExp={/^[0-9]{1,10}$/} 
                                    required={true}
                                />                   
                            </div>
                        }
                        {step === 3 && 
                            <div className="bottomCol1">
                                <FormInput 
                                    type={"Email"} 
                                    placeholder={"Email"} 
                                    value={email} 
                                    setValue={setEmail} 
                                    max={100}
                                    externalError={emailError}
                                    errorMsg={"Email jest niepoprawny"}
                                    required={true}/>
                                <FormInput 
                                    type={"password"} 
                                    placeholder={"Hasło"}
                                    value={password} 
                                    setValue={setPassword}
                                    externalError={passwordError}
                                    regExp={/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,100}$/}
                                    errorMsg={"Hasło powinno mieć minimum 8 znaków i zawierać 1 cyfrę, jedną dużą i małą literę i 1 znak specjalny"}
                                    required={true}/>
                                <FormInput 
                                    type={"password"} 
                                    placeholder={"Powtórz hasło"}
                                    value={repeatPassword} 
                                    setValue={setRepeatPassword} 
                                    isSimilarTo={password}
                                    externalError={repeatPasswordError}
                                    errorMsg={"Hasła są różne"}
                                    required={true}
                                />                   
                            </div>
                        }
                            {step <= 4 && <div className="bottomCol2">
                                <button 
                                    className="orderFormButton" 
                                    onClick={step === 1 ? ()=> handleRegisterClose() : () => setStep(step-1)} 
                                >Wróć</button>
                                <button 
                                    className="orderFormButton" 
                                    onClick={() => setStep(step+1)} 
                                >{step ===3 ? "Zarejestruj" : "Dalej"}</button>
                            </div>}
                        </div>
                    </div> 
                }
        </div>

        </div>
    , document.body)
}

export default AccountMenu;