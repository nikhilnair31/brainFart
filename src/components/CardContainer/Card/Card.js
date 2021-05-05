import React from 'react';
import Linkons from './Linkons/Linkons.js';
import './Card.scss';

const Card = (props) => {
    return props.data.map(function(typedata) {
        return (
            <div className="card" key={typedata.id}>
                <h2 className="tit" >{typedata.title}</h2>
                {typedata.date !== '' && <h3 className="dat_dur" >{typedata.date} {typedata.duration}</h3>}
                {typedata.position !== '' && <p className="pos" >{typedata.position}</p>}
                {typedata.location !== '' && <p className="loc" >{typedata.location}</p>}
                {(typedata.icon !== '' && typedata.link !== '') &&  <Linkons linkon_data={typedata.linkons}/>}
            </div>
        );
    });
}

export default Card;