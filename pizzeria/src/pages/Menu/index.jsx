import React from "react";
import Item from "../../components/molecules/Item";
import "./index.css";
import pizzaPic from '../../assets/pizza_slice_4.svg';
import saladPic from '../../assets/salad_logo.svg';

const MenuNav = () => {

    const pizzas = [
        {id: "1", name: 'Pizza Margherita', toppings: ['Sos pomidorowy', 'Ser Gouda'], price: 20.29},
        {id: "2", name: 'Pizza Kurczak', toppings: ['Sos pomidorowy', 'Ser Gouda', 'Pieczarki', 'Kurczak'], price: 29.9},
        {id: "3", name: 'Pizza Wiejska', toppings: ['Sos pomidorowy', 'Ser Gouda', 'Pieczarki', 'Kiełbasa', 'Cebula'], price: 31.29},
        {id: "4", name: 'Pizza Kebab', toppings: ['Sos pomidorowy', 'Ser Gouda', 'Pieczarki', 'Kebab Wołowy', 'Sos Czosnkowy'], price: 34.29},
        {id: "5", name: 'Pizza Serowa', toppings: ['Sos pomidorowy', 'Ser Gouda', 'Ser Pleśniowy', 'Ser Mozzarella'], price: 30.1},
        {id: "6", name: 'Pizza Grecka', toppings: ['Sos pomidorowy', 'Ser Feta', 'Oliwki', 'Bazylia'], price: 30.9},
        {id: "7", name: 'Pizza Kurczak', toppings: ['Sos pomidorowy', 'Ser Gouda', 'Pieczarki', 'Kurczak'], price: 30.29},
        {id: "8", name: 'Pizza Kurczak', toppings: ['Sos pomidorowy', 'Ser Gouda', 'Pieczarki', 'Kurczak'], price: 30.29},
    ]
    const salads = [
        {id: "9", name: "Coleslaw", price: 13.99},
        {id: "10", name: "Grecka", price: 13.99},
        {id: "11", name: "Meksykańska", price: 13.99},
        {id: "12", name: "Polska", price: 13.99}
    ]
    return (
        <div className="menuItemsWrapper">
            <div className="categoryHeader">
                <header><h1>Pizza</h1></header> 
                <hr className="headerDivider"/>
            </div>
            <div className="items">
                {pizzas.map(el => (
                    <Item 
                        pizzaPic={pizzaPic} 
                        key={el.id} 
                        id={el.id} 
                        name={el.name} 
                        price={el.price} 
                        toppings={el.toppings}
                    />))}
            </div>
            <div className="categoryHeader">
                <header><h1>Sałatki</h1></header> 
                <hr className="headerDivider"/>
            </div>
            <div className="items">
                {salads.map(el => (
                <Item 
                    pizzaPic={saladPic} 
                    key={el.id} 
                    id={el.id} 
                    name={el.name} 
                    price={el.price}
                />))}
            </div>
        </div>
    );
}

export default MenuNav;