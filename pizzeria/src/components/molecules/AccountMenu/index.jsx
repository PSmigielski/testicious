import React, { useState } from "react";
import ReactDOM from "react-dom";
import FormInput from "../../atoms/FormInput";
import "./index.css";

const AccountMenu = ({isOpen}) =>{
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLoginClose = () => {
        setEmail("");
        setPassword("");
        setIsLoginOpen(false);
    }
    if(!isOpen) return null;
    return ReactDOM.createPortal(
        <div className="accountMenuWrapper">  
            <div className="accountMenu">
                { !isLoginOpen && !isRegisterOpen && 
                <div className="accountMenuButtons">
                    <button className="accountMenuButton" onClick={()=>setIsLoginOpen(true)}>ZALOGUJ</button>
                    <button className="accountMenuButton">ZAREJESTRUJ</button>
                </div> 
                }
                {isLoginOpen && 
                <div class="accountMenuLogin">
                    <div class="top">
                        <p className="accountMenuLoginHeader">Zaloguj się</p>
                    </div>
                    <div className="bottom">
                        <FormInput 
                            type={"text"} 
                            max={200} 
                            placeholder={"Email"} 
                            setValue={setEmail} 
                            value={email} 
                            errorMsg={"Email jest nieprawidłowy"} 
                            required={true}
                        />
                        <FormInput                             
                            type={"password"} 
                            max={200} 
                            placeholder={"Hasło"} 
                            setValue={setPassword} 
                            value={password} 
                            errorMsg={"Hasło jest nieprawidłowe"} 
                            required={true}
                        />
                    </div>
                    <div className="accountMenuLoginButtons">
                        <button className="accountMenuLoginButton" onClick={() => handleLoginClose()}>Wróć</button>
                        <button className="accountMenuLoginButton">Zaloguj</button>
                    </div>
                </div>}
                {isRegisterOpen && <div>register</div>}
            </div>

        </div>
    , document.body)
}

export default AccountMenu;