import React, {useEffect, useState} from 'react';
import {Avatar, CircularProgress, InputAdornment, TextField} from "@mui/material";
import styles from "./styles.module.scss";
import SendIcon from '@mui/icons-material/Send';
import {db, firestore} from "../../firebase";
import {setDoc, doc} from "firebase/firestore";
import {useAuth} from "../../context/AuthContext";
import firebase from "firebase/compat/app";
import {useCollectionData} from "react-firebase-hooks/firestore";
import soundNotification from "../../soundNotification.wav";
import Message from "../Message/Message";

const Chat = ({id, name, photo, chat}) => {

    const audio = new Audio(soundNotification);
    const [value, setValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const {currentUser} = useAuth()

    const [values, loading] = useCollectionData(firestore.collection(`messages/${currentUser.uid}/${id}`).orderBy("time"))

    useEffect(() => {
        setIsLoading(() => loading)
    }, [loading]);

    const sendMessage = async () => {

        if (value.trim()) {
            setValue("")

            await firestore.collection(`messages/${currentUser.uid}/${id}`).add(
                {
                    directed: "from",
                    value: value,
                    time: firebase.firestore.FieldValue.serverTimestamp(),
                    id: id
                })

            await setDoc(doc(db, `lastMessage${currentUser.uid}`, `${currentUser.uid}${id}`), {
                directed: "from",
                value: value,
                time: firebase.firestore.FieldValue.serverTimestamp(),
                id: id
            })

            const some = async () => {
                await fetch("https://api.chucknorris.io/jokes/random")
                    .then((response) => {
                        return response.json();
                    })
                    .then(({value}) => {
                        firestore.collection(`messages/${currentUser.uid}/${id}`).add(
                            {
                                directed: "to",
                                value: value,
                                time: firebase.firestore.FieldValue.serverTimestamp(),
                                id: id
                            })

                        setDoc(doc(db, `lastMessage${currentUser.uid}`, `${currentUser.uid}${id}`), {
                            directed: "to",
                            value: value,
                            time: firebase.firestore.FieldValue.serverTimestamp(),
                            id: id
                        })

                    })
                    .then(() => audio.play())
            }
            await setTimeout(some, 5000)
        }
    }

    const keyHandler = ({key}) => {
        if (key === "Enter") sendMessage()
    }

    const messageRender = arr => {

        return arr.map((e, i) => {
            if (e.directed === "from") {
                return <Message {...e} key={i}/>
            } else if (e.directed === "to") {
                return <Message avatar={photo} {...e} key={i}/>
            }
            return null
        })
    }

    return (
        <>
            <div className={styles.header}>
                <Avatar src={photo} alt={"photo"}/>
                {name}
            </div>
            <div className={styles.messagesWrapper}>
                {chat && messageRender(chat)}
                {values && messageRender(values)}

                {values?.length === 0 && !chat &&
                    <div className={styles.emptyChat}>
                        <p>No messages yet</p>
                    </div>
                }

                {isLoading && <CircularProgress className={styles.loader}/>}

            </div>
            <div className={styles.inputWrapper}>
                <TextField
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    fullWidth
                    sx={{margin: " 0 20px"}}
                    variant="outlined"
                    label="Type your message"
                    size="small"
                    InputProps={{
                        onKeyDown: keyHandler,
                        endAdornment: (
                            <InputAdornment onClick={sendMessage} className={styles.adornment} position="end">
                                <SendIcon/>
                            </InputAdornment>
                        ),
                        sx: {borderRadius: "20px"}
                    }}
                />
            </div>
        </>
    );
};

export default Chat;
