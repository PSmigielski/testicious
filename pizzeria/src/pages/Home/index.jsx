import React from "react";
import PizzaSlice from "../../components/atoms/PizzaSlice";
import PepperPic from "../../components/atoms/PepperPic";
import "./index.css";
import Particles from "../../components/molecules/Particles";


const Home = () => {
    return (
        <div className="homeWrapper">
            <div className="pizzaSlices">
                <PizzaSlice imageType={1} />
                <PizzaSlice imageType={2} />
                <PizzaSlice imageType={3} />
            </div>
            <Particles />
            <PepperPic />
        </div>
    );  
}

export default Home;