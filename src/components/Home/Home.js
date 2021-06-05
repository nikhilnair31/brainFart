import React, {useEffect, useState} from 'react';
import ConfirmProvider from '../../providers/ConfirmProvider';
import Intro from '../Intro/Intro';
import Search from '../Search/Search';
import AddIdea from '../AddIdea/AddIdea';
import CardContainer from '../CardContainer/CardContainer';
import Card from '../CardContainer/Card/Card.js';
import Footer from '../Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Confirm from '../Confirm/Confirm';
import { dbref } from '../../helpers/firebase.js';
import './Home.scss';

const Home = (props) => {
    const [searchedIdea, setSearchedIdea] = useState('');
    const [posts, setPosts] = useState([]);

    const filteredPosts = posts.filter(idea => {
        return idea.post.idea.toLowerCase().includes(searchedIdea.toLowerCase()) || 
            idea.post.displayName.toLowerCase().includes(searchedIdea.toLowerCase()) || 
                ((typeof idea.post.tag !== 'undefined') ? idea.post.tag.toLowerCase().includes(searchedIdea.toLowerCase()) : null);
    });

    useEffect(() => {  
        let isCancelled = false;
        dbref.collection("posts").orderBy("utc", "desc").onSnapshot(snapshot => {
            if (!isCancelled) {
                setPosts( snapshot.docs.map( doc => ({id: doc.id, post: doc.data()})) );
            }
        });
        return () => {
            isCancelled = true;
        };
    }, []);

    return (
        <ConfirmProvider>
            <div id="root_child">
                <Confirm />
                <Intro />
                <Search searchedIdea={searchedIdea} setSearchedIdea={setSearchedIdea} />
                <AddIdea posted={props.postedObj.posted} setPosted={props.postedObj.setPosted}/>
                <CardContainer>
                    {   
                        filteredPosts.map(({id, post}) => (
                            <Card key={id} post_id={id} post_utc={post.utc} post_idea_text={post.idea} post_idea_tag={post.tag} op_uid={post.uid} op_displayName={post.displayName} post_upvotes={post.upvotes} />
                        ))
                    }
                </CardContainer>
                <Footer/>
                <ScrollToTop />
            </div>
        </ConfirmProvider>
    );
}

export default Home;