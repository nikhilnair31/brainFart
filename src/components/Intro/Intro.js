import React from 'react';
import './Intro.scss';

const Intro = (props) => (
    <div className="intro_wrapper">
        <div className="intro">
            <img className="personal_img" src={props.myImgPath} alt="myFace"/>
            <h1>IdeaHub</h1>
            <h2>Desc</h2>
            <h3>By Me</h3>
        </div>
    </div>
);

export default Intro;