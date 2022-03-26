import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const AccountMenu = ({isOpen, setIsOpen}) =>{
    if(!isOpen) return null
    return ReactDOM.createPortal(
        <div className="accountMenuWrapper">
            <div className="accountMenu">
                <button className="accountMenuButton">ZALOGUJ</button>
                <button className="accountMenuButton">ZAREJESTRUJ</button>
            </div>
        </div>
    , document.body)
}

export default AccountMenu;