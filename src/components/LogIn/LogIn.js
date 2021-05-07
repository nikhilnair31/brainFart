import React, {useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './LogIn.scss';
import { signInWithGoogle, signInWithAnon, signInWithTwitter } from "../../helpers/firebase";
import { UserContext } from '../../providers/UserProvider';

const LogIn = () => {
    const user = useContext(UserContext)
    const history = useHistory();

    useEffect(() => {
        if (user !== null) {
            // console.log(`LOGIN\n loggedIn true. Now send to /home.\n user: ${JSON.stringify(user)}\n`);
            history.push('/home');
        }
    }, [user])

    return (
        <div className="login_wrapper">
            <div className="login">
                <h1 className="login_title">Log in?</h1>
                <div className="login-buttons">
                    <button className="login-provider-button" onClick={signInWithGoogle}>
                        <img src="https://img.icons8.com/ios-glyphs/24/000000/google-logo.png" alt="google icon"/>
                    </button>
                    <button className="login-provider-button" onClick={signInWithTwitter}>
                        <img src="https://img.icons8.com/android/24/000000/twitter.png" alt="anon icon"/>
                    </button>
                    <button className="login-provider-button" onClick={signInWithAnon}>
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