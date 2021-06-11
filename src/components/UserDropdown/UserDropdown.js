import React, {}  from 'react';
import { auth } from "../../helpers/firebase";
import './UserDropdown.scss';

const UserDropdown = () => {
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
                {props.children}
            </a>
        );
    }

    return (
        <div className="userdrop">
            <DropdownItem newtab='_blank' link="https://drive.google.com/file/d/1SsWLGNYQczc27lS7rkqQ-wRzAWuFKXTp/view?usp=sharing">Privacy Policy</DropdownItem>
            <p className="main_menu_item" onClick={logOut}>Signout</p>
        </div>
    );
}

export default UserDropdown;