import React, {useEffect, useState} from 'react';
import Intro from '../Intro/Intro';
import Search from '../Search/Search';
import AddIdea from '../AddIdea/AddIdea';
import CardContainer from '../CardContainer/CardContainer';
import Footer from '../Footer/Footer';
import { dbref } from '../../helpers/firebase.js';
import './Home.scss';

const Home = (props) => {
    var data_list = []
    const [searchedIdea, setSearchedIdea] = useState('');
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
            console.log(`HOME\n data: ${JSON.stringify(data)}\n`);
        });
    }, [props.posted]);

    const filteredIdeas = data.filter(idea => {
        return idea.idea.includes(searchedIdea) || idea.displayName.includes(searchedIdea);
    });

    return (
        <div id="root_child">
            <Intro />
            <Search searchedIdea={searchedIdea} setSearchedIdea={setSearchedIdea} />
            <AddIdea posted={props.posted} setPosted={props.setPosted}/>
            <CardContainer posted={props.posted} setPosted={props.setPosted} data={filteredIdeas} />
            <Footer/>
        </div>
    );
}

export default Home;