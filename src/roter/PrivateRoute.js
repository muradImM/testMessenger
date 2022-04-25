import React, {useContext} from 'react';
import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const PrivateRote = ({children}) => {

    const {currentUser} = useAuth()

    return (
        <>
            {currentUser ? children : <Navigate to={"login"}/>}
        </>
    )
}

export default PrivateRote;
