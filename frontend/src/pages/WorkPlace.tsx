import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../architecture/User";
import { CreateNewBlock } from "../components/CreateNewBlock";
import { SideBar } from "../components/SideBar";
import {switchBlock} from '../constants/const'
import {ScheduleBlock} from '../components/ScheduleBlock'
import { ScheduleFabrica } from "../architecture/ScheduleFabrica"

type WorkPlaceProps = {
    user: User
}

export const WorkPlace: React.FC<WorkPlaceProps> = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    (async () => {
        let ans = props.user.getListOfSchedules()
        ans.then(answer => {
            if(answer.otv === 'OK'){
                props.user.listOfSchedules = []
                let schFabrica = new ScheduleFabrica()
                for(let sch of answer.works){
                    let type = sch.type === 'университет' ? 'uni' : 'school'
                    props.user.listOfSchedules.push(schFabrica.create(sch.theme, type, sch.date))
                }
                setIsLoading(false)
            }else{
                console.log('error')
            }
        })
    })()
    return (
       <div className="workMain">
        <SideBar/>
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
                <div className="workPlaceSchedules bdR10">
                    {isLoading && <div className="divLoad"><div id="load"></div></div>}
                    {
                    isLoading === false && props.user.listOfSchedules.length === 0 ? 
                    (<div className="emptySch bdR5"><h1 className="h1">Нет расписаний!</h1></div>) 
                    :
                    props.user.listOfSchedules.map(el => {
                        if(el !== 'ERROR_CREATE'){
                            return ( <ScheduleBlock theme={el.name} type={el.type} date={el.createDate}/>)
                        }
                    }
                    )
                }
                </div>
            </div>
        </div>
        <CreateNewBlock user={props.user}/>
       </div>
    )
}