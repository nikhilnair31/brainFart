import React from 'react';
import Card from './Card/Card.js';
import './CardContainer.scss';

const CardContainer = (props) => {
    return props.full_data.map(function(piece) {
        return (
            <div className="page_container" id={piece.heading} key={piece.id}>
                <h3 className="page_title">{piece.heading}</h3>
                <div className="grid_container">
                    <Card data={piece.data}/>
                </div>
            </div>
        );
    });
}

export default CardContainer;