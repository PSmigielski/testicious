import React from "react";
import Logo from "../../components/atoms/Logo";
import CartButton from "../../components/atoms/Cart";
import Navigation from "../../components/organisms/Navigation";
import "./index.scss"

const Home = () => {

    return (
        <div>
            <div className="logo__container">
                <Logo />
                <CartButton />

            </div>
            <div className="navigation__container">
                <Navigation />

            </div>
        </div>
    );
}
export default Home;
