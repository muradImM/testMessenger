import React, {useEffect, useRef, useState} from 'react';
import styles from "./styles.module.scss"
import {Avatar} from "@mui/material";

const Message = ({directed, value, time, avatar}) => {

    const [className, setClassName] = useState("")
    const [wrapperClass, setWrapperClass] = useState("")

    const scrollRef = useRef()

    useEffect(() => {

        switch (directed) {
            case "from":
                setWrapperClass(() => `${styles.fromWrapper}`)
                return setClassName(() => `${styles.from}`)
            case "to":
                setWrapperClass(() => `${styles.toWrapper}`)
                return setClassName(() => `${styles.to}`)
            default:
                return null
        }
    }, [directed])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [value])

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: "2-digit",
        hour12: false,
        minute: "2-digit",
        second: "2-digit"
    }

    const messageTime = new Date(time?.seconds * 1000).toLocaleDateString([], options)

    return (
        <>
            <div className={wrapperClass} style={{display: "flex"}}>
                {directed === "to" && <Avatar className={styles.avatar} src={avatar}/>}
                <div ref={scrollRef} className={`${className} ${styles.textWrapper}`}>

                    <div>
                        <p className={`${styles.text}`}>
                            {value}
                        </p>
                        {messageTime !== "Invalid data" && <small>{messageTime}</small>}
                    </div>
                </div>
            </div>
        </>

    )
}

export default Message;


