import React, {}  from 'react';
//import { useHistory } from "react-router-dom";
import { auth } from "../../helpers/firebase";
import './UserDropdown.scss';

const UserDropdown = () => {
    //const history = useHistory();

    const logOut = () => {
        auth.signOut().then(()=> {
            console.log(`USER res\n auth: ${JSON.stringify(auth)}\n `);
            //history.push('/');
        }).catch((error) => {
            console.log(`USER error\n error.message: ${JSON.stringify(error.message)}\n `);
        })
        console.log(`USER initial\n auth: ${JSON.stringify(auth)}\n `);
    }

    function DropdownItem(props) {
        return (
            <a href={props.link} target={props.newtab} className="menu_item">
                <img className="icon_img" src={props.leftIcon} alt="icon"/>
                {props.children}
            </a>
        );
    }

    return (
        <div className="userdrop">
            <DropdownItem leftIcon="./images/about_icon.png" newtab='' link="#">About</DropdownItem>
            <DropdownItem leftIcon="./images/privacy_icon.png" newtab='_blank' link="https://docs.google.com/document/d/14Q2jeHABjQZgS-B4zeXYWJ7g1-WPgBSSEIqeVNpG414/edit?usp=sharing">Privacy Policy</DropdownItem>
            <p className="menu_item" onClick={logOut}>Signout</p>
        </div>
    );
}

export default UserDropdown;