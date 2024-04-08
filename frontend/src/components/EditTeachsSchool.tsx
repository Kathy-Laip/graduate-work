import React, {useState} from "react";
import { ScheduleSchool } from "../architecture/ScheduleSchool";
import close from '../pictures/Close.svg'
import {handleUpload} from '../constants/const'

type AddType ={
    deleteTeachs: Function,
    sch: ScheduleSchool, 
    mes: Function
}

export const EdiTeachsSchool: React.FC<AddType> = (props) => {
    const [nameCafedra, setNameCafedra] = useState('')
    const [nameFileKafedra, setFileKafedra] = useState('')
    const [selectedPlanFile, setSelectedPlanFile] = useState<File | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.id === 'nameCafedra'){
            setNameCafedra(event.target.value)
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

    const del = () => {
        if(!nameCafedra){
            props.mes('Выберите кафедру!', false)
        } else{
            let ans = props.sch.deleteCafedra(nameCafedra)
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
        if(!nameCafedra){
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
                    let ans = props.sch.editCafedra(nameCafedra, data)
                    ans.then(answer => {
                        if(answer.otv === 'ok'){
                            props.mes('Данные успешно добавлены!', true)
                        }else if(answer.otv === 'error'){
                            props.mes('Нельзя удалить раздел! Попробуйте позже!', false)
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
                    <h1 className="h1">Изменение</h1>
                    <img src={close} id='close' onClick={() => props.deleteTeachs()}/>
                </div>
                <select className="shadowBlack" id='nameCafedra'
                onChange={handleChange}
                >
                    <option value={''}>Выберите раздел</option>
                    {props.sch.cafedras?.map(el => (
                        <option value={`${el}`}>{el}</option>
                    ))}
                </select>
                <form method="post" encType="multipart/form-data">
                    	<label className="input-file">
                    	   	<span className="input-file-text shadowBlack">{nameFileKafedra}</span>
                    	   	<input type="file" name="file" accept=".xlsx"  id='planKafedra' onChange={fileChange}/>        
                     	   	<span className="input-file-btn"><span>Выберите файл</span></span>
                     	</label>
                </form>
                <div className="twobtnInBlock">
                    <button className="btn1 bdR5 btnPink" onClick={del}><span>Удалить раздел</span></button>
                    <button className="btn1 bdR5 btnYellow" onClick={change}><span>Изменить</span></button>
                </div>
            </div>
        </div>
    )
}