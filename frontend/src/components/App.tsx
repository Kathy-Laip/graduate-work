import React, {useState} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Exit } from "../pages/Exit";


export const App: React.FC = () => {
    const [state, setState] = useState({
        flagEntrance: false
    })

    const changeFlagExitOrSignUp = () => {
        setState(prev =>({
            ...prev, 
            flagEntrance: !prev.flagEntrance
        }))
    }
    
    return (
        <>
          <Exit flag={state.flagEntrance} change={changeFlagExitOrSignUp}/>
        </>
    )
}