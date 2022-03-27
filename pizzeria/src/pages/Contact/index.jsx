import React, { useState } from "react";
import "./index.css";
import FormInput from "../../components/atoms/FormInput";
import FormTextarea from "../../components/atoms/FormTextarea";
import FormRadio from "../../components/atoms/FormInputRadio";
import ContactNotification from "../../components/molecules/ContactNotification";

const Contact = () => {
    const [open, setIsOpen] = useState(false);

    const click = (e) =>{
        e.preventDefault();
        setIsOpen(true);
    }

    return (
        <div className="contactWrapper">
            
            <form>
                <p className="title">Opinia naszych Gości jest dla nas bardzo ważna, cieszy nas, że chcesz się z nami skontaktować.</p>
                <FormInput type="text" placeholder="Imię"/>
                <FormInput type="text" placeholder="Nazwisko"/>
                <FormInput type="text" placeholder="Restauracja"/>
                <FormInput type="text" placeholder="Temat wiadomości"/>
                <label className="textAreaLabel">Twoja wiadomość:</label>
                <FormTextarea cols="50" rows="50"/>
                <p className="radioLabel">Jak możemy się z Tobą skontaktować?</p>
                <FormRadio type="radio" value="Telefonicznie" name="option"/>
                <FormRadio type="radio" value="Poprzez wiadomość email" name="option"/>
                <FormRadio type="radio" value="Nie oczekuje kontaktu" name="option"/>
                <button onClick={(e) => click(e)} value="wyślij" type="submit" className="submit">Wyślij</button>
                <ContactNotification open={open} setIsOpen={setIsOpen} message={"Dziękujemy za opinię!"}/>
            </form>
        </div>
    );
}

export default Contact;