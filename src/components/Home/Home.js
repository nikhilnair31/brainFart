import React, {useEffect, useState} from 'react';
import Intro from '../Intro/Intro';
import Search from '../Search/Search';
import AddIdea from '../AddIdea/AddIdea';
// import CardContainer from '../CardContainer/CardContainer';
import Card from '../CardContainer/Card/Card.js';
import Footer from '../Footer/Footer';
import { dbref } from '../../helpers/firebase.js';
import './Home.scss';

const Home = (props) => {
    const [searchedIdea, setSearchedIdea] = useState('');
    const [posts, setPosts] = useState([]);

    const filteredPosts = posts.filter(idea => {
        return idea.post.idea.toLowerCase().includes(searchedIdea.toLowerCase()) || 
            idea.post.displayName.toLowerCase().includes(searchedIdea.toLowerCase());
    });

    useEffect(() => {  
        dbref.collection("posts").onSnapshot(snapshot => {
            setPosts( snapshot.docs.map( doc => ({id: doc.id, post: doc.data()})) );
        });
    }, []);

    return (
        <div id="root_child">
            <Intro />
            <Search searchedIdea={searchedIdea} setSearchedIdea={setSearchedIdea} />
            <AddIdea posted={props.posted} setPosted={props.setPosted}/>
            {/* <CardContainer posted={props.posted} setPosted={props.setPosted} data={filteredIdeas} /> */}
            <div className="page_container" id="Dashboard">
                <h3 className="page_title">Dashboard</h3>
                <div className="grid_container">
                    {   
                        filteredPosts.map(({id, post}) => (
                            <Card key={id} postid={id} utc={post.utc} idea={post.idea} postersuid={post.uid} displayName={post.displayName} upvotes={post.upvotes} />
                        ))
                    }
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;