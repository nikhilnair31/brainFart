import React, { useContext, useEffect, useRef }  from 'react';
import { UserContext } from '../../../providers/UserProvider';
import { ConfirmContext } from '../../../providers/ConfirmProvider';
import { dbref } from '../../../helpers/firebase.js';
import './Card.scss';

const Card = (props) => {
    const user = useContext(UserContext);
    const {conf, pid} = useContext(ConfirmContext);
    const [showConf, setShowConf] = conf;
    const [postID, setPostID] = pid;
    const upRef = useRef(null);
    const downRef = useRef(null);

    useEffect(() => {  
        console.log(`useEffect`);
        addColorToVoted()
    }, []);

    const addColorToVoted = () => {
        console.log(`addColorToVoted`);
        dbref.collection("posts").doc(props.post_id).collection('votes').onSnapshot(snapshot => {
            var voteDir = 0;
            var uidInVotes = false;
            for(var i=0; i<snapshot.docs.length; i++){
                if(snapshot.docs[i].id === user.uid){
                    uidInVotes = true; 
                    voteDir = snapshot.docs[i].data().voteDirection;
                    console.log(`addColorToVoted\n props.post_id:${props.post_id} | voteDir:${voteDir} | uidInVotes:${uidInVotes} | user.uid:${user.uid}\n`);
                    break;
                }
            }
            if(uidInVotes){
                if(voteDir == 1){
                    upRef.current.style.backgroundColor = "#fe2b5d";
                }
                else if(voteDir == -1){
                    downRef.current.style.backgroundColor = "#fe2b5d";
                }
            }
            else if(voteDir === 0){
                upRef.current.style.backgroundColor = "rgb(45, 45, 45)";
                downRef.current.style.backgroundColor = "rgb(45, 45, 45)";
            }
        });
    }

    const voteThisIdea = (inverter) => {
        var voteDir = 0;
        var uidInVotes = false;
        //console.log(`voteThisIdea voteDir: ${voteDir} | uidInVotes: ${uidInVotes}`);
        dbref.collection("posts").doc(props.post_id).collection('votes').get().then(snapshot => {
            for(var i=0; i<snapshot.docs.length; i++){
                if(snapshot.docs[i].id === user.uid){
                    uidInVotes = true; 
                    voteDir = snapshot.docs[i].data().voteDirection;
                    //console.log(`voteThisIdea\n user.uid:${user.uid} | uidInVotes:${uidInVotes} | voteDir:${voteDir}\n`);
                    break;
                }
            }
            //console.log(`voteThisIdea\n uidInVotes: ${uidInVotes}\n user.uid: ${user.uid}\n\nvoteDir: ${voteDir} | inverter: ${inverter}`);
            if(!uidInVotes){
                //console.log(`voteThisIdea\n ${uidInVotes}\n user.uid: ${user.uid}\n has not already voted\nvoteDir: ${voteDir} | inverter: ${inverter}`);
                dbref.collection("posts").doc(props.post_id).collection('votes').doc(user.uid).set({
                    displayName: user.displayName,
                    utc:Date.now(),
                    voteDirection: inverter
                })
                dbref.collection('posts').doc(props.post_id).update({'upvotes': props.post_upvotes + (inverter*1)});
            }
            else{
                //console.log(`voteThisIdea\n uidInVotes: ${uidInVotes}\n user.uid: ${user.uid}\n has already voted\nvoteDir: ${voteDir} | inverter: ${inverter}`);
                if(voteDir === inverter){
                    //console.log(`voteDir = inverter so delete vote from sub-coll to nullify vote`);
                    dbref.collection("posts").doc(props.post_id).collection('votes').doc(user.uid).delete();
                    dbref.collection('posts').doc(props.post_id).update({'upvotes': props.post_upvotes - (voteDir*1)});
                }
                else if(voteDir !== inverter){
                    //console.log(`voteDir != inverter so delete vote from sub-coll and vote in reverse again`);
                    dbref.collection("posts").doc(props.post_id).collection('votes').doc(user.uid).delete();
                    voteThisIdea(inverter);
                }
            }
            addColorToVoted()
        });
    }

    const showConfirmation = () => {
        //console.log(`showConfirmation\nshowConf: ${showConf} | props.post_id: ${props.post_id}`);
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
        <div className="card" id={props.post_id}>
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
                <button className="upvote_button" ref={upRef} onClick={() => voteThisIdea(1)}>
                    <img src={'./images/up192.png'}  alt="upvote icon"/>
                </button>
                <p className="votes_text" >{props.post_upvotes}</p>
                <button className="downvote_button" ref={downRef} onClick={() => voteThisIdea(-1)}>
                    <img src={'./images/down192.png'}  alt="downvote icon"/>
                </button>
            </div>
        </div>
    );
}

export default Card;