import React, {useEffect, useRef, useState} from "react";

import PizzaSlice from "../../components/atoms/PizzaSlice";
import PepperPic from "../../components/atoms/PepperPic";
import Hamburger from "../../components/atoms/Hamburger";
import Particle from "../../components/atoms/Particle";
import "./index.css";
import icon1 from "../../assets/mini_icon_1.svg"
import icon2 from "../../assets/mini_icon_2.svg"
import icon3 from "../../assets/mini_icon_3.svg"
import icon4 from "../../assets/mini_icon_4.svg"
import icon5 from "../../assets/mini_icon_5.svg"
import icon6 from "../../assets/mini_icon_6.svg"
import icon7 from "../../assets/mini_icon_7.svg"

const Home = () => {
    let [position,setPosition] = useState(0);
    const particle1 = useRef();
    const particle2 = useRef();
    const particle3 = useRef();
    const particle4 = useRef();
    const particle5 = useRef();
    const particle6 = useRef();
    const particle7 = useRef();
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    const slide = (particle, xMultipler) => {
        particle.current.style.setProperty('--x',`${window.innerWidth*xMultipler}px`);
        particle.current.style.setProperty('--y',`${window.innerHeight+50}px`);
        particle.current.style.paddingLeft = `${xMultipler}px`
        setInterval(() => {
            if(isInViewport(particle.current) == false){
                if(particle.current.style.getPropertyValue("--x") == `${window.innerWidth*xMultipler}px`){
                    particle.current.style.setProperty('--x',`-100px`);
                    particle.current.style.setProperty('--y',`-100px`);
                }else{
                    particle.current.style.setProperty('--x',`${window.innerWidth*xMultipler}px`);
                    particle.current.style.setProperty('padding',`${xMultipler*10}px`)
                    particle.current.style.setProperty('--y',`${window.innerHeight+50}px`);
                }
            }
        }, 1000);
    }
    useEffect(()=>{
       slide(particle1,0.90)
       slide(particle2,0.80)
       slide(particle3,0.70)
       slide(particle4,0.60)
       slide(particle5,0.50)
       slide(particle6,0.40)
       slide(particle7,0.30)
    }, [position, slide]);

    return (
        <div className="homeWrapper">
            <div className="pizzaSlices">
                <PizzaSlice imageType={1} />
                <PizzaSlice imageType={2} />
                <PizzaSlice imageType={3} />
            </div>
            <div className="particles"> 
                <Particle image={icon1} ref={particle1}/>

                <Particle image={icon2} ref={particle2} />
                <Particle image={icon3} ref={particle3}/>
                <Particle image={icon4} ref={particle4}/>
                <Particle image={icon5} ref={particle5}/>
                <Particle image={icon6} ref={particle6}/>
                <Particle image={icon7} ref={particle7}/>
            </div>
            <PepperPic />
            <Hamburger />
        </div>
    );  
}

export default Home;