import React from "react";
import HeroImage from "../../assets/HeroImage.svg"
import "./index.scss";

const Home = () => {
    return (
        <div className="hero__container">
            <p className="hero__paragraph">THE BEST <span className="hero__paragraph--marked">FOOD</span> FOR YOUR TASTE</p>
            <p className="hero__paragraph__slave">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <img className="hero__img" src={HeroImage} alt="hero image" />
        </div>
    );
};
export default Home;

