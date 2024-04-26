import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../architecture/User";
import { CreateNewBlock } from "../components/CreateNewBlock";
import { SideBar } from "../components/SideBar";
import {switchBlock} from '../constants/const'
import {ScheduleBlock} from '../components/ScheduleBlock'
import { ScheduleFabrica } from "../architecture/ScheduleFabrica"
import { ScheduleSettings } from "../architecture/ScheduleSettings";
import {ISCH} from '../interfaces/interface'
import { Schedule } from "../architecture/Schedule";
import { ScheduleSchool } from "../architecture/ScheduleSchool";
import { ScheduleUni } from "../architecture/ScheduleUni";

type WorkPlaceProps = {
    user: User
}

export const WorkPlace: React.FC<WorkPlaceProps> = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [get, setGet] = useState(true)
    const [dataCurSch, setDataCurSch] = useState<ISCH>({theme: '', type: '', date: ''})
    const [openSCH, setOpenSCH] = useState<(ScheduleUni|ScheduleSchool)[]>([])

    const change = (theme: string, type: string, date: string) => {
        setDataCurSch({theme: theme, type: type, date: date})
    }

    
    const updateSchs = (saved:any) => {
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
                        if(sch.cafedras &&  curSCH instanceof Schedule){
                            curSCH.cafedras = sch.cafedras
                        }
                        if(curSCH instanceof Schedule){
                            props.user.listOfSchedules.push(curSCH)
                        }
                        if(saved.openSchedules !== undefined){
                            for(let openSch of saved.openSchedules){
                                if(curSCH instanceof Schedule && curSCH.id === openSch.id){
                                    let has = props.user.openSchedules.filter(el => el.id === openSch.id)
                                    if(has.length === 0) props.user.openSchedules.push(curSCH)
                                    // props.user.openSchedules.push(curSCH)
                                }
                            }
                            setOpenSCH(props.user.openSchedules)
                        }
                    }else{
                        let curSCH = schFabrica.create(sch.id, sch.theme, type, sch.date)
                        if(sch.cafedras &&  curSCH instanceof Schedule){
                            curSCH.cafedras = sch.cafedras
                        }
                        if(curSCH instanceof Schedule){
                            props.user.listOfSchedules.push(curSCH)
                        }
                        if(saved.openSchedules !== undefined){
                            for(let openSch of saved.openSchedules){
                                if(curSCH instanceof Schedule && curSCH.id === openSch.id){
                                    let has = props.user.openSchedules.filter(el => el.id === openSch.id)
                                    if(has.length === 0) props.user.openSchedules.push(curSCH)
                                }
                            }
                            setOpenSCH(props.user.openSchedules)
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
            props.user.openSchedules = []
            updateSchs(saved)
            setGet(false)
        }
    })()

    const deleteId = (id: number) => {
        setOpenSCH(prev => {
            let ans = [...prev]
            ans = ans.filter(el => el.id !== id)
            props.user.openSchedules = ans
            localStorage.setItem('user', JSON.stringify(props.user))    
            return ans
        })    
    }

    
    return (
       <div className="workMain">
        <SideBar login={props.user.login} user={props.user} open={openSCH} deleteId={deleteId}/>
        <div className="bodyWork">
            <div className="nav">
                <div className="leftNav">
                    <div className="nameBlock bdR10"><h1 className="h1">Рабочий каталог</h1></div>
                    <button className="bdR5 btn1 btnLightGreen" onClick={() => switchBlock('newProject')}><span>Новый проект</span></button>
                </div>
                <div className="rightNav">
                    <Link to='/'><h1 className="underSpan h1">Выйти</h1></Link>
                </div>
            </div>
            <div className="workBodyShedules">
                <div className="workPlaceSchedules bdR10" id="works">
                    {isLoading && <div className="divLoad"><div id="load"></div></div>}
                    {
                    isLoading === false && props.user.listOfSchedules.length === 0 ? 
                    (<div className="emptySch bdR5"><h1 className="h1">Нет расписаний!</h1></div>) 
                    :
                    props.user.listOfSchedules.map(el => {
                        if(el !== 'ERROR_CREATE'){
                            return ( <ScheduleBlock id={el.id} theme={el.name} type={el.type} date={el.createDate} data={change} user={props.user}/>)
                        }
                    }
                    )
                }
                </div>
            </div>
        </div>
        <CreateNewBlock user={props.user} update={updateSchs} dataCur={dataCurSch}/>
       </div>
    )
}