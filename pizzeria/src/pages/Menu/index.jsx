import React from "react";
import "./index.css";
import Hamburger from "../../components/atoms/Hamburger";
import PizzasOption from "../../components/molecules/Pizzas/index"
import SaladsOptions from "../../components/molecules/Salads/index"
const MenuNav = () => {

    const pizzas = [
        {name: 'Pizza Margherita', composition: ['Ciasto', 'Sos pomidorowy', 'Ser Gouda'], price: '20,29 zł'},
        {name: 'Pizza Kurczak', composition: ['Ciasto', 'Sos pomidorowy', 'Ser Gouda', 'Pieczarki', 'Kurczak'], price: '29,99 zł'},
        {name: 'Pizza Wiejska', composition: ['Ciasto', 'Sos pomidorowy', 'Ser Gouda', 'Pieczarki', 'Kiełbasa', 'Cebula'], price: '31,29 zł'},
        {name: 'Pizza Kebab', composition: ['Ciasto', 'Sos pomidorowy', 'Ser Gouda', 'Pieczarki', 'Kebab Wołowy', 'Sos Czosnkowy'], price: '30,29 zł'},
        {name: 'Pizza Serowa', composition: ['Ciasto', 'Sos pomidorowy', 'Ser Gouda', 'Ser Pleśniowy', 'Ser Mozarella'], price: '30,29 zł'},
        {name: 'Pizza Grecka', composition: ['Ciasto', 'Sos pomidorowy', 'Ser Feta', 'Oliwki', 'Bazylia'], price: '30,29 zł'},
        {name: 'Pizza Kurczak', composition: ['Ciasto', 'Sos pomidorowy', 'Ser Gouda', 'Pieczarki', 'Kurczak'], price: '30,29 zł'},
        {name: 'Pizza Kurczak', composition: ['Ciasto', 'Sos pomidorowy', 'Ser Gouda', 'Pieczarki', 'Kurczak'], price: '30,29 zł'},
    ]
    const salads = [
        {name: "Colesław", price: "13.99 zł"},
        {name: "Grecka", price: "13.99 zł"},
        {name: "Meksykańska", price: "13.99 zł"},
        {name: "Polska", price: "13.99 zł"}
    ]
    return (
        <div className="homeWrapper">
            <div className="PizzasSaladWrapp">
            <PizzasOption pizzas={pizzas} />
            <SaladsOptions salads={salads} />
            </div>
            <Hamburger />
        </div>
    );
}

export default MenuNav;