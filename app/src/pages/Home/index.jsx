import React from "react";
import HeroImage from "../../assets/HeroImage.svg";
import Slider from "../../components/organisms/HomeComponents/Slider";
import Wave from "../../components/atoms/Wave"
import Hero from "../../components/organisms/HomeComponents/Hero";


const Home = () => {
    return (
        <section className="home">
            <Hero />
        </section>      
    );
};
export default Home;