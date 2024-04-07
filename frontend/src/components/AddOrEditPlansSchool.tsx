import React, {useState} from "react";
import { ScheduleSchool } from "../architecture/ScheduleSchool";
import close from '../pictures/Close.svg'
import {handleUpload} from '../constants/const'

type AddType ={
    deletePlan: Function,
    sch: ScheduleSchool,
    mes: Function
}

export const AddOrEditPlansSchool: React.FC<AddType> = (props) => {
    const [countCoursese, setCountCourses] = useState<Array<any>|undefined>(props.sch.settings !== undefined ? Array.from({length: props.sch.settings!.count_class || -1}, (_, ind) => props.sch.settings!.arr_courses[ind+1]) : undefined)
    const [numberCourse, setNumberCourse] = useState<number>(0)
    const [dir, setDir] = useState<any>()
    const [currCourse, setCurrCourse] = useState<string>('')

    const [namePlan, setNamePlan] = useState('')
    const [selectedPlanFile, setSelectedPlanFile] = useState<File | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.id === 'selectAddCourse'){
            setNumberCourse(Number(event.target.value))
            let dir = props.sch.settings!.arr_courses[Number(event.target.value)]
            setDir(dir)
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


    const add = () => {
        if(!numberCourse){
            props.mes('Выберите сначала параллель и класс!', false)
        }else{
            if(!currCourse){
                props.mes('Выберите параллель!', false)
            }else{
                if(selectedPlanFile){
                    let ans = handleUpload(selectedPlanFile)
                    ans.then(ans => {
                        let data = ans as any
                        let keys = data[0]
                        if(keys[0] !== 'наименование предмета' || keys[1] !== 'количество часов в неделю'){
                            props.mes('Поля файла не соответсвует требованиям! Перепроверьте файл на корректность заполненных полей!', false)
                        }else{
                            let ans = props.sch.addDirection('uni', numberCourse, {'dir': dir[0][0], 'currCourse': currCourse}, data)
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
                            <h1 className="h1">Добавление параллели</h1>
                            <img src={close} id='close' onClick={() => props.deletePlan()}/>
                        </div>
                        <select className="shadowBlack" id='selectAddCourse'
                        onChange={handleChange}
                        >
                            <option value={''}>Выберите поток</option>
                            {countCoursese!.map((el, ind) => (
                                <option value={`${ind+1}`}>{el[0][0]}</option>
                            ))}
                        </select>
                        <select className="shadowBlack" id='selectAddPlan'
                        onChange={handleChange}
                        >
                            <option value={''}>Выберите класс</option>
                            {numberCourse !== 0 && [...new Set(Object.values(props.sch.settings!.arr_courses[numberCourse]).map(el => el[1]))].map(el => (<option value={`${el}`}>{el}</option>)) }
                        </select>
                        <form method="post" encType="multipart/form-data">
                            	<label className="input-file">
                            	   	<span className="input-file-text shadowBlack">{namePlan}</span>
                            	   	<input type="file" name="file" accept=".xlsx" id='plan' onChange={fileChange}/>        
                             	   	<span className="input-file-btn"><span>Выберите файл!</span></span>
                             	</label>
                        </form>
                        <div className="onebtn">
                                <button className="btn1 btnYellow" onClick={add}><span>Добавить</span></button>
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