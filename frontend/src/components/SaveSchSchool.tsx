import React, { useState } from "react";
import close from '../pictures/Close.svg'
import {createAndWriteXLSXFile} from '../constants/const'
import { ScheduleSchool } from "../architecture/ScheduleSchool";

type SaveSch = {
    close: Function,
    infoSch: ScheduleSchool,
    mes: Function
}

export const SaveSchSchool: React.FC<SaveSch> = (props) => {
    const [countCoursese, setCountCourses] = useState<Array<number>|undefined>(props.infoSch.settings !== undefined ? Array.from({length: props.infoSch.settings!.count_class || -1}, (_, ind) => ind + 1) : undefined)
    const [course, setCourseNumber] = useState<number>(0)

    const changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.id === 'numberCourse'){
            setCourseNumber(+(event.target.value))
        }
    }


    const saveClick = () => {
        if(course === 0){
            props.mes('Выберите параллель!')
        }else{
            let ans = props.infoSch.saveSch({course: course})
            ans.then(answer => {
                if(answer.otv === 'ok'){
                    createAndWriteXLSXFile(answer.data, 'school', props.infoSch.settings!.work_times, Object.values(props.infoSch.settings!.arr_courses[course]))
                }else if(answer.otv === 'error'){
                    props.mes(answer.mes)
                }
            })
        }
    }


    return (
        <div id="blockWithCloseSett">
        <div id='windowSave' >
            <div className='closeCreate'>
                <h1 className="h1">Настройки скачивания</h1>
                <img src={close} id='close' onClick={() => props.close()}/>
            </div>
            <div className="sugScroll">
                <select id='numberCourse'  
                onChange={changeSelect}
                >
                    <option value=''>Выбериет номер курса для скачивания</option>
                    {countCoursese!.map(el => (
                        <option value={`${el}`}>{el}</option>
                    ))}
                </select>
            </div>
            <div className='onebtn'>
                    <button className="btn1 bdR5 btnPink" 
                    onClick={saveClick}
                    ><span>Скачать расписание</span></button>
            </div>
        </div>
        </div>
    )
}