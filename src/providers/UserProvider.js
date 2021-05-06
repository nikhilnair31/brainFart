import React, {useState, useEffect,  createContext} from "react";
import { auth } from "../helpers/firebase"

export const UserContext = createContext({user: null})

export default (props) => {
    const [user, setuser] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
			console.log(`USERPROVIDER\n user: ${JSON.stringify(user)}\n`);
            if(user !== null){
                const { uid, displayName, email, photoURL, isAnonymous }  = user;
                setuser({ uid, displayName, email, photoURL, isAnonymous })
            }
            else if(user === null){
                setuser(null);
            }
        })
    }, []);

    return (
        <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    );
}