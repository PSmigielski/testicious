import React, { useRef, useEffect } from "react";
import Particle from "../../atoms/Particle";
import icon1 from "../../../assets/mini_icon_1.svg"
import icon2 from "../../../assets/mini_icon_2.svg"
import icon3 from "../../../assets/mini_icon_3.svg"
import icon4 from "../../../assets/mini_icon_4.svg"
import icon5 from "../../../assets/mini_icon_5.svg"
import icon6 from "../../../assets/mini_icon_6.svg"
import icon7 from "../../../assets/mini_icon_7.svg"

const Particles = () => {
    
    const particle1 = useRef(null);
    const particle2 = useRef(null);
    const particle3 = useRef(null);
    const particle4 = useRef(null);
    const particle5 = useRef(null);
    const particle6 = useRef(null);
    const particle7 = useRef(null);
    useEffect(()=>{
        const getRandomIntInclusive = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        const setStartPos = (particleRef) => {
            particleRef.current.style.setProperty("top", `-${getRandomIntInclusive(50,100)}px`)
            particleRef.current.style.setProperty("left", `${getRandomIntInclusive(50,200)}px`)
        }
        const slide = (particle, xMultiplier, mainPosition) => {
            if(particle.current !== null){
                particle.current.style.setProperty('--x',`${window.innerWidth*xMultiplier}px`);
                particle.current.style.setProperty('--y',`${window.innerHeight+200}px`);
                particle.current.style.paddingLeft = `${xMultiplier}px`
                setInterval(() => {
                    if(particle.current !== null){
                        if(isInViewport(particle.current) === false){
                            if(particle.current.style.getPropertyValue("--x") === `${window.innerWidth*xMultiplier}px`){
                                particle.current.style.setProperty('--x',`-${mainPosition}px`);
                                particle.current.style.setProperty('--y',`-${mainPosition}px`);
                            }else{
                                particle.current.style.setProperty('--x',`${window.innerWidth*xMultiplier}px`);
                                particle.current.style.setProperty('padding',`${xMultiplier*10}px`)
                                particle.current.style.setProperty('--y',`${window.innerHeight+200}px`);
                            }
                        }
                    }
                }, 3100);
            }
        }
        setStartPos(particle1)
        setStartPos(particle2)
        setStartPos(particle3)
        setStartPos(particle4)
        setStartPos(particle5)
        setStartPos(particle6)
        setStartPos(particle7)
        slide(particle1,0.91,getRandomIntInclusive(50,200))
        slide(particle2,0.82,getRandomIntInclusive(50,200))
        slide(particle3,0.73,getRandomIntInclusive(50,200))
        slide(particle4,0.64,getRandomIntInclusive(50,200))
        slide(particle5,0.55,getRandomIntInclusive(50,200))
        slide(particle6,0.46,getRandomIntInclusive(50,200))
        slide(particle7,0.37,getRandomIntInclusive(50,200))
    }, []);
    return (
        <div className="particles"> 
            <Particle image={icon1} ref={particle1} />
            <Particle image={icon2} ref={particle2} />
            <Particle image={icon3} ref={particle3} />
            <Particle image={icon4} ref={particle4} />
            <Particle image={icon5} ref={particle5} />
            <Particle image={icon6} ref={particle6} />
            <Particle image={icon7} ref={particle7} />
        </div>
    )   
}

export default Particles;