import React, { ReactEventHandler, useState } from "react";
import { User } from "../architecture/User";
import close from '../pictures/Close.svg'
import {switchBlock} from "../constants/const";
import { Message } from "../components/Message";

type Message = {
    user?: User   
}

export const CreateNewBlock: React.FC<Message> = (props) => {
    const [theme, setTheme] = useState<string>('')
    const [type, setType] = useState<string>('')
    const [mes, setMes] = useState<string>('')

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
                    setMes('Новое расписание успешно добавлено!')
                    document.getElementById('addProject')!.style.display = 'none'
                    switchBlock('newMessage')
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