import React, {useState} from "react";
import { ScheduleUni } from "../architecture/ScheduleUni";
import close from '../pictures/Close.svg'
import {handleUpload} from '../constants/const'

type AddType ={
    deleteTeachs: Function,
    sch: ScheduleUni,
    mes: Function
}

export const EdiTeachsUni: React.FC<AddType> = (props) => {
    const [curCafedra, setCurCafedra] = useState('')
    const [nameCafedra, setNameCafedra] = useState('')
    const [selectedCafedraFile, setSelectedCafedraFile] = useState<File | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.id === 'selectCafedra'){
            setCurCafedra(event.target.value)
        }
    }


    const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.id === 'Cafedra'){
            const file = event.target.files && event.target.files[0]; 
            if(file){
                setSelectedCafedraFile(file)
                setNameCafedra(file!.name)
            }
        }
    }

    const del = () => {
        if(!curCafedra){
            props.mes('Выберите кафедру!', false)
        } else{
            let ans = props.sch.deleteCafedra(curCafedra)
            ans.then(answer => {
                if(answer.otv === 'ok'){
                    props.mes('Кафедра успешно удалена!', true)
                }else if(answer.otv === 'error'){
                    props.mes('Ошибка удаления! Попробуйте позже!', false)
                }
            })
        }
    }
    

    const change = () => {
        if(!curCafedra){
            props.mes('Выберите кафедру!', false)
        } else if(selectedCafedraFile === null){
            props.mes('Выберите файл для изменения кафедры!', false)
        }else{
            let ans = handleUpload(selectedCafedraFile)
            ans.then(answer => {
                let data = answer as any
                let keys = data[0]
                if(keys[0] !== 'наименование' || keys[1] !== 'ФИО(полное) преподавателя' || keys[2] !== 'тип занятия' || keys[3] !== 'часы(академ)' || keys[4] !== 'курс' || keys[5] !== 'направление(полностью)' || keys[6] !== 'группы'){
                    props.mes('Поля файла не соответсвует требованиям! Перепроверьте файл на корректность заполненных полей!', false)
                }
                else{
                    let ans = props.sch.editCafedra(curCafedra, data)
                    ans.then(answer => {
                        if(answer.otv === 'ok'){
                            props.mes('Данные успешно изменены!', true)
                        }else if(answer.otv === 'error'){
                            props.mes('Нельзя удалить кафедру! Попробуйте позже!', false)
                        }else if(answer.otv === 'error name'){
                            props.mes('Кафедра с таким названием уже существует, чтобы изменить или удалить данные, нажмите на кнопку изменения или удаления!', false)
                        }else if(answer.otv === 'error add name'){
                            props.mes('Ошибка добавления кафедры! Попробуйте позже', false)
                        }else if(answer.otv === 'error teachers'){
                            props.mes('Ошибка добавления учителей', false)
                        }else if(answer.otv === 'error dirs'){
                            props.mes('Ошибка добавления направлений, попробуйте позже..', false)
                        }else if(answer.otv === 'error class', false){
                            props.mes('Ошибка добавления занятий попробуйте позже..', false)
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
                    <h1 className="h1">Изменение</h1>
                    <img src={close} id='close' onClick={() => props.deleteTeachs()}/>
                </div>
                <select className="shadowBlack" id='selectCafedra'
                onChange={handleChange}
                >
                    <option value={''}>Выберите кафедру</option>
                    {props.sch.cafedras?.map(el => (
                        <option value={`${el}`}>{el}</option>
                    ))}
                </select>
                <form method="post" encType="multipart/form-data">
                    	<label className="input-file">
                    	   	<span className="input-file-text shadowBlack">{nameCafedra}</span>
                    	   	<input type="file" name="file" accept=".xlsx" id='Cafedra' onChange={fileChange} />        
                     	   	<span className="input-file-btn"><span>Выберите файл</span></span>
                     	</label>
                </form>
                <div className="twobtnInBlock">
                    <button className="btn1 bdR5 btnPink" onClick={del}><span>Удалить кафедру</span></button>
                    <button className="btn1 bdR5 btnYellow" onClick={change}><span>Изменить</span></button>
                </div>
            </div>
        </div>
    )
}