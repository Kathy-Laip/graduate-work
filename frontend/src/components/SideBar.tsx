import Reac from "react";
import {Link, useNavigate} from 'react-router-dom'
import { User } from "../architecture/User";
import acc from '../pictures/Vector.svg'
import close from '../pictures/Close.svg'
import {ScheduleUni} from '../architecture/ScheduleUni'
import {ScheduleSchool} from '../architecture/ScheduleSchool'

type SideType = {
    login: string,
    user: User,
    open: (ScheduleUni|ScheduleSchool)[]
    deleteId: Function
}

export const SideBar: React.FC<SideType> = (props) => {
    const navigate = useNavigate()

    const linkScheduleWork = (id: number) => {
        props.user.currentSchedule = props.user.listOfSchedules.filter(el => el !== 'ERROR_CREATE' ? el.id === id : [])[0]        
        localStorage.setItem('user', JSON.stringify(props.user))
        navigate('/workBook/workSchedule')
        window.location.reload()
    }

    
    return(
        <div className="sideBar">
            <img src={acc}/>
            <span>{props.login}</span>
            <div className="openWorks bdR5">
                <h3 className="h3">Рабочие вкладки:</h3>
                <div className="openWorksBlock">
                {/* <span className="underSpan"  onClick={() => props.change()}>Войти</span> */}
                    {props.open ? (
                        props.open.map(el => (<div className="themeClose">
                        <div className="theme"><span className="underSpan" onClick={() => linkScheduleWork(el.id)}>{el.name}</span><span className="tool-text" id='top'>{el.name}</span></div><img src={close} id='close' onClick={() => props.deleteId(el.id)}/>
                        </div>))
                    ): (<></>)}
                </div>
            </div>
        </div>
    )
}