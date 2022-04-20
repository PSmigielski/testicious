import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "../../../assets/CartIcon.svg";
import "./index.scss"

const CartButton = () => {

    return (
        <Link className="cart" to="/cart" >
            <div className="cart__container">
                <img className="cart__img" src={CartIcon} alt="CartIcon" />
                <div className="cart__dot"></div>
            </div>
        </Link>
    );
}
export default CartButton;
