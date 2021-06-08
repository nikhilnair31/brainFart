import React, {useEffect, useState, useContext, useRef} from 'react';
import Intro from '../Intro/Intro';
import Search from '../Search/Search';
import AddIdea from '../AddIdea/AddIdea';
import CardContainer from '../CardContainer/CardContainer';
import Card from '../CardContainer/Card/Card.js';
import Footer from '../Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Confirm from '../Confirm/Confirm';
import { dbref } from '../../helpers/firebase.js';
import { ConfirmContext } from '../../providers/ConfirmProvider';
import './Home.scss';

const Home = (props) => {
    const footRef = useRef(null);
    const [searchedIdea, setSearchedIdea] = useState('');
    const [posts, setPosts] = useState([]);
    const {conf, pid} = useContext(ConfirmContext);
    const [showConf, setShowConf] = conf;

    const filteredPosts = posts.filter(idea => {
        return idea.post.idea.toLowerCase().includes(searchedIdea.toLowerCase()) || 
            idea.post.displayName.toLowerCase().includes(searchedIdea.toLowerCase()) || 
                ((typeof idea.post.tag !== 'undefined') ? idea.post.tag.toLowerCase().includes(searchedIdea.toLowerCase()) : null);
    });

    useEffect(() => { 
        //console.log(`useEffect filteredPosts.length: ${filteredPosts.length}`);
        if(filteredPosts.length <= 0){
            footRef.current.style.position = "absolute";
        } 
        else{
            footRef.current.style.position = "relative";
        }

        let isCancelled = false;
        dbref.collection("posts").orderBy("utc", "desc").onSnapshot(snapshot => {
            if (!isCancelled) {
                setPosts( snapshot.docs.map( doc => ({id: doc.id, post: doc.data()})) );
            }
        });
        return () => {
            isCancelled = true;
        };
    }, [filteredPosts]);
    
    function Empty(props) {
        return (
            <div className="empty_item">
                <p className="empty_text">{props.text}</p>
            </div>
        );
    }

    return (
        <div id="root_child">
            {showConf && <Confirm />}
            <Intro />
            <Search searchedIdea={searchedIdea} setSearchedIdea={setSearchedIdea} />
            <AddIdea posted={props.postedObj.posted} setPosted={props.postedObj.setPosted}/>
            {(filteredPosts.length > 0) && <CardContainer>
                {   
                    filteredPosts.map(({id, post}) => (
                        <Card key={id} post_id={id} post_utc={post.utc} post_idea_text={post.idea} post_idea_tag={post.tag} op_uid={post.uid} op_displayName={post.displayName} post_upvotes={post.upvotes} />
                    ))
                }
                </CardContainer>}
            {(filteredPosts.length <= 0) && 
                <div className="page_container" id="Dashboard">
                    <h3 className="page_title">...</h3>
                    <div className="grid_container">
                        <Empty text="nothing to see here 🤷"/>
                    </div>
                </div>}
            <Footer refe={footRef}/>
            <ScrollToTop />
        </div>
    );
}

export default Home;