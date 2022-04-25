import React, {useEffect, useState} from 'react';
import {Avatar} from "@mui/material";
import styles from "./styles.module.scss"
import {useAuth} from "../../context/AuthContext";

const User = ({photo, name, chat, id, lastMessageTime, lastMessageValue}) => {

    const [lastMessage, setLastMessage] = useState(null);
    const [timeOfLast, setTimeOfLast] = useState(0);

    useEffect(() => {
        if (lastMessageValue && lastMessageTime) {
            setLastMessage(lastMessageValue)
            setTimeOfLast(lastMessageTime ? lastMessageTime : 0)
        } else if (!!chat) {
            setLastMessage(chat.at(-1).value)
            setTimeOfLast(chat.at(-1).time)
        }
    }, [chat, id, lastMessageTime, lastMessageValue])

    const options = {day: 'numeric', month: 'short', year: 'numeric'}
    const lastMessageTimeToString = new Date(timeOfLast.seconds * 1000).toLocaleDateString([], options)

    const {activeChatUserID, setActiveChatUserID} = useAuth()

    const clickHandler = () => {
        if (activeChatUserID !== id) {
            setActiveChatUserID(id)
        }
    }

    return (
        <div onClick={clickHandler} className={`${styles.container} ${activeChatUserID === id && styles.active}`}>
            <Avatar src={photo}/>
            <div className={`${styles.wrapper} ${activeChatUserID === id && styles.active}`}>
                <div className={styles.nameWrapper}>
                    <h4 className={styles.textContent}>{name}</h4>
                    {lastMessageTimeToString !== "Invalid Date"
                        ? <p className={styles.textContent}>{lastMessageTimeToString}</p>
                        : null
                    }
                </div>
                <p className={`${styles.textContent} ${styles.sss}`}>{lastMessage}</p>
            </div>
        </div>
    );
};

export default User;
