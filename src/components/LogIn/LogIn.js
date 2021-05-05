import React, {useContext, useEffect, useState} from 'react';
import './LogIn.scss';
import { auth, signInWithGoogle, signInWithAnon } from "../../helpers/firebase";
import { UserContext } from '../../providers/UserProvider';

const LogIn = (props) => {
    const user = useContext(UserContext)

    useEffect(() => {
        if (user) {
            console.log(`loggedIn true: ${JSON.stringify(user)}\n user.photoURL: ${user.photoURL}`);
            props.setLoggedIn(true);
            if(user.photoURL) props.setPhotoURL(user.photoURL)
        }
    }, [user])

    return (
        <div className="login_wrapper">
            <div className="login">
                <h1>Log in?</h1>
                <div className="login-buttons">
                    <button className="login-provider-button" onClick={signInWithGoogle}>
                        <img src="https://img.icons8.com/ios-glyphs/24/000000/google-logo.png" alt="google icon"/>
                    </button>
                    <button className="login-provider-button" onClick={signInWithAnon}>
                        {/* <img src="https://img.icons8.com/pastel-glyph/50/000000/hacker.png" alt="anon icon"/> */}
                        <img src="https://img.icons8.com/small/32/000000/anonymous-mask.png" alt="anon icon"/>
                    </button>
                </div>
            </div>
            {/* <div className="base">
                <img className="logo_img" src='./images/idea_icon1.png' alt="logo"/>
                <h5>Copyrights © Nikhil Nair 2021. All Rights Reserved.</h5>
            </div> */}
        </div>
    );
}

export default LogIn;