import React, { useEffect } from "react";
import { switchBlock } from "../constants/const";
import {Link, useNavigate} from 'react-router-dom'
import {ISCH} from '../interfaces/interface'
import {User} from '../architecture/User'
import { ScheduleFabrica } from "../architecture/ScheduleFabrica"
import { ScheduleUni } from "../architecture/ScheduleUni";
import { ScheduleSchool } from "../architecture/ScheduleSchool";


type BlockSchedule = {
    id: number,
    theme: string,
    type: string,
    date: string,
    data: Function,
    user: User
}

export const ScheduleBlock: React.FC<BlockSchedule> = (props) => {
    const navigate = useNavigate()

    const linkScheduleWork = () => {
        props.user.currentSchedule = props.user.listOfSchedules.filter(el => el !== 'ERROR_CREATE' ? el.id === props.id : [])[0]
        if(props.user.currentSchedule !== undefined && props.user.currentSchedule !== "ERROR_CREATE") {
            let has = props.user.openSchedules.filter(el => el.id === props.id)
            if(has.length === 0) props.user.openSchedules.push(props.user.currentSchedule)
        } 
        
        localStorage.setItem('user', JSON.stringify(props.user))
        
        navigate('/workBook/workSchedule')
    }


    return (
        <div className="scheduleBlock bdR5">
            <span>{props.theme}</span>
            <span>{props.date.split(' ')[0].split('-').reverse().join('.')}</span>
            <span>Тип учреждения: {props.type === 'uni'? 'университет': props.type === 'school' ? 'школа' : props.type}</span>
            <div className="buttonSchedule">
                <button className="edit btn1 btnYellow bdR5" onClick={() => {
                    switchBlock('editProject')
                    props.data(props.theme, props.type, props.date)
                }}>Редактировать</button>
                <button className="come btn1 btnGreen bdR5" onClick={linkScheduleWork}>Перейти</button>
            </div>
        </div>
    )
}