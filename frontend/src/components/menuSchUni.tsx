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
    changeI: Function,
    changeRasp: Function,
    rasp: boolean
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

    const [lesson, setLesson] = useState<Array<Array<string>>>([])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.id === 'course'){
            setCourse(Number(event.target.value))
        }else if(event.target.id === 'dir'){
            setArrHours(Array.from({length: Number(Object.values(props.sch.settings!.work_times[props.sch.settings!.work_times.length - 1])[1].split(':')[0]) + 2 - Number(Object.values(props.sch.settings!.work_times[0])[0].split(':')[0])}, (_, ind) => Number(Object.values(props.sch.settings!.work_times[0])[0].split(':')[0]) + ind ))
            setCountGrouos(Object.values(props.sch.settings!.arr_courses[course]).filter(el => el[0] === event.target.value))
            props.changeI([course, event.target.value])
            
            setDir(event.target.value)
            // sessionStorage.setItem('info', JSON.stringify({'course': course, 'dir': event.target.value}))
        }
    }


    const next = () => {
        if(!course){
            props.mes('Заполните поле с курсом!', false)
        }else if(!dir){
            props.mes('Веберите направление!', false)
        }else{
            props.add()
            
            setGet(true)
            sessionStorage.removeItem('info')
            sessionStorage.setItem('info', JSON.stringify({'course': course, 'dir': dir}))
            
            props.changeRasp()
        }
    }

    const updateSchs = () => {
        
        let ans = props.sch.getClasses({'course': course, 'napr': dir})
        // console.log()
        ans.then(answer => {
            if(answer.otv === 'OK'){
                setIsLoading(true)
                setLesson(Object.values(answer.info))
                
                setIsLoading(false)
            }else if(answer.otv === 'empty'){
                setIsLoading(true)
                setLesson([])
                props.mes('Занятий нет для этого направления! Добавьте новое занятие', false)
                
                setIsLoading(false)
            }
            else{
                props.mes('Ошибка получения расписания! Попробуйте позже!', false)
            }
        })
    }

    const updateSchsSaved = (courseSaved: number, naprSaved: string) => {
        console.log(courseSaved)
        let ans = props.sch.getClasses({'course': courseSaved, 'napr': naprSaved})
        ans.then(answer => {
            if(answer.otv === 'OK'){
                setIsLoading(true)
                setLesson(Object.values(answer.info))
                
                
                setIsLoading(false)
            }else if(answer.otv === 'empty'){
                setIsLoading(true)

                setLesson([])
                props.mes('Занятий нет для этого направления! Добавьте новое занятие', false)
                
                
                setIsLoading(false)
            }
            else{
                props.mes('Ошибка получения расписания! Попробуйте позже!', false)
            }
        })
    }

    (async () => {
        const saved = JSON.parse(sessionStorage.getItem('info')!)
        
        if((saved || sch) && get){
            setSch(true)
            
            if(saved !== null){
                
                setCourse(prev => prev = saved.course)
                setDir(prev => prev = saved.dir)
                updateSchsSaved(saved.course, saved.dir)
                setArrHours(Array.from({length: Number(Object.values(props.sch.settings!.work_times[props.sch.settings!.work_times.length - 1])[1].split(':')[0]) + 2 - Number(Object.values(props.sch.settings!.work_times[0])[0].split(':')[0])}, (_, ind) => Number(Object.values(props.sch.settings!.work_times[0])[0].split(':')[0]) + ind ))
                setCountGrouos(Object.values(props.sch.settings!.arr_courses[saved.course]).filter(el => el[0] === saved.dir))
                props.changeI([saved.course, saved.dir])
                

            }else{
                updateSchs()
            }
            setMins(getMinutesLesson(Object.values(props.sch.settings!.work_times)[0], Object.values(props.sch.settings!.work_times)[0]))
            props.changeRasp()
            setGet(false)
        }
    })()

    console.log(lesson)
    
    return (
        <>
        {sch && props.rasp ? 
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
                        
                        {lesson.map(el => {
                            console.log(el)
                            if(el[7] === 'зачет' || el[7] === 'экзамен'){
                                console.log(el)
                                return coutGroups.map((gr, ind) => {if(gr[1] == el[10]) return (
                                    <Lesson mes={props.mes} sch={props.sch} key={ind} color={'var(--main-yellow)'} text={{'name': el[4], 'place': el[2], 'teach': el[3], 'period': el[7]}} top={typeof(el[0]) === 'string' ? getTop(arrHours, el[0]) : '0px'} left={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180 +'px'} height={minss + 'px'} data={el[6]} leftInt={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180} id={Number(el[11])} infoDop={[el[0], el[1], el[7]]}/>
                                )})
                            }
                            else if(el[10] === null && el[9] !== null && el[8] == 'lect'){
                                if(el[7] == 'чет'){ // 89
                                    return coutGroups.map((gr, ind) => (
                                        <Lesson mes={props.mes} sch={props.sch} key={ind} color={'var(--main-blue)'} text={{'name': el[4], 'place': el[2], 'teach': el[3], 'period': el[7]}} top={typeof(el[0]) === 'string' ? getTop(arrHours, el[0]) : '0px'} left={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180 +'px'} height={minss + 'px'} width={'89px'} leftInt={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180 - 89} id={Number(el[11])} infoDop={[el[0], el[1], 'лекция']}/>
                                    ))
                                }
                                else if(el[7] == 'нечет'){ // 89
                                    return coutGroups.map((gr, ind) => (
                                        <Lesson mes={props.mes} sch={props.sch} key={ind} color={'var(--main-blue)'} text={{'name': el[4], 'place': el[2], 'teach': el[3], 'period': el[7]}} top={typeof(el[0]) === 'string' ? getTop(arrHours, el[0]) : '0px'} left={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180 + 89 +'px'} height={minss + 'px'} width={'89px'} leftInt={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180} id={Number(el[11])} infoDop={[el[0], el[1], 'лекция']}/>
                                    ))
                                } else{
                                    return coutGroups.map((gr, ind) => (
                                        <Lesson mes={props.mes} sch={props.sch} key={ind} color={'var(--main-blue)'} text={{'name': el[4], 'place': el[2], 'teach': el[3], 'period': el[7]}} top={typeof(el[0]) === 'string' ? getTop(arrHours, el[0]) : '0px'} left={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180 +'px'} height={minss + 'px'} leftInt={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180} id={Number(el[11])} infoDop={[el[0], el[1], 'лекция']}/>
                                    ))

                                }
                            }
                            else if(el[10] !== null && el[9] !== null && el[8] == 'lab'){
                                if(el[7] == 'чет'){ // 89
                                    return coutGroups.map((gr, ind) => (
                                        <Lesson mes={props.mes} sch={props.sch} key={ind} color={'var(--main-orange)'} text={{'name': el[4], 'place': el[2], 'teach': el[3], 'period': el[7]}} top={typeof(el[0]) === 'string' ? getTop(arrHours, el[0]) : '0px'} left={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180 +'px'} height={minss + 'px'} width={'89px'} leftInt={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180 - 89} id={Number(el[11])} infoDop={[el[0], el[1], 'лабораторная практика']}/>
                                    ))
                                }
                                else if(el[7] == 'нечет'){ // 89
                                    return coutGroups.map((gr, ind) => (
                                        <Lesson mes={props.mes} sch={props.sch} key={ind} color={'var(--main-orange)'} text={{'name': el[4], 'place': el[2], 'teach': el[3], 'period': el[7]}} top={typeof(el[0]) === 'string' ? getTop(arrHours, el[0]) : '0px'} left={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180 + 89 +'px'} height={minss + 'px'} width={'89px'} leftInt={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180} id={Number(el[11])} infoDop={[el[0], el[1], 'лабораторная практика']}/>
                                    ))
                                } else{
                                    return coutGroups.map((gr, ind) => {if(gr[1] == el[10]) return (
                                        <Lesson mes={props.mes} sch={props.sch} key={ind} color={'var(--main-orange)'} text={{'name': el[4], 'place': el[2], 'teach': el[3], 'period': el[7]}} top={typeof(el[0]) === 'string' ? getTop(arrHours, el[0]) : '0px'} left={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180 +'px'} height={minss + 'px'} leftInt={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180} id={Number(el[11])} infoDop={[el[0], el[1], 'лабораторная практика']}/>
                                    )})
                                }
                            }
                            else if(el[10] !== null && el[9] !== null && el[8] == 'practic'){
                                if(el[7] == 'чет'){ // 89
                                    return coutGroups.map((gr, ind) => (
                                        <Lesson mes={props.mes} sch={props.sch} key={ind} color={'var(--main-yellow)'} text={{'name': el[4], 'place': el[2], 'teach': el[3], 'period': el[7]}} top={typeof(el[0]) === 'string' ? getTop(arrHours, el[0]) : '0px'} left={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180 +'px'} height={minss + 'px'} width={'89px'} leftInt={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180 - 89} id={Number(el[11])} infoDop={[el[0], el[1], 'практика']}/>
                                    ))
                                }
                                else if(el[7] == 'нечет'){ // 89
                                    return coutGroups.map((gr, ind) => (
                                        <Lesson mes={props.mes} sch={props.sch} key={ind} color={'var(--main-yellow)'} text={{'name': el[4], 'place': el[2], 'teach': el[3], 'period': el[7]}} top={typeof(el[0]) === 'string' ? getTop(arrHours, el[0]) : '0px'} left={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180 + 89 +'px'} height={minss + 'px'} width={'89px'} leftInt={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180} id={Number(el[11])} infoDop={[el[0], el[1], 'практика']}/>
                                    ))
                                }else{
                                    return coutGroups.map((gr, ind) => {if(gr[1] == el[10]) return (
                                        <Lesson mes={props.mes} sch={props.sch} key={ind} color={'var(--main-yellow)'} text={{'name': el[4], 'place': el[2], 'teach': el[3], 'period': el[7]}} top={typeof(el[0]) === 'string' ? getTop(arrHours, el[0]) : '0px'} left={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180 +'px'} height={minss + 'px'} leftInt={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180} id={Number(el[11])} infoDop={[el[0], el[1], ' практика']}/>
                                    )})

                                }
                            }
                        })}
                    </>}
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