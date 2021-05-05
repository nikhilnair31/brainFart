import React, {useState, useEffect,  createContext} from "react";
import { auth } from "../helpers/firebase"

export const UserContext = createContext({user: null})

export default (props) => {
    const [user, setuser] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
			console.log(`user: ${JSON.stringify(user)}\n`);
            if(user){
                const { displayName, email, photoURL, isAnonymous }  = user;
                setuser({ displayName, email, photoURL, isAnonymous })
            }
        })
    }, []);

    return (
        <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    );
}