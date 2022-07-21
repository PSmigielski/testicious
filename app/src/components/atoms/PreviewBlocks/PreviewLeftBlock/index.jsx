import React from "react";
import PizzaImage2 from "../../../../assets/PizzaImage2.svg"
import "./index.scss";

const PreviewLeftBlock = ({img,name}) => {
    
    img = PizzaImage2;
    name = "Capriciosa";
    
    return (
        <div className="preview__leftblock">
            <div className="preview__leftblock__imgblock" />
                <img className="preview__leftblock__img" src={img} alt="" />
            <div className="preview__leftblock__name">
                {name}
            </div>
        </div>

    );
};
export default PreviewLeftBlock;