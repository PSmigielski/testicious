import React from "react";
import "./index.scss";

const PreviewLeftBlock = ({img,name}) => {
    return (
        <div className="preview__leftblock">
            <img className="preview__leftblock__img" src={img} alt="" />
            <div className="preview__leftblock__name">
                {name}
            </div>
        </div>

    );
};
export default PreviewLeftBlock;