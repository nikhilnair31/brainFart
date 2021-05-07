import React, {useState, useContext, useEffect}  from 'react';
import { UserContext } from '../../../providers/UserProvider';
import { dbref } from '../../../helpers/firebase.js';
import './Card.scss';

const Card = (props) => {
    const user = useContext(UserContext);
    const [uid, setUID] = useState('');
    const [voteChanger, setVoteChanger] = useState(0)

    useEffect(() => {
        console.log(`CARD\n is user === null? ${user === null}\n user: ${JSON.stringify(user)}\n`);
        if (user !== null) {
            if(user.uid !== null) setUID(user.uid);
            else setUID('');
        }
    }, [user]);

    const voteThisIdea = (firebaseKeyName, currUpvotes, inverter) => {
        console.log(`voteThisIdea button`);
        dbref.ref('posts').child(firebaseKeyName).update({'upvotes': currUpvotes + (inverter*1)});
        setVoteChanger(voteChanger + (inverter*1))
        // props.setPosted(props.posted + 1);
    }

    const deleteMyIdea = (firebaseKeyName) => {
        console.log(`delete button`);
        dbref.ref('posts').child(firebaseKeyName).remove();
        props.setPosted(props.posted + 1);
    }

    const utcToTime = (utc) => {
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(utc * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        // Will display time in 10:30:23 format
        var formattedTime = new Date(utc).toLocaleDateString("en-IN") + ' ' + hours + ':' + minutes.substr(-2);
        console.log(`utcToTime: ${formattedTime}\n`);
        return formattedTime;
    }

    // console.log(`CARD\n props.full_data: ${JSON.stringify(props.full_data)}\n`);
    return props.full_data.map(function(post) {
        return (
            <div className="card" id={post.key} key={post.key}>
                <div className="text_section">
                    <p className="time_text" >{utcToTime(post.utc)}</p>
                    <h2 className="idea_text" >{post.idea}</h2>
                    <p className="displayName_text" >{post.displayName}</p>
                    <p className="votes_text" >{post.upvotes + voteChanger}</p>
                </div>
                <div className="button_section">
                    <button className="upvote_button" onClick={() => voteThisIdea(post.key, post.upvotes, 1)}>
                        <img src="https://img.icons8.com/ios-glyphs/30/000000/long-arrow-up.png"  alt="upvote icon"/>
                    </button>
                    {(uid === post.uid) && <button className="delete_button" onClick={() => deleteMyIdea(post.key)}>
                        <img src="https://img.icons8.com/material/26/000000/delete-sign--v1.png"  alt="delete icon"/>
                    </button>}
                    <button className="downvote_button" onClick={() => voteThisIdea(post.key, post.upvotes, -1)}>
                        <img src="https://img.icons8.com/ios-glyphs/30/000000/long-arrow-down.png"  alt="downvote icon"/>
                    </button>
                </div>
            </div>
        );
    });
}

export default Card;