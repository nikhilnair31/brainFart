import React, {useEffect, useState}  from 'react';
import Card from './Card/Card.js';
import { dbref } from '../../helpers/firebase.js';
import './CardContainer.scss';

const CardContainer = (props) => {
    var data_list = []
    const [data, setData] = useState([]);

    useEffect(() => {  
        dbref.ref("posts").once("value", snapshot => {
            snapshot.forEach(snap => {
                data_list.push(snap.val());
            });
            setData(data_list.reverse());
            console.log(`data: ${JSON.stringify(data)}`);
        });
    }, [props.posted]);

    if(!data.length) {
        return (
            <div className="page_container" id="Dashboard">
                <h3 className="page_title">Loading...</h3>
            </div>
        );
    }
    else{
        return (
            <div className="page_container" id="Dashboard">
                <h3 className="page_title">Dashboard</h3>
                <div className="grid_container">
                    <Card full_data={data}/>
                </div>
            </div>
        );
    }
}

export default CardContainer;