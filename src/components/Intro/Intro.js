import React from 'react';
import './Intro.scss';

const Intro = (props) => {
    console.log(`props.imgURL: ${props.imgURL}`);
    return (
        <div className="intro_wrapper">
            <div className="intro">
                <div className="intro_head">
                    <img className="logo_img" src='./images/idea_icon1.png' alt="myFace"/>
                    <h1 className="title" >ideaHub</h1>
                    <img className="personal_img" src={props.imgURL} alt="myFace"/>
                </div>
                <h2>share ideas!</h2>
                <p>by<a href="https://twitter.com/_silhouettte_">@silhouettte</a></p>
            </div>
        </div>
    );
}

export default Intro;