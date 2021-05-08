import React, {useState, useEffect,  createContext} from "react";
import { auth } from "../helpers/firebase"

export const UserContext = createContext({user: null})

const UserProvider = (props) => {
    const [userState, setUser] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
			// console.log(`USERPROVIDER\n user: ${JSON.stringify(user)}\n`);
            if(user !== null){
                const { uid, displayName, email, photoURL, isAnonymous }  = user;
                setUser({ uid, displayName, email, photoURL, isAnonymous })
            }
            else if(user === null){
                setUser(null);
            }
        })
    }, []);

    return (
        <UserContext.Provider value={userState}>{props.children}</UserContext.Provider>
    );
}
export default UserProvider;