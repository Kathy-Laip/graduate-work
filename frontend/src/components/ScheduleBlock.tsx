import React, { useEffect } from "react";
import { switchBlock } from "../constants/const";
import {Link, useNavigate} from 'react-router-dom'
import {ISCH} from '../interfaces/interface'
import {User} from '../architecture/User'
import { ScheduleFabrica } from "../architecture/ScheduleFabrica"


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
        localStorage.setItem('user', JSON.stringify(props.user))
        navigate('/workBook/workSchedule')
    }

    // useEffect(() => {
    //     const saved = JSON.parse(localStorage.getItem('user')!)
        
    //     props.user.login = saved.login
    //     props.user.password = saved.password
    //     let schFabrica = new ScheduleFabrica()
    //     console.log(saved)
    //     let type = saved.currentSchedule !== undefined ? saved.currentSchedule.type === 'университет' ? 'uni' : 'school' : ''
    //     if(saved.currentSchedule){
    //         props.user.currentSchedule = schFabrica.create(saved.currentSchedule.id, saved.currentSchedule.theme, type, saved.currentSchedule.date)
    //     }
    //     console.log(props.user)
    //   }, [])

    // useEffect(() => {
    //     localStorage.setItem('user', JSON.stringify(props.user))
    //     console.log(props.user)
    // }, [props.user.currentSchedule])


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