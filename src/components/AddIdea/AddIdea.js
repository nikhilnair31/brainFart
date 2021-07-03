import React, {useState, useContext, useEffect, useRef } from "react";
import { dbref } from '../../helpers/firebase.js';
import { UserContext } from '../../providers/UserProvider';
import { ToastContainer, toast } from 'react-toastify';
import autosize from 'autosize';
import 'react-toastify/dist/ReactToastify.css';
import './AddIdea.scss';

const AddIdea = () =>{
    const textareaRef  = useRef(null);
    const user = useContext(UserContext);
    const [idea, setIdea] = useState('');
    const [uid, setUID] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [showPosting, setShowPosting] = useState(false);

    useEffect(() => {
        // console.log(`ADDIDEA\n is user === null? ${user === null}\n user: ${JSON.stringify(user)}\n`);
        if (user !== null) {
            if(user.isAnonymous) setShowPosting(false);
            else setShowPosting(false);

            if(user.displayName !== null) setDisplayName(user.displayName);
            else setDisplayName('');

            if(user.uid !== null) setUID(user.uid);
            else setUID('');
        }
    }, [user]);

    const handleIdeaChange = event => { 
        setIdea(event.target.value); 
        var textarea = document.querySelector(".idea_input");
        textarea.focus();
        autosize(textarea);
    };
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        if(idea === ''){
            toast("Oops!\nPut an actual idea buddy", { position: "bottom-left", autoClose: 3000, hideProgressBar: false, closeOnClick: true,
                pauseOnHover: true, draggable: false, progress: undefined, })
        }
        else if(idea !== ''){
            dbref.collection('posts').add({ uid: uid, displayName: displayName, idea: idea, upvotes: 0, utc:Date.now() });
            setIdea('');
            document.getElementsByClassName('idea_input')[0].value = '';
            toast("Idea posted!", { position: "bottom-left", autoClose: 3000, hideProgressBar: false, closeOnClick: true,
                pauseOnHover: true, draggable: false, progress: undefined, });
        }
    };

    if (showPosting) {
		return( 
			<div className="addIdea_container">
                <div className="addIdea">
                    {/* <input className="idea_input" type="textarea" placeholder="Add an idea" onChange={handleIdeaChange} onKeyDown={handleKeyDown} /> */}
                    <textarea className="idea_input" type="textarea" placeholder="add an idea" onChange={handleIdeaChange} onKeyDown={handleKeyDown} />
                    <button className="postIdea" type="submit" alt="Submit" onClick={handleSubmit}>post</button>
                </div>
                <ToastContainer progressClassName="toastProgress" bodyClassName="toastBody" />
            </div>
		);
	}
    else{
        return null;
    }
}

export default AddIdea;