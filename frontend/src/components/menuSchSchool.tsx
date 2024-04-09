import React from "react";
import { ScheduleSchool } from "../architecture/ScheduleSchool";
import { User } from "../architecture/User";

type Menu ={
    user: User,
    sch: ScheduleSchool
}

export const MenuSchSchool: React.FC<Menu> = (props) => {
    return (
        <div className="planMenu">
            Настройте расписание! А также добавьте информацию по учебному плану и преподавателям!
        </div>
    )
}