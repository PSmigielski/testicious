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
    const [buildingNumber, setBuildingNumber, buildingNumberError, setBuildingNumberError, resetBuildingNumber] = useInput("", "");
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
        resetBuildingNumber();
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
            if(data.user.role === "ADMIN"){
                navigate("/admin/products", {replace: true})
            }
        }
    }
    const handleLogout = async () => {
        const data = await axios.post("/auth/logout", {withCredentials: true}).catch(err => {
            console.log(err);
        });
        console.log(data);
        if(data){
            authContext.dispatch({type: "RESET"});
            navigate("/", {replace: true})
        }
    }
    const handleRegister = async () => {
        let userData = {name,surname,email,password,street,city,phoneNumber,buildingNumber: parseInt(buildingNumber)}
        if(homeNumber){
            userData["homeNumber"] =parseInt(homeNumber)
        }
        const {data} = await axios.post("/auth/register", userData).catch(err => {
            if(err.response.data.error.indexOf("name") != -1){
                setNameError(err.response.data.error)
            }else if(err.response.data.err.indexOf("surname") != -1){
                setSurnameError(err.response.data.error)
            }else if(err.response.data.err.indexOf("password") != -1){
                setPassword(err.response.data.error)
            }else if(err.response.data.err.indexOf("email") != -1){
                setEmailError(err.response.data.error)
            }else if(err.response.data.err.indexOf("city") != -1){
                setCityError(err.response.data.error)
            }else if(err.response.data.err.indexOf("street") != -1){
                setStreetError(err.response.data.error)
            }else if(err.response.data.err.indexOf("homeNumber")!= -1){
                setHomeNumberError(err.response.data.error)
            }else if(err.response.data.err.indexOf("buildingNumber")!= -1){
                setBuildingNumberError(err.response.data.error)
            }else if(err.response.data.err.indexOf("phoneNumber")!= -1){
                setPhoneNumberError(err.response.data.error)
            }
        });
        if(data){
            alert("Zosta??e?? zarejestrowany. Sprawd?? sw??j email");
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
                        <p className="accountMenuLoginHeader">Zaloguj si??</p>
                    </div>
                    <div className="bottom">
                        <FormInput 
                            type={"text"} 
                            max={200} 
                            placeholder={"Email"} 
                            setValue={setEmail} 
                            value={email} 
                            externalError={emailError}
                            errorMsg={"Email jest nieprawid??owy"} 
                            required={true}
                        />
                        <FormInput                             
                            type={"password"} 
                            max={200} 
                            placeholder={"Has??o"} 
                            setValue={setPassword} 
                            value={password}
                            externalError={passwordError}
                            errorMsg={"Has??o jest nieprawid??owe"} 
                            required={true}
                        />
                    </div>
                    <div className="accountMenuLoginButtons">
                        <button className="accountMenuLoginButton" onClick={() => handleLoginClose()}>Wr????</button>
                        <button className="accountMenuLoginButton" onClick={async () => handleLogin()}>Zaloguj</button>
                    </div>
                </div>}
                {isRegisterOpen &&        
                    <div className="orderFormBody">
                        <div className="orderFormHeader">
                            <div className="twoCol">
                                Zarejestruj si?? 
                            </div>
                        </div>
                        <div className="orderFormSteps">
                            <div className="orderFormStep" style={step>=1? {color: "red"}:{color: "white"}}>Dane</div>
                            <div className="orderFormStep" style={step>=2? {color: "red"}:{color: "white"}}>Adres</div>
                            <div className="orderFormStep" style={step>=3? {color: "red"}:{color: "white"}}>Email i has??o</div>
                        </div>
                        <div className="orderForm">
                        {step === 1 && 
                            <div className="bottomCol1">
                                <FormInput 
                                    type={"text"} 
                                    placeholder={"Imi??"} 
                                    value={name} 
                                    setValue={setName} 
                                    errorMsg={"Imi?? jest niepoprawne"}
                                    externalError={nameError}
                                    regExp={/^[A-Z??????????????????]{1}[a-z??????????????????]{1,100}$/} 
                                    required={true}/>
                                <FormInput 
                                    type={"text"} 
                                    placeholder={"Nazwisko"} 
                                    value={surname} 
                                    setValue={setSurname} 
                                    externalError={surnameError}
                                    errorMsg={"Nazwisko jest niepoprawne"}
                                    regExp={/^[A-Z??????????????????]{1}[a-z??????????????????]{1,100}$/} 
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
                                    placeholder={"Has??o"}
                                    value={password} 
                                    setValue={setPassword}
                                    externalError={passwordError}
                                    regExp={/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,100}$/}
                                    errorMsg={"Has??o powinno mie?? minimum 8 znak??w i zawiera?? 1 cyfr??, jedn?? du???? i ma???? liter?? i 1 znak specjalny"}
                                    required={true}/>
                                <FormInput 
                                    type={"password"} 
                                    placeholder={"Powt??rz has??o"}
                                    value={repeatPassword} 
                                    setValue={setRepeatPassword} 
                                    isSimilarTo={password}
                                    externalError={repeatPasswordError}
                                    errorMsg={"Has??a s?? r????ne"}
                                    required={true}
                                />                   
                            </div>
                        }
                            {step <= 4 && <div className="bottomCol2">
                                <button 
                                    className="orderFormButton" 
                                    onClick={step === 1 ? ()=> handleRegisterClose() : () => setStep(step-1)} 
                                >Wr????</button>
                                <button 
                                    className="orderFormButton" 
                                    onClick={step === 3 ? () => handleRegister() : () => setStep(step+1)} 
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