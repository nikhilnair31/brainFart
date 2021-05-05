import React from 'react';
import './Linkons.scss';

const Linkons = (props) => {
    return props.linkon_data.map(function(linkon) {
        return (
            <input type="image" src={'./images/'+linkon.icon} className="linkbtn" alt="linkbtn?" key={linkon.id} onClick={() => window.open(linkon.link, '_blank')}/>
        );
    });
}

export default Linkons;