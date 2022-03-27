import React, { useState } from "react";
import "./index.css";
import FormInput from "../../components/atoms/FormInput";
import FormTextarea from "../../components/atoms/FormTextarea";
import FormRadio from "../../components/atoms/FormInputRadio";
import Notifaction from "../../components/molecules/Notification"

const Contact = () => {
    const [open, setIsOpen] = useState(false);

    const click = (e) =>{
        e.preventDefault();
        setIsOpen(true);
        console.log(e);
    }

    return (
        <div className="contactWrapper">
            
            <form>
                <p className="dupa2">Opinia naszych Gości jest dla nas bardzo ważna, cieszy nas, że chcesz się z nami skontaktkować.</p>
                <FormInput type="text" placeholder="Imię"/>
                <FormInput type="text" placeholder="Nazwisko"/>
                <FormInput type="text" placeholder="Restauracja"/>
                <FormInput type="text" placeholder="Tematwiadomości"/>
                <label className="dupa">Twoja wiadomość:</label>
                <FormTextarea cols="50" rows="50"/>
                <p className="dupa4">Jak możemy się z Tobą skontaktować?</p>
                <FormRadio type="radio" value="Telefonicznie" name="dupa3"/>
                <FormRadio type="radio" value="Poprzez wiadomość email" name="dupa3"/>
                <FormRadio type="radio" value="Nie oczekuje kontaktu" name="dupa3"/>
                <button onClick={(e) => click(e)} value="wyślij" type="submit" className="dupaEndgame">wyślij</button>
                <Notifaction open={open} setIsOpen={setIsOpen} message={"Gratulacje użytkowniku wygrałeś iPhone 14S+ XL MAX PRO"}/>
            </form>
        </div>
    );
}

export default Contact;