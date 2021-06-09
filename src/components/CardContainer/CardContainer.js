import React from 'react';
import './CardContainer.scss';

const CardContainer = (props) => {
    return (
        <div className="page_container" id="Dashboard">
            <h3 className="page_title">{props.heading_text}</h3>
            <div className="grid_container">
                {props.children}
            </div>
        </div>
    );
}

export default CardContainer;