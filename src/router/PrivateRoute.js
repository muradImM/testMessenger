import React from 'react';
import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {LOGIN_PAGE} from "./consts";

const PrivateRote = ({children}) => {

    const {currentUser} = useAuth()

    return (
        <>
            {currentUser ? children : <Navigate to={LOGIN_PAGE}/>}
        </>
    )
}

export default PrivateRote;
