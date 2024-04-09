import React, {useState} from "react";
import { Link } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import arrowLeft from "../pictures/arrowLeft.svg"
import {User} from '../architecture/User'
import { MenuSchSchool } from "./menuSchSchool";
import { MenuPlanSchool } from "./menuPlansSchool";
import { MenuTeachsSchool } from "./menuTeachsSchool";
import { ScheduleSchool } from "../architecture/ScheduleSchool";

type WorkSch = {
    user: User,
    addPlan: Function,
    editPlan: Function,
    addTeachs: Function,
    editTeachs: Function
}

export const WorkSchSchool: React.FC<WorkSch> = (props) => {
    const [sch, setSch] = useState(true)
    const [plan, setPlan] = useState(false)
    const [teach, setTeach] = useState(false)

    const onToggle = (flag:string) => {
        if(flag === 'sch'){
            document.getElementById('sch')!.style.backgroundColor = 'ForestGreen'
            document.getElementById('plan')!.style.backgroundColor = 'var(--main-yellow)'
            document.getElementById('teach')!.style.backgroundColor = 'var(--main-blue-blue)'
            setSch(true)
            setPlan(false)
            setTeach(false)
        }
        else if(flag === 'plan'){
            document.getElementById('sch')!.style.backgroundColor = 'var(--main-orange)'
            document.getElementById('plan')!.style.backgroundColor = 'ForestGreen'
            document.getElementById('teach')!.style.backgroundColor = 'var(--main-blue-blue)'
            setSch(false)
            setPlan(true)
            setTeach(false)
        }
        else if(flag === 'teach'){
            document.getElementById('sch')!.style.backgroundColor = 'var(--main-orange)'
            document.getElementById('plan')!.style.backgroundColor = 'var(--main-yellow)'
            document.getElementById('teach')!.style.backgroundColor = 'ForestGreen'
            setSch(false)
            setPlan(false)
            setTeach(true)
        }

    }
    
    return (
        <div className="workSchedule bdR5">        
            <div className="navSchedule">
                <div className="btnOrange menuPos bdr5UP" id='sch' onClick={() => onToggle('sch')}> Расписание</div>
                <div className="btnYellow menuPos bdr5UP" id='plan' onClick={() => onToggle('plan')}>Учебный план</div>
                <div className="btnGreen menuPos bdr5UP" id='teach' onClick={() => onToggle('teach')}>Учителя</div>
            </div>
            <div className="menuAndSchedule">
                {sch && props.user.currentSchedule instanceof ScheduleSchool && (<MenuSchSchool user={props.user} sch={props.user.currentSchedule}/>)}
                {plan && (<MenuPlanSchool user={props.user} addPlan={props.addPlan} editPlan={props.editPlan}/>)}
                {teach && (<MenuTeachsSchool user={props.user} addTeachs={props.addTeachs} editTeachs={props.editTeachs}/>)}
            </div>
        </div>
    )
}