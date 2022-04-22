import React from "react";
import HeroImage from "../../assets/HeroImage.svg"
import "./index.scss";
import Hamburger from "../../components/atoms/Hamburger";

const Home = () => {
    return (
        <div className="hero__container">
            <div className="hero__paragraph__container">
                <p className="hero__paragraph">THE BEST <span className="hero__paragraph--marked">FOOD</span> FOR YOUR TASTE</p>
                <p className="hero__paragraph__slave">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <img className="hero__img" src={HeroImage} alt="hero image" />
            <Hamburger />
        </div>
    );
};
export default Home;

