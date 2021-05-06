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
                var val_obj = snap.val();
                val_obj.key = snap.key;
                data_list.push(val_obj);
                // console.log(`snapshot.key: ${snap.key}\n snapshot.val(): ${JSON.stringify(snap.val())}\n val_obj: ${JSON.stringify(val_obj)}\n`);
            });
            setData(data_list.reverse());
            console.log(`data: ${JSON.stringify(data)}\n`);
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