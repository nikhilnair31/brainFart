import React, { useContext }  from 'react';
import { UserContext } from '../../providers/UserProvider';
import { ConfirmContext } from '../../providers/ConfirmProvider';
import { dbref } from '../../helpers/firebase.js';
import './Confirm.scss';

const Confirm = () => {
    const {conf, pid} = useContext(ConfirmContext);
    const [showConf, setShowConf] = conf;
    const [postID, setPostID] = pid;

    const delOrCancel = (toDel) => {
        console.log(`delOrCancel\ntoDel: ${toDel} | postID: ${postID}`);
        if (toDel) 
            dbref.collection('posts').doc(postID).delete();
        document.querySelector(".confirm").style.display = "none"
        setShowConf(false)
    }

    return (
        <div className="confirm">
            <div className="confirm_section">
                <p className="confirm_text" >Are you sure?</p>
                <button className="confirm_button" onClick={() => delOrCancel(true)}>
                    <h5 className="button_text" >Confirm</h5>
                    {/* <img className="button_img" src="https://img.icons8.com/ios-glyphs/24/000000/google-logo.png" alt="confirm icon"/> */}
                </button>
                <button className="cancel_button" onClick={() => delOrCancel(false)}>
                    <h5 className="button_text" >Cancel</h5>
                    {/* <img className="button_img" src="https://img.icons8.com/ios-glyphs/24/000000/google-logo.png" alt="cancel icon"/> */}
                </button>
            </div>
        </div>
    );
}

export default Confirm;