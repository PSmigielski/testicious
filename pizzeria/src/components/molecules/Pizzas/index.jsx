import './index.css';
import pizzaPic from '../../../assets/pizza_slice_4.svg'
const PizzasOption = (props) => {

    const Pizzas=props.pizzas;

    return (
        <div className="mainWrap">
             
            <header><h1>Pizza</h1></header> 
            <hr className="headerDevider"/>
            <div className="PizzasWrapper">
                {Pizzas.map((unit)=>(
                    <article className="Option">
                        <img src={pizzaPic} className="pizzaImg" alt="pizzaPic"/>
                        <hr className="optionDevider"/>
                        <h3>{unit.name}</h3>
                        <hr className="optionDevider"/>
                        <p className="compsList">{unit.composition.map((comps)=>(`${comps} `))}</p>
                        <hr className="optionDevider"/>
                        <p>{unit.price}</p>
                        <hr className="optionDevider"/>
                        
                    </article>
                ))}
            </div>
        </div>
     );
}
 
export default PizzasOption;