import React, {useState} from "react";
import { ScheduleSchool } from "../architecture/ScheduleSchool";
import close from '../pictures/Close.svg'
import {handleUpload} from '../constants/const'

type AddType ={
    deleteTeachs: Function,
    sch: ScheduleSchool,
    mes: Function
}

export const AddOrEditTeachsSchool: React.FC<AddType> = (props) => {
    const [nameKafedra, setNameKafedra] = useState('')

    const [nameFileKafedra, setFileKafedra] = useState('')
    const [selectedPlanFile, setSelectedPlanFile] = useState<File | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.id === 'nameCafedra'){
            setNameKafedra(event.target.value)
        }
    }

    const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.id === 'planKafedra'){
            const file = event.target.files && event.target.files[0]; 
            if(file){
                setSelectedPlanFile(file)
                setFileKafedra(file!.name)
            }
        }
    }

    const add = () => {
        if(!nameKafedra){
            props.mes('Введите название раздела!', false)
        }else if(!selectedPlanFile){
            props.mes('Выберите файл!', false)
        } else{
            let ans = handleUpload(selectedPlanFile)
            ans.then(ans => {
                let data = ans as any
                let keys = data[0]
                if(keys[0] !== 'наименование' || keys[1] !== 'ФИО(полное) учителя' || keys[2] !== 'поток' || keys[3] !== 'класс'){
                    props.mes('Поля файла не соответсвует требованиям! Перепроверьте файл на корректность заполненных полей!', false)
                }else{
                    let ans = props.sch.addCafedra(nameKafedra, data)
                    ans.then(answer => {
                        if(answer.otv === 'ok'){
                            props.mes('Данные успешно добавлены!', true)
                        }else if(answer.otv === 'error name'){
                            props.mes('Кафедра с таким названием уже существует, чтобы изменить или удалить данные, нажмите на кнопку изменения или удаления!', false)
                        }else if(answer.otv === 'error add name'){
                            props.mes('Ошибка добавления кафедры! Попробуйте позже', false)
                        }else if(answer.otv === 'error class'){
                            props.mes('Ошибка добавления данных,проверьте корректность введенных занятий для классов', false)
                        }else if(answer.otv === 'dir error'){
                            props.mes('Ошибка добавления данных для параллели, проверьте корректность введенных данных!', false)
                        }else if(answer.otv === 'error teachers'){
                            props.mes('Ошибка добавления учителей', false)
                        }else if(answer.otv === 'error dirs'){
                            props.mes('Ошибка добавления направлений, попробуйте позже..', false)
                        }else if(answer.otv === 'error class', false){
                            props.mes('Ошибка добавления занятийб попробуйте позже..', false)
                        }
                    })
                }
            })
        }
    }

    return (
        <div id="blockWithCloseAddTeachs">
            <div id='blockAddOrEdit'>
                <div className='closeCreate'>
                    <h1 className="h1">Добавление</h1>
                    <img src={close} id='close' onClick={() => props.deleteTeachs()}/>
                </div>
                <span id='h1'>Название:</span>
                <input type="text" placeholder="Введите название раздела" id='nameCafedra' onChange={handleChange}/>

                <form method="post" encType="multipart/form-data">
                    	<label className="input-file">
                    	   	<span className="input-file-text shadowBlack">{nameFileKafedra}</span>
                    	   	<input type="file" name="file" accept=".xlsx" id='planKafedra' onChange={fileChange}/>        
                     	   	<span className="input-file-btn"><span>Выберите файл</span></span>
                     	</label>
                </form>
                <div className="onebtn">
                        <button className="btn1 btnYellow" onClick={add}><span>Создать</span></button>
                </div>
            </div>
        </div>
    )
}