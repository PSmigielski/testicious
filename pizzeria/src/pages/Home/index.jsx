import React from "react";
import PizzaSlice from "../../components/atoms/PizzaSlice";
import "./index.css";

const Home = () => {
    return (<div className="homeWrapper">
        <PizzaSlice imageType={1} />
        <PizzaSlice imageType={2} />
        <PizzaSlice imageType={3} />
    </div>);  
}

export default Home;