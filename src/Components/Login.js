import React, {useState} from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/material";

const Login = () => {

    const sxProps = {
        box: {
            maxWidth: "400px",
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#b7b7a4",
            padding: "20px",
            borderRadius: "10px"
        },
        button: {
            marginTop: "10px",
            marginBottom: "10px"
        }
    }

    const [loading, setLoading] = useState(false)
    const {loginWithGoogle, loginAsGuest} = useAuth()
    const navigate = useNavigate()

    const loginWithGoogleHandler = async (e) => {
        e.preventDefault()
        setLoading(() => true)
        try {
            await loginWithGoogle()
            navigate("/")
        } catch (error) {
            console.log(error)
        }
        setLoading(() => false)
    }

    const loginAsGuestHandler = async (e) => {
        e.preventDefault()
        setLoading(() => true)
        try {

            await loginAsGuest()
            navigate("/")
        } catch (error) {
            console.log(error)
        }
        setLoading(() => false)
    }

    return (
        <Box sx={sxProps.box}>
            <Button disabled={loading} sx={sxProps.button} fullWidth onClick={loginWithGoogleHandler}
                    variant={"contained"}
                    startIcon={<GoogleIcon/>}>
                Sign in with Google
            </Button>
            <Button disabled={loading} sx={sxProps.button} fullWidth onClick={loginAsGuestHandler} variant={"contained"}
                    startIcon={<DirectionsWalkIcon/>}>
                Continue as guest
            </Button>
        </Box>
    );
};

export default Login;
