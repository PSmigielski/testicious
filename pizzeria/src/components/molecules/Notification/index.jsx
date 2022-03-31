import ReactDOM from "react-dom";
import React from "react"
import "./index.css"
import { NavLink } from "react-router-dom";

const Notification = ({open,setIsOpen, message}) => {
    if(!open) return null;
    return ReactDOM.createPortal(
        <div className="notificationWrapper">
            <div className="notificationBody">
                <p>{message}</p>
                <div className="notificationButtons">
                    <NavLink to="/cart" className="notificationLink"><button className="notificationButton">Do kasy</button></NavLink>
                    <button className="notificationButton" onClick={() =>{ setIsOpen(false) }}>Kontynuuj zakupy</button>
                </div>
            </div>
        </div>
    ,document.body);
}

export default Notification;