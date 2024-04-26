import React, { ReactEventHandler, useContext, useState } from "react";
import { User } from "../architecture/User";
import close from '../pictures/Close.svg'
import {switchBlock} from "../constants/const";
import { Message } from "../components/Message";
import {ScheduleFabrica} from '../architecture/ScheduleFabrica'
import { MessageConfirm } from "./MessageConfirm";
import {ISCH} from '../interfaces/interface'


type Message = {
    user: User   
    update: Function,
    dataCur: ISCH
}

export const CreateNewBlock: React.FC<Message> = (props) => {
    const [theme, setTheme] = useState<string>('')
    const [type, setType] = useState<string>('')
    const [mes, setMes] = useState<string>('')
    const [mesConfirm, setMesConfirm] = useState<string>('')
    const [val, setValue] = useState<string>('')
    const [typeEdit, setTypeEdit] = useState('')
    const [isEdit, setEdit] = useState(false)
    const [isAdd, setAdd] = useState(false)
    const [isEditAll, setEditAll] = useState(false)
    const [update, isUpdate] = useState(false)


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if(event.target.id === 'themeProject'){
            setTheme(event.target.value)
        }
        else if(event.target.id === 'selectType'){
            setType(event.target.value)
        }
        else if(event.target.id === 'themeProjectEdit'){
            setValue(event.target.value)
        } 
        else if(event.target.id === 'selectTypeEdit'){
            console.log(event.target.value)
            setTypeEdit(event.target.value)
        }
    }

    const closeAdd = () => {
        document.getElementById('blockWithClose')!.style.display = 'none'
        document.getElementById('addProject')!.style.display = 'none'
        if(document.getElementById('blockWithCloseMES')){
            document.getElementById('blockWithCloseMES')!.style.display = 'none'
        }
        if(document.getElementById('blockWithCloseMESCONFIRM')){
            document.getElementById('blockWithCloseMESCONFIRM')!.style.display = 'none'
        }
    }

    const closeEdit = () => {
        document.getElementById('blockWithClose')!.style.display = 'none'
        document.getElementById('editProject')!.style.display = 'none'
        if(document.getElementById('blockWithCloseMES')){
            document.getElementById('blockWithCloseMES')!.style.display = 'none'
        }
        if(document.getElementById('blockWithCloseMESCONFIRM')){
            document.getElementById('blockWithCloseMESCONFIRM')!.style.display = 'none'
        }
        setValue(props.dataCur.theme!)
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
                }else if(answer.otv === 'error_theme'){
                    setMes('Расписание с такой темой уже есть! Выберите другую тему для расписания!')
                    switchBlock('newMessage')
                }
                else if(answer.otv === 'OK'){
                    setMes('Новое расписание успешно добавлено!')
                    document.getElementById('addProject')!.style.display = 'none'
                    isUpdate(true)
                    switchBlock('newMessage')
                }
            })
        }
    }

    const deleteProject = () =>{
        setMesConfirm('Вы точно хотите удалить расписание?')
        setAdd(true)
        setEdit(false)
        setEditAll(false)
        switchBlock('newMessageConfirm')
    }
    
    const editProject = () => {
        if((typeEdit === '' || typeEdit === props.dataCur.type) && (val === '' || val === props.dataCur.theme)){
            setMes('Изменять нечего!')
            switchBlock('newMessage')
        }
        else if((typeEdit === props.dataCur.type || typeEdit === '') && val !== props.dataCur.theme){
            let ans = props.user.editSchedule(val, props.dataCur)
            ans.then(answer => {
                if(answer.otv === 'error_data'){
                    setMes('Ошибка изменения расписания!')
                    switchBlock('newMessage')
                } else if(answer.otv === 'OK'){
                    setMes('Расписание успешно изменено!')
                    isUpdate(true)
                    switchBlock('newMessage')
                }
            })
        }
        else if(typeEdit !== props.dataCur.type && typeEdit !== '' &&  val !== props.dataCur.theme){
            setMesConfirm('Данное изменение требует удаления всех данных о расписании. Вы уверены, что хотите изменить параметры расписания?')
            setAdd(false)
            setEdit(false)
            setEditAll(true)
            switchBlock('newMessageConfirm')
        }
        else if(typeEdit !== props.dataCur.type && typeEdit !== '' && (val === '' || val === props.dataCur.theme)) {
            setMesConfirm('Внимание! Данное изменение требует удаления всех данных о расписании. Вы уверены, что хотите изменить параметры расписания?')
            setAdd(false)
            setEdit(true)
            setEditAll(false)
            switchBlock('newMessageConfirm')
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
                    <img src={close} id='close' onClick={closeEdit}/>
                </div>
                <span className="mrTB1">Тема проекта:</span>
                <input id='themeProjectEdit' 
                value={val || props.dataCur.theme}
                onChange={handleChange}
                ></input>
                <span className="mrTB1">Тип учебного заведения</span>
                <select className="shadowBlack" id='selectTypeEdit'
                
                onChange={handleChange}
                >
                    <option value={''}>Выберите тип учебного заведения</option>
                    <option value={'университет'}>Университет</option>
                    <option value={'школа'}>Школа</option>
                </select>
                <div className="twobtnInBlock">
                    <button className="btn1 bdR5 btnPink" onClick={deleteProject}><span>Удалить проект</span></button>
                    <button className="btn1 bdR5 btnYellow" onClick={editProject}><span>Изменить</span></button>
                </div>
            </div>
            <Message mess={mes} update={update}/>
            <MessageConfirm mess={mesConfirm} data={props.dataCur} user={props.user} isEdit={isEdit} isAdd={isAdd} type={typeEdit} isEditAll={isEditAll} val={val}/>
        </div>
    )
}