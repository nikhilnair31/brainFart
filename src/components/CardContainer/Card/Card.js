import React, {useState, useContext, useEffect}  from 'react';
import { UserContext } from '../../../providers/UserProvider';
import { dbref } from '../../../helpers/firebase.js';
import './Card.scss';

const Card = (props) => {
    const user = useContext(UserContext);
    const [uid, setUID] = useState('');

    useEffect(() => {
        console.log(`CARD\n is user === null? ${user === null}\n user: ${JSON.stringify(user)}\n`);
        if (user !== null) {
            if(user.uid !== null) setUID(user.uid);
            else setUID('');
        }
    }, [user]);

    const upvoteThisIdea = () => {
        console.log(`upvote button`);
    }

    const deleteMyIdea = (firebaseKeyName) => {
        console.log(`delete button`);
        dbref.ref('posts').child(firebaseKeyName).remove();
    }

    // console.log(`CARD\n props.full_data: ${JSON.stringify(props.full_data)}\n`);
    return props.full_data.map(function(post) {
        return (
            <div className="card" id={post.key} key={post.key}>
                <h2 className="idea_text" >{post.idea}</h2>
                <p className="displayName_text" >{post.displayName}</p>
                <p className="upvotes_text" >{post.upvotes}</p>
                <p className="upvotes_text" >{new Date(post.utc).toLocaleDateString('en-IN')}</p>
                <button className="upvote_button" onClick={upvoteThisIdea}>
                    <img src="https://img.icons8.com/ios-glyphs/30/000000/long-arrow-up.png"  alt="upvote icon"/>
                </button>
                <button className="downvote_button" onClick={upvoteThisIdea}>
                    {/* <img src="./images/up192.png" alt="downvote icon"/> */}
                    <img src="https://img.icons8.com/ios-glyphs/30/000000/long-arrow-down.png"  alt="downvote icon"/>
                </button>
                {(uid === post.uid) && <button className="delete_button" onClick={() => deleteMyIdea (post.key)}>
                    <img src="https://img.icons8.com/material/26/000000/delete-sign--v1.png"/>
                </button>}
            </div>
        );
    });
}

export default Card;