import React from "react";
import "./index.scss";

const PrevievLeftBlock = ({img,name}) => {
    return (
        <div className="previev__leftblock">
            <img className="previev__leftblock__img" src={img} alt="" />
            <div className="previev__leftblock__name">
                {name}
            </div>
        </div>

    );
};
export default PrevievLeftBlock;