import React from "react";
import StarIcon from "../../../../assets/StarIcon.svg";
import PizzaImage1 from "../../../../assets/PizzaImage1.svg"
import "./index.scss";

const PreviewCenterBlock = ({img,name,price,rating,bio}) => {

    img = PizzaImage1;
    name = "Margherita";
    price = "19.99$";
    rating = "4,8";
    bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";


    return (
        <div className="preview__centerblock">
            <div className="preview__centerblock__price">
                {price}
            </div>
            <div className="preview__centerblock__rating">
                <img className="previev__centerblock__icon" src={StarIcon} alt="" />{rating}
            </div>
            <div className="preview__centerblock__imgblock">
                <img className="preview__centerblock__imgblock__img" src={img} alt="" />
            </div>
            <div className="preview__centerblock__name">
                {name}
            </div>
            <div className="preview__centerblock__bio">{bio}</div>
        
        </div>

    );
};
export default PreviewCenterBlock;


        // <div class="center__previev__img"></div>
        // <div class="center__previev__name">Margherita</div>
        // <div class="center__previev__bio">
        //     Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        // </div> 
    
       