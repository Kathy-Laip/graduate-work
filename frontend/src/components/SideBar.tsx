import React from "react";
import acc from '../pictures/Vector.svg'

export const SideBar: React.FC = () => {
    return(
        <div className="sideBar">
            <img src={acc}/>
            <span>yekaterina.shlyapnikova@yadex.ru</span>
            <div className="openWorks bdR5">
                <h3 className="h3">Рабочие вкладки:</h3>
                <div className="openWorksBlock">
                    <div className="theme">
                        <span>Расписание 1 семестр 2023-2024, ИВМиИТ КФУ</span>
                    </div>
                </div>
            </div>
        </div>
    )
}