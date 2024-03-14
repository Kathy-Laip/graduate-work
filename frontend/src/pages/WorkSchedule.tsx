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
                            <Link to='/workBook'><h3 className="h3">Назад в рабочий каталог</h3></Link>
                    </div>
                    <div className="rightNav">
                        <button className="btn1 bdR5 btnYellow">Настроить расписание</button>
                    </div>
                </div>
            </div>
        </div>
    )
}