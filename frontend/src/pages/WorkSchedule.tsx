import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import arrowLeft from "../pictures/arrowLeft.svg"
import {User} from '../architecture/User'
import {WorkSchUni} from '../components/ScheduleWorkUni'
import {WorkSchSchool} from '../components/ScheduleWorkSchool'
import { ScheduleBlockSettings } from "../components/ScheduleBlockSettings";
import { ScheduleFabrica } from "../architecture/ScheduleFabrica"

type WorkSch = {
    user: User
}

export const WorkSchedule: React.FC<WorkSch> = (props) => {

    (async () => {
        const saved = JSON.parse(localStorage.getItem('user')!)
        
        props.user.login = saved.login
        props.user.password = saved.password
        let schFabrica = new ScheduleFabrica()
        let type = saved.currentSchedule !== undefined ? saved.currentSchedule.type === 'университет' ? 'uni' : 'school' : ''
        if(saved.currentSchedule){
            props.user.currentSchedule = schFabrica.create(saved.currentSchedule.id, saved.currentSchedule.name, type, saved.currentSchedule.createDate)
        }
    })()

    console.log(props.user.currentSchedule)
    return (
        <div className="workScheduleMain">
            <SideBar/>
            {props.user.currentSchedule !== 'ERROR_CREATE' && props.user.currentSchedule!.settings === undefined && (<ScheduleBlockSettings/>)}
            <div className="bodyWork">
                <div className="nav">
                    <div className="leftNav">
                            <img src={arrowLeft}/>
                            <div className="back"><Link to='/workBook'><h3 className="h3">Назад в рабочий каталог</h3></Link></div>
                    </div>
                    <div className="rightNav">
                        <button className="btn1 bdR5 btnYellow">Настроить расписание</button>
                    </div>
                </div>
                <div className="workBodyShedules">
                    {props.user.currentSchedule && props.user.currentSchedule !== 'ERROR_CREATE' && (props.user.currentSchedule!.type === 'uni' ?
                         (<WorkSchUni user={props.user}/>)
                         :
                         (<WorkSchSchool user={props.user}/>)
                    )
                    }
                </div>
            </div>
        </div>
    )
}