import React, {useState,  createContext} from "react";

export const ConfirmContext = createContext()

const ConfirmProvider = (props) => {
    const [showConf, setShowConf] = useState(false)
    const [postID, setPostID] = useState('')

    return (
        <ConfirmContext.Provider value={{conf: [showConf, setShowConf], pid: [postID, setPostID]}}>{props.children}</ConfirmContext.Provider>
    );
}
export default ConfirmProvider;