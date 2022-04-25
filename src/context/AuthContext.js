import React, {useContext, createContext, useState, useEffect} from 'react';
import {auth} from "../firebase";
import {getAuth, signInAnonymously} from "firebase/auth";
import firebase from "firebase/compat/app";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState()
    const [activeChatUserID, setActiveChatUserID] = useState()
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {

            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const loginWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const {user} = await auth.signInWithPopup(provider)

        return user
    }

    const loginAsGuest = async () => {
        const authGuest = getAuth()
        return await signInAnonymously(authGuest)

    }

    const logout = () => {
        return auth.signOut()
    }

    const value = {
        searchTerm,
        setSearchTerm,
        currentUser,
        activeChatUserID,
        setActiveChatUserID,
        loginAsGuest,
        loginWithGoogle,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;