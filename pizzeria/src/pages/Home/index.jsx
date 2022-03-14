import React from "react";
import PizzaSlice from "../../components/atoms/PizzaSlice";
import PepperPic from "../../components/atoms/PepperPic";
import Hamburger from "../../components/atoms/Hamburger";
import Particle from "../../components/atoms/Particle";
import "./index.css";
import icon1 from "../../assets/mini_icon_1.svg"
import icon2 from "../../assets/mini_icon_2.svg"
import icon3 from "../../assets/mini_icon_3.svg"
import icon4 from "../../assets/mini_icon_4.svg"
import icon5 from "../../assets/mini_icon_5.svg"
import icon6 from "../../assets/mini_icon_6.svg"
import icon7 from "../../assets/mini_icon_7.svg"

const Home = () => {

    return (
        <div className="homeWrapper">
            <div className="pizzaSlices">
                <PizzaSlice imageType={1} />
                <PizzaSlice imageType={2} />
                <PizzaSlice imageType={3} />
            </div>
            <div className="particles">
                <Particle image={icon1} top={"20%"}/>
                <Particle image={icon2} />
                <Particle image={icon3} />
                <Particle image={icon4} />
                <Particle image={icon5} />
                <Particle image={icon6} />
                <Particle image={icon7} />
            </div>
            <PepperPic />
            <Hamburger />
        </div>
    );  
}

export default Home;