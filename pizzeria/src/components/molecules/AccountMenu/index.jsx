import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const AccountMenu = ({isOpen, setIsOpen}) =>{
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    if(!isOpen) return null;
    return ReactDOM.createPortal(
        <div className="accountMenuWrapper">  
            <div className="accountMenu">
                { !isLoginOpen && !isRegisterOpen && 
                <div className="accountMenuButtons">
                    <button className="accountMenuButton">ZALOGUJ</button>
                    <button className="accountMenuButton">ZAREJESTRUJ</button>
                </div> 
                }
                {isLoginOpen && <div>login</div>}
                {isRegisterOpen && <div>register</div>}
            </div>

        </div>
    , document.body)
}

export default AccountMenu;