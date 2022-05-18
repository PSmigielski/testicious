import React from "react";
import HeroImage from "../../assets/HeroImage.svg"
import "./index.scss";
import Hamburger from "../../components/atoms/Hamburger";

const Home = () => {
    return (
        <section className="hero__container">
            <div className="hero__paragraph__container">
                <p className="hero__paragraph">THE BEST <span className="hero__paragraph--marked">FOOD</span> FOR YOUR TASTE</p>
                <p className="hero__paragraph__slave">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
                <img className="hero__img" src={HeroImage} alt="hero image" />     
        </section>
            
    );
};
export default Home;

{/* <div className="hero__indicator">
<div class="indicator">
        <div class="indicator__ball">
            <div class="indicator__ball__pointer"></div>
        </div>
</div>
</div>
 */}
