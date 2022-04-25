import React from 'react';
import {useAuth} from "../../context/AuthContext";
import {Avatar, Button, InputAdornment, TextField} from "@mui/material";
import styles from "./styles.module.scss"
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";

const UserInfo = () => {

    const {currentUser, logout, setSearchTerm} = useAuth()
    const navigate = useNavigate()

    const clickHandler = async () => {
        try {
            await logout()
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.userInfoWrapper}>
                <Avatar src={currentUser.photoURL} alt=""/>
                {currentUser?.displayName}
                <Button sx={{color: "inherit", fontFamily: "inherit"}} onClick={clickHandler}>Log out</Button>
            </div>
            <div>
                <TextField
                    onChange={(e) => setSearchTerm(() => e.target.value)}
                    variant="outlined"
                    label="Search"
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                        sx: {borderRadius: "20px"}
                    }}
                />
            </div>
        </div>
    );
};

export default UserInfo;
