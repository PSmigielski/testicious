import React from "react";
import HeroImage from "../../assets/HeroImage.svg";
import WaveImage from "../../assets/WaveImage.svg";
import Indicator from "../../components/atoms/Indicator";
import "./index.scss";


const Home = () => {
    return (
        <section className="home">
            <section className="hero__container">
                <div className="hero__paragraph__container">
                    <p className="hero__paragraph">THE BEST <span className="hero__paragraph--marked">FOOD</span> FOR YOUR TASTE</p>
                    <p className="hero__paragraph__slave">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                    <img className="hero__img" src={HeroImage} alt="hero image" /> 
            </section>
            <div className="indicator__container">
                <Indicator />
            </div>
            <img className="wave__img" src={WaveImage} alt="wave image" />
        </section>
            
    );
};
export default Home;