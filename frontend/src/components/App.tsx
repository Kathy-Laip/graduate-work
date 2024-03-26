import React, {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route, Router, Link} from 'react-router-dom';
import { User } from "../architecture/User";
import { Exit } from "../pages/Exit";
import { WorkPlace } from "../pages/WorkPlace";
import { WorkSchedule } from "../pages/WorkSchedule";


export const App: React.FC = () => {
    const [state, setState] = useState({
        flagEntrance: true
    })
    const [user, setUser] = useState(new User('',''))

    const changeFlagExitOrSignUp = () => {
        setState(prev =>({
            ...prev, 
            flagEntrance: !prev.flagEntrance
        }))
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Exit flag={state.flagEntrance} change={changeFlagExitOrSignUp} user={user}/>} path='/'></Route>
                    <Route element={<WorkPlace user={user}/>} path='/workBook'></Route>
                    <Route element={<WorkSchedule user={user}/>} path='/workBook/workSchedule' ></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}