import React from "react";
import PepperPic from "../../components/atoms/PepperPic";
import "./index.css";
import pizza from "../../assets/pizza_slice_4.svg"


const PizzaOfTheDay = () => {

    return (
        <div className="wrapper">
            
                <p className="one">Zaloguj się aby otrzymać 10% zniżki na Pizzę dnia!</p>
                <p className="two red">Pizza Margherita*</p>
                <p className="three">Składniki:</p>
                <p className="igrt">woda | mąka | oliwa | sól i drożdże | pomidory pelati  mozzarella | oliwa z oliwek | bazylia</p>
            <div className="pizzaDiv">
                <img src={pizza} alt="pizza slice" className="pizza" />
            </div>
            <p className="four red">*cena dotyczy wyłącznie pizzy 25cm</p>
            <PepperPic />
        </div>
    );  
}

export default PizzaOfTheDay;