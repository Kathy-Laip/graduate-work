import React from "react";
import { switchBlock } from "../constants/const";
import {Link} from 'react-router-dom'
import {ISCH} from '../interfaces/interface'

type BlockSchedule = {
    theme: string,
    type: string,
    date: string,
    data: Function
}

export const ScheduleBlock: React.FC<BlockSchedule> = (props) => {
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
                <button className="come btn1 btnGreen bdR5"><Link to='/workBook/workSchedule'>Перейти</Link></button>
            </div>
        </div>
    )
}