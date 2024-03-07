import React from "react";
import { Link } from "react-router-dom";
import acc from '../pictures/Vector.svg'

export const WorkPlace: React.FC = () => {
    return (
       <div className="workMain">
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
        <div className="bodyWork">
            <div className="nav">
                <div className="leftNav">
                    <div className="nameBlock bdR10"><h1 className="h1">Рабочий каталог</h1></div>
                    <button className="bdR5 btn1 btnLightGreen"><span>Новый проект</span></button>
                </div>
                <div className="rightNav">
                    <Link to='/'><h1 className="underSpan h1">Выйти</h1></Link>
                </div>
            </div>
        </div>
       </div>
    )
}