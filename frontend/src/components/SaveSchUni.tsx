import React, { useState } from "react";
import { ScheduleUni } from "../architecture/ScheduleUni";
import close from '../pictures/Close.svg'
import {createAndWriteXLSXFile} from '../constants/const'

type SaveSch = {
    close: Function,
    infoSch: ScheduleUni,
    mes: Function
}

export const SaveSchUni: React.FC<SaveSch> = (props) => {
    const [setCourse, setSetCourse] = useState('')
    const [countCoursese, setCountCourses] = useState<Array<number>|undefined>(props.infoSch.settings !== undefined ? Array.from({length: props.infoSch.settings!.count_class || -1}, (_, ind) => ind + 1) : undefined)
    const [course, setCourseNumber] = useState<number>(0)
    const [curDir, setCurDir] = useState('')

    const changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.id === 'course'){
            setSetCourse(event.target.value)
        }
        if(event.target.id === 'numberCourse'){
            setCourseNumber(+(event.target.value))
        }
        if(event.target.id === 'curDir'){
            setCurDir(event.target.value)
        }
    }

    // const handleDownload = () => {
    //     const url = 'http://example.com/file.pdf'; // Замените на URL вашего файла
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', 'file.pdf');
    //     document.body.appendChild(link);
    //     link.click();
    //   };

    const saveClick = () => {
        if(setCourse === ''){
            props.mes('Выберите количество ккурсов на направлении!')
        }else if(setCourse === 'all') {
            console.log('all')
        }
        else if(course == 0 && setCourse === '1'){
            props.mes('Выберите курс!')
        } else if(curDir === ''){
            props.mes('Выберите направление!')
        }else if(curDir !== 'all'){
            let ans = props.infoSch.saveDir({course: course, curDir: curDir})
            ans.then(answer => {
                if(answer.otv === 'ok'){
                    // props.mes('Das ist gut')
                    createAndWriteXLSXFile(answer.data, 'one', props.infoSch.settings!.work_times, Object.values(props.infoSch.settings!.arr_courses[course]).filter(el => el[0] === curDir))
                    // console.log(answer.data)
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
                <select id='course' onChange={changeSelect}>
                    <option value=''>Выберите количество курсов</option>
                    <option value='all'>все</option>
                    <option value='one'>1</option>
                </select>
                {setCourse === 'one' ? (
                    <select id='numberCourse'  onChange={changeSelect}>
                        <option value=''>Выбериет номер курса для скачивания</option>
                        {countCoursese!.map(el => (
                            <option value={`${el}`}>{el}</option>
                        ))}
                    </select>
                ): (
                    <></>
                )}
                {course !== 0 && setCourse === 'one' ? (
                    <select id='curDir'  onChange={changeSelect}>
                        <option value=''>Выберите направление</option>
                        <option value='all'>Все</option>
                        {course !== 0 && [...new Set(Object.values(props.infoSch.settings!.arr_courses[course]).map(el => el[0]))].map(el => (<option value={`${el}`}>{el}</option>)) }
                    </select>
                ):(
                    <></>
                )}
                <div className='onebtn'>
                    <button className="btn1 bdR5 btnPink" onClick={saveClick}><span>Скачать расписание</span></button>
                </div>
            </div>
        </div>
        </div>
    )
}