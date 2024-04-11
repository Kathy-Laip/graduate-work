import React, {useState} from "react";
import { ScheduleUni } from "../architecture/ScheduleUni";
import { User } from "../architecture/User";
import { Lesson } from "./Lesson";
import { LineHorizont } from "./LineHorizon";
import { LineVertical } from "./LineVertical";

type Menu ={
    user: User,
    sch: ScheduleUni,
    mes: Function,
    add: Function
}

const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

export const MenuSchUni: React.FC<Menu> = (props) => {
    
    const [countCoursese, setCountCourses] = useState<Array<number>|undefined>(props.sch.settings !== undefined ? Array.from({length: props.sch.settings!.count_class || -1}, (_, ind) => ind + 1) : undefined)
    const [course, setCourse] = useState<number>(0)
    const [dir, setDir] = useState('')

    
    const [arrHours, setArrHours] = useState<Array<number>|0>()

    const [sch, setSch] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.id === 'course'){
            setCourse(Number(event.target.value))
        }else if(event.target.id === 'dir'){
            setArrHours(Array.from({length: Number(Object.values(props.sch.settings!.work_times[props.sch.settings!.work_times.length - 1])[1].split(':')[0]) + 2 - Number(Object.values(props.sch.settings!.work_times[0])[0].split(':')[0])}, (_, ind) => Number(Object.values(props.sch.settings!.work_times[0])[0].split(':')[0]) + ind ))
            setDir(event.target.value)
        }
    }

    console.log(props.sch, course, dir, arrHours)

    const next = () => {
        if(!course){
            props.mes('Заполните поле с курсом!', false)
        }else if(!dir){
            props.mes('Веберите направление!', false)
        }else{
            props.add()
            setSch(true)
        }
    }


    return (
        <>
        {sch ? 
        (
            <div>
                <div className="sch">
                    <LineHorizont width={(180*6*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0] === dir).length) + 70) + 'px'} top='55px'/>
                    <LineHorizont width={(180*6*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0] === dir).length) + 70) + 'px'} top='110px'/>
                    {arrHours !== undefined && arrHours !== 0 && arrHours.map((el, ind) => 
                    (
                        <>
                            <div className='timeSch' style={{top:(50 + (ind + 1)*75)+'px', left: '10px'}}><span>{el+':00'}</span></div>
                            <LineHorizont width={(180*6*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0] === dir).length)) + 'px'} top={(70 + (ind + 1)*75)+'px'} left='65px'/>
                            {ind === arrHours.length - 1 && (<div className="emptyBlock" style={{top:(70 + (ind + 2)*75)+'px', left: '10px'}}></div>)}
                        </>
                    ))}
                    {week.map((el, ind) => (
                        <>
                            <div className='weeks' style={{top:'20px',  left:(80 + ind*180*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0] === dir).length))+'px'}}><span>{el}</span></div>
                            {arrHours !== undefined && arrHours !== 0 && (<LineVertical height={(arrHours!.length*75 + 140)+'px'} top='0px' left={(70 + ind*180*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0] === dir).length))+'px'}/>)}
                            {Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0] === dir).map((el, ind1) => (
                                <>
                                    <div className='class' style={{top:'70px',  left:(ind*180*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0] === dir).length)) + (ind1*180) + 70 + 10 +'px'}}><span>{el[1]}</span></div>
                                    {arrHours !== undefined && arrHours !== 0 && ind1 !== 0 && (<LineVertical height={(arrHours!.length*75 + 85)+'px'} top='55px' left={(ind*180*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0] === dir).length)) + (ind1*180) + 65 +'px'}/>)}
                                </>
                                
                            ))}
                        </>
                    ))}
                    <Lesson color={'var(--main-orange)'} top={145+'px'} left={71+'px'} height={(1.5*75)+'px'} text={{name: 'Алгоритмы и анализ сложности', place: 'Аудитория 808', teach: 'Васильев А.В'}}/>
                </div>
                <div>
                    <button className="btn1 btnBlue bdR5" id='saveChanges'>Сохранить изменения</button>
                </div>
            </div>
        )
        : props.sch.settings?.arr_courses ? (
            <div className="planMenu">
                <div id='chooseSch'>
                    <select className="shadowBlack" id='course' onChange={handleChange}>
                        <option value=''>Выберите курс</option>
                        {countCoursese!.map(el => (
                            <option value={`${el}`}>{el}</option>
                        ))}
                    </select>
                    <select className="shadowBlack" id='dir' onChange={handleChange}>
                        <option value=''>Выберите направление</option>
                        {course !== 0 && [...new Set(Object.values(props.sch.settings!.arr_courses[course]).map(el => el[0]))].map(el => (<option value={`${el}`}>{el}</option>)) }
                    </select>
                    <button className="btn1 btnBlue bdR5" onClick={next}><span>Перейти</span></button>
                </div>
            </div>
        ):(
            <div className="planMenu">
                Настройте расписание! А также добавьте информацию по учебному плану и преподавателям!
            </div>
        )}
        </>
    )
}