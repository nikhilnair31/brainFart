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
    const [randIdea, setRandIdea] = useState(null);
    const [isCancelled, setIsCancelled] = useState(false);
    const [gotRandIdea, setGotRandIdea] = useState(false);

    const filteredPosts = posts.filter(idea => {
        return idea.post.idea.toLowerCase().includes(searchedIdea.toLowerCase()) || 
            idea.post.displayName.toLowerCase().includes(searchedIdea.toLowerCase()) || 
                ((typeof idea.post.tag !== 'undefined') ? idea.post.tag.toLowerCase().includes(searchedIdea.toLowerCase()) : null);
    });

    useEffect(() => { 
        if(!gotRandIdea && filteredPosts.length > 0){
            var ideaIndex = Math.floor(Math.random() * posts.length);
            setRandIdea(posts[ideaIndex]);
            setGotRandIdea(true);
            //console.log(`randIdea: ${posts[ideaIndex]}`);
        }

        if(filteredPosts.length <= 0)
            footRef.current.style.position = "absolute";
        else
            footRef.current.style.position = "relative";

        //changing onsnapshot to getfetch avoids retrieveing full data on up/down voting
        dbref.collection("posts").orderBy("utc", "desc").onSnapshot(snapshot => {
            if (!isCancelled) {
                setIsCancelled(true);
                setPosts( snapshot.docs.map( doc => ({id: doc.id, post: doc.data()})) );
                //console.log(`setPosts isCancelled: ${isCancelled}`);
            }
        });

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
            <Search setSearchedIdea={setSearchedIdea} />
            <AddIdea />
            {
                (randIdea !== null) && 
                <CardContainer heading_text='Random Idea'>
                    <Card key={randIdea.id} post_id={randIdea.id} post_utc={randIdea.post.utc} post_idea_text={randIdea.post.idea} post_idea_tag={randIdea.post.tag} op_uid={randIdea.post.uid} op_displayName={randIdea.post.displayName} post_upvotes={randIdea.post.upvotes} />
                </CardContainer>
            }
            {
                (filteredPosts.length > 0) && 
                <CardContainer heading_text='Past Ideas'>
                {   
                    filteredPosts.map(({id, post}) => (
                        <Card key={id} post_id={id} post_utc={post.utc} post_idea_text={post.idea} post_idea_tag={post.tag} op_uid={post.uid} op_displayName={post.displayName} post_upvotes={post.upvotes} />
                    ))
                }
                </CardContainer>}
            {
                (filteredPosts.length <= 0) && 
                <CardContainer heading_text=''>
                    <Empty text="nothing to see here 🤷"/>
                </CardContainer>
            }
            <Footer refe={footRef}/>
            <ScrollToTop />
        </div>
    );
}

export default Home;