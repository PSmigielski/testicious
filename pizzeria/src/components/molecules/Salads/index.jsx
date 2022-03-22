import './index.css';
import saladPic from '../../../assets/salad_logo.svg'
const SaladsOptions= (props) => {

    const Salads=props.salads;

    return (
        <div className="saladArt">
            <header>
                <h1>Salads</h1>
            </header>
            <hr className="headerDevider"/>
            <div className="saladsOrganizer">
                {Salads.map((unit)=>(
                    <article className="saladOption">
                        <img src={saladPic} alt="saladPic"/>
                        <hr className="devider" />
                        <h3>{unit.name}</h3>
                        <hr className="devider" />
                        <p>{unit.price}</p>
                    </article>
                ))}
            </div>
        </div>
     );
}
 
export default SaladsOptions;