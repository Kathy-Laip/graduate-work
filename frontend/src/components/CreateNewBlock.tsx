import React, { ReactEventHandler, useContext, useState } from "react";
import { User } from "../architecture/User";
import close from '../pictures/Close.svg'
import {switchBlock} from "../constants/const";
import { Message } from "../components/Message";
import {ScheduleFabrica} from '../architecture/ScheduleFabrica'
import { Link } from "react-router-dom";
import { ScheduleBlock } from "./ScheduleBlock";
import ReactDOM from 'react-dom'
import {WorkPlace} from '../pages/WorkPlace'

type Message = {
    user?: User   
    update: Function
}

export const CreateNewBlock: React.FC<Message> = (props) => {
    const [theme, setTheme] = useState<string>('')
    const [type, setType] = useState<string>('')
    const [mes, setMes] = useState<string>('')
    // const {basename} = useContext(ScheduleBlock)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if(event.target.id === 'themeProject'){
            setTheme(event.target.value)
        }
        else if(event.target.id === 'selectType'){
            setType(event.target.value)
        }
    }

    const closeAdd = () => {
        document.getElementById('blockWithClose')!.style.display = 'none'
        document.getElementById('addProject')!.style.display = 'none'
        if(document.getElementById('blockWithCloseMES')){
            document.getElementById('blockWithCloseMES')!.style.display = 'none'
        }
    }
    

    const addSchedule = () => {
        if(!theme || !type){
            setMes('Заполните все поля!')
            switchBlock('newMessage')
        }else{
            let ans = props.user!.addSchedule(theme, type)
            ans.then(answer => {
                if(answer.otv === 'error_data' || answer.otv === 'error_add'){
                    setMes('Ошибка добавления расписания! Попробуйте позже...')
                    switchBlock('newMessage')
                }else if(answer.otv === 'OK'){
                    let schFabrica = new ScheduleFabrica()
                    let newType = type === 'университет' ? 'uni' : 'school'
                    const dateObj = new Date();
                    const month   = dateObj.getUTCMonth() + 1; // months from 1-12
                    const day     = dateObj.getUTCDate();
                    const year    = dateObj.getUTCFullYear();
            
                    const hour = dateObj.getHours()
                    const minutes = dateObj.getMinutes()
                    const sec = dateObj.getSeconds()
            
                    const newDate = year + "-" + month + "-" + day + ' ' + hour + ':' + minutes + ':' + sec;
                    props.user!.listOfSchedules.unshift(schFabrica.create(theme, newType, newDate))
                    console.log(props.user!.listOfSchedules)

                    
                    // // ReactDOM.createPortal(<ScheduleBlock type={type} theme={theme} date={newDate}/>, document.getElementById('works')!.firstElementChild)
                    // // ReactDOM.render(<><ScheduleBlock theme={theme} type={type} date={newDate}/></>, document.getElementById('works')!)
                    // // let domworks = document.getElementById('works')!.firstChild
                    // // ReactDOM.createPortal(<ScheduleBlock type={type} theme={theme} date={newDate}/>, domworks)
                    // ReactDOM.render(<ScheduleBlock type={type} theme={theme} date={newDate}/>, document.getElementById('works')!)
                    setMes('Новое расписание успешно добавлено!')
                    document.getElementById('addProject')!.style.display = 'none'
                    switchBlock('newMessage')
                    window.location.reload();
                }
            })
        }
    }
    

    return(
        <div id="blockWithClose">
            <div id="addProject">
                <div className='closeCreate'>
                    <h1 className="h1">Создание нового проекта</h1>
                    <img src={close} id='close' onClick={closeAdd}/>
                </div>
                <span className="mrTB1">Тема проекта:</span>
                <input id='themeProject' 
                onChange={handleChange}
                ></input>
                <span className="mrTB1">Тип учебного заведения</span>
                <select className="shadowBlack" id='selectType'
                onChange={handleChange}
                >
                    <option value={''}>Выберите тип учебного заведения</option>
                    <option value={'университет'}>Университет</option>
                    <option value={'школа'}>Школа</option>
                </select>
                <div className="onebtn">
                    <button className="btn1 btnLightGreen" onClick={addSchedule}><span>Создать</span></button>
                </div>
            </div>
            <div id="editProject">
                <div className='closeCreate'>
                    <h1 className="h1">Редактирование</h1>
                    <img src={close} id='close' onClick={() => {
                        document.getElementById('blockWithClose')!.style.display = 'none'
                        document.getElementById('editProject')!.style.display = 'none'
                        }}/>
                </div>
                <span className="mrTB1">Тема проекта:</span>
                <input id='themeProject'></input>
                <span className="mrTB1">Тип учебного заведения</span>
                <select className="shadowBlack">
                    <option value={''}>Выберите тип учебного заведения</option>
                    <option value={'univ'}>Университет</option>
                    <option value={'school'}>Школа</option>
                </select>
                <div className="twobtnInBlock">
                    <button className="btn1 bdR5 btnPink"><span>Удалить проект</span></button>
                    <button className="btn1 bdR5 btnYellow"><span>Изменить</span></button>
                </div>
            </div>
            <Message mess={mes}/>
        </div>
    )
}