import React, { useContext}  from 'react';
import { UserContext } from '../../../providers/UserProvider';
import { ConfirmContext } from '../../../providers/ConfirmProvider';
import { dbref } from '../../../helpers/firebase.js';
import './Card.scss';

const Card = (props) => {
    const user = useContext(UserContext);
    const {conf, pid} = useContext(ConfirmContext);
    const [showConf, setShowConf] = conf;
    const [postID, setPostID] = pid;

    const voteThisIdea = (inverter) => {
        dbref.collection("posts").doc(props.post_id).collection('votes').onSnapshot(snapshot => {
            var uidInVotes = false;
            for(var i=0; i<snapshot.docs.length; i++){
                if(snapshot.docs[i].id === user.uid){
                    uidInVotes = true; 
                    console.log(`voteThisIdea\n uidInVotes:${uidInVotes}\n`);
                    break;
                }
                // console.log(`voteThisIdea\n i: ${i}\n snapshot.docs[i].data().uid  ${snapshot.docs[i].data().uid}\n user.uid: ${user.uid}\n uidInVotes:${uidInVotes}\n`);
            }
            if(!uidInVotes){
                console.log(`voteThisIdea\n ${!uidInVotes}\n user.uid: ${user.uid}\n has not already voted`);
                dbref.collection("posts").doc(props.post_id).collection('votes').doc(user.uid).set({
                    displayName: user.displayName,
                    utc:Date.now(),
                    voteDirection: inverter
                })
                // dbref.collection('posts').doc(props.post_id).collection('votes').add({ uid: user.uid, displayName: user.displayName, utc:Date.now(), voteDirection: inverter });
                dbref.collection('posts').doc(props.post_id).update({'upvotes': props.post_upvotes + (inverter*1)});
            }
            else{
                console.log(`voteThisIdea\n ${uidInVotes}\n user.uid: ${user.uid}\n has already voted`);
            }
        });
    }

    const showConfirmation = () => {
        console.log(`showConfirmation\nshowConf: ${showConf} | props.post_id: ${props.post_id}`);
        document.querySelector(".confirm").style.display = "flex";
        setPostID(props.post_id)
        setShowConf(true);
    }

    //make date in DD/MM/YYYY HH:MM AM/PM format
    const utcToTime = (utc) => {
        var dateobj, formattedTime, date, month, year, hours, minutes;
        if(utc.toString().length == 10){
            dateobj = new Date(0);
            dateobj.setUTCSeconds(utc);
            date = (dateobj.getDate() > 9)? ("" + dateobj.getDate()): ("0" + dateobj.getDate());
            month = (dateobj.getMonth() > 9)? ("" + dateobj.getMonth()): ("0" + dateobj.getMonth());
            year = dateobj.getFullYear();
            hours = dateobj.getHours();
            minutes = (dateobj.getMinutes() > 9)? ("" + dateobj.getMinutes()): ("0" + dateobj.getMinutes());
            formattedTime = dateobj.toLocaleDateString("en-IN") + ' ' + hours + ':' + minutes;
        }
        else if(utc.toString().length == 13){
            dateobj = new Date(10);
            dateobj.setUTCSeconds(utc);
            date = (dateobj.getDate() > 9)? ("" + dateobj.getDate()): ("0" + dateobj.getDate());
            month = (dateobj.getMonth() > 9)? ("" + dateobj.getMonth()): ("0" + dateobj.getMonth());
            year = dateobj.getFullYear();
            hours = dateobj.getHours();
            minutes = (dateobj.getMinutes() > 9)? ("" + dateobj.getMinutes()): ("0" + dateobj.getMinutes());
            formattedTime = new Date(utc).toLocaleDateString("en-IN") + ' ' + hours + ':' + minutes;
        }
        // formattedTime = date + '/' + month + '/' + year + ' ' +hours + ':' +minutes;
        // console.log(`utcToTime:\n${utc}\n${date}/${month}/${year} - ${hours}:${minutes}\n`);
        return formattedTime;
    }

    const timeDifference = (utc) => {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
    
        var now = Math.floor(Date.now())
        var elapsed = now - utc;
        // console.log(elapsed, '=', now, '-', utc);
    
        if (elapsed < msPerMinute) {
            return Math.round(elapsed/1000) + ' seconds ago';   
        }
        else if (elapsed < msPerHour) {
            return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
        else if (elapsed < msPerDay ) {
            return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
        else if (elapsed < msPerMonth) {
            return Math.round(elapsed/msPerDay) + ' days ago';   
        }
        else if (elapsed < msPerYear) {
            return Math.round(elapsed/msPerMonth) + ' months ago';   
        }
        else {
            //return 'around ' + Math.round(elapsed/msPerYear ) + ' years ago'; 
            return Math.round(elapsed/msPerYear ) + ' years ago';   
        }
    }

    return (
        <div className="card">
            <div className="text_section">
                {/* <p className="time_text" >{props.post_id}</p>
                <p className="time_text" >{props.op_uid}</p> */}
                <div className="text_up_section">
                    <p className="time_text" >{timeDifference(props.post_utc)}</p>
                    {(user.uid === props.op_uid) && <button className="delete_button" onClick={() => showConfirmation()}>Delete </button>}
                </div>
                <p className="displayName_text" >{props.op_displayName}</p>
                <h2 className="idea_text" >{props.post_idea_text}</h2>
            </div>
            <div className="button_section">
                <button className="upvote_button" onClick={() => voteThisIdea(1)}>
                    <img src={'./images/up192.png'}  alt="upvote icon"/>
                </button>
                <p className="votes_text" >{props.post_upvotes}</p>
                <button className="downvote_button" onClick={() => voteThisIdea(-1)}>
                    <img src={'./images/down192.png'}  alt="downvote icon"/>
                </button>
            </div>
        </div>
    );
}

export default Card;