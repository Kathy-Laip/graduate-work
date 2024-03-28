import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import arrowLeft from "../pictures/arrowLeft.svg"
import {User} from '../architecture/User'
import {WorkSchUni} from '../components/ScheduleWorkUni'
import {WorkSchSchool} from '../components/ScheduleWorkSchool'
import { ScheduleBlockSettingsUni } from "../components/ScheduleBlockSettingsUni";
import { ScheduleFabrica } from "../architecture/ScheduleFabrica"
import { ScheduleBlockSettingsSchool } from "../components/ScheduleBlockSettingsSchool";
import { AddOrEditPlansUni } from "../components/AddOrEditPlansUni";
import { EdiPlanUni } from "../components/EditPlanUni";

type WorkSch = {
    user: User
}

export const WorkSchedule: React.FC<WorkSch> = (props) => {
    const [setUni, isSetUni] = useState(false)
    const [setSchool, isSetSchool] = useState(false)
    const [addPlanUni, setAddPlanUni] = useState(false)
    const [editPlanUni, setEditPlanUni] = useState(false)

    const onSettings = () => {
        if(props.user.currentSchedule !== 'ERROR_CREATE' && props.user.currentSchedule!.type === 'uni') isSetUni(true)
        if(props.user.currentSchedule !== 'ERROR_CREATE' && props.user.currentSchedule!.type === 'school') isSetSchool(true)
    }

    const onSettingsFalse = () => {
        if(props.user.currentSchedule !== 'ERROR_CREATE' && props.user.currentSchedule!.type === 'uni') isSetUni(false)
        if(props.user.currentSchedule !== 'ERROR_CREATE' && props.user.currentSchedule!.type === 'school') isSetSchool(false)
    }

    const addPlanUniTrue = () => {
        setAddPlanUni(true)
    }
    const addPlanUniFalse = () => {
        setAddPlanUni(false)
    }

    const editPlanUniTrue = () => {
        setEditPlanUni(true)
    }
    const editPlanUniFalse = () => {
        setEditPlanUni(false)
    }

    (async () => {
        const saved = JSON.parse(localStorage.getItem('user')!)
        
        props.user.login = saved.login
        props.user.password = saved.password

        let schFabrica = new ScheduleFabrica()
        console.log(saved.currentSchedule)
        // let type = saved.currentSchedule !== undefined ? saved.currentSchedule.type === 'университет' ? 'uni' : 'school' : ''
        if(saved.currentSchedule){
            props.user.currentSchedule = schFabrica.create(saved.currentSchedule.id, saved.currentSchedule.name, saved.currentSchedule.type, saved.currentSchedule.createDate)
        }
    })()


    return (
        <div className="workScheduleMain">
            <SideBar/>
            {setUni && props.user.currentSchedule !== 'ERROR_CREATE' && props.user.currentSchedule!.type === 'uni' && (<ScheduleBlockSettingsUni onSettingsFalse={onSettingsFalse}/>)}
            {setSchool && props.user.currentSchedule !== 'ERROR_CREATE' && props.user.currentSchedule!.type === 'school' && (<ScheduleBlockSettingsSchool onSettingsFalse={onSettingsFalse}/>)}
            {addPlanUni && (<AddOrEditPlansUni deletePlan={addPlanUniFalse}/>)}
            {editPlanUni && (<EdiPlanUni deletePlan={editPlanUniFalse}/>)}
            <div className="bodyWork">
                <div className="nav">
                    <div className="leftNav">
                            <img src={arrowLeft}/>
                            <div className="back"><Link to='/workBook'><h3 className="h3">Назад в рабочий каталог</h3></Link></div>
                    </div>
                    <div className="rightNav">
                        <button className="btn1 bdR5 btnYellow" onClick={onSettings}>Настроить расписание</button>
                    </div>
                </div>
                <div className="workBodyShedules">
                    {props.user.currentSchedule && props.user.currentSchedule !== 'ERROR_CREATE' && (props.user.currentSchedule!.type === 'uni' ?
                         (<WorkSchUni user={props.user} addPlan={addPlanUniTrue} editPlan={editPlanUniTrue}/>)
                         :
                         (<WorkSchSchool user={props.user}/>)
                    )
                    }
                </div>
            </div>
        </div>
    )
}