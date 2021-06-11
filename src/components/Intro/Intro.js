import React, {useContext, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from '../../providers/UserProvider';
import UserDropdown from '../UserDropdown/UserDropdown';
import './Intro.scss';

const Intro = () => {
    const history = useHistory();
    const user = useContext(UserContext);
	const [openState, setOpenState] = useState(false);
	const [photoURL, setPhotoURL] = useState("https://img.icons8.com/ios/30/000000/user-male-circle.png");

    useEffect(() => {
        // console.log(`INTRO\n is user === null? ${user === null}\n user: ${JSON.stringify(user)}\n`);
        if (user === null) {
            console.log(`INTRO\n loggedOut true. Now send to /login.\n user: ${JSON.stringify(user)}\n`);
            history.push('/');
        }
        else{
            if(!user.isAnonymous){
                setPhotoURL(user.photoURL);
            }
            else{
                document.getElementsByClassName("personal_img")[0].style.filter = "invert(0%)";
            }
        }
    }, [user, history]);

    return (
        <div className="intro_wrapper">
            <div className="intro">
                <div className="intro_head">
                    <img className="logo_img" src='./images/brainfart2.png' alt="myFace"/>
                    <h1 className="title" >brainFart</h1>
                    {/* <img className="personal_img" src={photoURL} alt="myFace" onClick={() => history.push('/user')}/> */}
                    <img className="personal_img" src={photoURL} alt="myFace" onClick={() => setOpenState(!openState)}/>
                    {openState && <UserDropdown />}
                </div>
                <h2 className="under_text">AI generated ideas from OpenAI's GPT2 and GPT3.</h2>
                <p className="under_text">by<a className="under_text" href="https://nikhil-nair.web.app/">Nikhil Nair</a></p>
            </div>
        </div>
    );
}

export default Intro;