import React, {useState} from "react";
import { ScheduleUni } from "../architecture/ScheduleUni";
import close from '../pictures/Close.svg'
import {handleUpload} from '../constants/const'

type AddType ={
    deletePlan: Function,
    sch: ScheduleUni,
    mes: Function
}

export const AddOrEditPlansUni: React.FC<AddType> = (props) => {
    const [countCoursese, setCountCourses] = useState<Array<number>|undefined>(props.sch.settings !== undefined ? Array.from({length: props.sch.settings!.count_class || -1}, (_, ind) => ind + 1) : undefined)
    const [numberCourse, setNumberCourse] = useState<number>(0)
    const [currCourse, setCurrCourse] = useState<string>('')

    const [namePlan, setNamePlan] = useState('')
    const [selectedPlanFile, setSelectedPlanFile] = useState<File | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.id === 'selectAddCourse'){
            setNumberCourse(Number(event.target.value))
        }else if(event.target.id === 'selectAddPlan'){
            setCurrCourse(event.target.value)
        }
    }

    const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.id === 'plan'){
            const file = event.target.files && event.target.files[0]; 
            if(file){
                setSelectedPlanFile(file)
                setNamePlan(file!.name)
            }
        }
    }

    const save = () => {
        if(!numberCourse){
            props.mes('Выберите сначала курс и направление!', false)
        }else{
            if(!currCourse){
                props.mes('Выберите направление подготовки!', false)
            }else{
                if(selectedPlanFile){
                    let ans = handleUpload(selectedPlanFile)
                    ans.then(ans => {
                        let data = ans as any
                        let keys = data[0]
                        if(keys[0] !== 'наименование предмета' || keys[1] !== 'экзамен' || keys[2] !== 'зачет' || keys[3] !== 'лекции(кол-во академ. часов)' || keys[4] !== 'практики(кол-во академ. часов)' || keys[5] !== 'лабораторные(кол-во академ. часов)'){
                            props.mes('Поля файла не соответсвует требованиям! Перепроверьте файл на корректность заполненных полей!', false)
                        }else{
                            let ans = props.sch.addDirection('uni', numberCourse, currCourse, data)
                            ans.then(answer => {
                                if(answer.otv === 'ok'){
                                    props.mes('Данные успешно добавлены!', true)
                                }else if(answer.otv === 'has'){
                                    props.mes('Данное направление имеет учебный план, если вам необходимо изменить, нажмите кнопку изменения или удаления!', false)
                                }else{
                                    props.mes('Ошибка добавления данных, попробуйте позже..', false)
                                }
                            })
                        }
                    })
                } else{
                    props.mes('Выберите файл!', false)
                }
            }
        }
    }
    

    return (
        <div id="blockWithCloseAddPlan">
            <div id='blockAddOrEdit'>
                {props.sch.settings !== undefined ? (
                    <>
                        <div className='closeCreate'>
                            <h1 className="h1">Добавление направления</h1>
                            <img src={close} id='close' onClick={() => props.deletePlan()}/>
                        </div>
                        <select className="shadowBlack" id='selectAddCourse'
                        onChange={handleChange}
                        >
                            <option value={''}>Выберите курс</option>
                            {countCoursese!.map(el => (
                                <option value={`${el}`}>{el}</option>
                            ))}
                        </select>
                        <select className="shadowBlack" id='selectAddPlan'
                        onChange={handleChange}
                        >
                            <option value={''}>Выберите направление</option>
                            {numberCourse !== 0 && [...new Set(Object.values(props.sch.settings!.arr_courses[numberCourse]).map(el => el[0]))].map(el => (<option value={`${el}`}>{el}</option>)) }
                        </select>
                        <form method="post" encType="multipart/form-data">
                                <label className="input-file">
                                       <span className="input-file-text shadowBlack"><span>{namePlan}</span></span>
                                       <input type="file" name="file" accept=".xlsx" id='plan' onChange={fileChange} />        
                                        <span className="input-file-btn"><span>Выберите файл!</span></span>
                                 </label>
                        </form>
                        <div className="onebtn">
                                <button className="btn1 btnYellow" onClick={save}><span>Сохранить</span></button>
                        </div>
                    </>
                ):
                (
                    <>
                        <div className='closeCreate'>
                            <h1 className="h1">Сообщение!</h1>
                            <img src={close} id='close' onClick={() => props.deletePlan()}/>
                        </div>
                        <div className="mrTB1">
                            <span>Пожалуйста, для начала настройте расписание, прежде чем добавлять информацию о направлениях!</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}