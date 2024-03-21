import React from "react";
import { Link } from "react-router-dom";
import { User } from "../architecture/User";
import { CreateNewBlock } from "../components/CreateNewBlock";
import { SideBar } from "../components/SideBar";

type WorkPlaceProps = {
    user: User
}

export const WorkPlace: React.FC<WorkPlaceProps> = (props) => {
    const switchBlock = (type:string) => {
        if(type === 'newProject'){
            document.getElementById('blockWithClose')!.style.display = 'flex'
            document.getElementById('addProject')!.style.display = 'flex'
        }
        else if(type === 'editProject'){
            document.getElementById('blockWithClose')!.style.display = 'flex'
            document.getElementById('editProject')!.style.display = 'flex'
        }
    }

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
                    {/* {props.user.listOfSchedules === null ?
                    ():
                    ()} */}
                    {/* <div className="scheduleBlock bdR5">
                        <span>Тема: Расписание 1 семестр 2023-2024, ИВМиИТ КФУ</span>
                        <span>Создано: 21.09.2023</span>
                        <span>Тип учреждения: университет</span>
                        <div className="buttonSchedule">
                            <button className="edit btn1 btnYellow bdR5" onClick={() => switchBlock('editProject')}>Редактировать</button>
                            <button className="come btn1 btnGreen bdR5"><Link to='/workBook/workSchedule'>Перейти</Link></button>
                        </div>
                    </div>
                    <div className="scheduleBlock bdR5">
                        <span>Тема: Расписание 1 семестр 2023-2024, ИВМиИТ КФУ</span>
                        <span>Создано: 21.09.2023</span>
                        <span>Тип учреждения: университет</span>
                        <div className="buttonSchedule">
                            <button className="edit btn1 btnYellow bdR5" onClick={() => switchBlock('editProject')}>Редактировать</button>
                            <button className="come btn1 btnGreen bdR5">Перейти</button>
                        </div>
                    </div>
                    <div className="scheduleBlock bdR5">
                        <span>Тема: Расписание 1 семестр 2023-2024, ИВМиИТ КФУ</span>
                        <span>Создано: 21.09.2023</span>
                        <span>Тип учреждения: университет</span>
                        <div className="buttonSchedule">
                            <button className="edit btn1 btnYellow bdR5" onClick={() => switchBlock('editProject')}>Редактировать</button>
                            <button className="come btn1 btnGreen bdR5">Перейти</button>
                        </div>
                    </div>
                    <div className="scheduleBlock bdR5">
                        <span>Тема: Расписание 1 семестр 2023-2024, ИВМиИТ КФУ</span>
                        <span>Создано: 21.09.2023</span>
                        <span>Тип учреждения: университет</span>
                        <div className="buttonSchedule">
                            <button className="edit btn1 btnYellow bdR5" onClick={() => switchBlock('editProject')}>Редактировать</button>
                            <button className="come btn1 btnGreen bdR5">Перейти</button>
                        </div>
                    </div>
                    <div className="scheduleBlock bdR5">
                        <span>Тема: Расписание 1 семестр 2023-2024, ИВМиИТ КФУ</span>
                        <span>Создано: 21.09.2023</span>
                        <span>Тип учреждения: университет</span>
                        <div className="buttonSchedule">
                            <button className="edit btn1 btnYellow bdR5" onClick={() => switchBlock('editProject')}>Редактировать</button>
                            <button className="come btn1 btnGreen bdR5">Перейти</button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
        <CreateNewBlock user={props.user}/>
       </div>
    )
}