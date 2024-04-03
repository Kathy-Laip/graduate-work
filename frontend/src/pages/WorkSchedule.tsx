import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import arrowLeft from "../pictures/arrowLeft.svg"
import {User} from '../architecture/User'
import {WorkSchUni} from '../components/ScheduleWorkUni'
import {WorkSchSchool} from '../components/ScheduleWorkSchool'
import { ScheduleBlockSettingsUni } from "../components/ScheduleBlockSettingsUni";
import { ScheduleFabrica } from "../architecture/ScheduleFabrica"
import { ScheduleUni } from "../architecture/ScheduleUni";
import { ScheduleSchool } from "../architecture/ScheduleSchool";
import { ScheduleBlockSettingsSchool } from "../components/ScheduleBlockSettingsSchool";
import { AddOrEditPlansUni } from "../components/AddOrEditPlansUni";
import { EdiPlanUni } from "../components/EditPlanUni";
import { AddOrEditTeachsUni } from "../components/AddOrEditTeachsUni";
import { EdiTeachsUni } from "../components/EditTeachsUni";
import { AddOrEditPlansSchool } from "../components/AddOrEditPlansSchool";
import { EdiPlanSschool } from "../components/EditPlanSchool";
import { AddOrEditTeachsSchool } from "../components/AddOrEditTeachsSchool";
import { EdiTeachsSchool } from "../components/EditTeachsSchool";
import download from '../pictures/download.svg'
import { Message } from "../components/Message";
import { switchBlock } from "../constants/const";

type WorkSch = {
    user: User
}

export const WorkSchedule: React.FC<WorkSch> = (props) => {
    const [setUni, isSetUni] = useState(false)
    const [setSchool, isSetSchool] = useState(false)

    const [addPlanUni, setAddPlanUni] = useState(false)
    const [editPlanUni, setEditPlanUni] = useState(false)

    const [addTeachsUni, setAddTeachsUni] = useState(false)
    const [editTeachsUni, setEditTeachsUni] = useState(false)

    const [addPlanSchool, setAddPlanSchool] = useState(false)
    const [editPlanSchool, setEditPlanSchool] = useState(false)

    const [addTeachsSchool, setAddTeachsSchool] = useState(false)
    const [editTeachsSchool, setEditTeachsSchool] = useState(false)

    const [mes, setMes] = useState<string>('')
    const [upd, setUpd] = useState<boolean>(false)

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

    const addTeachsUniTrue = () => {
        setAddTeachsUni(true)
    }
    const addTeachsUniFalse = () => {
        setAddTeachsUni(false)
    }

    const editTeachsUniTrue = () => {
        setEditTeachsUni(true)
    }
    const editTeachsUniFalse = () => {
        setEditTeachsUni(false)
    }

    const addPlanSchoolTrue = () => {
        setAddPlanSchool(true)
    }
    const addPlanSchoolFalse = () => {
        setAddPlanSchool(false)
    }

    const editPlanSchoolTrue = () => {
        setEditPlanSchool(true)
    }
    const editPlanSchoolFalse = () => {
        setEditPlanSchool(false)
    }

    const addTeachsSchoolTrue = () => {
        setAddTeachsSchool(true)
    }
    const addTeachsSchoolFalse = () => {
        setAddTeachsSchool(false)
    }

    const editTeachsSchoolTrue = () => {
        setEditTeachsSchool(true)
    }
    const editTeachsSchoolFalse = () => {
        setEditTeachsSchool(false)
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

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/examples';
        link.setAttribute('download', 'examples.zip');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const message = (mes:string, up:boolean) => {
        setMes(mes)
        setUpd(up)
        switchBlock('newMessage')
    }

    return (
        <div className="workScheduleMain">
            <SideBar login={props.user.login}/>
            {/* (setUni || props.user.currentSchedule!.settings === undefined)  */}
            {(setUni || false)  && props.user.currentSchedule! instanceof ScheduleUni && (<ScheduleBlockSettingsUni onSettingsFalse={onSettingsFalse} sch={props.user.currentSchedule} mes={message}/>)}
            {/* (setSchool || props.user.currentSchedule!.settings === undefined) */}
            {(setSchool || false) && props.user.currentSchedule! instanceof ScheduleSchool && (<ScheduleBlockSettingsSchool onSettingsFalse={onSettingsFalse} sch={props.user.currentSchedule}/>)}

            {addPlanUni && (<AddOrEditPlansUni deletePlan={addPlanUniFalse}/>)}
            {editPlanUni && (<EdiPlanUni deletePlan={editPlanUniFalse}/>)}

            {addTeachsUni && (<AddOrEditTeachsUni deleteTeachs={addTeachsUniFalse}/>)}
            {editTeachsUni && (<EdiTeachsUni deleteTeachs={editTeachsUniFalse}/>)}

            {addPlanSchool && (<AddOrEditPlansSchool deletePlan={addPlanSchoolFalse}/>)}
            {editPlanSchool && (<EdiPlanSschool deletePlan={editPlanSchoolFalse}/>)}

            {addTeachsSchool && (<AddOrEditTeachsSchool deleteTeachs={addTeachsSchoolFalse}/>)}
            {editTeachsSchool && (<EdiTeachsSchool deleteTeachs={editTeachsSchoolFalse}/>)}

            <div className="bodyWork">
                <div className="nav">
                    <div className="leftNav">
                            <img src={arrowLeft}/>
                            <div className="back"><Link to='/workBook'><h3 className="h3">Назад в рабочий каталог</h3></Link></div>
                    </div>
                    <div className="rightNav">
                        <p><a href="#" onClick={handleDownload}><img src={download}/></a></p>
                        <button className="btn1 bdR5 btnYellow" onClick={onSettings}>Настроить расписание</button>
                    </div>
                </div>
                <div className="workBodyShedules">
                    {props.user.currentSchedule && props.user.currentSchedule !== 'ERROR_CREATE' && (props.user.currentSchedule!.type === 'uni' ?
                         (<WorkSchUni user={props.user} addPlan={addPlanUniTrue} editPlan={editPlanUniTrue} addTeachs={addTeachsUniTrue} editTeachs={editTeachsUniTrue}/>)
                         :
                         (<WorkSchSchool user={props.user} addPlan={addPlanSchoolTrue} editPlan={editPlanSchoolTrue} addTeachs={addTeachsSchoolTrue} editTeachs={editTeachsSchoolTrue}/>)
                    )
                    }
                </div>
            </div>
            <Message mess={mes} update={upd}/>
        </div>
    )
}