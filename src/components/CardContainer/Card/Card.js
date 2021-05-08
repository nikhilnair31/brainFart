import React, { useContext}  from 'react';
import { UserContext } from '../../../providers/UserProvider';
import { dbref } from '../../../helpers/firebase.js';
import './Card.scss';

const Card = (props) => {
    const user = useContext(UserContext);

    const voteThisIdea = (inverter) => {
        dbref.collection("posts").doc(props.post_id).collection('votes').onSnapshot(snapshot => {
            var uidInVotes = false;
            for(var i=0; i<snapshot.docs.length; i++){
                if(snapshot.docs[i].id === user.uid){
                    uidInVotes = true; 
                    console.log(`voteThisIdea\n uidInVotes:${uidInVotes}\n`);
                    break;
                }
                // console.log(`voteThisIdea\n i: ${i}\n snapshot.docs[i].data().uid  ${snapshot.docs[i].data().uid}\n user.uid: ${user.uid}\n uidInVotes:${uidInVotes}\n`);
            }
            if(!uidInVotes){
                console.log(`voteThisIdea\n ${!uidInVotes}\n user.uid: ${user.uid}\n has not already voted`);
                dbref.collection("posts").doc(props.post_id).collection('votes').doc(user.uid).set({
                    displayName: user.displayName,
                    utc:Date.now(),
                    voteDirection: inverter
                })
                // dbref.collection('posts').doc(props.post_id).collection('votes').add({ uid: user.uid, displayName: user.displayName, utc:Date.now(), voteDirection: inverter });
                dbref.collection('posts').doc(props.post_id).update({'upvotes': props.post_upvotes + (inverter*1)});
            }
            else{
                console.log(`voteThisIdea\n ${uidInVotes}\n user.uid: ${user.uid}\n has already voted`);
            }
        });
    }

    const deleteMyIdea = () => {
        console.log(`deleted post`);
        dbref.collection('posts').doc(props.post_id).delete();
    }

    const utcToTime = (utc) => {
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(utc * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedTime = new Date(utc).toLocaleDateString("en-IN") + ' ' + hours + ':' + minutes.substr(-2);
        // console.log(`utcToTime: ${formattedTime}\n`);
        return formattedTime;
    }

    return (
        <div className="card">
            <div className="text_section">
                {/* <p className="time_text" >{props.post_id}</p>
                <p className="time_text" >{props.op_uid}</p> */}
                <p className="time_text" >{utcToTime(props.post_utc)}</p>
                <h2 className="idea_text" >{props.post_idea_text}</h2>
                <p className="displayName_text" >{props.op_displayName}</p>
                {(user.uid === props.op_uid) && <button className="delete_button" onClick={() => deleteMyIdea(props.postid)}>Delete
                    {/* <img src="https://img.icons8.com/material/26/000000/delete-sign--v1.png"  alt="delete icon"/> */}
                </button>}
            </div>
            <div className="button_section">
                <button className="upvote_button" onClick={() => voteThisIdea(1)}>
                    <img src="https://img.icons8.com/ios-glyphs/30/000000/long-arrow-up.png"  alt="upvote icon"/>
                </button>
                <p className="votes_text" >{props.post_upvotes}</p>
                <button className="downvote_button" onClick={() => voteThisIdea(-1)}>
                    <img src="https://img.icons8.com/ios-glyphs/30/000000/long-arrow-down.png"  alt="downvote icon"/>
                </button>
                {/* <input type="button" src={'./images/up192.png'}  className="upvote_button" onClick={() => voteThisIdea(-1)} /> */}
            </div>
        </div>
    );
}

export default Card;