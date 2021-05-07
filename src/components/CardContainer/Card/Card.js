import React, {useState, useContext, useEffect}  from 'react';
import { UserContext } from '../../../providers/UserProvider';
import { dbref } from '../../../helpers/firebase.js';
import './Card.scss';

const Card = (props) => {
    const user = useContext(UserContext);
    const [uid, setUID] = useState('');

    useEffect(() => {
        if (user !== null) {
            if(user.uid !== null) setUID(user.uid);
            else setUID('');
            // console.log(`CARD\n uid: ${uid}\n\n props.postersuid: ${props.postersuid}\n`);
        }
    }, [user]);

    const voteThisIdea = (inverter) => {
        console.log(`voteThisIdea button`);
        dbref.collection('posts').doc(props.postid).update({'upvotes': props.upvotes + (inverter*1)});
        // props.setPosted(props.posted + 1);
    }

    const deleteMyIdea = () => {
        console.log(`delete button`);
        dbref.collection('posts').doc(props.postid).delete();
        // props.setPosted(props.posted + 1);
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
                {/* <p className="time_text" >{props.postid}</p>
                <p className="time_text" >{props.postersuid}</p> */}
                <p className="time_text" >{utcToTime(props.utc)}</p>
                <h2 className="idea_text" >{props.idea}</h2>
                <p className="displayName_text" >{props.displayName}</p>
                <p className="votes_text" >{props.upvotes}</p>
            </div>
            <div className="button_section">
                <button className="upvote_button" onClick={() => voteThisIdea(1)}>
                    <img src="https://img.icons8.com/ios-glyphs/30/000000/long-arrow-up.png"  alt="upvote icon"/>
                </button>
                {(uid === props.postersuid) && <button className="delete_button" onClick={() => deleteMyIdea(props.postid)}>
                    <img src="https://img.icons8.com/material/26/000000/delete-sign--v1.png"  alt="delete icon"/>
                </button>}
                <button className="downvote_button" onClick={() => voteThisIdea(-1)}>
                    <img src="https://img.icons8.com/ios-glyphs/30/000000/long-arrow-down.png"  alt="downvote icon"/>
                </button>
            </div>
        </div>
    );
}

export default Card;