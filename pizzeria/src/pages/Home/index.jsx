import React from "react";
import PizzaSlice from "../../components/atoms/PizzaSlice";
import PepperPic from "../../components/atoms/PepperPic";
import RightSideBar from "../../components/atoms/RightSideBar";
import "./index.css";

const Home = () => {
    return (
        <div className="homeWrapper">
            <div className="pizzaSlices">
                <PizzaSlice imageType={1} />
                <PizzaSlice imageType={2} />
                <PizzaSlice imageType={3} />
            </div>
                <PepperPic />
                <RightSideBar />
        </div>
    );  
}

export default Home;