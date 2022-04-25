import React, {useEffect, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import UsersList from "../UserList/UsersList";
import Chat from "../Chat/Chat";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {firestore} from "../../firebase";
import styles from "./styles.module.scss"
import UserInfo from "../UserInfo/UserInfo";
import {CircularProgress} from "@mui/material";

const Board = () => {

    const {activeChatUserID, currentUser, searchTerm} = useAuth()

    const [users, loadingUsers] = useCollectionData(firestore
        .collection("users")
        .orderBy("lastMessageTime", "desc"))

    const [updatedUsers, loadingUpdatedUser] = useCollectionData(firestore
        .collection(`lastMessage${currentUser.uid}`)
        .orderBy("time", "desc"))

    const [filteredArr, setFilteredArr] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(loadingUsers || loadingUpdatedUser)
        const mappedValues = users?.map(e => {

            updatedUsers?.map(i => {
                if (i.id === e.id) {

                    e.lastMessageTime = i.time
                    e.lastMessageValue = i.value
                }
                return i
            })
            return e
        })

        mappedValues?.sort((a, b) => {
            if (a.lastMessageTime === "" || a.lastMessageTime === null) return -1
            if (b.lastMessageTime === "" || b.lastMessageTime === null) return 1

            return -(a.lastMessageTime.seconds - b.lastMessageTime.seconds)
        })

        const filteredValues = mappedValues?.filter((e) => {
            if (searchTerm.trim() === "") return true
            return e.name.toLowerCase().includes(searchTerm.toLowerCase());
        })

        setFilteredArr(() => filteredValues)

    }, [searchTerm, users, updatedUsers, loadingUsers, loadingUpdatedUser])

    return (
        <div className={styles.container}>
            <div className={styles.dashboard}>
                <UserInfo/>
                {loading && <CircularProgress className={styles.loader}/>}
                {!loading && <UsersList values={filteredArr ? filteredArr : users}/>}
            </div>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                {activeChatUserID && users?.map(e => {
                    return e.id === activeChatUserID
                        ? <Chat key={e.id} {...e}/>
                        : null
                })
                }
                {!activeChatUserID &&
                    <div className={styles.initialMessage}>
                        <p>Choose user <span>&#128522;</span></p>
                    </div>}
            </div>
        </div>
    );
};

export default Board;




