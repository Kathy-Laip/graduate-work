import React, {useState} from "react";
import {BrowserRouter, Routes, Route, Router, Link} from 'react-router-dom';
import { Exit } from "../pages/Exit";
import { WorkPlace } from "../pages/WorkPlace";
import { WorkSchedule } from "../pages/WorkSchedule";


export const App: React.FC = () => {
    const [state, setState] = useState({
        flagEntrance: true
    })

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
                    <Route index element={<Exit flag={state.flagEntrance} change={changeFlagExitOrSignUp}/>} path='/'></Route>
                    <Route element={<WorkPlace/>} path='/workBook'></Route>
                    <Route element={<WorkSchedule/>} path='/workBook/workSchedule'></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}