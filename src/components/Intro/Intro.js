import React, {useContext, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from '../../providers/UserProvider';
import './Intro.scss';

const Intro = () => {
    const user = useContext(UserContext);
	const [photoURL, setPhotoURL] = useState("https://img.icons8.com/ios/30/000000/user-male-circle.png");
    const history = useHistory();

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
                document.getElementsByClassName("personal_img")[0].style.filter = "invert(100%)";
            }
        }
    }, [user]);

    // console.log(`INTRO\n props.imgURL: ${photoURL}`);

    return (
        <div className="intro_wrapper">
            <div className="intro">
                <div className="intro_head">
                    <img className="logo_img" src='./images/idea_icon1.png' alt="myFace"/>
                    <h1 className="title" >ideaHub</h1>
                    <img className="personal_img" src={photoURL} alt="myFace" onClick={() => history.push('/user')}/>
                </div>
                <h2>share ideas!</h2>
                <p>by<a href="https://twitter.com/_silhouettte_">@silhouettte</a></p>
            </div>
        </div>
    );
}

export default Intro;