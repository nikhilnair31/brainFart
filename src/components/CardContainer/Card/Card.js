import React, { useContext, useEffect, useState, useCallback }  from 'react';
import { UserContext } from '../../../providers/UserProvider';
import { ConfirmContext } from '../../../providers/ConfirmProvider';
import { dbref } from '../../../helpers/firebase.js';
import './Card.scss';

const Card = (props) => {
    const user = useContext(UserContext);
    const {conf, pid} = useContext(ConfirmContext);
    const [showConf, setShowConf] = conf;
    const [postID, setPostID] = pid;
    const [localVotes, setLocalVotes] = useState(props.post_upvotes);

    const addColorToVoted = () => {
        //console.log(`addColorToVoted | props.post_id: ${props.post_id}`);
        dbref.collection("posts").doc(props.post_id).collection('votes').onSnapshot(snapshot => {
            var voteDir = 0;
            var uidInVotes = false;
            for(var i=0; i<snapshot.docs.length; i++){
                if(snapshot.docs[i].id === user.uid){
                    uidInVotes = true; 
                    voteDir = snapshot.docs[i].data().voteDirection;
                    //console.log(`addColorToVoted\n voteDir:${voteDir} \n uidInVotes:${uidInVotes}`);
                    break;
                }
            }
            if(uidInVotes){
                //console.log(`uidInVotes true | voteDir: ${voteDir}`);
                if(voteDir === 1){
                    document.getElementById(props.post_id).getElementsByClassName('button_section')[0].getElementsByClassName('upvote_button')[0].style.backgroundColor = "#fe2b5d";
                }
                else if(voteDir === -1){
                    document.getElementById(props.post_id).getElementsByClassName('button_section')[0].getElementsByClassName('downvote_button')[0].style.backgroundColor = "#fe2b5d";
                }
            }
            else if(voteDir === 0){
                //console.log(`voteDir === 0 | voteDir: ${voteDir}`);
                document.getElementById(props.post_id).getElementsByClassName('button_section')[0].getElementsByClassName('upvote_button')[0].style.backgroundColor = "rgb(45, 45, 45)";
                document.getElementById(props.post_id).getElementsByClassName('button_section')[0].getElementsByClassName('downvote_button')[0].style.backgroundColor = "rgb(45, 45, 45)";
                //upRef.current.style.backgroundColor = "rgb(45, 45, 45)";
            }
        });
    }

    useEffect(() => {  
        //console.log(`useEffect | props.post_id: ${props.post_id}`);
        dbref.collection("posts").doc(props.post_id).collection('votes').onSnapshot(snapshot => {
            var voteDir = 0;
            var uidInVotes = false;
            for(var i=0; i<snapshot.docs.length; i++){
                if(snapshot.docs[i].id === user.uid){
                    uidInVotes = true; 
                    voteDir = snapshot.docs[i].data().voteDirection;
                    //console.log(`addColorToVoted\n props.post_id:${props.post_id} | voteDir:${voteDir} | uidInVotes:${uidInVotes} | user.uid:${user.uid}\n`);
                    break;
                }
            }
            if(uidInVotes){
                //console.log(`uidInVotes true | voteDir: ${voteDir}`);
                if(voteDir === 1){
                    document.getElementById(props.post_id).getElementsByClassName('button_section')[0].getElementsByClassName('upvote_button')[0].style.backgroundColor = "#fe2b5d";
                }
                else if(voteDir === -1){
                    document.getElementById(props.post_id).getElementsByClassName('button_section')[0].getElementsByClassName('downvote_button')[0].style.backgroundColor = "#fe2b5d";
                }
            }
            else if(voteDir === 0){
                //console.log(`voteDir === 0 | voteDir: ${voteDir}`);
                document.getElementById(props.post_id).getElementsByClassName('button_section')[0].getElementsByClassName('upvote_button')[0].style.backgroundColor = "rgb(45, 45, 45)";
                document.getElementById(props.post_id).getElementsByClassName('button_section')[0].getElementsByClassName('downvote_button')[0].style.backgroundColor = "rgb(45, 45, 45)";
                //upRef.current.style.backgroundColor = "rgb(45, 45, 45)";
            }
        });
    }, [localVotes]);

    const voteThisIdea = (inverter) => {
        var voteDir = 0;
        var uidInVotes = false;
        dbref.collection("posts").doc(props.post_id).collection('votes').get().then(snapshot => {
            for(var i=0; i<snapshot.docs.length; i++){
                if(snapshot.docs[i].id === user.uid){
                    uidInVotes = true; 
                    voteDir = snapshot.docs[i].data().voteDirection;
                    //console.log(`voteThisIdea\n user.uid:${user.uid} | uidInVotes:${uidInVotes} | voteDir:${voteDir}\n`);
                    break;
                }
            }
            //console.log(`voteThisIdea\n uidInVotes: ${uidInVotes}\n user.uid: ${user.uid} \n props.post_id: ${props.post_id} \n voteDir: ${voteDir} \n inverter: ${inverter}`);
            if(!uidInVotes){
                console.log(`has not already voted`);
                dbref.collection("posts").doc(props.post_id).collection('votes').doc(user.uid).set({
                    displayName: user.displayName,
                    utc:Date.now(),
                    voteDirection: inverter
                })
                dbref.collection('posts').doc(props.post_id).update({'upvotes': localVotes + (inverter*1)});
                setLocalVotes( localVotes + (inverter*1) );
            }
            else{
                //console.log(`has already voted`);
                if(voteDir === inverter){
                    //console.log(`voteDir = inverter so delete vote from sub-coll to nullify vote`);
                    dbref.collection("posts").doc(props.post_id).collection('votes').doc(user.uid).delete();
                    dbref.collection('posts').doc(props.post_id).update({'upvotes': localVotes - (voteDir*1)});
                    setLocalVotes( localVotes - (inverter*1) );
                }
                else if(voteDir !== inverter){
                    //console.log(`voteDir != inverter so delete vote from sub-coll and vote in reverse again`);
                    dbref.collection("posts").doc(props.post_id).collection('votes').doc(user.uid).delete();
                    dbref.collection("posts").doc(props.post_id).collection('votes').doc(user.uid).set({
                        displayName: user.displayName,
                        utc:Date.now(),
                        voteDirection: inverter
                    })
                    dbref.collection('posts').doc(props.post_id).update({'upvotes': localVotes + (inverter*2)});
                    setLocalVotes( localVotes + (inverter*2) );
                }
            }
            console.log(`localVotes: ${localVotes}`);
            addColorToVoted()
        });
    }

    const showConfirmation = () => {
        setPostID(props.post_id)
        setShowConf(true);
    }

    const timeDifference = (utc) => {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
    
        var now = Math.floor(Date.now())
        var elapsed = now - utc;
        // console.log(elapsed, '=', now, '-', utc);
    
        if (elapsed < msPerMinute) {
            return Math.round(elapsed/1000) + ' seconds ago';   
        }
        else if (elapsed < msPerHour) {
            return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
        else if (elapsed < msPerDay ) {
            return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
        else if (elapsed < msPerMonth) {
            return Math.round(elapsed/msPerDay) + ' days ago';   
        }
        else if (elapsed < msPerYear) {
            return Math.round(elapsed/msPerMonth) + ' months ago';   
        }
        else {
            //return 'around ' + Math.round(elapsed/msPerYear ) + ' years ago'; 
            return Math.round(elapsed/msPerYear ) + ' years ago';   
        }
    }

    return (
        <div className="card" id={props.post_id}>
            <div className="text_section">
                {/* <p className="time_text" >{props.post_id}</p>
                <p className="time_text" >{props.op_uid}</p> */}
                <div className="text_up_section">
                    <p className="time_text" >{timeDifference(props.post_utc)}</p>
                    {(user.uid === props.op_uid) && <button className="delete_button" onClick={() => showConfirmation()}>delete</button>}
                </div>
                <div className="text_mid_section">
                    <p className="displayName_text" >{props.op_displayName}</p>
                    {(typeof props.post_idea_tag !== 'undefined') && <p className="tag_text" >{props.post_idea_tag}</p>}
                </div>
                <h2 className="idea_text" >{props.post_idea_text}</h2>
            </div>
            <div className="button_section">
                <button className="upvote_button" onClick={() => voteThisIdea(1)}>
                    <img src={'./images/up192.png'}  alt="upvote icon"/>
                </button>
                <p className="votes_text" >{localVotes}</p>
                <button className="downvote_button" onClick={() => voteThisIdea(-1)}>
                    <img src={'./images/down192.png'}  alt="downvote icon"/>
                </button>
            </div>
        </div>
    );
}

export default Card;