import React from 'react';
import './Banner.scss';
import '../Intro/Intro.js'; 

const Banner = () => {
    return(
        <div className="banner_wrapper">
            <div className="banner">
                <img className="personal_img" src='./images/idea_icon1.png' alt="myFace"/>
                <div className="others">
                    <button>About</button>
                    <input type="image" className="switch_button" src={'./images/refresh512.png'} alt="Submit"/>
                </div>
            </div>
        </div>
    );
}

export default Banner;