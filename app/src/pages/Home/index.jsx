import React from "react";
import HeroImage from "../../assets/HeroImage.svg";
import SliderContainer from "../../components/organisms/SliderContainer";
import Wave from "../../components/atoms/Wave"
import Hero from "../../components/organisms/HomeComponents/Hero";


const Home = () => {
    return (
        <section className="home">
            <Hero />
            {/* <Wave /> */}
        </section>      
    );
};
export default Home;