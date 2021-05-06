import React, {useState, useContext, useEffect} from "react";
import { dbref } from '../../helpers/firebase.js';
import { UserContext } from '../../providers/UserProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddIdea.scss';

const AddIdea = (props) =>{
    const user = useContext(UserContext);
    const [idea, setIdea] = useState('');
    const [uid, setUID] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [showPosting, setShowPosting] = useState(false);

    useEffect(() => {
        console.log(`ADDIDEA\n is user === null? ${user === null}\n user: ${JSON.stringify(user)}\n`);
        if (user !== null) {
            if(user.isAnonymous) setShowPosting(false);
            else setShowPosting(true);

            if(user.displayName !== null) setDisplayName(user.displayName);
            else setDisplayName('');

            if(user.uid !== null) setUID(user.uid);
            else setUID('');
        }
    }, [user]);

    const handleIdeaChange = event => { setIdea(event.target.value); };

    const handleSubmit = () => {
        if(idea === ''){
            toast("Oops!\nPut an actual idea buddy", { position: "bottom-left", autoClose: 3000, hideProgressBar: false, closeOnClick: true,
                pauseOnHover: true, draggable: false, progress: undefined, })
        }
        else if(idea !== ''){
            dbref.ref('posts').push({ uid: uid, displayName: displayName, idea: idea, upvotes: 0, utc:Date.now() });
            setIdea('');
            document.getElementsByClassName('idea_input')[0].value = ''
            props.setPosted(props.posted + 1);
            toast("Idea posted!", { position: "bottom-left", autoClose: 3000, hideProgressBar: false, closeOnClick: true,
                pauseOnHover: true, draggable: false, progress: undefined, });
        }
    };
    
    if (showPosting) {
		return( 
			<div className="addIdea_container">
                <div className="addIdea">
                    <input className="idea_input" type="text" placeholder="Add an idea" onChange={handleIdeaChange}/>
                    <button className="postIdea" alt="Submit" onClick={handleSubmit}>Post</button>
                </div>
                <ToastContainer progressClassName="toastProgress" bodyClassName="toastBody" />
            </div>
		);
	}
    else{
        return null;
    }
    // return( 
    //     <div className="addIdea_container">
    //         <div className="addIdea">
    //             <input className="idea_input" type="text" placeholder="Add an idea" onChange={handleIdeaChange}/>
    //             <button className="postIdea" alt="Submit" onClick={handleSubmit}>Post</button>
    //         </div>
    //         <ToastContainer progressClassName="toastProgress" bodyClassName="toastBody" />
    //     </div>
    // );
}

export default AddIdea;