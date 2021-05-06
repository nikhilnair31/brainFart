import React from 'react';
import Intro from '../Intro/Intro';
import Search from '../Search/Search';
import AddIdea from '../AddIdea/AddIdea';
import CardContainer from '../CardContainer/CardContainer';
import Footer from '../Footer/Footer';
import './Home.scss';

const Home = (props) => {
    return (
        <div id="root_child">
            <Intro />
            <Search />
            <AddIdea posted={props.posted} setPosted={props.setPosted}/>
            <CardContainer posted={props.posted}/>
            <Footer/>
        </div>
    );
}

export default Home;