import React from "react";
import PreviewLeftBlock from "../../../atoms/PreviewBlocks/PreviewLeftBlock";
import PreviewRightBlock from "../../../atoms/PreviewBlocks/PreviewRightBlock";
import PreviewCenterBlock from "../../../atoms/PreviewBlocks/PreviewCenterBlock";
import ArrowButton from "../../../../assets/ArrowButton.svg"
import "./index.scss";


const Slider = () => {
    return (
        <section className="slider">
            <div className="slider__preview">
                <button className="slider__preview__button--left">
                    <img src={ArrowButton} alt="" />
                </button>
                <PreviewLeftBlock />
                <PreviewCenterBlock />
                <PreviewRightBlock />
                <button className="slider__preview__button--right">
                    <img src={ArrowButton} alt="" />
                </button>
            </div>
            
            
        </section>      
    );
};
export default Slider;