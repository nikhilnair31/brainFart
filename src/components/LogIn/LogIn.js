import React, {useContext, useEffect } from 'react';
import './LogIn.scss';
import { auth, googleProvider, twitterProvider } from "../../helpers/firebase";
import { UserContext } from '../../providers/UserProvider';

const LogIn = () => {
    const user = useContext(UserContext)

    useEffect(() => {
        if (user !== null) {
          //console.log(`LOGIN\n loggedIn true. Now send to /home.\n`);
        }
    }, [user])

    const signInWithGoogle = () => {
        auth.signInWithPopup(googleProvider).then((res) => {
          //console.log(`LOGIN res\n auth: ${JSON.stringify(auth)}\n `);
        }).catch((error) => {
          //console.log(`LOGIN error\n error.message: ${JSON.stringify(error.message)}\n `);
        })
      //console.log(`LOGIN initial\n auth: ${JSON.stringify(auth)}\n`);
    }

    const signInWithTwitter = () => {
        auth.signInWithPopup(twitterProvider).then((res) => {
          //console.log(`LOGIN\n res.credential.accessToken: ${res.credential.accessToken}\n res.user: ${JSON.stringify(res.user)}`);
        }).catch((error) => {
          //console.log(`LOGIN error\n error.message: ${JSON.stringify(error.message)}\n `);
        })
    }

    const signInWithAnon = () => {
        auth.signInAnonymously().then((res) => {
          //console.log(`LOGIN res\n auth: ${JSON.stringify(auth)}\n `);
        }).catch((error) => {
          //console.log(`LOGIN error\n error.message: ${JSON.stringify(error.message)}\n `);
        })
      //console.log(`LOGIN initial\n auth: ${JSON.stringify(auth)}\n `);
    }

    return (
        <div className="login_wrapper">
            <div className="login">
                <img className="logo_img" src='./images/brainfart.png' alt="logo"/>
                <div className="login_text">
                    <h1>Welcome</h1>
                    <p> Login to view & post ideas</p>
                    <p> Go anonymous to only view ideas </p>
                    <p> By logging in you accept our </p>
                    <a href="https://docs.google.com/document/d/14Q2jeHABjQZgS-B4zeXYWJ7g1-WPgBSSEIqeVNpG414/edit?usp=sharing">Privacy Policy</a>
                </div>
                <div className="login_button_container">
                    <button className="login_button" onClick={signInWithGoogle}>
                        <h5 className="button_text" >Login with Google</h5>
                        <img className="login_img" src="https://img.icons8.com/ios-glyphs/24/000000/google-logo.png" alt="google icon"/>
                    </button>
                    <button className="login_button" onClick={signInWithTwitter}>
                        <h5 className="button_text" >Login with Twitter</h5>
                        <img className="login_img" src="https://img.icons8.com/android/24/000000/twitter.png" alt="anon icon"/>
                    </button>
                    <button className="login_button" onClick={signInWithAnon}>
                        <h5 className="button_text" >Login Anonymous</h5>
                        <img className="login_img" src="https://img.icons8.com/small/32/000000/anonymous-mask.png" alt="anon icon"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogIn;