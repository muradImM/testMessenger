import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Board from "../Components/Board/Board";
import Login from "../Components/Login";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="login" element={<Login/>}/>
            <Route path={"/"} element={
                <PrivateRoute>
                    <Board/>
                </PrivateRoute>
            }/>
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>

    );
};

export default AppRouter;
