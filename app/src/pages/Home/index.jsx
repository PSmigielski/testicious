import React from "react";
import Logo from "../../components/atoms/Logo";
import CartButton from "../../components/atoms/Cart";
import Navigation from "../../components/molecules/Navigation";
import "./index.scss";

const Home = () => {
    return (
        <div>
            <div className="logo__container">
                <Logo />
                <CartButton />
            </div>
            <Navigation />
        </div>
    );
};
export default Home;
