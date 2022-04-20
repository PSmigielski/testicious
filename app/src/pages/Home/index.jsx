import React from "react";
import Logo from "../../components/atoms/Logo";
import CartButton from "../../components/atoms/Cart";
import "./index.scss"

const Home = () => {

    return (
        <div className="logo__container">
            <Logo />
            <CartButton />
        </div>
    );
}
export default Home;
