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
    add: Function,
    changeI: Function
}

const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
const week_small = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']

const getMinutesLesson = (time1:any, time2:any) => {
    time1 = time1[0];
    time2 = time2[1];

    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;

    return (totalMinutes2 - totalMinutes1)*75/60;
}

const getTop = (arrH: Array<number>, obj:string) => {
    return (70 + (arrH!.indexOf(Number(obj.split(':')[0])) + 1)*75) + (Number(obj.split(':')[1])/60*75) + 'px'
}

export const MenuSchUni: React.FC<Menu> = (props) => {
    
    const [countCoursese, setCountCourses] = useState<Array<number>|undefined>(props.sch.settings !== undefined ? Array.from({length: props.sch.settings!.count_class || -1}, (_, ind) => ind + 1) : undefined)
    const [course, setCourse] = useState<number>(0)
    const [dir, setDir] = useState('')
    const [minss, setMins] = useState(0)
    const [coutGroups, setCountGrouos] = useState<Array<string>>([])
    
    const [arrHours, setArrHours] = useState<Array<number>|[]>([])

    const [sch, setSch] = useState(false)

    const [isLoading, setIsLoading] = useState(true);
    const [get, setGet] = useState(true)

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.id === 'course'){
            setCourse(Number(event.target.value))
        }else if(event.target.id === 'dir'){
            setArrHours(Array.from({length: Number(Object.values(props.sch.settings!.work_times[props.sch.settings!.work_times.length - 1])[1].split(':')[0]) + 2 - Number(Object.values(props.sch.settings!.work_times[0])[0].split(':')[0])}, (_, ind) => Number(Object.values(props.sch.settings!.work_times[0])[0].split(':')[0]) + ind ))
            setCountGrouos(Object.values(props.sch.settings!.arr_courses[course]).filter(el => el[0] === event.target.value))
            props.changeI([course, event.target.value])
            setDir(event.target.value)
        }
    }


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

    const updateSchs = () => {
        let ans = props.sch.getClasses({'course': course, 'napr': dir})
        ans.then(answer => {
            if(answer.otv === 'OK'){
                setIsLoading(true)
                props.sch.listOfClasses = Object.values(answer.info)
                setIsLoading(false)
            }else if(answer.otv === 'empty'){
                setIsLoading(true)
                props.mes('Занятий нет для этого направления! Добавьте новое занятие', false)
                setIsLoading(false)
            }
            else{
                props.mes('Ошибка получения расписания! Попробуйте позже!', false)
            }
        })
    }

    (async () => {
        if(sch && get){
            updateSchs()
            setMins(getMinutesLesson(Object.values(props.sch.settings!.work_times)[0], Object.values(props.sch.settings!.work_times)[0]))
            setGet(false)
        }
    })()


    
    return (
        <>
        {sch ? 
        (
            <div>
                <div className="sch">
                    {isLoading && <div className="divLoad"><div id="load"></div></div>}
                    {isLoading == false &&
                    <>
                        <LineHorizont width={(180*6*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0] === dir).length) + 70) + 'px'} top='55px'/>
                        <LineHorizont width={(180*6*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0] === dir).length) + 70) + 'px'} top='110px'/>
                        {arrHours !== undefined && arrHours.length > 0 && arrHours.map((el, ind) => 
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
                                {arrHours !== undefined && arrHours.length > 0 && (<LineVertical height={(arrHours!.length*75 + 140)+'px'} top='0px' left={(70 + ind*180*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0] === dir).length))+'px'}/>)}
                                {Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0] === dir).map((el, ind1) => (
                                    <>
                                        <div className='class' style={{top:'70px',  left:(ind*180*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0] === dir).length)) + (ind1*180) + 70 + 10 +'px'}}><span>{el[1]}</span></div>
                                        {arrHours !== undefined && arrHours.length > 0 && ind1 !== 0 && (<LineVertical height={(arrHours!.length*75 + 85)+'px'} top='55px' left={(ind*180*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0] === dir).length)) + (ind1*180) + 70 +'px'}/>)}
                                    </>
                                    
                                ))}
                            </>
                        ))}
                        {/* ['8:30', '10:00', '216', 'Гайнуллина А.Р.', 'Алгебра и геометрия', 'вторник', null, 'каждую неделю', 'lect', 'ФИИТ', null] */}
                        {/* {el[8] === 'lect' ? 'var(--main-blue)' : el[8] === 'practic' ? '--main-green-grand': '--main-yellow'} */}
                        {props.sch.listOfClasses!.map(el => {
                            if(el[10] === null && el[9] !== null && el[8] == 'lect'){
                                return coutGroups.map((gr, ind) => (
                                    <Lesson key={ind} color={'var(--main-blue)'} text={{'name': el[4], 'place': el[2], 'teach': el[3], 'period': el[7]}} top={typeof(el[0]) === 'string' ? getTop(arrHours, el[0]) : '0px'} left={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180 +'px'} height={minss + 'px'}/>
                                ))
                            }
                            else if(el[10] !== null && el[9] !== null && el[8] == 'lab'){
                                return coutGroups.map((gr, ind) => {if(gr[1] == el[10]) return (
                                    <Lesson key={ind} color={'var(--main-orange)'} text={{'name': el[4], 'place': el[2], 'teach': el[3], 'period': el[7]}} top={typeof(el[0]) === 'string' ? getTop(arrHours, el[0]) : '0px'} left={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180 +'px'} height={minss + 'px'}/>
                                )})
                            }
                            else if(el[10] !== null && el[9] !== null && el[8] == 'practic'){
                                return coutGroups.map((gr, ind) => {if(gr[1] == el[10]) return (
                                    <Lesson key={ind} color={'var(--main-yellow)'} text={{'name': el[4], 'place': el[2], 'teach': el[3], 'period': el[7]}} top={typeof(el[0]) === 'string' ? getTop(arrHours, el[0]) : '0px'} left={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180 +'px'} height={minss + 'px'}/>
                                )})
                            }
                        })}
                    </>}
                </div>
                <div>
                    <button className="btn1 btnGreenGrand bdR5" id='saveChanges' >Сохранить изменения</button>
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
                <span style={{color: 'red'}}>ВНИМАНИЕ!</span>  Чтобы избежать утери данных, перед началом составления расписания добавьте в настройках всю необходимую информацию! Далее перейдите в поле "учебный план".
                Загрузите для всех направлений учебный план, далее перейдите в поле "преподаватели" и загрузите информацию с преподавателями!
            </div>
        )}
        </>
    )
}