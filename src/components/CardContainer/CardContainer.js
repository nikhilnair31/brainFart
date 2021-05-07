import React from 'react';
import Card from './Card/Card.js';
import './CardContainer.scss';

const CardContainer = (props) => {

    if(!props.data.length) {
        return (
            <div className="page_container" id="Dashboard">
                <h3 className="page_title">Dashboard</h3>
                <div className="grid_container">
                    <h4 className="error_title">Nothing new to see</h4>
                </div>
            </div>
        );
    }
    else{
        return (
            <div className="page_container" id="Dashboard">
                <h3 className="page_title">Dashboard</h3>
                <div className="grid_container">
                    <Card full_data={props.data} posted={props.posted} setPosted={props.setPosted}/>
                </div>
            </div>
        );
    }
}

export default CardContainer;