import React from "react";
import { Link } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import arrowLeft from "../pictures/arrowLeft.svg"
import {User} from '../architecture/User'

type WorkSch = {
    user: User
}

export const WorkSchUni: React.FC<WorkSch> = (props) => {
    return (
        <div className="workSchedule bdR5">
                        
        <div className="navSchedule">
            <div className="btnOrange menuPos bdr5UP">Расписание</div>
            <div className="btnYellow menuPos bdr5UP">Учебный план</div>
            <div className="btnGreen menuPos bdr5UP">Преподаватели</div>
        </div>
        <div className="menuAndSchedule">

        </div>
    </div>
    )
}