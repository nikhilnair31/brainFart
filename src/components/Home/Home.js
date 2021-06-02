import React, {useEffect, useState} from 'react';
import Intro from '../Intro/Intro';
import Search from '../Search/Search';
import AddIdea from '../AddIdea/AddIdea';
import CardContainer from '../CardContainer/CardContainer';
import Card from '../CardContainer/Card/Card.js';
import Footer from '../Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
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
        dbref.collection("posts").orderBy("utc", "desc").onSnapshot(snapshot => {
            setPosts( snapshot.docs.map( doc => ({id: doc.id, post: doc.data()})) );
        });
    }, []);

    return (
        <div id="root_child">
            <Intro />
            <Search searchedIdea={searchedIdea} setSearchedIdea={setSearchedIdea} />
            <AddIdea posted={props.postedObj.posted} setPosted={props.postedObj.setPosted}/>
            <CardContainer>
                {   
                    filteredPosts.map(({id, post}) => (
                        <Card key={id} post_id={id} post_utc={post.utc} post_idea_text={post.idea} op_uid={post.uid} op_displayName={post.displayName} post_upvotes={post.upvotes} />
                    ))
                }
            </CardContainer>
            <Footer/>
            <ScrollToTop />
        </div>
    );
}

export default Home;