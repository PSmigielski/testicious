import React from "react";
import HeroImage from "../../../../assets/HeroImage.svg";
import Indicator from "../../../../components/atoms/Indicator";
import Wave from "../../../atoms/Wave";
import "./index.scss"


const Hero = () => {
    return (
        <section className="hero">
            <div className="hero__container">
                <div className="hero__paragraph__container">
                    <p className="hero__paragraph">THE BEST <span className="hero__paragraph--marked">FOOD</span> FOR YOUR TASTE</p>
                    <p className="hero__paragraph__slave">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <img className="hero__img" src={HeroImage} alt="hero" /> 
            </div>
            <div className="indicator__container">
                <Indicator />
            </div>
            <Wave />
        </section>      
    );
};
export default Hero;