import React, {useContext, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { auth } from "../../helpers/firebase";
import { UserContext } from '../../providers/UserProvider';
import './User.scss';

const User = () => {
    const history = useHistory();
    const user = useContext(UserContext);
	const [displayName, setDisplayName] = useState("anon");
	const [displayEmail, setDisplayEmail] = useState("");
	const [photoURL, setPhotoURL] = useState("https://img.icons8.com/ios/30/000000/user-male-circle.png");

    useEffect(() => {
        if (user === null) {
            console.log(`USER\n loggedOut true. Now send to /login.\n`);
            history.push('/');
        }
        else {
            console.log(`INTRO\n loggedOut true. Now send to /login.\n `);
            if(!user.isAnonymous){
                setDisplayName(user.displayName);
                setDisplayEmail(user.email);
                setPhotoURL(user.photoURL);
            }
            else{
                document.getElementsByClassName("user_img")[0].style.filter = "invert(100%)";
            }
        }
    }, [user]);

    const logOut = () => {
        auth.signOut().then(()=> {
            console.log(`USER res\n auth: ${JSON.stringify(auth)}\n `);
        }).catch((error) => {
            console.log(`USER error\n error.message: ${JSON.stringify(error.message)}\n `);
        })
        console.log(`USER initial\n auth: ${JSON.stringify(auth)}\n `);
    }

    return (
        <div className="user_wrapper">
            <div className="user">
                <div className="user_head">
                    <img className="user_img" src={photoURL} alt="myFace"/>
                    <h2 className="user_name" >{displayName}</h2>
                    <h3 className="user_email" >{displayEmail}</h3>
                    <button className="user_logout_button" onClick={logOut}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default User;