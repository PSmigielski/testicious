import ReactDOM from "react-dom";
import React from "react"
import "./index.css"

const ContactNotification = ({open,setIsOpen, message}) => {
    if(!open) return null;
    return ReactDOM.createPortal(
        <div className="notificationWrapper">
            <div className="notificationBody">
                <p>{message}</p>
                <div className="notificationButtons">
                    <button className="notificationButton" onClick={() =>{ setIsOpen(false) }}>Kontynuuj zakupy</button>
                </div>
            </div>
        </div>
    ,document.body);
}

export default ContactNotification;