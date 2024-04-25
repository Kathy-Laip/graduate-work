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
import {Schedule} from '../architecture/Schedule'
import { AddLesonUni } from "../components/AddLessonUni";
import { AddLesonSchool } from "../components/AddLessonSchool";
import { Offers } from "../components/Offers";

type WorkSch = {
    user: User
}

export const WorkSchedule: React.FC<WorkSch> = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [get, setGet] = useState(true)

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

    const [addLessUni, setAddLessUni] = useState(false)
    const [addLessSchool, setAddLessSchool] = useState(false)

    const [mes, setMes] = useState<string>('')
    const [upd, setUpd] = useState<boolean>(false)

    const [info, setInfo] = useState<Array<string|number>>([])
    const [offsInfo, setOffsInfo] = useState<any>({})

    const [offs, setOffs] = useState(false)

    
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

    const closeAddLessonTrue = () => {
        setAddLessUni(true)
    }

    const closeAddLesson = () => {
        setAddLessUni(false)
    }

    const closeAddLessonTrueSch = () => {
        setAddLessUni(true)
    }

    const closeAddLessonSch = () => {
        setAddLessUni(false)
    }

    const closeOffersTrue = () => {
        setOffs(true)
    }

    const closeOffersFalse = () => {
        setOffs(false)
    }

    const updateSchs = (schs:any) => {
        let ans = props.user.getListOfSchedules()
        ans.then(answer => {
            if(answer.otv === 'OK'){
                setIsLoading(true)
                props.user.listOfSchedules = []
                let schFabrica = new ScheduleFabrica()
                for(let sch of answer.works){
                    let type = sch.type === 'университет' ? 'uni' : 'school'
                    if(sch.settings && sch.courseCount && sch.grafic && sch.courses){
                        let curSCH = schFabrica.create(sch.id, sch.theme, type, sch.date, sch.settings, sch.courseCount, sch.grafic, sch.courses)
                        if(schs.id === sch.id &&  curSCH instanceof Schedule){
                            props.user.currentSchedule = curSCH
                        }
                        if(sch.cafedras &&  curSCH instanceof Schedule){
                            curSCH.cafedras = sch.cafedras
                        }
                        if(curSCH instanceof Schedule){
                            props.user.listOfSchedules.push(curSCH)
                        }
                    }else{
                        let curSCH = schFabrica.create(sch.id, sch.theme, type, sch.date)
                        if(schs.id === sch.id &&  curSCH instanceof Schedule){
                            props.user.currentSchedule = curSCH
                        }
                        if(sch.cafedras &&  curSCH instanceof Schedule){
                            curSCH.cafedras = sch.cafedras
                        }
                        if(curSCH instanceof Schedule){
                            props.user.listOfSchedules.push(curSCH)
                        }
                    }
                }
                setIsLoading(false)
            }else{
                console.log('error')
            }
        })
    }
    (async () => {
        if(get){
            const saved = JSON.parse(localStorage.getItem('user')!)
            props.user.login = saved.login
            props.user.password = saved.password
            updateSchs(saved.currentSchedule)
            setGet(false)
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

    const changeInfo = (data: Array<string|number>) => {
        setInfo(data)
    }

    const addOffers = (data: any) => {
        setOffsInfo(data)
        closeAddLesson()
        closeOffersTrue()
    }

    
    return (
        <div className="workScheduleMain">
            <SideBar login={props.user.login} user={props.user}/>
            
            {setUni && props.user.currentSchedule! instanceof ScheduleUni
             && (<ScheduleBlockSettingsUni onSettingsFalse={onSettingsFalse} sch={props.user.currentSchedule} mes={message} user={props.user}/>)}

            {props.user.currentSchedule! instanceof ScheduleUni && addPlanUni  && (<AddOrEditPlansUni deletePlan={addPlanUniFalse} sch={props.user.currentSchedule} mes={message}/>)} 
            
            {props.user.currentSchedule! instanceof ScheduleUni && editPlanUni && (<EdiPlanUni deletePlan={editPlanUniFalse} sch={props.user.currentSchedule} mes={message}/>) } 

            {props.user.currentSchedule! instanceof ScheduleUni && addTeachsUni && (<AddOrEditTeachsUni deleteTeachs={addTeachsUniFalse} sch={props.user.currentSchedule} mes={message}/>)}
            {props.user.currentSchedule! instanceof ScheduleUni && editTeachsUni && (<EdiTeachsUni deleteTeachs={editTeachsUniFalse} sch={props.user.currentSchedule} mes={message}/>)}

            {setSchool && props.user.currentSchedule! instanceof ScheduleSchool && 
            (<ScheduleBlockSettingsSchool onSettingsFalse={onSettingsFalse} sch={props.user.currentSchedule} mes={message} user={props.user}/>)}

            {props.user.currentSchedule! instanceof ScheduleSchool && addPlanSchool && (<AddOrEditPlansSchool deletePlan={addPlanSchoolFalse} sch={props.user.currentSchedule} mes={message}/>)}
            {props.user.currentSchedule! instanceof ScheduleSchool && editPlanSchool && (<EdiPlanSschool deletePlan={editPlanSchoolFalse} sch={props.user.currentSchedule} mes={message}/>)}

            {props.user.currentSchedule! instanceof ScheduleSchool && addTeachsSchool && (<AddOrEditTeachsSchool deleteTeachs={addTeachsSchoolFalse} sch={props.user.currentSchedule} mes={message}/>)}
            {props.user.currentSchedule! instanceof ScheduleSchool &&  editTeachsSchool && (<EdiTeachsSchool deleteTeachs={editTeachsSchoolFalse} sch={props.user.currentSchedule} mes={message}/>)} 

            <div className="bodyWork">
                <div className="nav">
                    <div className="leftNav">
                            <img src={arrowLeft}/>
                            <div className="back"><Link to='/workBook'><h3 className="h3">Назад в рабочий каталог</h3></Link></div>
                    </div>
                    <div className="rightNav">
                        <p id='dow'><a href="#" onClick={handleDownload}><img src={download}/></a><span className="tool-text" id='bottom'>Скачайте документы для создания расписания! Следуйте примерам из файлом и не изменяйте названия колонок!</span></p>
                        <button className="btn1 bdR5 btnYellow" onClick={onSettings}>Настроить расписание</button>
                    </div>
                </div>
                <div className="workBodyShedules">
                    {props.user.currentSchedule && props.user.currentSchedule !== 'ERROR_CREATE' && (props.user.currentSchedule!.type === 'uni' ?
                         (<WorkSchUni user={props.user} addPlan={addPlanUniTrue} editPlan={editPlanUniTrue} addTeachs={addTeachsUniTrue} editTeachs={editTeachsUniTrue} mes={message} addLessTrue={closeAddLessonTrue} changeInfo={changeInfo}/>)
                         :
                         (<WorkSchSchool user={props.user} addPlan={addPlanSchoolTrue} editPlan={editPlanSchoolTrue} addTeachs={addTeachsSchoolTrue} editTeachs={editTeachsSchoolTrue}  mes={message} addLessTrue={closeAddLessonTrueSch}/>)
                    )
                    }
                </div>
            </div>
            {props.user.currentSchedule! instanceof ScheduleUni && addLessUni && (<AddLesonUni close={closeAddLesson} info={info} sch={props.user.currentSchedule} add={addOffers} mes={message}/>)}
            {props.user.currentSchedule! instanceof ScheduleSchool && addLessUni && (<AddLesonSchool close={closeAddLessonSch}/>)}

            {props.user.currentSchedule! instanceof ScheduleUni && offs && (<Offers close={closeOffersFalse} data={offsInfo} sch={props.user.currentSchedule} mes={message}/>)}
            <Message mess={mes} update={upd}/>
            {/* <MessageConfirmYN mess={mes} update={upd} change={changeYON}/> */}
        </div>
    )
}