import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Board from "../Components/Board/Board";
import Login from "../Components/Login";
import {HOME_PAGE, LOGIN_PAGE} from "./consts";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={LOGIN_PAGE} element={<Login/>}/>
            <Route path={HOME_PAGE} element={
                <PrivateRoute>
                    <Board/>
                </PrivateRoute>
            }/>
            <Route
                path="*"
                element={<Navigate to={HOME_PAGE} replace />}
            />
        </Routes>

    );
};

export default AppRouter;
