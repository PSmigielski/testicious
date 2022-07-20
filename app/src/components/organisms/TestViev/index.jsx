import React from "react";
import "./index.scss";
import Slider from "../HomeComponents/Slider";
import Home from "../../../pages/Home";
import AppShell from "../AppShell";


const TestView = () => {
    return (

        <section className="test">
            <AppShell />
            <Home />
            <Slider />
        </section>
    );
};
export default TestView;
