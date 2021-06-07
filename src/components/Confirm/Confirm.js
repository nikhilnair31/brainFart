import React, { useContext, useEffect, useRef }  from 'react';
import { toast } from 'react-toastify';
import { ConfirmContext } from '../../providers/ConfirmProvider';
import { dbref } from '../../helpers/firebase.js';
import './Confirm.scss';

const Confirm = () => {
    const {conf, pid} = useContext(ConfirmContext);
    const [showConf, setShowConf] = conf;
    const [postID, setPostID] = pid;
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    alert("You clicked outside of me!");
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const delOrCancel = (toDel) => {
        console.log(`delOrCancel\ntoDel: ${toDel} | postID: ${postID}`);
        if (toDel) {
            dbref.collection('posts').doc(postID).delete();
            toast("Idea deleted.", { position: "bottom-left", autoClose: 3000, hideProgressBar: false, closeOnClick: true,
                pauseOnHover: true, draggable: false, progress: undefined, });
        }
        setShowConf(false);
    }

    return (
        <div className="confirm" ref={wrapperRef}>
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