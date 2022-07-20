import React from "react";
import PreviewLeftBlock from "../../../atoms/PreviewBlocks/PreviewLeftBlock";
import "./index.scss";


const Slider = () => {
    return (
        <section className="slider">
            {/* <div className="slider__paragraph">
                Lorem ipsum <span className="slider__paragraph--marked">dolor </span> 
                sit amet, consectetur adipiscing elit
            </div> */}
            <div className="previev">
                <PreviewLeftBlock />
            </div>
        </section>      
    );
};
export default Slider;