import React from "react";
import Filter from "../../atoms/Filter";

const Filters = ({data}) => {
    return (
        <section className="filters">
            <div className="filters_container">
                {data.map(el => <Filter data={el}/>)}
            </div>
            <div className="filters_options">

            </div>
        </section>
    );
}

export default Filters;