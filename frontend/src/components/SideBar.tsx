import React from "react";
import acc from '../pictures/Vector.svg'

type SideType = {
    login: string
}

export const SideBar: React.FC<SideType> = (props) => {
    return(
        <div className="sideBar">
            <img src={acc}/>
            <span>{props.login}</span>
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