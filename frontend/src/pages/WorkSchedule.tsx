import React from "react";
import { Link } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import arrowLeft from "../pictures/arrowLeft.svg"

export const WorkSchedule: React.FC = () => {
    return (
        <div className="workScheduleMain">
            <SideBar/>
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
                    <div className="workSchedule bdR5">
                        <div className="navSchedule">
                            <div className="btnOrange menuPos bdr5UP">Расписание</div>
                            <div className="btnYellow menuPos bdr5UP">Учебный план</div>
                            <div className="btnGreen menuPos bdr5UP">Преподаватели</div>
                        </div>
                        <div className="menuAndSchedule">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}