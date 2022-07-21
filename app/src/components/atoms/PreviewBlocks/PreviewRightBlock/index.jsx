import React from "react";
import PizzaImage3 from "../../../../assets/PizzaImage3.svg"
import "./index.scss";

const PreviewRightBlock = ({img,name}) => {

    img = PizzaImage3;
    name = "Quattro Stagioni";

        return (
        <div className="preview__rightblock">
            <div className="previev__rightblock__imgblock">
                <img className="preview__rightblock__img" src={img} alt="" />
            </div>
            <div className="preview__rightblock__name">
                {name}
            </div>
        </div>

    );
};
export default PreviewRightBlock;