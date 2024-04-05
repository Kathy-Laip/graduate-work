import React, {useState} from "react";
import { ScheduleUni } from "../architecture/ScheduleUni";
import close from '../pictures/Close.svg'
import {handleUpload} from '../constants/const'

type AddType ={
    deleteTeachs: Function,
    sch: ScheduleUni,
    mes: Function
}

export const AddOrEditTeachsUni: React.FC<AddType> = (props) => {
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

    const save = () => {
        if(!nameKafedra){
            props.mes('Введите название кафедры!', false)
        }else if(!selectedPlanFile){
            props.mes('Выберите файл!', false)
        } else{
            let ans = handleUpload(selectedPlanFile)
            ans.then(ans => {
                let data = ans as any
                let keys = data[0]
                if(keys[0] !== 'наименование' || keys[1] !== 'ФИО(полное) преподавателя' || keys[2] !== 'тип занятия' || keys[3] !== 'часы(академ)' || keys[4] !== 'курс' || keys[5] !== 'направление(полностью)' || keys[6] !== 'группы'){
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
                    <h1 className="h1">Добавьте кафедру</h1>
                    <img src={close} id='close' onClick={() => props.deleteTeachs()}/>
                </div>
                <span id='h1'>Название:</span>
                <input type="text" id='nameCafedra' placeholder="Введите название кафедры" onChange={handleChange}/>

                <form method="post" encType="multipart/form-data">
                    	<label className="input-file">
                    	   	<span className="input-file-text shadowBlack"><span>{nameFileKafedra}</span></span>
                    	   	<input type="file" name="file" accept=".xlsx" id='planKafedra' onChange={fileChange}/>        
                     	   	<span className="input-file-btn"><span>Выберите файл!</span></span>
                     	</label>
                </form>
                <div className="onebtn">
                        <button className="btn1 btnYellow" onClick={save}><span>Добавить</span></button>
                </div>
            </div>
        </div>
    )
}