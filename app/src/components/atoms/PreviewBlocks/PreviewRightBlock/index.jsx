import React from "react";
import "./index.scss";

const PreviewRightBlock = ({img,name}) => {
    return (
        <div className="preview__rightblock">
            <img className="preview__rightblock__img" src={img} alt="" />
            <div className="preview__rightblock__name">
                {name}
            </div>
        </div>

    );
};
export default PreviewRightBlock;