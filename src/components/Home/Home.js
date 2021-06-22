import React, {useEffect, useState, useContext, useRef} from 'react';
import Intro from '../Intro/Intro';
import Search from '../Search/Search';
import AddIdea from '../AddIdea/AddIdea';
import CardContainer from '../CardContainer/CardContainer';
import Card from '../CardContainer/Card/Card.js';
import RandCard from '../CardContainer/Card/RandCard.js';
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
	const [tagList, setTagList] = useState(['games', 'apps', 'startup']);
	const [tagStatusList, setTagStatusList] = useState([true, true, true]);
    
    // const taggyPosts = posts.filter(idea => {
    //     return tagList.some(el => idea.post.tag.includes(el));
    // });

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
        }

        if(filteredPosts.length <= 0)
            footRef.current.style.position = "absolute";
        else
            footRef.current.style.position = "relative";

        //changing onsnapshot to getfetch avoids retrieveing full data on up/down voting..collection("posts")
        dbref.collection("posts").orderBy("utc", "desc").get().then(snapshot => {
            if (!isCancelled) {
                setIsCancelled(true);
                setPosts( snapshot.docs.map( doc => ({id: doc.id, post: doc.data()})) );
            }
        });
        
    }, [gotRandIdea, filteredPosts]);

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
            <Search setSearchedIdea={setSearchedIdea} fullfiltpost={filteredPosts} tagList={tagList} setTagList={setTagList} tagStatusList={tagStatusList} setTagStatusList={setTagStatusList}/>
            <AddIdea />
            {
                (randIdea !== null) && (searchedIdea.length <= 0) &&
                <CardContainer heading_text='Random Idea' cardcont_id='randcont'>
                    <RandCard key={randIdea.id} post_id={randIdea.id} post_utc={randIdea.post.utc} post_idea_text={randIdea.post.idea} post_idea_tag={randIdea.post.tag} op_uid={randIdea.post.uid} op_displayName={randIdea.post.displayName} post_upvotes={randIdea.post.upvotes} setGotRandIdea={setGotRandIdea} />
                </CardContainer>
            }
            {
                (filteredPosts.length > 0) && 
                <CardContainer heading_text='Past Ideas' cardcont_id='pastcont'>
                {   
                    filteredPosts.map(({id, post}) => (
                        <Card key={id} post_id={id} post_utc={post.utc} post_idea_text={post.idea} post_idea_tag={post.tag} op_uid={post.uid} op_displayName={post.displayName} post_upvotes={post.upvotes} />
                    ))
                }
                </CardContainer>}
            {
                (filteredPosts.length <= 0) && 
                <CardContainer heading_text='' cardcont_id='emptycont'>
                    <Empty text="nothing to see here 🤷"/>
                </CardContainer>
            }
            <Footer refe={footRef}/>
            <ScrollToTop />
        </div>
    );
}

export default Home;